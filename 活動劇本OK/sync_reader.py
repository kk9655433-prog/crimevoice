"""Local, read-only Google Docs reader. Python standard library only."""
from pathlib import Path
from html.parser import HTMLParser
from http.server import ThreadingHTTPServer, BaseHTTPRequestHandler
from concurrent.futures import ThreadPoolExecutor, as_completed
from datetime import datetime, timezone, timedelta
from urllib.request import urlopen, Request
from urllib.parse import urlencode, urlsplit
import argparse, html, json, re, threading, time, webbrowser, sys

ROOT = Path(__file__).resolve().parent
DOC_ID = '1-bpUffM-E0xer3zJYCAzfvA_fMUtJp3ps65N8FqDdsM'
BASE = 'https://docs.google.com/document/d/' + DOC_ID + '/'
PORT = 18743
LOCK = threading.Lock()
STATE = {'running': False, 'message': '尚未更新', 'done': 0, 'total': 0}

def now():
    return datetime.now(timezone(timedelta(hours=8))).isoformat(timespec='seconds')

def get(url):
    for attempt in range(2):
        try:
            with urlopen(Request(url, headers={'User-Agent':'Mozilla/5.0', 'Cache-Control':'no-cache'}), timeout=45) as response:
                data = response.read(24 * 1024 * 1024)
                return data.decode('utf-8')
        except Exception:
            if attempt: raise
            time.sleep(1)

def metadata(source):
    chunks=[]; revisions=[]
    for match in re.finditer(r'DOCS_modelChunk\s*=\s*(?=\{)', source):
        item,_=json.JSONDecoder().raw_decode(source[match.end():])
        chunks.extend(item.get('chunk', []))
        if 'revision' in item: revisions.append(str(item['revision']))
    if not chunks or not revisions:
        raise ValueError('讀不到 Google 文件分頁。請確認網路及文件檢視權限。')
    tree=[]
    def siblings(path):
        items=tree
        for index in path: items=items[index]['children']
        return items
    for c in chunks:
        kind=c.get('ty'); d=c.get('d',[])
        if kind=='mkch':
            props=dict(zip(d[0][::2],d[0][1::2]))
            tree.append({'id':'t.0','title':props[1],'children':[]})
        elif kind=='ac':
            ident,values,path=d;props=dict(zip(values[::2],values[1::2]))
            if not re.fullmatch(r't\.[a-zA-Z0-9]+',ident): raise ValueError('無法辨識文件分頁編號')
            siblings(path[:-1]).insert(path[-1],{'id':ident,'title':props[1],'children':[]})
        elif kind=='mch':
            before,after=d
            item=siblings(before[:-1]).pop(before[-1]);siblings(after[:-1]).insert(after[-1],item)
    flat=[]
    def visit(nodes,depth=0,parent=None):
        for node in nodes:
            flat.append({'id':node['id'],'title':node['title'],'depth':depth,'parent':parent})
            visit(node['children'],depth+1,node['id'])
    visit(tree)
    if not flat or len(set(t['id'] for t in flat))!=len(flat): raise ValueError('文件分頁結構異常，保留舊版')
    return flat, revisions[0]

class SafeBody(HTMLParser):
    tags={'p','span','div','h1','h2','h3','h4','h5','h6','table','thead','tbody','tfoot','tr','th','td','ul','ol','li','a','b','strong','i','em','u','s','sup','sub','br','hr','img','blockquote'}
    void={'br','hr','img'}
    def __init__(self, prefix):
        super().__init__(convert_charrefs=True);self.parts=[];self.prefix=prefix;self.skip=0
    def handle_starttag(self,tag,attrs):
        if tag in {'script','style','iframe','object'}: self.skip+=1;return
        if self.skip or tag not in self.tags:return
        clean=[]
        for key,value in attrs:
            if value is None:continue
            if key=='id':value=self.prefix+'-'+value
            elif key=='href':
                if value.startswith('#'):value='#'+self.prefix+'-'+value[1:]
                elif not value.startswith(('https://','http://','mailto:')):continue
            elif key=='src':
                if not value.startswith(('data:image/png;base64,','data:image/jpeg;base64,','data:image/gif;base64,','data:image/webp;base64,','https://docs.google.com/','https://lh')):continue
            elif key=='style':
                if re.search(r'url\s*\(|expression|@import|javascript',value,re.I):continue
            elif key not in {'class','alt','title','colspan','rowspan','start','width','height'}:continue
            clean.append(f'{key}="{html.escape(value,quote=True)}"')
        self.parts.append('<'+tag+(' '+' '.join(clean) if clean else '')+'>')
    def handle_endtag(self,tag):
        if tag in {'script','style','iframe','object'}:
            self.skip=max(0,self.skip-1);return
        if not self.skip and tag in self.tags and tag not in self.void:self.parts.append('</'+tag+'>')
    def handle_data(self,data):
        if not self.skip:self.parts.append(html.escape(data))

def export_tab(tab):
    source=get(BASE+'export?'+urlencode({'format':'html','tab':tab['id'],'_':str(time.time_ns())}))
    body=re.search(r'<body\b[^>]*>(.*?)</body>',source,re.S|re.I)
    if not body or 'doc-content' not in source[:source.find('<body')+150]:
        raise ValueError('無法匯出分頁：'+tab['title'])
    prefix='doc-'+tab['id'].replace('.','-')
    parser=SafeBody(prefix);parser.feed(body[1]);content=''.join(parser.parts)
    css=''.join(re.findall(r'<style\b[^>]*>(.*?)</style>',source,re.S|re.I))
    # Only local, ordinary Google-export CSS declarations are retained.
    css=re.sub(r'@import\s+[^;]+;', '', css, flags=re.I)
    if re.search(r'@|url\s*\(|</style',css,re.I):raise ValueError('無法安全處理分頁樣式')
    css=re.sub(r'([^{}]+)\{',lambda m:', '.join('#'+prefix+' '+v.strip() for v in m[1].split(','))+'{',css)
    return {**tab,'html':content,'css':css,'contentId':prefix}

def write_snapshot(data):
    template=(ROOT/'reader-template.html').read_text(encoding='utf-8')
    encoded=json.dumps(data,ensure_ascii=False,separators=(',',':')).replace('<','\\u003c').replace('&','\\u0026')
    page=template.replace('__DOCUMENT_JSON__',encoded)
    # The previous snapshot remains intact until the complete replacement is ready.
    temp=ROOT/'index.new.html';temp.write_text(page,encoding='utf-8');temp.replace(ROOT/'index.html')

def read_snapshot():
    source=(ROOT/'index.html').read_text(encoding='utf-8')
    match=re.search(r'<script type="application/json" id="saved-document">(.*?)</script>',source,re.S)
    return json.loads(match[1]) if match else None

def synchronize(seed=None,force=False):
    if not LOCK.acquire(blocking=False):return
    STATE.update(running=True,message='正在確認 Google 文件版本…',done=0,total=0,error=False)
    try:
        source=Path(seed).read_text(encoding='utf-8') if seed else get(BASE+'edit?'+urlencode({'_':str(time.time_ns())}))
        tabs,revision=metadata(source)
        old=read_snapshot()
        if old and old.get('revision')==revision and not force:
            old['checkedAt']=now();write_snapshot(old)
            STATE.update(message='已確認為最新版本',checkedAt=old['checkedAt']);return
        STATE.update(total=len(tabs),message='正在下載最新分頁…')
        results={}
        with ThreadPoolExecutor(max_workers=4) as pool:
            futures={pool.submit(export_tab,t):t for t in tabs}
            for f in as_completed(futures):
                result=f.result();results[result['id']]=result
                STATE.update(done=len(results),message=f'正在下載最新分頁：{len(results)} / {len(tabs)}')
        # Reject mixed versions if the document changes while exports are being fetched.
        end_tabs,end_revision=metadata(get(BASE+'edit?'+urlencode({'_':str(time.time_ns())})))
        if revision!=end_revision or tabs!=end_tabs:raise ValueError('下載期間文件有新修改，已保留舊版。請再按一次更新文件。')
        data={'documentId':DOC_ID,'revision':revision,'updatedAt':now(),'checkedAt':now(),'tabs':[results[t['id']] for t in tabs]}
        write_snapshot(data)
        STATE.update(message='已更新為 Google 文件最新版本',checkedAt=data['checkedAt'])
    except Exception as error:
        STATE.update(message='更新失敗，保留上次版本。'+str(error),error=True)
    finally:
        STATE['running']=False;LOCK.release()

def response_json(handler,payload,code=200):
    data=json.dumps(payload,ensure_ascii=False).encode('utf-8');handler.send_response(code);handler.send_header('Content-Type','application/json; charset=utf-8');handler.send_header('Cache-Control','no-store');handler.send_header('Content-Length',str(len(data)));handler.end_headers();handler.wfile.write(data)

class Handler(BaseHTTPRequestHandler):
    def log_message(self,*args):pass
    def do_GET(self):
        if self.headers.get('Host') not in {f'127.0.0.1:{PORT}',f'localhost:{PORT}'}:
            self.send_error(403);return
        path=urlsplit(self.path).path
        if path=='/api/status':response_json(self,dict(STATE));return
        if path=='/api/document':response_json(self,read_snapshot());return
        if path=='/api/identity':response_json(self,{'reader':DOC_ID});return
        files={'/':'index.html','/index.html':'index.html','/style.css':'style.css','/app.js':'app.js'}
        if path not in files:self.send_error(404);return
        data=(ROOT/files[path]).read_bytes();self.send_response(200)
        self.send_header('Content-Type',{'html':'text/html; charset=utf-8','css':'text/css; charset=utf-8','js':'application/javascript; charset=utf-8'}[files[path].split('.')[-1]])
        self.send_header('Cache-Control','no-store');self.send_header('Content-Length',str(len(data)));self.end_headers();self.wfile.write(data)
    def do_POST(self):
        if self.headers.get('Host') not in {f'127.0.0.1:{PORT}',f'localhost:{PORT}'}:
            self.send_error(403);return
        if self.headers.get('Origin') not in {None,f'http://127.0.0.1:{PORT}',f'http://localhost:{PORT}'}:
            self.send_error(403);return
        if self.path!='/api/sync':self.send_error(404);return
        if not STATE['running']:
            # Set immediately to make simultaneous open requests join the same update.
            STATE.update(running=True,message='正在確認 Google 文件版本…',error=False)
            threading.Thread(target=synchronize,daemon=True).start()
        response_json(self,dict(STATE))

def main():
    parser=argparse.ArgumentParser();parser.add_argument('--sync',action='store_true');parser.add_argument('--seed');parser.add_argument('--open',action='store_true');args=parser.parse_args()
    if args.sync:
        synchronize(args.seed,force=True);print(json.dumps(STATE,ensure_ascii=False));sys.exit(1 if STATE.get('error') else 0)
    try:server=ThreadingHTTPServer(('127.0.0.1',PORT),Handler)
    except OSError:
        try:
            identity=json.loads(get(f'http://127.0.0.1:{PORT}/api/identity'))
            if identity.get('reader')!=DOC_ID:raise ValueError('連接埠已由其他程式使用')
            if args.open:webbrowser.open(f'http://127.0.0.1:{PORT}/')
            return
        except Exception:raise RuntimeError('無法啟動閱讀器：連接埠已被使用')
    if args.open:threading.Timer(.5,lambda:webbrowser.open(f'http://127.0.0.1:{PORT}/')).start()
    server.serve_forever()
if __name__=='__main__':main()
