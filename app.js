/* ===== 主要資料：文字與圖片路徑都可在這裡替換 ===== */
const APP_TIME_ZONE='Asia/Taipei';
const MINUTE=60*1000;
const HOUR=60*MINUTE;
const DAY=24*HOUR;
const RELEASE={
  portrait:'2026-11-12T12:00:00+08:00',
  altPost:'2026-11-13T12:00:00+08:00',
  xiaAppointment:'2026-11-13T10:05:00+08:00',
  groupFilled:'2026-11-12T20:16:00+08:00',
  groupArrivedOne:'2026-11-13T13:55:00+08:00',
  groupArrivedTwo:'2026-11-13T13:58:00+08:00',
  groupPing:'2026-11-13T14:03:00+08:00',
  xiaReplyDeadline:'2026-11-13T23:00:00+08:00',
  lilithMessages:'2026-11-14T09:00:00+08:00',
  xiaEarly:'2026-11-14T10:48:00+08:00',
  museumExplosion:'2026-11-14T11:00:00+08:00'
};

function timeMs(value){return new Date(value).getTime()}
function hasArrived(value,now=Date.now()){return now>=timeMs(value)}
function dateInTaipei(value){
  const parts=new Intl.DateTimeFormat('en-CA',{timeZone:APP_TIME_ZONE,year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(new Date(value));
  const get=type=>parts.find(part=>part.type===type)?.value||'';
  return `${get('year')}-${get('month')}-${get('day')}`;
}
function formatPublishedTime(item,now=Date.now()){
  if(!item?.publishedAt)return item?.time||'';
  const published=timeMs(item.publishedAt);
  const diff=now-published;
  if(diff>=0){
    if(diff<MINUTE)return '剛剛';
    if(diff<HOUR)return `${Math.floor(diff/MINUTE)}分鐘`;
    if(diff<DAY)return `${Math.floor(diff/HOUR)}小時`;
    if(diff<7*DAY)return `${Math.floor(diff/DAY)}天`;
    return dateInTaipei(published);
  }
  const ahead=-diff;
  if(ahead<MINUTE)return '即將發布';
  if(ahead<HOUR)return `${Math.ceil(ahead/MINUTE)}分鐘後`;
  if(ahead<DAY)return `${Math.ceil(ahead/HOUR)}小時後`;
  if(ahead<30*DAY)return `${Math.ceil(ahead/DAY)}天後`;
  return `${Math.max(1,Math.round(ahead/(30*DAY)))}個月後`;
}
const PROFILE={name:'莉莉絲・凱特',handle:'lilith.kate',flag:'🇺🇸',location:'高譚',bio:'高譚人\n這裡的言論僅代表我個人。\n1994/08/21',tags:['#Gotham','#Democrats','#公共政策'],followers:'1,284',following:'156',avatar:'assets/avatar.webp'};
const ALT={name:'LH',handle:'LH5588812',avatar:'assets/person-alt.webp'};
const FOLLOWERS=[
 {name:'林七',handle:'lin_seven',bio:'偶爾拍照。',avatar:'assets/person-lin.svg'},
 {name:'雨停以前',handle:'before_rainstops',bio:'你說的不過是如果。',avatar:'assets/person-rain.svg'},
 {name:'無名',handle:'deleted_0826',bio:'',avatar:'assets/person-unknown.svg'},
 {name:'LH',handle:'LH5588812',bio:'好喜歡你。',avatar:'assets/person-alt.webp',isAlt:true},
 {name:'陳暮',handle:'muchen_26',bio:'Gotham',avatar:'assets/person-chen.svg'},
 {name:'73號',handle:'room_73',bio:'請勿敲門。',avatar:'assets/room_73.webp'},
 {name:'路過的人',handle:'passing_by',bio:'只是剛好看到。',avatar:'assets/passing.webp'},
 {name:'艾琳',handle:'erin_writes',bio:'城市裡的一個普通人。',avatar:'assets/avatar-2.svg'},
 {name:'M.',handle:'monday_morning',bio:'咖啡比政治可靠。',avatar:'assets/avatar-3.svg'},
 {name:'北邊的人',handle:'north_side_04',bio:'住在高譚北邊。',avatar:'assets/person-lin.svg'},
 {name:'喬治',handle:'george_w',bio:'偶爾評論市政。',avatar:'assets/person-chen.svg'},
 {name:'夜班記者',handle:'night_shift',bio:'還沒下班。',avatar:'assets/avatar-2.svg'},
 {name:'紙杯咖啡',handle:'paper_cup_01',bio:'每天都需要咖啡。',avatar:'assets/avatar-3.svg'},
 {name:'安娜',handle:'anna_in_gotham',bio:'在這座城市生活。',avatar:'assets/person-rain.svg'},
 {name:'老城區居民',handle:'old_gotham_resident',bio:'搬來很多年了。',avatar:'assets/person-chen.svg'},
 {name:'R.',handle:'r_after_work',bio:'下班之後才是人生。',avatar:'assets/avatar-2.svg'},
 {name:'七點半',handle:'seven_thirty',bio:'通常七點半起床。',avatar:'assets/avatar-3.svg'},
 {name:'不知道叫什麼',handle:'probably_nobody',bio:'如題。',avatar:'assets/person-unknown.svg'},
 {name:'觀察者',handle:'just_observing',bio:'看看而已。',avatar:'assets/person-lin.svg'},
 {name:'小湯姆',handle:'tom_from_gotham',bio:'本地居民。',avatar:'assets/avatar-2.svg'},
 {name:'瑪莎',handle:'martha_works',bio:'工作中，勿擾。',avatar:'assets/works.webp'},
 {name:'紙上談兵',handle:'on_paper_only',bio:'我只負責提出問題。',avatar:'assets/person-rain.svg'},
 {name:'南邊來的',handle:'from_the_south',bio:'偶爾來市中心。',avatar:'assets/person-chen.svg'},
 {name:'咖啡第二杯',handle:'coffee_second',bio:'第一杯已經喝完了。',avatar:'assets/avatar-2.svg'},
 {name:'伊森',handle:'ethan_works',bio:'城市、工作、睡眠。',avatar:'assets/avatar-3.svg'},
 {name:'晚安高譚',handle:'goodnight_gotham',bio:'晚上比較清醒。',avatar:'assets/person-lin.svg'},
 {name:'小報讀者',handle:'tabloid_reader',bio:'我只是看看新聞。',avatar:'assets/tabloid_reader.webp'},
 {name:'沒有暱稱',handle:'no_nickname_here',bio:'',avatar:'assets/person-unknown.svg'},
 {name:'星期三',handle:'wednesday_person',bio:'不是每個星期三都一樣。',avatar:'assets/avatar-2.svg'},
 {name:'城市邊緣',handle:'edge_of_city',bio:'離市中心很遠。',avatar:'assets/avatar-3.svg'},
 {name:'阿德',handle:'ade_gotham',bio:'今天也在上班。',avatar:'assets/person-chen.svg'},
 {name:'看熱鬧的',handle:'just_here_for_this',bio:'沒有立場。',avatar:'assets/person-lin.svg'},
 {name:'舊報紙',handle:'old_newspaper',bio:'昨天的新聞也是新聞。',avatar:'assets/old_newspaper.webp'},
 {name:'白噪音',handle:'white_noise_g',bio:'保持安靜。',avatar:'assets/avatar-3.svg'},
 {name:'米亞',handle:'mia_afterfive',bio:'五點以後才是我的時間。',avatar:'assets/mia.webp'},
 {name:'湯姆森',handle:'thomson_g',bio:'住在河邊。',avatar:'assets/thomson_g.webp'},
 {name:'小雨',handle:'rainy_window',bio:'今天也在下雨。',avatar:'assets/rainy_window.webp'},
 {name:'沒有新聞',handle:'no_news_today',bio:'希望今天沒有新聞。',avatar:'assets/avatar-3.svg'},
 {name:'艾倫',handle:'alan_corner',bio:'城市觀察。',avatar:'assets/person-lin.svg'},
 {name:'南區居民',handle:'southside_local',bio:'南區生活紀錄。',avatar:'assets/southside_local.webp'},
 {name:'老麥',handle:'old_mack_g',bio:'這城市比我年輕。',avatar:'assets/old_mack_g.webp'},
 {name:'卡洛',handle:'carlo_notes',bio:'一些城市雜記。',avatar:'assets/avatar-2.svg'},
 {name:'蘇菲',handle:'sophie_park',bio:'拍照、散步、咖啡。',avatar:'assets/sophie_park.webp'},
 {name:'布朗先生',handle:'mr_brown_g',bio:'退休之後比較有時間。',avatar:'assets/mr_brown_g.webp'},
 {name:'不想上班',handle:'dont_wanna_work',bio:'每天都在努力。',avatar:'assets/person-rain.svg'},
 {name:'報紙角落',handle:'corner_of_paper',bio:'每天看一點新聞。',avatar:'assets/person-unknown.svg'},
 {name:'傑克',handle:'jack_around_g',bio:'高譚本地人。',avatar:'assets/avatar-2.svg'},
 {name:'艾蜜莉',handle:'emily_gotham',bio:'偶爾發牢騷。',avatar:'assets/avatar-3.svg'},
 {name:'半夜三點',handle:'three_am_again',bio:'又睡不著。',avatar:'assets/person-chen.svg'},
 {name:'城市居民A',handle:'gotham_citizen_a',bio:'普通市民。',avatar:'assets/person-lin.svg'},
 {name:'城市居民B',handle:'gotham_citizen_b',bio:'沒有什麼好介紹的。',avatar:'assets/person-rain.svg'},
 {name:'老朋友',handle:'old_friend_g',bio:'認識一些人，也認識一些事。',avatar:'assets/person-chen.svg'}
];

const FOLLOWING=[
 {name:'73號',handle:'room_73',bio:'請勿敲門。',avatar:'assets/room_73.webp'},
 {name:'路過的人',handle:'passing_by',bio:'只是剛好看到。',avatar:'assets/passing.webp'},
 {name:'林七',handle:'lin_seven',bio:'偶爾拍照。',avatar:'assets/person-lin.svg'},
 {name:'雨停以前',handle:'before_rainstops',bio:'你說的不過是如果。',avatar:'assets/person-rain.svg'},
 {name:'陳暮',handle:'muchen_26',bio:'Gotham',avatar:'assets/person-chen.svg'},
 {name:'艾琳',handle:'erin_writes',bio:'城市裡的一個普通人。',avatar:'assets/avatar-2.svg'},
 {name:'夜班記者',handle:'night_shift',bio:'還沒下班。',avatar:'assets/avatar-2.svg'},
 {name:'安娜',handle:'anna_in_gotham',bio:'在這座城市生活。',avatar:'assets/person-rain.svg'},
 {name:'R.',handle:'r_after_work',bio:'下班之後才是人生。',avatar:'assets/avatar-3.svg'},
 {name:'晚安高譚',handle:'goodnight_gotham',bio:'晚上比較清醒。',avatar:'assets/person-lin.svg'},
 {name:'米亞',handle:'mia_afterfive',bio:'五點以後才是我的時間。',avatar:'assets/mia.webp'},
 {name:'湯姆森',handle:'thomson_g',bio:'住在河邊。',avatar:'assets/thomson_g.webp'},
 {name:'艾倫',handle:'alan_corner',bio:'城市觀察。',avatar:'assets/person-lin.svg'},
 {name:'蘇菲',handle:'sophie_park',bio:'拍照、散步、咖啡。',avatar:'assets/sophie_park.webp'},
 {name:'卡洛',handle:'carlo_notes',bio:'一些城市雜記。',avatar:'assets/avatar-2.svg'},
 {name:'舊報紙',handle:'old_newspaper',bio:'昨天的新聞也是新聞。',avatar:'assets/old_newspaper.webp'},
 {name:'老城區居民',handle:'old_gotham_resident',bio:'搬來很多年了。',avatar:'assets/person-chen.svg'},
 {name:'看熱鬧的',handle:'just_here_for_this',bio:'沒有立場。',avatar:'assets/avatar-3.svg'},
 {name:'老朋友',handle:'old_friend_g',bio:'認識一些人，也認識一些事。',avatar:'assets/person-chen.svg'},
 {name:'沒有新聞',handle:'no_news_today',bio:'希望今天沒有新聞。',avatar:'assets/avatar-2.svg'}
];

const NEWS_POST={
  id:'news-lilith-entry',
  handle:'gotham_daily',
  avatar:'assets/GOTHAM.webp',
  time:'2026-3-15',
  headline:'布魯斯．韋恩獲救　希爾市長移送法辦',
  text:'韋恩企業董事長布魯斯．韋恩，昨夜於都奈橋建成周年紀念晚會遭到高譚市市長漢密爾頓．希爾脅持，好在最終高譚市義警們即時現身，事件才有驚無險的落幕。警方證實韋恩目前狀況穩定，已接受醫療檢查。\n\n同日晚間，高譚市長漢密爾頓．希爾遭警方拘捕，經偵訊後正式移送法辦，市政府已宣布啟動代理程序。據悉，在救援行動中取得多項關鍵證據，內容疑似涉及貪污和人體器官販賣等其他非法行動，目前已交由警方與檢方調查。\n\n檢方表示相關證據仍待進一步釐清，案件後續如何發展、希爾是否遭正式起訴，以及市府內部是否存在更多涉案人士，仍有待司法程序逐一確認。',
  clues:[
  {
    title:'布魯斯．韋恩被希爾市長脅持',
    text:'今年初的報導裡，布魯斯在都奈橋晚會上被希爾市長脅持後被解救。'
  },
  {
    title:'漢米爾頓．希爾',
    text:'高譚市長；疑似涉及貪汙和人體器官販賣等非法行動。'
  }
  ],
  likes:18943,reposts:2841,shares:1607,
  replies:[
    {handle:'martha_works',avatar:'assets/works.webp',text:'希爾市長無罪！！！！高譚日報是共和黨的狗吧？？',likes:227,reposts:18,shares:3},
    {handle:'thomson_g',avatar:'assets/thomson_g.webp',text:'都被警方移送了還無罪，支持者到底要裝瞎到什麼時候？',likes:615,reposts:47,shares:12},
    {handle:'sophie_park',avatar:'assets/sophie_park.webp',text:'移送又不是判刑！講得像已經定罪一樣。',likes:438,reposts:31,shares:8},
    {handle:'allen_watch',avatar:'assets/allen_watch.webp',text:'現場那麼多人都看到希爾脅持韋恩了，還需要公開什麼？',likes:782,reposts:66,shares:19},
    {handle:'citizen_404',avatar:'assets/citizen_404.webp',text:'到底是現場哪些人看到？我也說我在現場好不好？沒圖沒真相啦！',likes:391,reposts:22,shares:5},
    {handle:'george_news',avatar:'assets/george_news.webp',text:'欸我真的在現場。夜翼、紅頭罩和羅賓他們衝進去之後，警方才把希爾帶走。\n附上一張現場圖！',image:'assets/NEWS01.webp',likes:1264,reposts:153,shares:87},
    {handle:'lucy_says',avatar:'assets/lucy_says.webp',text:'蒙面義警闖進市府晚會、控制民選市長，大家居然沒有反應？',likes:317,reposts:29,shares:7},
    {handle:'william_w',avatar:'assets/william_w.webp',text:'他們救了一個被脅持的人，現場也有警方在場。不要講得像義警政變好嗎?',likes:694,reposts:54,shares:16},
	{handle:'mark_truth',avatar:'assets/mark_truth.webp',text:'照片右下那位被綁著的人是布魯斯韋恩嗎？',likes:121,reposts:18,shares:1},
    {handle:'tabloid_reader',avatar:'assets/tabloid_reader.webp',text:'哇，人體器官販賣？？這比昨天報紙寫的還誇張。',likes:843,reposts:71,shares:24},
    {handle:'paul_cityhall',avatar:'assets/paul_cityhall.webp',text:'報導只說疑似涉及啦。先等檢方調查好嗎。',likes:529,reposts:38,shares:9},
    {handle:'southside_auntie',avatar:'assets/southside_auntie.webp',text:'希爾上任以後南區明明改善很多，我不相信他會做這種事！',likes:284,reposts:16,shares:3},
    {handle:'mark_truth',avatar:'assets/mark_truth.webp',text:'蝙蝠俠萬歲！',likes:911,reposts:79,shares:21},
    {handle:'kate_k',avatar:'assets/kate_k.webp',text:'蝙蝠俠這次根本沒出現好嗎？',likes:358,reposts:27,shares:4},
    {handle:'jack_in_city',avatar:'assets/jack_in_city.webp',text:'市長本人在公開場合脅持人，這就值得被關了吧？',likes:746,reposts:61,shares:13},
    {handle:'lisa_coffee',avatar:'assets/lisa_coffee.webp',text:'有沒有人知道市府代理程序會由誰接任？新聞怎麼完全沒寫。',likes:201,reposts:12,shares:2},
    {handle:'david_question',avatar:'assets/david_question.webp',text:'我比較想知道其他涉案人士是誰。不可能只有希爾一個人吧？',likes:573,reposts:48,shares:11},
    {handle:PROFILE.handle,avatar:PROFILE.avatar,profileLink:true,likeId:'reply1',text:'目前一切還在偵查中，請不要做過多猜測。',likes:46,reposts:2,shares:0},
    {handle:'sarah_here',avatar:'assets/sarah_here.webp',text:'所以現在是由副市長代理嗎。',likes:286,reposts:24,shares:6},
    {handle:'nick_no_filter',avatar:'assets/nick_no_filter.webp',text:'完了，今年底里夫斯的當選大概已經確定了，我對未來感到絕望。',likes:402,reposts:37,shares:9},
    {handle:'helen_home',avatar:'assets/helen_home.webp',text:'里夫斯很好吧？至少長的蠻帥的啊。',likes:377,reposts:25,shares:5},
    {handle:'paperboy_7',avatar:'assets/paperboy_7.webp',text:'今天所有報紙都賣光了，下午的增刊也沒剩幾份！',likes:538,reposts:48,shares:11},
    {handle:'mr_brown_g',avatar:'assets/mr_brown_g.webp',text:'留友看，帥真的可以當飯吃。',likes:421,reposts:34,shares:8},
    {handle:'mia_afterfive',avatar:'assets/mia.webp',text:'有人有懶人包嗎？話說上面是不是有個人是市府幕僚？',likes:263,reposts:18,shares:4},
    {handle:'oldtown_resident',avatar:'assets/oldtown_resident.webp',text:'都奈橋蓋這麼多年沒蓋好原來都是因為官商勾結。',likes:514,reposts:53,shares:18}
  ]
};

const NEWS_PROFILE={name:'高譚日報',handle:'gotham_daily',avatar:'assets/GOTHAM.webp'};
const NEWS_RECENT_POSTS=[
  {
    id:'news-1111-transit',
    publishedAt:'2026-11-11T11:45:00+08:00',
    handle:NEWS_PROFILE.handle,
    avatar:NEWS_PROFILE.avatar,
    time:'15分鐘',
    headline:'中央線號誌異常　部分班次延誤',
    text:'高譚捷運中央線今日傍晚發生號誌異常，部分班次延誤約四十分鐘。交通局表示系統已陸續恢復，仍請旅客預留候車時間。',
    likes:1268,reposts:184,shares:63,
    replies:[]
  },
	{
	  id:'news-1110-veterans',
	  publishedAt:'2026-11-10T12:00:00+08:00',
	  handle:NEWS_PROFILE.handle,
	  avatar:NEWS_PROFILE.avatar,
	  time:'1天',
	  headline:'退伍軍人節紀念活動明日舉行　市政廣場周邊實施管制',
	  text:'高譚市政府宣布，退伍軍人節紀念活動將於明日上午在市政廣場舉行。活動期間周邊部分道路將分階段封閉，市府呼籲民眾提前改道或搭乘大眾運輸工具。',
	  likes:1943,reposts:337,shares:142,
	  replies:[]
	},
	{
	  id:'news-1109-thanksgiving',
	  publishedAt:'2026-11-09T12:00:00+08:00',
	  handle:NEWS_PROFILE.handle,
	  avatar:NEWS_PROFILE.avatar,
	  time:'2天',
	  headline:'感恩節送餐計畫開放登記　十二處社區中心募集物資',
	  text:'高譚市十二處社區中心即日起開放感恩節餐點登記，並募集罐頭、保暖衣物與日常用品。市府表示，今年將優先協助獨居長者、低收入家庭及臨時安置居民。',
	  likes:2156,reposts:672,shares:318,
	  replies:[]
	},
  {
    id:'news-1108-museum',
    publishedAt:'2026-11-08T12:00:00+08:00',
    handle:NEWS_PROFILE.handle,
    avatar:NEWS_PROFILE.avatar,
    time:'3天',
	headline:'高譚市立博物館深秋特展　本週末開幕',
	text:'高譚市立博物館深秋特展將於本週末開幕，展出多件城市早期建設圖紙、歷史照片與私人收藏。開幕首日將延長開放至晚間九時，館外廣場另設熱飲與舊書攤位。',
    likes:1874,reposts:293,shares:126,
    replies:[]
  },
  {
    id:'news-1107-wayne',
    publishedAt:'2026-11-07T12:00:00+08:00',
    handle:NEWS_PROFILE.handle,
    avatar:NEWS_PROFILE.avatar,
    time:'4天',
    headline:'韋恩基金會擴大獎學金計畫　新增技職學生名額',
    text:'韋恩基金會宣布擴大年度獎學金計畫，除原有大學與研究所名額外，今年將新增技職學生與在職進修申請類別。',
    likes:3642,reposts:521,shares:204,
    replies:[]
  },
  {
    id:'news-1106-market',
    publishedAt:'2026-11-06T12:00:00+08:00',
    handle:NEWS_PROFILE.handle,
    avatar:NEWS_PROFILE.avatar,
    time:'5天',
    headline:'港區週末市集回歸　周邊道路實施交通管制',
    text:'港區週末市集將於本週六重新開放，活動期間周邊部分道路禁止車輛進入。主辦單位建議民眾搭乘大眾運輸工具前往。',
    likes:1537,reposts:248,shares:97,
    replies:[]
  },
  {
    id:'news-1105-budget',
    publishedAt:'2026-11-05T12:00:00+08:00',
    handle:NEWS_PROFILE.handle,
    avatar:NEWS_PROFILE.avatar,
    time:'6天',
    headline:'市議會審查今年度預算　治安與交通支出成焦點',
    text:'高譚市議會預計於今日審查完畢今年度總預算，自九月開始審查以來，已經歷三個月，治安、公共交通及舊城區基礎建設支出成為本次會期主要討論話題。另在野黨凍結項目已成矚目焦點。',
    likes:2318,reposts:486,shares:173,
    replies:[]
  },
  {
    id:'news-1104-power',
    publishedAt:'2026-11-04T12:00:00+08:00',
    handle:NEWS_PROFILE.handle,
    avatar:NEWS_PROFILE.avatar,
    time:'7天',
    headline:'東區晚間短暫停電　電力公司稱設備故障',
    text:'東區部分街區昨晚發生短暫停電，影響時間約四十分鐘。電力公司表示事故由區域設備故障引起，目前供電已全面恢復。',
    likes:1749,reposts:302,shares:111,
    replies:[]
  },
  {
    id:'news-1103-weather',
    handle:NEWS_PROFILE.handle,
    avatar:NEWS_PROFILE.avatar,
    time:'2026-11-03',
    headline:'高譚本週持續降雨　沿海地區留意強風',
    text:'氣象中心預估高譚本週受鋒面影響，降雨機率持續偏高，沿海及港區可能出現較強陣風，提醒市民外出攜帶雨具。',
    likes:1083,reposts:167,shares:58,
    replies:[]
  }
];
const NEWS_PROFILE_POSTS=[
  {id:'news-0314-night',handle:NEWS_PROFILE.handle,avatar:NEWS_PROFILE.avatar,time:'2026-3-14',headline:'都奈橋周年晚會突發騷亂　警方封鎖現場',text:'都奈橋建成周年紀念晚會晚間發生騷亂，警方已封鎖會場周邊道路，並呼籲市民暫時避開該區。現場情況仍待進一步確認。',likes:7632,reposts:1128,shares:604,replies:[]},
  {id:'news-0314-bridge',handle:NEWS_PROFILE.handle,avatar:NEWS_PROFILE.avatar,time:'2026-3-14',headline:'都奈橋建成周年　市府晚間舉行紀念晚會',text:'都奈橋今日迎來建成周年，市政府晚間將舉行紀念晚會。市長漢密爾頓．希爾、前議員里夫斯及韋恩企業董事長布魯斯．韋恩預計出席。',likes:1843,reposts:221,shares:96,replies:[]},
  {id:'news-0313-transit',handle:NEWS_PROFILE.handle,avatar:NEWS_PROFILE.avatar,time:'2026-3-13',headline:'中央線號誌異常　尖峰時段延誤近半小時',text:'高譚捷運中央線今晨因號誌異常一度停駛，尖峰時段多座車站出現候車人潮，交通局表示系統已於上午九時恢復正常。',likes:921,reposts:138,shares:44,replies:[]},
  {id:'news-0312-hospital',handle:NEWS_PROFILE.handle,avatar:NEWS_PROFILE.avatar,time:'2026-3-12',headline:'高譚綜合醫院擴建案通過　預計明年動工',text:'市議會昨日通過高譚綜合醫院擴建預算，院方表示新增院區將以急重症與兒童醫療為主，預計明年第一季動工。',likes:1377,reposts:186,shares:71,replies:[]},
  {id:'news-0311-port',handle:NEWS_PROFILE.handle,avatar:NEWS_PROFILE.avatar,time:'2026-3-11',headline:'港區倉庫深夜失火　無人傷亡',text:'高譚港第七码頭一處廢棄倉庫昨夜發生火警，消防局於兩小時內控制火勢，現場無人傷亡，起火原因仍在調查。',likes:2204,reposts:417,shares:183,replies:[]},
  {id:'news-0310-missing',handle:NEWS_PROFILE.handle,avatar:NEWS_PROFILE.avatar,time:'2026-3-10',headline:'東區再傳失蹤案件　警方籲勿散播未證實消息',text:'東區近日接連傳出人口失蹤通報，警方表示目前尚無證據顯示案件彼此相關，已成立專案小組調查。',likes:4862,reposts:973,shares:515,replies:[]},
  {id:'news-0309-election',handle:NEWS_PROFILE.handle,avatar:NEWS_PROFILE.avatar,time:'2026-3-9',headline:'市議會選區重劃案進入二讀　朝野仍無共識',text:'高譚市議會今日審議選區重劃草案，兩黨議員針對人口基準與行政區邊界持續交鋒，表決日期尚未確定。',likes:1108,reposts:264,shares:73,replies:[]},
  {id:'news-0308-wayne',handle:NEWS_PROFILE.handle,avatar:NEWS_PROFILE.avatar,time:'2026-3-8',headline:'韋恩基金會宣布增設三處社區醫療站',text:'韋恩基金會宣布將於南區與舊城區增設三處社區醫療站，提供基礎診療、心理諮詢與夜間急診轉介服務。',likes:3561,reposts:521,shares:202,replies:[]},
  {id:'news-0307-arkham',handle:NEWS_PROFILE.handle,avatar:NEWS_PROFILE.avatar,time:'2026-3-7',headline:'市長選戰白熱化：里夫斯捲入謀殺疑雲，希爾支持度上升',text:'隨著市長大選進入最後倒數階段，民意中心最新公布數據顯示在《重生計畫》推出後，現任市長「漢密爾頓·希爾」的民調在過去一週意外回升，而其最大競爭對手——以年輕、清廉的形象而受到市民青睞的「亞瑟·里夫斯」議員，卻因導演馬丁·坎貝爾遇害而深陷爭議。\n警方至今仍不排除里夫斯涉案的可能性，檢察官辦公室則表示將全力調查，不容任何人置身於法律之外。',likes:638,reposts:102,shares:31,replies:[{handle:NEWS_PROFILE.handle,avatar:NEWS_PROFILE.avatar,isAuthor:true,text:'然而坊間輿論，有不少聲音認為這起案件背後可能另有隱情。是有人刻意栽贓，還是政治操作？\n另一方面，希爾陣營則趁勢強化「穩定延續」的口號，強調他在城市建設與治安維護方面的「政績」。雖然外界長期質疑他與某些財團及黑幫勢力關係曖昧，但希爾本人始終予以否認，並在頻繁公開場合表達「一切都是為了更偉大的利益」。\n隨著最後一輪民調的截止，哥譚市選戰進入最緊繃的關頭。支持率的拉鋸、命案的真相，以及背後交錯的利益網絡，無不牽動著市民的未來。這場選戰將如何結束，尚無定論。',likes:23,reposts:0,shares:0}]},
  {id:'news-0306-weather',handle:NEWS_PROFILE.handle,avatar:NEWS_PROFILE.avatar,time:'2026-3-6',headline:'冷鋒晚間抵達　高譚未來三日持續降雨',text:'氣象中心預估冷鋒將於今日晚間抵達，高譚未來三日降雨機率偏高，沿海地區並可能出現強風。',likes:847,reposts:119,shares:52,replies:[]},
  {id:'news-0227-arkham',handle:NEWS_PROFILE.handle,avatar:NEWS_PROFILE.avatar,time:'2026-2-27',headline:'韋恩次子傑森·陶德·韋恩復出追蹤報導，股價波動恐影響資本市場',text:'日前韋恩企業（Wayne Enterprises）執行長布魯斯·韋恩（Bruce Wayne）在記者會上證實，曾被報導於數年前不幸喪生的次子傑森·陶德·韋恩（Jason Todd Wayne），事實上在當年意外後奇蹟生還，並接受長期海外療養，現已康復回國。\n',likes:1240,reposts:58,shares:12,replies:[{handle:NEWS_PROFILE.handle,avatar:NEWS_PROFILE.avatar,isAuthor:true,text:'這一消息震驚社會各界之餘，也迅速在資本市場引發連鎖反應。韋恩企業自消息公佈當天起股價波動劇烈，盤中一度下挫3.8%，收盤時小幅回升，跌幅收斂至1.2%。\n市場分析師指出，雖然傑森·陶德本身未直接涉入韋恩企業的管理層或財務決策，但作為家族成員的身份，使得部分投資人對「企業治理結構的透明度」產生疑慮。著名投資機構安格羅資本（Anglo Capital）於聲明中指出：\n「管理層多年隱瞞家族成員狀況，或許出於人道理由，但對股東而言，任何資訊不對稱都可能構成潛在風險。我們建議持續觀察韋恩企業後續治理動態。」',likes:43,reposts:5,shares:2},{handle:NEWS_PROFILE.handle,avatar:NEWS_PROFILE.avatar,isAuthor:true,text:'另一方面，私人財富管理界則持不同看法。哥譚市著名的高資產顧問機構普倫金融（Prynn Financial）認為，此舉有望穩固市場對韋恩家族繼承鏈的信心：\n「過去市場對韋恩家族未來的穩定性略有擔憂。傑森·陶德的復出，若能逐步參與慈善或家族基金業務，反而可能強化外界對企業的正面觀感。」\n同時，坊間亦流傳著關於傑森·陶德未來角色的各種猜測：有不具名人士稱布魯斯．韋恩對他的愧疚及溺愛將讓傑森成為最有可能取代德雷克．韋恩之地位的養子。然而，韋恩企業官方目前僅回應稱：「傑森先生將專注於私人康復計畫，目前無意涉入公司事務。」\n在哥譚這座城市，家族、資本與公眾形象從來無法徹底分離。傑森·陶德的重生，不只是家族的私事，也是市場的預警訊號。未來數月內，韋恩企業若無法有效釋疑、穩住敘事權，仍可能面臨外部董事壓力、內部重組呼聲，甚至被對手企業藉機施壓。',likes:43,reposts:5,shares:2}]},
  {id:'news-0214-arkham',handle:NEWS_PROFILE.handle,avatar:NEWS_PROFILE.avatar,time:'2026-2-14',headline:'韋恩大廈臨時召開了記者會，首次公開次子傑森·陶德·韋恩復出',text:'在過去數年間，韋恩家族次子的死亡一直被哥譚社會視為「不願提及的傷痛」，如今卻迎來了驚人的戲劇性反轉——曾被官方報導為「不幸車禍喪命」的傑森·陶德·韋恩（Jason Todd Wayne），在本週初意外公開露面，並由其父親、韋恩企業執行長布魯斯·韋恩親自證實其身分，震撼整座城市。\n',likes:638,reposts:102,shares:31,replies:[{handle:NEWS_PROFILE.handle,avatar:NEWS_PROFILE.avatar,isAuthor:true,text:'今日清晨，韋恩大廈臨時召開了記者會，吸引了眾多媒體與公眾的關注。布魯斯·韋恩以異常低沉而堅定的語氣，首度就次子事件發表正式聲明：\n「多年來，我選擇了沉默，因為我相信我的兒子值得一個完整康復的機會，遠離聚光燈。事實上，傑森在那場意外中重傷未亡。我們當時選擇將他送往海外接受長期治療與重建，而非公佈真相。我承認，這是一個艱難的決定，也是出於父親本能的保護。',likes:13,reposts:5,shares:6},
  {handle:NEWS_PROFILE.handle,avatar:NEWS_PROFILE.avatar,isAuthor:true,text:'如今，他已準備好回到哥譚，重新找到自己的位置。」\n這番話一經公開，立刻引發了社交媒體與各大新聞頻道的熱烈討論。哥譚市民的情緒複雜，有人為韋恩家的奇蹟重聚感動落淚，也有人質疑多年的誤導是否應當給出更多解釋。\n根據多方消息來源證實，傑森當年確曾因一起涉及罪犯「小丑」的交通意外而重傷昏迷，該起事件一度引起社會轟動，卻因種種原因始終未能釐清全貌。當年韋恩家僅發布一紙簡短聲明，稱「悲痛失去至親」，自此不再對外說明。多年來，各種揣測與陰謀論甚囂塵上，如今真相的一角終於被揭開，卻也引來更多關於事故背後細節的關注。',likes:73,reposts:4,shares:1},
  {handle:NEWS_PROFILE.handle,avatar:NEWS_PROFILE.avatar,isAuthor:true,text:'目前，傑森·陶德·韋恩本人尚未對外發表任何聲明，亦未恢復參與任何企業、基金會或公共活動。然而，據一位不願具名的韋恩企業內部人士透露，公司高層已經開始策劃一項以傑森名義設立的青少年庇護中心，目標是為經歷過暴力、失家或心理創傷的年輕人提供支持與重建機會，象徵著傑森將以自己的方式回應這段痛苦過往。\n此外，韋恩家族的律師團隊也正在研擬相關聲明，對於過去的資訊處理以及未來的媒體合作方向進行調整，以求在尊重個人隱私與滿足公眾知情權之間取得平衡。\n布魯斯·韋恩最後亦於記者會中動情表示：\n「他是我的兒子，無論過去經歷了什麼，他永遠都是。這座城市給了我們無盡的挑戰，但我相信，哥譚也能給予第二次生命一次真正的機會。」\n本報將持續關注傑森·陶德·韋恩的復出動向，並追蹤哥譚社會對這一新篇章的各方回應與未來發展。',likes:23,reposts:0,shares:0}]}
];

const POSTS=[
  {
    id:'p1',
    publishedAt:'2026-11-11T10:00:00+08:00',
    handle:PROFILE.handle,
    time:'2小時',
    text:'今天下午突然很認真地思考了一件事\n工作究竟代表什麼，是為了錢，還是生活的意義。',
    likes:418,reposts:29,shares:7,
    replies:[
      {handle:'room_73',avatar:'assets/room_73.webp',text:'你上班上瘋了吧，哈哈。',likes:16,reposts:1,shares:0,ownerLiked:true},
      {handle:PROFILE.handle,avatar:PROFILE.avatar,isAuthor:true,text:'唉。',likes:73,reposts:4,shares:1}
    ]
  },

  {
    id:'p2',
    publishedAt:'2026-11-10T12:00:00+08:00',
    handle:PROFILE.handle,
    time:'1天',
    text:'整理衣櫃，把大衣都拿出來了。\n怎麼這麼多衣服。',
    likes:362,reposts:27,shares:6,
    replies:[
      {handle:'passing_by',avatar:'assets/passing.webp',text:'高譚最近晚上真的變冷了。',likes:21,reposts:2,shares:0},
      {handle:PROFILE.handle,avatar:PROFILE.avatar,isAuthor:true,text:'是啊。',likes:48,reposts:2,shares:1}
    ]
  },

  {
    id:'p3',
    publishedAt:'2026-11-08T12:00:00+08:00',
    handle:PROFILE.handle,
    time:'3天',
    text:'晚上經過都奈橋。\n現在都要拆了嗎。',
    likes:591,reposts:43,shares:12,
    replies:[
      {handle:'summer058',avatar:'assets/summer058.webp',text:'畢竟有可能有安全疑慮？',likes:18,reposts:1,shares:0},
      {handle:PROFILE.handle,avatar:PROFILE.avatar,isAuthor:true,text:'是啊，只是很感嘆。',likes:84,reposts:5,shares:2}
    ]
  },


  {
    id:'p6',
    publishedAt:'2026-10-28T12:00:00+08:00',
    handle:PROFILE.handle,
    time:'2週',
    text:'有人問我為什麼最近幾乎不談現在的工作。\n因為現在這份工作不太算是鎂光燈下的工作。\n沒什麼好一直說的。',
    likes:831,reposts:47,shares:15,
    replies:[
      {handle:'passing_by',avatar:'assets/passing.webp',text:'但妳以前真的很常發工作的事情耶。',likes:34,reposts:3,shares:1},
      {handle:PROFILE.handle,avatar:PROFILE.avatar,isAuthor:true,text:'因為那時候的工作也確實蠻有意思的。',likes:107,reposts:7,shares:2}
    ]
  },

  
  {
    id:'p10',
    publishedAt:'2026-09-11T12:00:00+08:00',
    handle:PROFILE.handle,
    time:'2個月',
    text:'最近開始正常吃早餐。\n以前早上不是趕會議就是趕車，早餐通常在路上解決。\n今天坐下來慢慢吃完，突然覺得這件事以前好像很奢侈。',
    likes:537,reposts:34,shares:8,
    replies:[
      {handle:'room_73',avatar:'assets/room_73.webp',text:'妳以前到底幾點開始上班？',likes:18,reposts:1,shares:0},
      {handle:PROFILE.handle,avatar:PROFILE.avatar,isAuthor:true,text:'不想回憶。',likes:77,reposts:5,shares:1}
    ]
  },


  {
    id:'p14',
    handle:PROFILE.handle,
    time:'2026-3-16',
    text:'最近收到大家很多的訊息，謝謝大家。\n我已經正式從民主黨市府幕僚這份工作離職。\n感謝各界的關心。',
	clueTitle:'市長犯罪',
    clue:'市長在晚宴上爆出醜聞，被夜翼等人當眾逮捕。',
    likes:5718,reposts:54,shares:816,
    replies:[
      {handle:'martha_works',avatar:'assets/works.webp',text:'希爾市長無罪！！！！',likes:27,reposts:1,shares:0},
      {handle:'sophie_park',avatar:'assets/sophie_park.webp',text:'希爾市長不可能犯罪！。',likes:119,reposts:8,shares:2},
	  {handle:'thomson_g',avatar:'assets/thomson_g.webp',text:'希爾王八蛋背信棄義！',likes:85,reposts:2,shares:0},
      {handle:'tabloid_reader',avatar:'assets/tabloid_reader.webp',text:'報紙上說的都是真的嗎？？天啊。',likes:128,reposts:6,shares:0},
	  {handle:'mia_afterfive',avatar:'assets/mia.webp',text:'希爾市長沒有錯！！',likes:150,reposts:1,shares:2},
      {handle:'mr_brown_g',avatar:'assets/mr_brown_g.webp',text:'哇這邊太精采了吧，留友看。',likes:58,reposts:7,shares:3},
	  {handle:'anna_552',avatar:'assets/anna_552.webp',text:'希爾市長無罪！那些報導根本沒有證據！',likes:96,reposts:4,shares:1},
	  {handle:'jack_in_city',avatar:'assets/jack_in_city.webp',text:'都爆出這麼多事情了，還有人相信他？',likes:143,reposts:11,shares:3},
	  {handle:'kate_k',avatar:'assets/kate_k.webp',text:'一張報紙寫什麼你們就信什麼，也太好操弄了吧。',likes:87,reposts:5,shares:0},
	  {handle:'oldtown_resident',avatar:'assets/oldtown_resident.webp',text:'我住這裡二十年了，希爾上任後城市明明變得更好。',likes:171,reposts:13,shares:5},
	  {handle:'allen_watch',avatar:'assets/allen_watch.webp',text:'蝙蝠俠都把他抓走了，相信蝙蝠俠。',likes:204,reposts:18,shares:4},
	  {handle:'lucy_says',avatar:'assets/lucy_says.webp',text:'蝙蝠俠才是社會亂源！',likes:118,reposts:7,shares:2},
	  {handle:'george_news',avatar:'assets/george_news.webp',text:'嚴格來說，逮捕他的是夜翼和紅頭罩跟羅賓們，\n英雄大集結！我在現場！',likes:775,reposts:13,shares:152},
	  {handle:'citizen_404',avatar:'assets/citizen_404.webp',text:'笑死，報紙寫了就一定是真的？記者從來不會說謊是不是？',likes:189,reposts:16,shares:3},
	  {handle:'helen_home',avatar:'assets/helen_home.webp',text:'你要不要自己出來選?',likes:131,reposts:6,shares:1},
	  {handle:'william_w',avatar:'assets/william_w.webp',text:'希望蝙蝠俠趕快把希爾送進監獄。',likes:156,reposts:12,shares:4},
	  {handle:'lisa_coffee',avatar:'assets/lisa_coffee.webp',text:'蝙蝠俠只負責抓人\n送進監獄是檢察官的事啦，你是法盲喔？',likes:102,reposts:5,shares:2},
	  {handle:'mark_truth',avatar:'assets/mark_truth.webp',text:'做過好事就能偷工減料？他還脅持布魯斯韋恩耶，這是什麼邏輯？',likes:220,reposts:21,shares:7},
	  {handle:'southside_auntie',avatar:'assets/southside_auntie.webp',text:'我不管你們怎麼說，反正我相信希爾市長！',likes:64,reposts:2,shares:0},
	  {handle:'david_question',avatar:'assets/david_question.webp',text:'所以這樣希爾會和柯波特成為獄友嗎？',likes:147,reposts:9,shares:2},
	  {handle:'jenny_j',avatar:'assets/jenny_j.webp',text:'哈哈你們自己選的，留友看民主黨支持者崩潰。',likes:198,reposts:14,shares:5},
	  {handle:'paul_cityhall',avatar:'assets/paul_cityhall.webp',text:'都是經濟罪犯，還真的有可能關在一起。',likes:91,reposts:5,shares:1},
	  {handle:'paperboy_7',avatar:'assets/paperboy_7.webp',text:'這周的報紙銷量都很好，整條街都在討論這件事。',likes:112,reposts:8,shares:3},
	  {handle:'sarah_here',avatar:'assets/sarah_here.webp',text:'連幕僚都落跑了，還能有什麼假的。',likes:176,reposts:15,shares:6},
	  {handle:'nick_no_filter',avatar:'assets/nick_no_filter.webp',text:'說不定只是正常換工作啊\n怎樣，幕僚就不能換工作喔?',likes:163,reposts:10,shares:2}
	  
    ]
  },

  {
  id:'p15',
    handle:PROFILE.handle,
  time:'2026-3-15',
  text:'昨晚結束之後，接了一整晚的電話。\n',
  likes:936,reposts:81,shares:25,
  replies:[
    {handle:'summer058',avatar:'assets/summer058.webp',text:'昨晚辛苦了。',likes:44,reposts:5,shares:1,ownerLiked:true},
    {handle:PROFILE.handle,avatar:PROFILE.avatar,isAuthor:true,text:'謝謝。',likes:103,reposts:6,shares:2},
    {handle:'sarah_here',avatar:'assets/sarah_here.webp',text:'所以市政府到底知不知道希爾做了什麼？',likes:186,reposts:17,shares:5},
    {handle:'anna_552',avatar:'assets/anna_552.webp',text:'她只是一個幕僚，你們為什麼要把市長做的事情算在她頭上？',likes:121,reposts:6,shares:2},
    {handle:'jack_in_city',avatar:'assets/jack_in_city.webp',text:'市長在晚宴上被當眾抓走，市府幕僚一句話都不用交代？',likes:215,reposts:19,shares:7},
    {handle:'kate_k',avatar:'assets/kate_k.webp',text:'要交代也是警方和市長本人交代，騷擾基層工作人員幹嘛。',likes:98,reposts:5,shares:1},
    {handle:'nick_no_filter',avatar:'assets/nick_no_filter.webp',text:'打電話去騷擾人的是有什麼毛病？\n她看起來也根本不知道發生什麼事。',likes:177,reposts:13,shares:4},
    {handle:'mark_truth',avatar:'assets/mark_truth.webp',text:'不知道？晚會是市府辦的，希爾還在現場挾持布魯斯・韋恩，她怎麼可能完全不知情？',likes:249,reposts:24,shares:9},
    {handle:'lucy_says',avatar:'assets/lucy_says.webp',text:'現在連挾持都是你們自己說的，現場那麼亂，誰看清楚了？',likes:114,reposts:8,shares:2},
    {handle:'george_news',avatar:'assets/george_news.webp',text:'我在現場，韋恩確實被希爾控制住了。\n夜翼他們衝進來之後才把人救下來。',likes:681,reposts:72,shares:118},
    {handle:'citizen_404',avatar:'assets/citizen_404.webp',text:'又一個自稱在現場的，現在網路上每個人都坐第一排是不是？',likes:203,reposts:15,shares:4},
    {handle:'paperboy_7',avatar:'assets/paperboy_7.webp',text:'昨天星球日報已經刊出現場照片了，不用在場才能看到喔！',likes:156,reposts:12,shares:3},
    {handle:'tabloid_reader',avatar:'assets/tabloid_reader.webp',text:'每一家報紙寫的版本都不一樣，我已經不知道該信誰了。',likes:139,reposts:7,shares:1},
    {handle:'allen_watch',avatar:'assets/allen_watch.webp',text:'相信英雄就好，他們不會無緣無故在公開場合抓走市長吧。',likes:281,reposts:23,shares:8},
    {handle:'southside_auntie',avatar:'assets/southside_auntie.webp',text:'蒙面義警想抓誰就抓誰，這樣還有人覺得很正常？',likes:91,reposts:4,shares:1},
    {handle:'william_w',avatar:'assets/william_w.webp',text:'現場還有警察，最後是警察把希爾帶走的，不是義警私刑。',likes:194,reposts:14,shares:4},
    {handle:'david_question',avatar:'assets/david_question.webp',text:'那些電話是記者打的，還是市民打的？\n市府什麼時候開記者會？',likes:133,reposts:6,shares:2},
    {handle:PROFILE.handle,avatar:PROFILE.avatar,isAuthor:true,text:'我目前沒有能夠公開說明的內容。',likes:347,reposts:28,shares:11},
    {handle:'helen_home',avatar:'assets/helen_home.webp',text:'辛苦了。',likes:224,reposts:18,shares:6},
    {handle:'mia_afterfive',avatar:'assets/mia.webp',text:'也可能是市府要求所有人封口啊，她說了才會害到自己吧。',likes:148,reposts:9,shares:2},
    {handle:'paul_cityhall',avatar:'assets/paul_cityhall.webp',text:'如果事情涉及正在調查的案件，本來就不能隨便對外透露。',likes:172,reposts:11,shares:3},
    {handle:'oldtown_resident',avatar:'assets/oldtown_resident.webp',text:'先等調查結果吧，現在網路上連希爾已經認罪的謠言都有了。',likes:127,reposts:8,shares:2},
    {handle:'thomson_g',avatar:'assets/thomson_g.webp',text:'他好像的確已經在現場認罪了耶報導有寫。',likes:269,reposts:25,shares:9},
    {handle:'martha_works',avatar:'assets/works.webp',text:'我不管，希爾無罪！',likes:101,reposts:6,shares:1},
    {handle:'mr_brown_g',avatar:'assets/mr_brown_g.webp',text:'留言區怎麼又打起來了，留友看。',likes:76,reposts:9,shares:2}
  ]
},

{
  id:'p16',
    handle:PROFILE.handle,
  time:'2026-3-14',
  text:'都奈橋建成周年紀念晚會開始了。',
  clueTitle:'周年紀念晚會',
  clue:'莉莉絲似乎因為周年紀念晚會的事情很頭痛。',
  likes:1328,reposts:117,shares:42,
  image:'assets/party.webp',
  replies:[
    {handle:'room_73',avatar:'assets/room_73.webp',text:'沒有想到市長是這樣的人。',likes:51,reposts:5,shares:1},
    {handle:'gotham_daily',avatar:'assets/GOTHAM.webp',text:'你是否知情市長私底下做的這些事？',likes:32,reposts:4,shares:1},
    {handle:PROFILE.handle,avatar:PROFILE.avatar,isAuthor:true,text:'我不想回答這些事。',likes:138,reposts:9,shares:3},
    {handle:'george_news',avatar:'assets/george_news.webp',text:'現場現在一團亂，希爾市長剛剛被夜翼和紅頭罩攔下來了！',likes:892,reposts:146,shares:203},
    {handle:'tabloid_reader',avatar:'assets/tabloid_reader.webp',text:'真的假的？？我朋友說現場連羅賓都出現了。',likes:327,reposts:31,shares:12},
    {handle:'allen_watch',avatar:'assets/allen_watch.webp',text:'是真的，至少有三個人從宴會廳上方跳下來。\n好多英雄喔！',likes:614,reposts:88,shares:76},
    {handle:'lucy_says',avatar:'assets/lucy_says.webp',text:'一群蒙面人闖進市府活動抓走民選市長，你們還在那邊歡呼？',likes:194,reposts:16,shares:5},
    {handle:'william_w',avatar:'assets/william_w.webp',text:'希爾當時手上有人質，不攔他難道站著看？',likes:353,reposts:29,shares:11},
    {handle:'anna_552',avatar:'assets/anna_552.webp',text:'誰說是人質？影片根本看不清楚，只看到韋恩先生站在他旁邊。',likes:142,reposts:9,shares:2},
    {handle:'mark_truth',avatar:'assets/mark_truth.webp',text:'他拿槍抵著布魯斯・韋恩，這還不叫人質嗎？',likes:428,reposts:42,shares:16},
    {handle:'martha_works',avatar:'assets/works.webp',text:'那支槍也可能不是希爾市長的！現場這麼亂，誰都能塞給他！',likes:116,reposts:7,shares:1},
    {handle:'jack_in_city',avatar:'assets/jack_in_city.webp',text:'都已經親眼看到他拿著了，支持者還能說是別人塞的，民主黨支持者腦子有洞吧。',likes:311,reposts:26,shares:8},
    {handle:'kate_k',avatar:'assets/kate_k.webp',text:'新聞上爆的那些料不是真的吧？',likes:163,reposts:10,shares:3},
    {handle:'citizen_404',avatar:'assets/citizen_404.webp',text:'你們高譚真亂。',likes:295,reposts:34,shares:9},
    {handle:'daily_Planet',avatar:'assets/Planet01.webp',text:'我們報社記者就在現場，希爾確實被警方帶走了，今晚就會有現場完整報導。',likes:248,reposts:22,shares:7},
    {handle:'nick_no_filter',avatar:'assets/nick_no_filter.webp',text:'被帶走調查不等於有罪好嗎。\n拜託大家先分清楚逮捕和定罪。',likes:271,reposts:19,shares:6},
    {handle:'thomson_g',avatar:'assets/thomson_g.webp',text:'都奈橋偷工減料如果出事會害多少人？？現在證據都被報導出來了還想裝無辜？',likes:387,reposts:37,shares:14},
    {handle:'oldtown_resident',avatar:'assets/oldtown_resident.webp',text:'橋一蓋完就說有偷工減料，這些證據誰知道是真是假？？？',likes:155,reposts:12,shares:3},
    {handle:'paul_cityhall',avatar:'assets/paul_cityhall.webp',text:'工程款挪用被爆料跟橋蓋好多久是兩件事吧？',likes:306,reposts:25,shares:8},
    {handle:'mia_afterfive',avatar:'assets/mia.webp',text:'希爾上任後明明做了那麼多建設，現在所有人都當他是過街老鼠。',likes:173,reposts:11,shares:2},
    {handle:'jenny_j',avatar:'assets/jenny_j.webp',text:'做建設花的是納稅人的錢，不是希爾自己掏腰包耶，別把他說得像慈善家一樣。',likes:344,reposts:32,shares:10},
    {handle:'southside_auntie',avatar:'assets/southside_auntie.webp',text:'我只知道希爾上任後治安真的有變好。',likes:124,reposts:6,shares:1},
    {handle:'david_question',avatar:'assets/david_question.webp',text:'可是抓他的不就是每天晚上在處理治安問題的那些人嗎？',likes:283,reposts:21,shares:6},
    {handle:'sarah_here',avatar:'assets/sarah_here.webp',text:'莉莉絲你是晚會的工作人員吧？市長被抓之前有沒有什麼異常？',likes:237,reposts:17,shares:5},
    {handle:PROFILE.handle,avatar:PROFILE.avatar,isAuthor:true,text:'請恕我無法回答。',likes:292,reposts:23,shares:9},
    {handle:'helen_home',avatar:'assets/helen_home.webp',text:'「無法回答」跟「不知情」不一樣喔。',likes:319,reposts:28,shares:8},
    {handle:'anna_552',avatar:'assets/anna_552.webp',text:'你們不要一直逼問她，她又不是警察。',likes:168,reposts:10,shares:2},
    {handle:'jack_in_city',avatar:'assets/jack_in_city.webp',text:'她是市府幕僚，也是晚會工作人員，記者問她很正常吧。',likes:226,reposts:15,shares:4},
    {handle:'lucy_says',avatar:'assets/lucy_says.webp',text:'正常採訪跟跑到私人帳號圍攻是兩回事啊。',likes:192,reposts:13,shares:3},
    {handle:'mr_brown_g',avatar:'assets/mr_brown_g.webp',text:'原本只是周年晚會，最後變成這樣，我今晚真的沒白來。',likes:481,reposts:49,shares:21},
    {handle:'george_news',avatar:'assets/george_news.webp',text:'更新：布魯斯・韋恩已經被救護人員帶離現場，看起來沒有受傷。',likes:734,reposts:103,shares:89},
    {handle:'tabloid_reader',avatar:'assets/tabloid_reader.webp',text:'韋恩先生又被綁架了嗎？他到底為什麼每次參加活動都會出事？？',likes:516,reposts:61,shares:34},
    {handle:'citizen_404',avatar:'assets/citizen_404.webp',text:'高譚首富的日常行程：慈善晚會、發表演說、被綁架。',likes:917,reposts:126,shares:52}
  ]
},

  {
    id:'p17',
    handle:PROFILE.handle,
    time:'2026-3-12',
    text:'距離晚宴還有兩天。\n座位表今天又改了一次。',
    likes:845,reposts:74,shares:20,
    replies:[
      {handle:'passing_by',avatar:'assets/passing.webp',text:'座位到底有多難排？',likes:28,reposts:2,shares:0},
      {handle:PROFILE.handle,avatar:PROFILE.avatar,isAuthor:true,text:'你不知道一張桌子可以牽涉多少人的自尊。',likes:113,reposts:8,shares:3}
    ]
  },

  {
    id:'p18',
    handle:PROFILE.handle,
    time:'2026-3-08',
    text:'今天確認晚宴媒體名單。\n有人問為什麼記者席不能再靠前一點。\n因為再靠前就全都是投資人了，抱歉啦！',
    likes:1064,reposts:91,shares:28,
    replies:[
      {handle:'daily_Planet',avatar:'assets/Planet01.webp',text:'好吧🥹',likes:34,reposts:3,shares:1},
      {handle:'Krona458',avatar:'assets/Krona01.webp',text:'投資人太重要了，對吧。',likes:52,reposts:5,shares:1},
      {handle:PROFILE.handle,avatar:PROFILE.avatar,isAuthor:true,text:'成年人的社會啊。',likes:96,reposts:6,shares:2}
    ]
  },

  {
    id:'p20',
    handle:PROFILE.handle,
    time:'2026-2-18',
    text:'今天市長的公開行程結束得比預定早半小時！圓滿達成提早回家！\n',
    likes:739,reposts:62,shares:17,
    replies:[
      {handle:'room_73',avatar:'assets/room_73.webp',text:'恭喜！',likes:21,reposts:1,shares:0,ownerLiked:true},
      {handle:PROFILE.handle,avatar:PROFILE.avatar,isAuthor:true,text:'好累！',likes:63,reposts:3,shares:1}
    ]
  },

  {
    id:'p21',
    handle:PROFILE.handle,
    time:'2026-2-02',
    text:'今天終於收到所有人的周年晚宴邀請答覆了！布魯斯韋恩堂堂登場！',
    likes:624,reposts:48,shares:12,
    replies:[
      {handle:'summer058',avatar:'assets/summer058.webp',text:'天啊，高譚甜心欸，他去晚宴幹什麼？',likes:25,reposts:2,shares:0},
      {handle:PROFILE.handle,avatar:PROFILE.avatar,isAuthor:true,text:'高譚甜心、晚宴，多麼搭配的兩個詞。',likes:97,reposts:7,shares:2}
    ]
  },

  {
    id:'p22',
    handle:PROFILE.handle,
    time:'2026-1-16',
    text:'今年第一場大型活動開始準備！',
    likes:471,reposts:36,shares:8,
    replies:[
      {handle:'passing_by',avatar:'assets/passing.webp',text:'加油！',likes:19,reposts:1,shares:0,ownerLiked:true},
      {handle:PROFILE.handle,avatar:PROFILE.avatar,isAuthor:true,text:'謝謝你～',likes:52,reposts:3,shares:1}
    ]
  },

  {
    id:'p23',
    handle:PROFILE.handle,
    time:'2026-1-05',
    text:'新年第一個工作日。\n市長說今年會是非常重要的一年。\n我看過第一季的行程表了，滿滿當當的。\n。',
    likes:813,reposts:63,shares:18,
    replies:[
      {handle:'room_73',avatar:'assets/room_73.webp',text:'天啊，感覺就很累。',likes:46,reposts:3,shares:1},
      {handle:PROFILE.handle,avatar:PROFILE.avatar,isAuthor:true,text:'我相信今年會很忙。',likes:103,reposts:7,shares:2}
    ]
  },

  {
    id:'p24',
    handle:PROFILE.handle,
    time:'2025-12-20',
    text:'年底辦公室大掃除！\n今年有很多便利貼。\n其中一張寫著「記得吃飯」。\n忘記是誰寫的了，但我決定保留！',
	image:'assets/GA.webp',
    likes:687,reposts:42,shares:10,
    replies:[
      {handle:'anonymous_gotham',avatar:'assets/person-unknown.svg',text:'吃飯是很重要的事！',likes:37,reposts:3,shares:1,ownerLiked:true},
      {handle:PROFILE.handle,avatar:PROFILE.avatar,isAuthor:true,text:'對呀！',likes:72,reposts:4,shares:1}
    ]
  },

  {
    id:'p25',
    handle:PROFILE.handle,
    time:'2025-11-06',
    text:'分享一下市長的趣事，他今天進辦公室的時候才發現他鞋子左右穿反了。',
    likes:902,reposts:79,shares:22,
    replies:[
      {handle:'rainy_window',avatar:'assets/rainy_window.webp',text:'這樣穿不會不舒服嗎？',likes:29,reposts:2,shares:0},
      {handle:PROFILE.handle,avatar:PROFILE.avatar,isAuthor:true,text:'顯然他累到沒辦法意識到不舒服這件事。',likes:81,reposts:6,shares:2}
    ]
  },

  {
    id:'p26',
    handle:PROFILE.handle,
    time:'2025-10-18',
    text:'今天和市長去社區活動。\n小朋友問他是不是每天都穿西裝。\n那確實',
    likes:776,reposts:54,shares:14,
    replies:[
      {handle:'room_73',avatar:'assets/room_73.webp',text:'那妳呢？',likes:15,reposts:1,shares:0},
      {handle:PROFILE.handle,avatar:PROFILE.avatar,isAuthor:true,text:'我每天都在想今天要不要穿西裝。',likes:48,reposts:3,shares:1}
    ]
  },

  {
    id:'p27',
    handle:PROFILE.handle,
    time:'2025-09-16',
    text:'又被貓咬了。',
    likes:641,reposts:45,shares:11,
    replies:[
      {handle:'summer058',avatar:'assets/summer058.webp',text:'你家貓蠻兇的。',likes:24,reposts:2,shares:0},
      {handle:PROFILE.handle,avatar:PROFILE.avatar,isAuthor:true,text:'又凶又胖。',likes:63,reposts:4,shares:1}
    ]
  },

  {
    id:'p19',
    handle:PROFILE.handle,
    time:'2025-9-07',
    text:'準備工作',
	image:'assets/WORKWORK.webp',
    clueTitle:'便條紙',
    clue:'莉莉絲桌上有個便條紙寫著ZGMXXX。',
    likes:1115,reposts:26,shares:25,
    replies:[    ]
  },

  {
    id:'p28',
    handle:PROFILE.handle,
    time:'2025-8-31',
    text:'恭喜希爾市長\n43歲生日快樂！',
    likes:1384,reposts:26,shares:48,
    clueTitle:'希爾市長的生日',
    clue:'莉莉絲在8月31日祝希爾43歲生日快樂。',
    replies:[
      {handle:'room_73',avatar:'assets/room_73.webp',text:'希爾市長生日快樂！',likes:18,reposts:24,shares:1,ownerLiked:true},
      {handle:'muchen_26',avatar:'assets/person-chen.svg',text:'希爾生日快樂！你也辛苦了。',likes:16,reposts:17,shares:1,ownerLiked:true},
	  {handle:PROFILE.handle,avatar:PROFILE.avatar,isAuthor:true,text:'也請大家持續關注下周上路的提案。',likes:122,reposts:5,shares:13}
    ]
  },

  {
    id:'p29',
    handle:PROFILE.handle,
    time:'2025-8-20',
    text:'開始有人提醒我市長生日快到了。\n早在兩個月以前，行程、賓客名單和備用方案就已經確認完畢了！\n謝謝大家對我記憶力的關心。',
    likes:513,reposts:31,shares:7,
    replies:[
      {handle:'anonymous_gotham',avatar:'assets/person-unknown.svg',text:'幕僚的生日提醒系統是不是很可怕。',likes:27,reposts:2,shares:0},
      {handle:PROFILE.handle,avatar:PROFILE.avatar,isAuthor:true,text:'非常有效率。',likes:51,reposts:3,shares:1}
    ]
  },

  {
    id:'p30',
    handle:PROFILE.handle,
    time:'2025-7-04',
    text:'你們看我養的貓。',
	image:'assets/cat01.webp',
    likes:882,reposts:71,shares:20,
    replies:[
      {handle:'passing_by',avatar:'assets/passing.webp',text:'好可愛',likes:37,reposts:3,shares:1},
      {handle:PROFILE.handle,avatar:PROFILE.avatar,isAuthor:true,text:'他剛剛又抓我了啦。',likes:116,reposts:8,shares:3}
    ]
  },

  {
    id:'p31',
    handle:PROFILE.handle,
    time:'2025-4-23',
    text:'今天是都奈橋公共建設說明會。',
    likes:947,reposts:84,shares:24,
    replies:[
      {handle:'room_73',avatar:'assets/room_73.webp',text:'我有看到直播',likes:26,reposts:1,shares:0},
      {handle:PROFILE.handle,avatar:PROFILE.avatar,isAuthor:true,text:'唉。',likes:129,reposts:9,shares:3},
	  {handle:'corner_of_paper',avatar:'assets/person-unknown.svg',text:'所以都奈橋到底要蓋多久？已經蓋五年了！',likes:26,reposts:1,shares:0},
    ]
  },

  {
    id:'p32',
    handle:PROFILE.handle,
    time:'2025-2-14',
    text:'今天辦公室收到很多花。\n但有時候送花的人未必都懷著愛意。',
    likes:438,reposts:28,shares:6,
    replies:[
      {handle:'anonymous_gotham',avatar:'assets/person-unknown.svg',text:'你們到底都收到了些什麼...？',likes:17,reposts:1,shares:0},
      {handle:PROFILE.handle,avatar:PROFILE.avatar,isAuthor:true,text:'我不方便回答這個問題。',likes:54,reposts:3,shares:1}
    ]
  },

  {
    id:'p33',
    handle:PROFILE.handle,
    time:'2024-11-29',
    text:'年底整理市長今年的公開活動。\n會議、視察、剪綵、演講，共四百二十七場，這還不含質詢和市政事務，不愧是希爾市長。',
    likes:529,reposts:37,shares:9,
    replies:[
      {handle:'summer058',avatar:'assets/summer058.webp',text:'市長好強喔。',likes:31,reposts:2,shares:0},
      {handle:PROFILE.handle,avatar:PROFILE.avatar,isAuthor:true,text:'還有機場。忘了說。',likes:44,reposts:2,shares:1}
    ]
  },

  {
    id:'p39',
    handle:PROFILE.handle,
    time:'2024-8-21',
    text:'祝我生日快樂！收到來自市府同僚的好多生日禮物！謝謝大家！',
	image:'assets/cake.webp',
	clueTitle:'莉莉絲的生日',
    clue:'莉莉絲的生日是8月21日。',
    likes:614,reposts:48,shares:12,
    replies:[
      {handle:'emily_gotham',avatar:'assets/avatar-3.svg',text:'市長有送你嗎？',likes:28,reposts:2,shares:0},
      {handle:PROFILE.handle,avatar:PROFILE.avatar,isAuthor:true,text:'秘密。',likes:66,reposts:4,shares:1}
    ]
  },

  {
    id:'p34',
    handle:PROFILE.handle,
    time:'2024-8-07',
    text:'市長今天從早上八點一路跑到晚上九點。\n大家都在車上睡著了。',
    likes:614,reposts:48,shares:12,
    replies:[
      {handle:'room_73',avatar:'assets/room_73.webp',text:'市長有睡嗎？',likes:28,reposts:2,shares:0},
      {handle:PROFILE.handle,avatar:PROFILE.avatar,isAuthor:true,text:'他很努力抓時間休息啦。',likes:66,reposts:4,shares:1}
    ]
  },

  {
    id:'p35',
    handle:PROFILE.handle,
    time:'2024-2-16',
    text:'收到現場傳過來的一些文件，看來這不是只是簡單修改一下法案能解決的事情。',
    likes:483,reposts:39,shares:9,
    replies:[
      {handle:'passing_by',avatar:'assets/passing.webp',text:'市政工作感覺好累。',likes:22,reposts:1,shares:0},
      {handle:PROFILE.handle,avatar:PROFILE.avatar,isAuthor:true,text:'但蠻開心的。',likes:58,reposts:3,shares:1}
    ]
  },

  {
    id:'p36',
    handle:PROFILE.handle,
    time:'2023-12-11',
    text:'明天市長有六場公開行程，橫跨三個行政區。\n光明天的行程表和行車路線我就做了10頁，已經感受到是地獄行程了。',
    likes:367,reposts:24,shares:5,
    replies:[
      {handle:'anonymous_gotham',avatar:'assets/person-unknown.svg',text:'這樣有做意外備案嗎？',likes:12,reposts:1,shares:0},
      {handle:PROFILE.handle,avatar:PROFILE.avatar,isAuthor:true,text:'後面三頁全是備案。',likes:39,reposts:2,shares:0}
    ]
  },

  {
    id:'p37',
    handle:PROFILE.handle,
    time:'2023-9-03',
    text:'今天市政活動好忙。\n但希爾市長閃閃發光的耶，你們看。',
    likes:298,reposts:19,shares:4,
	image:'assets/Light.webp',
    replies:[
	
      {handle:'room_73',avatar:'assets/room_73.webp',text:'哇這個光線很棒欸。',likes:17,reposts:1,shares:0,ownerLiked:true},
      {handle:PROFILE.handle,avatar:PROFILE.avatar,isAuthor:true,text:'我也這麼認為。',likes:31,reposts:1,shares:0}
    ]
  },

  {
    id:'p38',
    handle:PROFILE.handle,
    time:'2023-7-09',
    text:'辦了脆的帳號。\n大家好，我是莉莉絲 凱特，目前擔任希爾的幕僚。\n請多指教！',
	clueTitle:'希爾的幕僚',
    clue:'脆脆的剛上線，莉莉絲就辦了一個帳號，原來她是希爾的幕僚。',
    likes:341,reposts:26,shares:6,
    replies:[
      {handle:'passing_by',avatar:'assets/passing.webp',text:'莉莉絲也辦脆啦。',likes:14,reposts:1,shares:0},
      {handle:PROFILE.handle,avatar:PROFILE.avatar,isAuthor:true,text:'對啊，現在還在熟悉脆的操作。',likes:43,reposts:2,shares:0}
    ]
  }
];
const LILITH_1114_POST={
  id:'lilith-1114-open-messages',
  handle:PROFILE.handle,
  avatar:PROFILE.avatar,
  publishedAt:RELEASE.lilithMessages,
  text:'時隔好久，決定重新開放陌生訊息了',
  likes:286,reposts:17,shares:4,replies:[]
};
function profilePosts(){return hasArrived(RELEASE.lilithMessages)?[LILITH_1114_POST,...POSTS]:POSTS}
const REPLY_POSTS=[
{
	id:'reply1',
    parentId:'news-lilith-entry',
    handle:PROFILE.handle,
	time:'2026-3-15',
	text:'目前一切還在偵查中，請不要做過多猜測。',
	likes:46,reposts:0,shares:2,
	replies:[]
 },
 
 {
	id:'reply2',
    parentPost:{
      id:'reply2-parent',
      handle:'martha_works',
      avatar:'assets/works.webp',
      time:'2023-9-03',
      text:'今天在市政廳外拍到希爾市長。\n這個光線到底是怎麼回事？',
      image:'assets/Light02.webp',
      likes:214,reposts:19,shares:6,
      replies:[]
    },
    handle:PROFILE.handle,
	time:'2023-09-03',
	text:'天神降臨。',
	likes:57,reposts:8,shares:2,
	replies:[
	 {
		handle:'gotham_watch',
		avatar:'assets/gotham_watc.webp',
		text:'民主黨現在都自認是神了？',
		likes:21,reposts:5,shares:1,
	 }
	]
 }
];
const INLINE_REPLY_PARENT_POSTS=REPLY_POSTS
  .filter(reply=>reply.parentPost)
  .map(reply=>({
    ...reply.parentPost,
    replies:[
      {
        handle:reply.handle,
        avatar:reply.avatar||PROFILE.avatar,
        likeId:reply.id,
        time:reply.time,
        text:reply.text,
        image:reply.image,
        likes:reply.likes,
        reposts:reply.reposts,
        shares:reply.shares
      },
      ...(reply.replies||[])
    ]
  }));
const MEDIA_POSTS=POSTS.filter(post=>post.image);
const REPOST_POSTS=[
  {
    id:'repost1',isRepost:true,
    handle:'BTA250',avatar:'assets/al520.webp',publishedAt:'2026-11-11T06:00:00+08:00',time:'6小時',
    text:'現代人常陷入一種迷思：認為在愛情中做到絕對的真實與毫无保留，才是通往深層連結的唯一路徑。\n然而從心理學與實務經驗來看，缺乏界線的「過度自我暴露」往往事與願違。當真誠失去了分寸，它不再是建立信任的橋樑，反而可能轉化為對關係的隱形施壓，進而加速親密關係的崩解。究竟這份「毫無保留」背後隱藏著怎樣的心理機制，又是如何一步步侵蝕了彼此的感情？',
    likes:302,reposts:74,shares:22,
    replies:[{handle:'lin_seven',avatar:'assets/person-lin.svg',
		text:'這篇分析寫得滿準的。',likes:18,reposts:4,shares:2}]},
	{
    id:'repost2',isRepost:true,
    handle:'sophie_park',avatar:'assets/sophie_park.webp',publishedAt:'2026-11-10T12:00:00+08:00',time:'1天前',
    text:'剛搬來高譚三個月，房租便宜是真的\n現在知道為什麼了',
    likes:5524,reposts:1248,shares:4492,
    replies:[{handle:'just_here_for_this',avatar:'assets/person-lin.svg',
		text:'剛在鑽石區買個熱狗，後面巷子突然傳來幾聲槍響跟警報器爆音，\n老闆手都沒抖，繼續夾酸菜，還順便問我：要不要加辣？加辣加五塊喔😎',likes:18,reposts:4,shares:2},
		{handle:'thomson_g',avatar:'assets/thomson_g.webp',
		text:'我受夠了你們高譚人。',likes:23,reposts:0,shares:0}]},
	{id:'repost3',handle:'edge_of_city',avatar:'assets/avatar-2.svg',time:'3天前',text:'【阿卡漢內部消息整理】\n根據市警局洩漏的預算報告，阿卡漢精神病院上個月光是重置安保感應系統與高壓隔離鐵門就耗費了近百萬美元\n諷刺的是，報告最後一頁特別註記：由於建築結構過於古老且多次遭受結構性破壞，目前絕大多數高風險病房的防護力降到了歷史最低點\n阿卡漢到底是在關人，還是給那些神經病一個度假勝地？',likes:73,reposts:6,shares:2,replies:[]},
	{id:'repost4',handle:'gotham_job_hunter',avatar:'assets/person-unknown.svg',time:'5天前',text:'高譚打工人求解 🙋‍♂️\n最近打算換工作，想問一下各大反派幫派的薪水跟福利到底哪家比較好？',likes:86,reposts:13,shares:4,replies:[
   {handle:'iceberg_waiter_no3',avatar:'assets/avatar-2.svg',text:'千萬不要冰山酒吧，薪水看起來很高沒錯，但底薪只有一半，剩下全靠酒水業績跟賭場抽成\n蝙蝠俠把大廳吊燈砸爛要扣我們薪水、雙面人來砸場子損失的酒杯也要我們分攤，而且老闆脾氣超暴躁，上次有人酒後鬧事直接被丟去餵鯊魚，流動率高到爆',likes:12,reposts:0,shares:0},
   {handle:'black_mask_enforcer',avatar:'assets/person-rain.svg',text:'黑面具薪水直接發全額現鈔，週結，從不拖欠，危險津貼給得超大方！\n但這錢真的是拿命換的，你今天領了雙倍薪水，明天可能就躺在東區港口浮上來了。適合急需用錢、不怕死想短期翻身的狠角色',likes:19,reposts:1,shares:0},
   {handle:'joker_goon_survivor',avatar:'assets/avatar-2.svg',text:'看到有人在詢問小丑幫？\n快跑！！！連履歷都不要投！！！',likes:44,reposts:3,shares:1},
   {handle:'arkham_escapee_66',avatar:'assets/person-unknown.svg',text:'不用比了，去哪家都一樣啦',likes:28,reposts:2,shares:0},
   {handle:'gotham_cynic_bro',avatar:'assets/person-rain.svg',text:'講個笑話，高譚打手在比較薪水跟福利',image:'assets/RUN.webp',likes:8,reposts:0,shares:0}]},
	{id:'repost5',handle:'JP_Love_Lili',avatar:'assets/POTER.webp',time:'2026-11-02',text:'一天一個語法小知識，day21，今天是非限定同位語和限定同位語\n你有想過一個逗號可能會改變整個句子的意思嗎？\nMy dearest Lily＝「我最親愛的莉莉」\n在所有叫 Lily 的人中，我最喜歡你。\nMy dearest, Lily＝「我最親愛的人，莉莉」\n在所有人中，我最喜歡你。',likes:73,reposts:6,shares:2,flag:'UK',location:'倫敦',replies:[{handle:PROFILE.handle,avatar:PROFILE.avatar,
		text:'=)',likes:2,reposts:0,shares:0,ownerLiked:true},
		{handle:'Unhappy_Teacher',avatar:'assets/BLACK.webp',
		text:'😧😧😧',likes:4,reposts:0,shares:0},
		{handle:'JP_Love_Lili',avatar:'assets/POTER.webp',flag:'UK',location:'倫敦',
		text:'@Unhappy_Teacher 別吵，去上你的課。',likes:5,reposts:0,shares:0},
		{handle:'Unhappy_Teacher',avatar:'assets/BLACK.webp',flag:'UK',location:'蘇格蘭高地',
		text:'你才很吵，海膽頭',likes:4,reposts:0,shares:0},
		{handle:'JP_Love_Lili',avatar:'assets/POTER.webp',flag:'UK',location:'倫敦',
		text:'@Unhappy_Teacher 你眼睛有問題嗎！？？？海膽是直的！我頭髮是卷的！',likes:5,reposts:0,shares:0},
		{handle:'JP_Love_Lili',avatar:'assets/POTER.webp',flag:'UK',location:'倫敦',
		text:'@Unhappy_Teacher 回我啊！！！回我！！！',likes:4,reposts:0,shares:0},
		{handle:'JP_Love_Lili',avatar:'assets/POTER.webp',flag:'UK',location:'倫敦',
		text:'@Unhappy_Teacher 別上課了上什麼課給我回來說清楚！！！',likes:1,reposts:0,shares:0},
		{handle:'Unhappy_Teacher',avatar:'assets/BLACK.webp',flag:'UK',location:'蘇格蘭高地',
		text:'知道了，你不是直的。',likes:35,reposts:0,shares:0},
		{handle:'JP_Love_Lili',avatar:'assets/POTER.webp',flag:'UK',location:'倫敦',
		text:'@Unhappy_Teacher ？我現在訂機票過去跟你打架你等著。',likes:20,reposts:0,shares:0}
		]}
];
[
  ['repost3','2026-11-08T12:00:00+08:00'],
  ['repost4','2026-11-06T12:00:00+08:00']
].forEach(([id,publishedAt])=>Object.assign(REPOST_POSTS.find(post=>post.id===id),{publishedAt}));

const NEWS_1112_POST={
  id:'news-1112-portrait',handle:NEWS_PROFILE.handle,avatar:NEWS_PROFILE.avatar,
  publishedAt:RELEASE.portrait,
  headline:'希爾市長肖像遭撤下　市政廳外仍聚集抗議民眾',
  text:'市政廳已撤下漢密爾頓．希爾位於主樓大廳的官方肖像。昨晚仍有數百名市民聚集於廣場，有人要求徹查相關案件，也有人高舉「希爾市長無罪」的標語。警方表示目前未發生重大衝突。',
  likes:5821,reposts:940,shares:377,
  replies:[
    {handle:'cityhall_watch',avatar:'assets/avatar-2.svg',text:'撤肖像只是開始，市府應該把所有調查資料公開。',likes:318,reposts:27,shares:8},
    {handle:'martha_works',avatar:'assets/works.webp',text:'人都還沒有定罪就撤掉，這不是未審先判嗎？',likes:276,reposts:19,shares:5},
    {handle:'oldtown_resident',avatar:'assets/oldtown_resident.webp',text:'廣場昨晚很吵，但兩邊至少沒有真的打起來。',likes:143,reposts:9,shares:2},
    {handle:'jack_in_city',avatar:'assets/jack_in_city.webp',text:'都查到器官販賣了還有人舉無罪標語，太荒謬。',likes:491,reposts:54,shares:13},
    {handle:'paul_cityhall',avatar:'assets/paul_cityhall.webp',text:'報導寫的是疑似，等檢方正式起訴再下結論吧。',likes:354,reposts:24,shares:7},
    {handle:ALT.handle,avatar:ALT.avatar,altProfileLink:true,text:'你們從來沒有理解過他，現在卻急著決定他是什麼樣的人。',likes:12,reposts:1,shares:0},
    {handle:'mia_afterfive',avatar:'assets/mia.webp',text:'上面那個帳號講得好像認識希爾本人一樣。',likes:81,reposts:3,shares:0},
    {handle:'night_shift',avatar:'assets/avatar-2.svg',text:'警方今晚還會封路，經過市政廳的人記得繞道。',likes:119,reposts:16,shares:4}
  ]
};

const NEWS_1114_POST={
  id:'news-1114-museum-explosion',handle:NEWS_PROFILE.handle,avatar:NEWS_PROFILE.avatar,
  publishedAt:RELEASE.museumExplosion,
  headline:'美術館於適才遭遇小丑轟炸，現場死傷慘重',
  text:'高譚市立美術館今日上午發生劇烈爆炸，警方初步研判事件可能與小丑有關。消防與救護人員已進入現場，館內外發現多名傷者，確切死傷人數仍待確認。警方已封鎖周邊道路，呼籲市民遠離現場。',
  likes:12741,reposts:6823,shares:4951,
  replies:[
    {handle:'gotham_emergency',avatar:'assets/avatar-2.svg',text:'請不要前往現場，也不要占用周邊道路。',likes:921,reposts:418,shares:206},
    {handle:'museum_member',avatar:'assets/person-rain.svg',text:'今天早上不是還有很多學生團體嗎……',likes:538,reposts:72,shares:19},
    {handle:'no_news_today',avatar:'assets/avatar-3.svg',text:'請大家先確認親友平安，不要轉傳未證實名單。',likes:663,reposts:103,shares:41}
  ]
};
const NEWS_1113_TAIPEI_EVENT={
  id:'news-1113-taipei-western-fandom',
  handle:NEWS_PROFILE.handle,
  avatar:NEWS_PROFILE.avatar,
  publishedAt:'2026-11-13T13:00:00+08:00',
  headline:'歐美翁明日於三重登場　歐美作品同好齊聚交流',
  text:'歐美作品主題同人活動「歐美翁」將於明日（14日）在台灣的台北三重舉行，現場預計設置同人創作攤位、角色扮演交流區及作品展示。主辦單位提醒參加者事先確認入場資訊，並配合場館動線與現場工作人員引導。',
  likes:846,reposts:126,shares:57,
  replies:[
    {handle:'cosplay_weekend',avatar:'assets/avatar-2.svg',text:'明天見！已經準備好要逛一整天了。',likes:31,reposts:2,shares:0},
    {handle:'train_to_taipei',avatar:'assets/person-rain.svg',text:'從國外過去的人記得先查交通路線喔。',likes:18,reposts:1,shares:0}
  ]
};
const PROFILE_ONLY_SCHEDULED_NEWS=[NEWS_1113_TAIPEI_EVENT];
const SCHEDULED_NEWS_POSTS=[NEWS_1114_POST,NEWS_1112_POST];

const ALT_POSTS=[
  {
    id:'alt-1113-fraction',handle:ALT.handle,avatar:ALT.avatar,
    publishedAt:RELEASE.altPost,
    text:'我是他的幾分之幾呢？',image:'assets/tulip.webp',
    likes:3,reposts:0,shares:0,replies:[]
  },
  {
	id:'alt1',
    handle:ALT.handle,
    avatar:ALT.avatar,
    time:'2026-10-12',
    text:'什麼時候才能夠開庭呢？想要看到他更多不同的樣子。',
    likes:18,reposts:2,shares:0,
    replies:[]
  },
    {
    id:'alt2',
    handle:ALT.handle,
    avatar:ALT.avatar,
    time:'2026-9-18',
    text:'想要⋯⋯觀星，所以買了望遠鏡。\nFL推薦的真不錯。',
    likes:2,reposts:2,shares:0,
    replies:[]
  },


    {
    id:'alt3',
    handle:ALT.handle,
    avatar:ALT.avatar,
    time:'2026-9-03',
    text:'我想見他，但他不可能願意見我吧',
    likes:18,reposts:2,shares:0,
    replies:[]
  },
  {
    id:'alt4',
    handle:ALT.handle,
    avatar:ALT.avatar,
    time:'2026-8-31',
    text:'他說生日不是值得慶祝的日子。\n可每年的今天，他還是會特地抓時間回家跟家人團聚。',
    likes:31,reposts:4,shares:0,
    replies:[
      {
        handle:'deleted_0826',
        avatar:'assets/person-unknown.svg',
        text:'祝那個人生日快樂。',
        likes:7,reposts:0,shares:0
      }
    ]
  },

  {
    id:'alt5',
    handle:ALT.handle,
    avatar:ALT.avatar,
    time:'2026-8-26',
    text:'我想見他，但他不可能願意見我吧',
    likes:18,reposts:2,shares:0,
    replies:[]
  },
  {
	id:'alt6',
    handle:ALT.handle,
    avatar:ALT.avatar,
    time:'2026-8-21',
    text:'理所當然的，今年沒送我生日禮物。\n沒關係，我已經自己拿到了。',
    likes:5,reposts:0,shares:0,
    replies:[]
  },

    {
    id:'alt14',
    handle:ALT.handle,
    avatar:ALT.avatar,
    time:'2026-8-11',
    text:'又快到他的生日了，我還記得他去年收到禮物的表情',
    likes:4,reposts:2,shares:0,
    replies:[]
  },

  {
    id:'alt13',
    handle:ALT.handle,
    avatar:ALT.avatar,
    time:'2026-5-10',
    text:'因為我而憔悴的樣子⋯⋯',
    likes:6,reposts:0,shares:0,
    replies:[]
  },
  {
	id:'alt7',
    handle:ALT.handle,
    avatar:ALT.avatar,
    time:'2026-4-23',
    text:'偶爾也會有討厭你的感覺呢。',
    likes:5,reposts:0,shares:0,
    replies:[]
  },
  {
	id:'alt8',
    handle:ALT.handle,
    avatar:ALT.avatar,
    time:'2026-4-11',
    text:'好想吐。',
    likes:5,reposts:0,shares:0,
    replies:[]
  },
  {
    id:'alt9',
    handle:ALT.handle,
    avatar:ALT.avatar,
    time:'2026-3-15',
    text:'這樣他就見不到他老婆了吧。\n這樣一想，一切痛也是甜的。',
    likes:24,reposts:0,shares:0,
    replies:[]
  },
  {
    id:'alt10',
    handle:ALT.handle,
    avatar:ALT.avatar,
    time:'2026-3-14',
    text:'男媽媽到底是什麼？',
    likes:15,reposts:0,shares:0,
    replies:[]
  },
    {
    id:'alt11',
    handle:ALT.handle,
    avatar:ALT.avatar,
    time:'2026-2-14',
    text:'他說我是他最信任的人。',
    likes:6,reposts:0,shares:0,
    replies:[]
  },
    {
    id:'alt12',
    handle:ALT.handle,
    avatar:ALT.avatar,
    time:'2023-11-25',
    text:'裝了監視器。\n有重播功能太好了。',
    likes:2,reposts:0,shares:0,
    replies:[]
  }
];
const ALT_REPLY_POSTS=[
  {
    id:'alt-reply-1',
    parentPost:{id:'alt-reply-parent-1',handle:'gotham_court_watch',avatar:'assets/avatar-2.svg',time:'2026-10-18',text:'希爾案到底什麼時候才會開庭？拖得也太久。',likes:116,reposts:14,shares:3,replies:[]},
    handle:ALT.handle,avatar:ALT.avatar,time:'2026-10-18',text:'他不該被你們隔著螢幕審判。',likes:9,reposts:0,shares:0,replies:[]
  },
  {
    id:'alt-reply-2',
    parentPost:{id:'alt-reply-parent-2',handle:'blackgate_letters',avatar:'assets/person-rain.svg',time:'2026-09-27',text:'聽說最近一直有人往黑門監獄寄花，獄方到底會不會代收？',likes:73,reposts:5,shares:1,replies:[]},
    handle:ALT.handle,avatar:ALT.avatar,time:'2026-09-27',text:'他不喜歡太甜的花香，鬱金香比較適合。',likes:7,reposts:0,shares:0,replies:[]
  },
  {
    id:'alt-reply-3',
    parentPost:{id:'alt-reply-parent-3',handle:'cityhall_archive',avatar:'assets/old_newspaper.webp',time:'2026-08-31',text:'整理舊檔案時找到希爾市長就任時的官方肖像。',likes:204,reposts:32,shares:8,replies:[]},
    handle:ALT.handle,avatar:ALT.avatar,time:'2026-08-31',text:'你們只看得見被掛起來、又被撤下來的那一面。',likes:13,reposts:1,shares:0,replies:[]
  },
  {
    id:'alt-reply-4',
    parentPost:{id:'alt-reply-parent-4',handle:'gotham_old_video',avatar:'assets/history.webp',time:'2026-07-19',text:'翻到希爾市長十年前第一次競選時的演說影片。',likes:331,reposts:61,shares:18,replies:[]},
    handle:ALT.handle,avatar:ALT.avatar,time:'2026-07-19',text:'他說這段話以前，整晚都沒有睡。',likes:11,reposts:0,shares:0,replies:[]
  },
  {
    id:'alt-reply-5',
    parentPost:{id:'alt-reply-parent-5',handle:'late_night_question',avatar:'assets/avatar-3.svg',time:'2026-05-04',text:'認識一個人多久，才有資格說自己真正了解他？',likes:88,reposts:9,shares:2,replies:[]},
    handle:ALT.handle,avatar:ALT.avatar,time:'2026-05-04',text:'十年也不一定夠。',likes:6,reposts:0,shares:0,replies:[]
  }
];
const ALT_INLINE_REPLY_PARENT_POSTS=ALT_REPLY_POSTS.map(reply=>({
  ...reply.parentPost,
  replies:[{
    handle:reply.handle,avatar:reply.avatar,likeId:reply.id,time:reply.time,
    text:reply.text,likes:reply.likes,reposts:reply.reposts,shares:reply.shares
  }]
}));
const ACTIVITY_POSTS=[
 {id:'a8',handle:'old_mack_g',avatar:'assets/old_mack_g.webp',time:'5分鐘',text:'今天是單身節，我今年還是單身，哭了。',likes:42,reposts:8,shares:3,replies:[
	{handle:'paper_cup_01',avatar:'assets/avatar-3.svg',text:'今天不是軍人節嗎?',likes:73,reposts:6,shares:2},
	{handle:'old_mack_g',avatar:'assets/old_mack_g.webp',text:'不是，大哥，你不上網嗎？',likes:108,reposts:11,shares:3},
 ]},
 {id:'a1',handle:'gotham_transit',avatar:'assets/gotham_transit.webp',time:'18分鐘',text:'中央線因號誌異常延誤約40分鐘。',likes:42,reposts:8,shares:3,replies:[
  {handle:'dont_wanna_work',avatar:'assets/person-rain.svg',text:'很好，我今天又要因為高譚捷運遲到了。',likes:37,reposts:3,shares:1},
  {handle:'seven_thirty',avatar:'assets/avatar-3.svg',text:'又來！？？？？',likes:82,reposts:9,shares:2},
  {handle:'martha_works',avatar:'assets/works.webp',text:'尖峰時間出這種問題到底要不要讓人回家？？？',likes:61,reposts:5,shares:1},
  {handle:'r_after_work',avatar:'assets/avatar-2.svg',text:'我要死在月台上了',likes:46,reposts:4,shares:0},
  {handle:'paper_cup_01',avatar:'assets/avatar-3.svg',text:'我手上的咖啡都喝完了，車還沒來。',likes:73,reposts:6,shares:2},
  {handle:'anna_in_gotham',avatar:'assets/person-rain.svg',text:'可以說一下目前卡在哪一站嗎？車廂裡完全沒有廣播。',likes:29,reposts:2,shares:0},
  {handle:'old_gotham_resident',avatar:'assets/person-chen.svg',text:'每次都是號誌異常，到底什麼時候才要把設備換掉？',likes:94,reposts:13,shares:4},
  {handle:'mia_afterfive',avatar:'assets/mia.webp',text:'我只想準時回家吃飯，這個要求在高譚很過分嗎？',likes:108,reposts:11,shares:3},
  {handle:'night_shift',avatar:'assets/avatar-2.svg',text:'夜班還沒開始，我已經想請假了。',likes:41,reposts:3,shares:1},
  {handle:'gotham_citizen_a',avatar:'assets/person-lin.svg',text:'高譚市民每天通勤都像在抽隨機事件卡，交通癱瘓，暫停移動一回合是吧。',likes:135,reposts:19,shares:6},
  {handle:'emily_gotham',avatar:'assets/avatar-3.svg',text:'我真的要瘋了',likes:88,reposts:10,shares:3},
  {handle:'mr_brown_g',avatar:'assets/mr_brown_g.webp',text:'朋友們出門注意一下',likes:53,reposts:6,shares:1}
]},
 {id:'a2',handle:'before_rainstops',avatar:'assets/before_rainstops.webp',time:'1小時',text:'今晚的高譚下雨了。',likes:17,reposts:1,shares:0,replies:[]},
 {id:'a3',handle:'gotham_ledger',avatar:'assets/gotham_ledger.webp',time:'2小時',text:'一天一張阿卡漢門鎖照片，直到高譚市政府把防盜系統換掉\nDay 47\n到底是誰給小丑湯匙的？',image:'assets/content.webp',likes:318,reposts:91,shares:36,replies:[{handle:'gotham_watch',avatar:'assets/gotham_watc.webp',text:'等一下，這篇貼文的意思是\n\n小丑又又又又逃出來了？',likes:55,reposts:12,shares:4}]},
 {id:'a4',handle:'coffee_in_gotham',avatar:'assets/coffee_in_gotham.webp',time:'4小時',text:'新品冬季限定草莓奶凍泡泡紅茶預計下周開始供應喔！',likes:73,reposts:6,shares:2,replies:[]},
 {id:'a5',handle:'gotham_history_archive',avatar:'assets/history.webp',time:'5小時',text:'大家還有人記得大概八年前的爆炸案嗎？',clueTitle:'恭喜你發現了一則廣告',clue:'到底誰會在ARG裡打廣告啊？\n但希望你來參加茶會喔！',likes:86,reposts:13,shares:4,replies:[
   {handle:'passing_by',avatar:'assets/passing.webp',text:'哪次？誰做的？',likes:12,reposts:0,shares:0},
   {handle:'southside_local',avatar:'assets/southside_local.webp',text:'小丑炸的。',likes:19,reposts:1,shares:0},
   {handle:'night_shift',avatar:'assets/avatar-2.svg',text:'哪次，靠北，小丑炸了好幾次。',likes:44,reposts:3,shares:1},
   {handle:'old_newspaper',avatar:'assets/old_newspaper.webp',text:'炸阿卡漢監獄的那次啦！',likes:28,reposts:2,shares:0},
   {handle:'rainy_window',avatar:'assets/rainy_window.webp',text:'有炸過阿卡漢監獄喔！？',likes:8,reposts:0,shares:0},
   {handle:'no_news_today',avatar:'assets/avatar-3.svg',text:'阿卡漢監獄現在還在嗎？',likes:11,reposts:0,shares:0},
   {handle:'gotham_watch',avatar:'assets/gotham_watc.webp',text:'欸大家！我找到當時的報導！',link:'https://www.facebook.com/profile.php?id=61579296969600',likes:53,reposts:7,shares:4}
 ]},
 {id:'a7',handle:'old_mack_g',avatar:'assets/old_mack_g.webp',time:'1天前',text:'冰山老闆超誇張 剛剛布魯斯韋恩來跳舞被他趕出去欸XDD!',likes:42,reposts:8,shares:3,replies:[]}
];
[
  ['a8','2026-11-11T11:55:00+08:00'],
  ['a1','2026-11-11T11:42:00+08:00'],
  ['a2','2026-11-11T11:00:00+08:00'],
  ['a3','2026-11-11T10:00:00+08:00'],
  ['a4','2026-11-11T08:00:00+08:00'],
  ['a5','2026-11-11T07:00:00+08:00'],
  ['a7','2026-11-10T12:00:00+08:00']
].forEach(([id,publishedAt])=>Object.assign(ACTIVITY_POSTS.find(post=>post.id===id),{publishedAt}));
const CHATS=[
 {id:'friend1',name:'小安',handle:'an_an',avatar:'assets/an_an.webp',time:'下午 6:42',preview:'週末還要去看展嗎？',messages:[['in','週末還要去看展嗎？'],['out','要啊，時間不變。'],['in','好，那我到了再叫你。']]},
 {id:'friend2',name:'艾利',handle:'ALY_1204',avatar:'assets/ALY_1204.webp',time:'昨天',preview:'你有看到那個貼文嗎？',messages:[['in','你有看到那個貼文嗎？有狗遺失，飼主懸賞十萬的那個'],['out','剛看到。怎麼了？'],['in','在我家附近，我有點想去找看看，哈。']]},
 {id:'group',name:'週五桌遊團',isGroup:true,subtitle:'你追蹤的其中4人在此聊天室中',avatar:'assets/GAMEgroup.webp',time:'星期一',preview:'Mika：這週缺一個人',messages:[['date','2026年11月9日 下午8:12'],['in','Mika：這週缺一個人，有誰能帶朋友？'],['out','我再問問看。'],['in','Joe：記得不要再遲到了。']]}
];
const ALL_POSTS=[
  ...new Map(
    [
      NEWS_POST,
	  ...SCHEDULED_NEWS_POSTS,
	  ...PROFILE_ONLY_SCHEDULED_NEWS,
      LILITH_1114_POST,
	  ...NEWS_RECENT_POSTS,
      ...NEWS_PROFILE_POSTS,
      ...POSTS,
      ...INLINE_REPLY_PARENT_POSTS,
      ...REPLY_POSTS,
      ...MEDIA_POSTS,
      ...REPOST_POSTS,
      ...ALT_INLINE_REPLY_PARENT_POSTS,
      ...ALT_REPLY_POSTS,
      ...ALT_POSTS,
      ...ACTIVITY_POSTS
    ].map(post=>[post.id,post])
  ).values()
];
const CLUES=[
  ...ALL_POSTS.flatMap(p=>{
    if(Array.isArray(p.clues)){
      return p.clues
        .filter(c=>String(c.title||'').trim()&&String(c.text||'').trim())
        .map((c,i)=>({
          id:`${p.id}-clue-${i}`,
          postId:p.id,
          clueTitle:c.title,
          clue:c.text
        }));
    }

    if(String(p.clueTitle||'').trim()&&String(p.clue||'').trim()){
      return [{
        id:p.id,
        postId:p.id,
        clueTitle:p.clueTitle,
        clue:p.clue
      }];
    }

    return [];
  }),

  {
    id:'lilith-profile-entry-clue',
    postId:'lilith-profile-entry',
    clueTitle:'莉莉絲凱特',
    clue:'在高譚日報留言區內留言，似乎了解很多內幕，今年32歲。'
	
  }
];
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];

/* ===== 隱藏可點擊提示＋基本頁面保護 ===== */
function installPageProtection(){
  const style=document.createElement('style');
  style.textContent=`
    [data-neutral-hover],
    [data-neutral-hover] *{
      cursor:default !important;
    }

    [data-neutral-hover]:hover{
      background-color:var(--neutral-bg) !important;
      color:var(--neutral-color) !important;
      opacity:var(--neutral-opacity) !important;
      filter:var(--neutral-filter) !important;
      box-shadow:var(--neutral-shadow) !important;
      text-decoration-line:var(--neutral-decoration) !important;
      transform:var(--neutral-transform) !important;
      transition:none !important;
    }
  `;
  document.head.appendChild(style);

  const clickableSelector=[
    'a',
    'button',
    '[role="link"]',
    '[role="button"]',
    '[onclick]',
    '[data-post]',
    '[data-open]',
    '[data-reply-thread]',
    '[data-news-profile-link]',
    '[data-profile-entry-target]',
    '[data-alt-profile]',
    '[data-nav]',
    '[data-person-follow]',
    '[data-chat]'
  ].join(',');

  const rememberNormalAppearance=element=>{
    [element,...element.querySelectorAll('*')].forEach(node=>{
      if(node.hasAttribute('data-neutral-hover'))return;

      const computed=getComputedStyle(node);
      node.style.setProperty('--neutral-bg',computed.backgroundColor);
      node.style.setProperty('--neutral-color',computed.color);
      node.style.setProperty('--neutral-opacity',computed.opacity);
      node.style.setProperty('--neutral-filter',computed.filter);
      node.style.setProperty('--neutral-shadow',computed.boxShadow);
      node.style.setProperty('--neutral-decoration',computed.textDecorationLine);
      node.style.setProperty('--neutral-transform',computed.transform);
      node.setAttribute('data-neutral-hover','');
    });
  };

  const neutralize=root=>{
    if(root.nodeType!==Node.ELEMENT_NODE&&root!==document)return;
    if(root!==document&&root.matches(clickableSelector))rememberNormalAppearance(root);
    root.querySelectorAll(clickableSelector).forEach(rememberNormalAppearance);
  };

  neutralize(document);

  new MutationObserver(mutations=>{
    mutations.forEach(mutation=>{
      mutation.addedNodes.forEach(node=>neutralize(node));
    });
  }).observe(document.body,{childList:true,subtree:true});

  document.addEventListener('contextmenu',event=>{
    event.preventDefault();
  },true);

  document.addEventListener('keydown',event=>{
    const key=event.key.toLowerCase();
    const windowsDevtools=event.ctrlKey&&event.shiftKey&&['i','j','c','k'].includes(key);
    const macDevtools=event.metaKey&&event.altKey&&['i','j','c'].includes(key);
    const viewSource=(event.ctrlKey||event.metaKey)&&key==='u';

    if(event.key==='F12'||windowsDevtools||macDevtools||viewSource){
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  },true);
}

installPageProtection();

const STORAGE_KEY='lilith-arg-state-v2';
const saved=JSON.parse(localStorage.getItem(STORAGE_KEY)||'{}');
const state={
  unlocked:new Set(saved.unlocked||[]),

  followedProfiles:new Set(saved.followedProfiles||[]),

  altFollowed:!!saved.altFollowed,
  mutual:!!saved.mutual,
  unreadChats:new Set(saved.unreadChats||(saved.unread?['alt']:[])),
  seenChatEvents:new Set(saved.seenChatEvents||[]),
  seenActivityEvents:new Set(saved.seenActivityEvents||[]),
  museumNewsOpened:!!saved.museumNewsOpened,
  xiaAnReply:saved.xiaAnReply||'',
  xiaAnReplyAt:Number(saved.xiaAnReplyAt)||0,
  xiaAnAppointmentReplied:!!saved.xiaAnAppointmentReplied,
  xiaAnDeclined:!!saved.xiaAnDeclined,
  xiaAnEmergencyTriggered:!!saved.xiaAnEmergencyTriggered,
  xiaAnEmergencyMessagesShown:Number(saved.xiaAnEmergencyMessagesShown)||0,
  lilithChatStarted:!!saved.lilithChatStarted,
  endingUnlocked:!!saved.endingUnlocked,
  endingViewed:!!saved.endingViewed,
  altChatHistory:Array.isArray(saved.altChatHistory)?saved.altChatHistory:[],
  lilithChatHistory:Array.isArray(saved.lilithChatHistory)?saved.lilithChatHistory:[],
  dailyNoClueNotices:new Set(saved.dailyNoClueNotices||[]),
  gameEndNoticeDismissed:!!saved.gameEndNoticeDismissed,
  completionSignature:saved.completionSignature||'',
  view:'news',
  previous:'news',
  lastHomeView:'news',
  homeScrolls:{}
};
function save(){
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      unlocked:[...state.unlocked],

      followedProfiles:[...state.followedProfiles],

      altFollowed:state.altFollowed,
      mutual:state.mutual,
      unreadChats:[...state.unreadChats],
      seenChatEvents:[...state.seenChatEvents],
      seenActivityEvents:[...state.seenActivityEvents],
      museumNewsOpened:state.museumNewsOpened,
      xiaAnReply:state.xiaAnReply,
      xiaAnReplyAt:state.xiaAnReplyAt,
      xiaAnAppointmentReplied:state.xiaAnAppointmentReplied,
	  xiaAnDeclined:state.xiaAnDeclined,
      xiaAnEmergencyTriggered:state.xiaAnEmergencyTriggered,
      xiaAnEmergencyMessagesShown:state.xiaAnEmergencyMessagesShown,
      lilithChatStarted:state.lilithChatStarted,
      endingUnlocked:state.endingUnlocked,
      endingViewed:state.endingViewed,
      altChatHistory:state.altChatHistory,
      lilithChatHistory:state.lilithChatHistory,
      dailyNoClueNotices:[...state.dailyNoClueNotices],
      gameEndNoticeDismissed:state.gameEndNoticeDismissed,
      completionSignature:state.completionSignature
    })
  );
}
function updateFollowButton(selector,profileId){
  const button=$(selector);

  if(!button)return;

  const followed=state.followedProfiles.has(profileId);

  button.classList.toggle('following',followed);
  button.textContent=followed?'追蹤中':'追蹤';
}

function toggleProfileFollow(selector,profileId){
  if(state.followedProfiles.has(profileId)){
    state.followedProfiles.delete(profileId);
  }else{
    state.followedProfiles.add(profileId);
  }

  save();
  updateFollowButton(selector,profileId);
  if(profileId===NEWS_PROFILE.handle&&state.view==='activity')renderActivity(false);
}

function renderFollowStates(){
  updateFollowButton('#followBtn',PROFILE.handle);
  updateFollowButton('#newsFollowBtn',NEWS_PROFILE.handle);
}
function esc(v=''){return String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function icon(id){return `<svg><use href="#${id}"/></svg>`}
function avatar(name,src,attrs=''){return `<img class="avatar post-avatar" src="${src}" alt="${esc(name)} 的頭像" ${attrs}>`}
function postAvatar(p){
  if(p.avatar)return p.avatar;
  if(p.handle===PROFILE.handle)return PROFILE.avatar;
  if(p.handle===NEWS_PROFILE.handle)return NEWS_PROFILE.avatar;
  if(p.handle===ALT.handle)return ALT.avatar;
  return 'assets/avatar-3.svg';
}
function publishedTimeHTML(item){
  const stamp=item.publishedAt?` data-published-at="${esc(item.publishedAt)}"`:'';
  return `<span class="dynamic-time"${stamp}>${esc(formatPublishedTime(item))}</span>`;
}
function actions(p,openable=true){
  const liked=localStorage.getItem('liked-'+p.id)==='1';
  const baseLikes=Number(p.likes)||0;
  const replyCount=p.comments??(p.replies?.length||0);
  return `<div class="actions"><button class="action heart ${liked?'liked':''}" data-like="${p.id}" data-base-likes="${baseLikes}">${icon('i-heart')}<span>${baseLikes+(liked?1:0)}</span></button><button class="action" ${openable?`data-open="${p.id}"`:''}>${icon('i-comment')}<span>${replyCount}</span></button><button class="action">${icon('i-repost')}<span>${p.reposts||0}</span></button><button class="action">${icon('i-send')}<span>${p.shares||0}</span></button></div>`;
}
function postHTML(p,clickable=true){const own=p.handle===PROFILE.handle;const account=p.handle;const newsAccount=account===NEWS_PROFILE.handle;const altAccount=account===ALT.handle&&hasArrived(RELEASE.portrait);const accountLink=newsAccount?'data-news-profile-link="1" tabindex="0" role="link" aria-label="前往高譚日報的個人頁面"':altAccount?'data-alt-profile-link="1" tabindex="0" role="link" aria-label="前往 LH5588812 的個人頁面"':'';return `<article class="post ${p.headline?'news-post':''}" ${clickable?`data-post="${p.id}"`:''}>${avatar(account,postAvatar(p),accountLink)}<div><div class="post-header"><strong ${accountLink}>${esc(account)}</strong><span class="meta">${own?PROFILE.flag+' '+PROFILE.location+' · ':''}${publishedTimeHTML(p)}</span><span class="dots">•••</span></div>${p.feedReason?`<div class="feed-reason">${esc(p.feedReason)}</div>`:''}${p.headline?`<h1 class="news-headline">${esc(p.headline)}</h1>`:''}<p class="post-text">${esc(p.text)}</p>${p.image?`<img class="post-image" src="${esc(p.image)}" alt="串文圖片">`:''}${actions(p,clickable)}</div></article>`}
function getReplyParent(reply){
  if(reply.parentId)return ALL_POSTS.find(post=>post.id===reply.parentId);
  if(reply.parentPost)return ALL_POSTS.find(post=>post.id===reply.parentPost.id)||reply.parentPost;
  return null;
}
function replyThreadHTML(reply){
  const parent=getReplyParent(reply);
  if(!parent)return postHTML(reply);
  const liked=localStorage.getItem('liked-'+reply.id)==='1';
  const baseLikes=Number(reply.likes)||0;
  return `<div class="reply-thread" data-reply-thread="${parent.id}" tabindex="0" role="link" aria-label="開啟 ${esc(parent.handle)} 的原始串文">
    <div class="reply-thread-parent">${postHTML(parent,false)}</div>
    <article class="reply-thread-response">
      ${avatar(reply.handle,postAvatar(reply))}
      <div>
        <div class="post-header"><strong>${esc(reply.handle)}</strong><span class="meta">${publishedTimeHTML(reply)} · ${PROFILE.flag} ${esc(PROFILE.location)}</span><span class="dots">•••</span></div>
        <p class="post-text">${esc(reply.text)}</p>
        ${reply.image?`<img class="post-image" src="${esc(reply.image)}" alt="回覆圖片">`:''}
        <div class="actions"><button class="action heart ${liked?'liked':''}" data-like="${reply.id}" data-base-likes="${baseLikes}">${icon('i-heart')}<span>${baseLikes+(liked?1:0)}</span></button><button class="action">${icon('i-comment')}<span>${reply.replies?.length||0}</span></button><button class="action">${icon('i-repost')}<span>${reply.reposts||0}</span></button><button class="action">${icon('i-send')}<span>${reply.shares||0}</span></button></div>
      </div>
    </article>
  </div>`;
}
const EMPTY_TAB_TEXT={
  posts:'尚未發布任何串文',
  replies:'尚未發布任何回覆',
  media:'尚未發布任何影音內容',
  reposts:'尚未轉發任何串文'
};
let newsProfileTab='posts';
let altProfileTab='posts';
let viewerProfileTab='posts';
function renderFeed(list=profilePosts(),target='#feed',emptyText='目前沒有內容'){
  const el=$(target);
  el.innerHTML=list.length?list.map(p=>(p.parentId||p.parentPost)?replyThreadHTML(p):postHTML(p)).join(''):`<div class="empty">${esc(emptyText)}</div>`;
  bindActions();
}
function updateLikeButton(button,storageKey){
  const on=button.classList.toggle('liked');
  const baseLikes=Number(button.dataset.baseLikes)||0;
  localStorage.setItem('liked-'+storageKey,on?'1':'0');
  button.querySelector('span').textContent=baseLikes+(on?1:0);
}
function bindActions(){
  $$('[data-like]').forEach(b=>b.onclick=e=>{
    e.stopPropagation();
    updateLikeButton(b,b.dataset.like);
  });
  $$('[data-post]').forEach(x=>x.onclick=()=>openPost(x.dataset.post));
  $$('[data-open]').forEach(x=>x.onclick=e=>{e.stopPropagation();openPost(x.dataset.open)});
  $$('[data-reply-thread]').forEach(x=>{
    const open=e=>{
      if(e.type==='keydown'&&!['Enter',' '].includes(e.key))return;
      if(e.target.closest('button,a,[data-news-profile-link]'))return;
      e.preventDefault();
      openPost(x.dataset.replyThread);
    };
    x.onclick=open;
    x.onkeydown=open;
  });
  $$('[data-news-profile-link]').forEach(x=>{const open=e=>{if(e.type==='keydown'&&!['Enter',' '].includes(e.key))return;e.preventDefault();e.stopPropagation();showView('newsProfile',state.view);renderNewsProfile()};x.onclick=open;x.onkeydown=open});
  $$('[data-alt-profile-link]').forEach(x=>{const open=e=>{if(e.type==='keydown'&&!['Enter',' '].includes(e.key))return;e.preventDefault();e.stopPropagation();openAlt()};x.onclick=open;x.onkeydown=open});
}
const HOME_VIEWS=new Set(['news','newsProfile','profile','alt']);

function showView(v,previous=state.view,addHistory=true){
  if(!$('#'+v+'View'))return;

  if(HOME_VIEWS.has(state.view)&&!HOME_VIEWS.has(v)){
    state.lastHomeView=state.view;
    state.homeScrolls[state.view]=window.scrollY;
  }

  state.previous=previous;
  state.view=v;
  if(HOME_VIEWS.has(v))state.lastHomeView=v;

  $$('.view').forEach(view=>{
    view.classList.remove('active');
  });

  $('#'+v+'View').classList.add('active');

  const root=v==='news';

  $('#backBtn').classList.toggle(
    'hidden',
    root||['messages','search','activity','viewer'].includes(v)
  );

  $('#searchBtn').classList.toggle(
    'hidden',
    v!=='profile'
  );

  if(
    addHistory &&
    history.state?.argView!==v
  ){
    history.pushState(
      {
        argView:v,
        previousView:previous
      },
      ''
    );
  }

  scrollTo(0,0);
}

function openRememberedHome(){
  if(HOME_VIEWS.has(state.view)){
    showView('news',state.view);
    renderNews();
    return;
  }

  const target=state.lastHomeView||'news';
  const savedScroll=state.homeScrolls[target]||0;
  showView(target,state.view);
  requestAnimationFrame(()=>scrollTo(0,savedScroll));
}
function repliesHTML(p){const ordered=(p.replies||[]).map((r,i)=>({...r,index:i})).sort((a,b)=>Number(b.ownerLiked)-Number(a.ownerLiked));return ordered.length?ordered.map(r=>{
  const key=r.likeId||(p.id+'r'+r.index);
  const on=localStorage.getItem('liked-'+key)==='1';
  const baseLikes=Number(r.likes)||0;

  const isAuthor=r.isAuthor===true;

  const profileAttrs=r.profileLink?'data-profile-entry-target="1" tabindex="0" role="link" aria-label="前往此帳號的個人頁面"':r.altProfileLink?'data-alt-entry-target="1" tabindex="0" role="link" aria-label="前往此帳號的個人頁面"':'';
  return `<article class="reply">${avatar(r.handle,r.avatar,profileAttrs)}<div><div class="post-header">
  <strong ${profileAttrs}>${esc(r.handle)}</strong>

<span class="meta">
  ${(r.time||r.publishedAt)?`${publishedTimeHTML(r)} · `:''}
  ${esc(r.flag||'🇺🇸')} ${esc(r.location||'高譚')}
  ${isAuthor?' · 作者':''}
</span>

  ${
    r.ownerLiked
      ? `
        <span class="owner-liked">
          ♥
          <img src="${postAvatar(p)}" alt="由 ${esc(p.handle)} 按讚" title="${esc(p.handle)} 按讚">
        </span>
      `
      : ''
  }
  </div>${r.text?`<p class="post-text">${esc(r.text)}</p>`:''}${r.image?`<img class="reply-image" src="${esc(r.image)}" alt="留言圖片">`:''}${r.link?`<a class="reply-link" href="${esc(r.link)}" target="_blank" rel="noopener noreferrer">${esc(r.link)}</a>`:''}<div class="actions"><button class="action heart ${on?'liked':''}" data-reply-like="${key}" data-base-likes="${baseLikes}">${icon('i-heart')}<span>${baseLikes+(on?1:0)}</span></button><button class="action">${icon('i-comment')}<span>0</span></button><button class="action">${icon('i-repost')}<span>${r.reposts||0}</span></button><button class="action">${icon('i-send')}<span>${r.shares||0}</span></button></div></div></article>`}).join(''):'<div class="empty">尚無回覆</div>'}
function bindReplyActions(){
  $$('[data-reply-like]').forEach(b=>{
    b.onclick=e=>{
      e.stopPropagation();

      updateLikeButton(b,b.dataset.replyLike);
    };
  });

  $$('[data-profile-entry-target]').forEach(x=>{
    const open=e=>{
      if(e.type==='keydown'&&!['Enter',' '].includes(e.key))return;

      e.preventDefault();
      e.stopPropagation();

      unlock('lilith-profile-entry');
      showView('profile','news');
    };

    x.onclick=open;
    x.onkeydown=open;
  });
  $$('[data-alt-entry-target]').forEach(x=>{
    const open=e=>{
      if(e.type==='keydown'&&!['Enter',' '].includes(e.key))return;
      e.preventDefault();e.stopPropagation();openAlt();
    };
    x.onclick=open;x.onkeydown=open;
  });
}
function renderNews(){$('#newsPost').innerHTML=postHTML(NEWS_POST,true);$('#newsReplies').innerHTML=repliesHTML(NEWS_POST);bindActions();bindReplyActions()}
function releasedScheduledNews(){return SCHEDULED_NEWS_POSTS.filter(post=>hasArrived(post.publishedAt))}
function releasedProfileOnlyNews(){return PROFILE_ONLY_SCHEDULED_NEWS.filter(post=>hasArrived(post.publishedAt))}
function newsProfilePosts(){
  const scheduled=[...releasedScheduledNews(),...releasedProfileOnlyNews()].sort((a,b)=>timeMs(b.publishedAt)-timeMs(a.publishedAt));
  return [...scheduled,...NEWS_RECENT_POSTS,NEWS_POST,...NEWS_PROFILE_POSTS];
}
function renderNewsProfile(tab=newsProfileTab){
  newsProfileTab=tab;
  $('#newsProfileAvatar').src=NEWS_PROFILE.avatar;$('#newsProfileName').textContent=NEWS_PROFILE.name;$('#newsProfileHandle').textContent=NEWS_PROFILE.handle;
  $$('[data-news-tab]').forEach(button=>button.classList.toggle('active',button.dataset.newsTab===tab));
  const posts=newsProfilePosts();
  const content={posts,replies:[],media:posts.filter(post=>post.image),reposts:[]}[tab]||[];
  renderFeed(content,'#newsProfileFeed',EMPTY_TAB_TEXT[tab]);
}
function openPost(id){
  const p=ALL_POSTS.find(x=>x.id===id);
  if(!p)return;
  if([...SCHEDULED_NEWS_POSTS,...PROFILE_ONLY_SCHEDULED_NEWS].includes(p)&&!hasArrived(p.publishedAt))return;
  if(id===NEWS_1114_POST.id){state.museumNewsOpened=true;save()}
  unlock(id);showView('detail');$('#detailPost').innerHTML=postHTML(p,false);$('#detailReplies').innerHTML=repliesHTML(p);bindActions();bindReplyActions()
}
function unlock(id){
  const clues=CLUES.filter(c=>c.postId===id);
  const newClues=clues.filter(c=>!state.unlocked.has(c.id));

  if(!newClues.length){
    checkCompletion();
    return;
  }

  newClues.forEach(c=>{
    state.unlocked.add(c.id);
  });

  save();
  toast(`已新增 ${newClues.length} 個線索`);
  renderProgress();
  checkCompletion();
}
function renderProgress(){
  const found=[...state.unlocked]
    .map(id=>CLUES.find(c=>c.id===id))
    .filter(Boolean);

  $('#clueList').innerHTML=found
    .map((p,i)=>`
      <div class="clue">
        <span class="clue-num">${i+1}</span>
        <div>
          <h3>${esc(p.clueTitle)}</h3>
          <p>${esc(p.clue)}</p>
        </div>
      </div>
    `)
    .join('');
}
let completionTimer=null;

const GAME_START_DAY='2026-11-11';
const GAME_LAST_DAY='2026-11-14';
const GAME_ENDED_DAY='2026-11-15';

function currentTaipeiDay(){return dateInTaipei(Date.now())}

function clueReleaseDay(clue){
  const post=ALL_POSTS.find(item=>item.id===clue.postId);
  if(!post||!post.publishedAt)return GAME_START_DAY;
  const day=dateInTaipei(post.publishedAt);
  return day<GAME_START_DAY?GAME_START_DAY:day;
}

function getAvailableClues(){
  const today=currentTaipeiDay();
  return CLUES.filter(clue=>clueReleaseDay(clue)<=today);
}

function getTodayClues(){
  const today=currentTaipeiDay();
  return CLUES.filter(clue=>clueReleaseDay(clue)===today);
}

function getCompletionSignature(){
  return getAvailableClues()
    .map(c=>c.id)
    .sort()
    .join('|');
}

function checkCompletion(){
  const today=currentTaipeiDay();
  if(today>GAME_LAST_DAY||(today===GAME_LAST_DAY&&state.endingViewed))return;

  const availableClues=getAvailableClues();
  if(!availableClues.length)return;

  const collectedAll=availableClues.every(c=>{
    return state.unlocked.has(c.id);
  });

  if(!collectedAll){
    if(completionTimer){
      clearTimeout(completionTimer);
      completionTimer=null;
    }

    return;
  }

  const signature=getCompletionSignature();

  if(state.completionSignature===signature)return;
  if(completionTimer)return;

  completionTimer=setTimeout(()=>{
    completionTimer=null;

    const currentAvailableClues=getAvailableClues();
    const stillCollectedAll=currentAvailableClues.every(c=>{
      return state.unlocked.has(c.id);
    });

    if(!stillCollectedAll)return;

    const currentSignature=getCompletionSignature();
    if(currentSignature!==signature)return;

    state.completionSignature=signature;
    save();

    const dialog=$('#completionDialog');

    if(dialog&&!dialog.open){
      dialog.showModal();
    }
  },5000);
}

function checkDailyAndGameNotices(isStartup=false){
  const today=currentTaipeiDay();
  const shouldShowGameEnd=today>=GAME_ENDED_DAY||(isStartup&&today===GAME_LAST_DAY&&state.endingViewed);

  if(shouldShowGameEnd){
    if(!state.gameEndNoticeDismissed){
      const dialog=$('#gameEndDialog');
      if(dialog&&!dialog.open)dialog.showModal();
    }
    return;
  }

  if(today<GAME_START_DAY||today>GAME_LAST_DAY)return;
  if(getTodayClues().length)return;
  if(state.dailyNoClueNotices.has(today))return;

  state.dailyNoClueNotices.add(today);
  save();
  const dialog=$('#dailyNoClueDialog');
  if(dialog&&!dialog.open)dialog.showModal();
}
function renderPeople(type='followers'){
  const list=type==='followers'?FOLLOWERS:FOLLOWING;
  $('#followersTab').classList.toggle('active',type==='followers');$('#followingTab').classList.toggle('active',type==='following');
  $('#peopleList').innerHTML=list.map((p,i)=>{
    const canOpenAlt=p.isAlt&&hasArrived(RELEASE.portrait);
    return `<article class="person ${canOpenAlt?'clickable-person':''}" ${canOpenAlt?'data-alt-profile="1" tabindex="0" role="link"':''}><img class="avatar person-avatar" src="${p.avatar}" alt="${esc(p.name)}"><div class="person-copy"><strong>${esc(p.name)}</strong><span>@${esc(p.handle)}</span>${p.bio?`<p>${esc(p.bio)}</p>`:''}</div><button class="mini-follow" data-person-follow="${type}-${i}">追蹤</button></article>`;
  }).join('');
  $$('[data-alt-profile]').forEach(row=>{const open=e=>{if(e.type==='keydown'&&!['Enter',' '].includes(e.key))return;if(e.target.closest('[data-person-follow]'))return;e.preventDefault();openAlt()};row.onclick=open;row.onkeydown=open});
  $$('[data-person-follow]').forEach(b=>b.onclick=()=>{const on=b.classList.toggle('following');b.textContent=on?'追蹤中':'追蹤'});
}
function openAlt(){if(!hasArrived(RELEASE.portrait))return;showView('alt');renderAlt()}
function renderAlt(tab=altProfileTab){
  altProfileTab=tab;
  $('#altProfileAvatar').src=ALT.avatar;
  const follow=$('#altFollowBtn');follow.textContent=state.altFollowed?'追蹤中':'追蹤';follow.classList.toggle('following',state.altFollowed);
  const canViewFeed=state.mutual;
  $('#followsYou').classList.toggle('hidden',!state.mutual);
  $('#altGate').classList.toggle('hidden',canViewFeed);
  $('#altFeed').classList.toggle('hidden',!canViewFeed);
  $$('[data-alt-tab]').forEach(button=>button.classList.toggle('active',button.dataset.altTab===tab));
  if(canViewFeed){
    const posts=ALT_POSTS.filter(post=>post.id!=='alt-1113-fraction'||hasArrived(post.publishedAt));
    const content={posts,replies:ALT_REPLY_POSTS,media:posts.filter(post=>post.image),reposts:[]}[tab]||[];
    renderFeed(content,'#altFeed',EMPTY_TAB_TEXT[tab]);
  }
}
function followAlt(){if(state.altFollowed)return;state.altFollowed=true;state.unreadChats.add('alt');save();renderAlt();updateUnread();updateActivityBadge();toast('追蹤邀請已送出')}
function syncTimedChatUnread(){
  if(hasArrived(RELEASE.xiaAppointment)&&!state.seenChatEvents.has('xia-appointment'))state.unreadChats.add('friend1');
  if(hasArrived(RELEASE.xiaReplyDeadline)&&!state.xiaAnAppointmentReplied&&!state.seenChatEvents.has('xia-reminder'))state.unreadChats.add('friend1');
  if(hasArrived(RELEASE.xiaEarly)&&!state.seenChatEvents.has('xia-early'))state.unreadChats.add('friend1');
  if(hasArrived(RELEASE.groupFilled)&&!state.seenChatEvents.has('group-filled'))state.unreadChats.add('group');
  if(hasArrived(RELEASE.groupArrivedOne)&&!state.seenChatEvents.has('group-meet'))state.unreadChats.add('group');
}
function xiaMessages(){
  const messages=[['date','2026年11月11日 上午11:23'],...CHATS.find(chat=>chat.id==='friend1').messages];
  if(hasArrived(RELEASE.xiaAppointment))messages.push(['date','2026年11月13日 上午10:05'],['in','明天11點半在美術館見面？']);
  if(state.xiaAnAppointmentReplied){
  messages.push(['out',state.xiaAnReply]);

  if(Date.now()-state.xiaAnReplyAt>=1000){
    messages.push([
      'in',
      state.xiaAnDeclined
        ? '你怎麼突然反悔了？\n算了 我自己去吧。'
        : '明天見'
    ]);
  }
}
  if(hasArrived(RELEASE.xiaReplyDeadline)&&!state.xiaAnAppointmentReplied){
    messages.push(['in','你怎麼今天都沒回我訊息?記得明天見喔！']);
  }
if(hasArrived(RELEASE.xiaEarly)){
  messages.push(
    ['date','2026年11月14日 上午10:48'],
    [
      'in',
      state.xiaAnDeclined
        ? '我提早到了，如果你最後決定有要來再跟我說一下～'
        : '我估錯時間太早到美術館了XDD\n先進去美術館裡面咖啡廳等你'
    ]
  );
}
  if(state.xiaAnEmergencyTriggered){
    messages.push(['share',NEWS_1114_POST.headline]);
    ['你沒事吧?','你可以回我嗎?','拜託你回我一下'].slice(0,state.xiaAnEmergencyMessagesShown).forEach(text=>messages.push(['out',text]));
  }
  return messages;
}
function groupMessages(){
  const messages=[...CHATS.find(chat=>chat.id==='group').messages];
  if(hasArrived(RELEASE.groupFilled))messages.push(['date','2026年11月12日 下午8:16'],['in','JOY：我約到人了囉~']);
  if(hasArrived(RELEASE.groupArrivedOne))messages.push(['date','2026年11月13日 下午1:55'],['in','Mika：我到了']);
  if(hasArrived(RELEASE.groupArrivedTwo))messages.push(['in','JOY：我也到了']);
  if(hasArrived(RELEASE.groupPing))messages.push(['in','Joe：@irrelevant.me 你到了嗎?']);
  return messages;
}
function chatMessages(chat){
  if(chat.id==='friend1')return xiaMessages();
  if(chat.id==='group')return groupMessages();
  return chat.messages;
}
function renderMessages(){
  syncTimedChatUnread();
  const altLastHistory=state.altChatHistory.at(-1);
  const altPreview=altLastHistory
    ? (altLastHistory.correct?'答對了，我追蹤你了。':'答錯了。')
    : state.mutual
      ? '答對了，我追蹤你了。'
      : '你也喜歡他？那你也記得他的生日嗎？';
  const mystery=state.altFollowed?`<button class="message-row" data-chat="alt"><img class="avatar" src="${ALT.avatar}" alt="${ALT.name}"><span><strong>${ALT.handle}</strong><small>${esc(altPreview)}</small></span>${state.unreadChats.has('alt')?'<i class="unread-dot">1</i>':''}</button>`:'';
	const lilith=state.lilithChatStarted
	  ? `
		<button class="message-row" data-chat="lilith">
		  <img class="avatar" src="${PROFILE.avatar}" alt="${PROFILE.name}">
		  <span>
			<strong>${PROFILE.handle}</strong>
			<small>
			  ${state.endingUnlocked
				? '你怎麼知道這些事情？'
				: state.lilithChatHistory.at(-1)?.text||'尚無訊息'
			  }
			</small>
		  </span>
		</button>
	  `
	  : '';
  $('#messageList').innerHTML=lilith+mystery+CHATS.map(c=>{const messages=chatMessages(c).filter(message=>message[0]!=='date');const preview=messages.at(-1)?.[1]||c.preview;return `<button class="message-row" data-chat="${c.id}"><img class="avatar" src="${c.avatar}" alt="${esc(c.name)}"><span><strong>${esc(c.name)}</strong><small>${esc(preview)}</small></span>${state.unreadChats.has(c.id)?'<i class="unread-dot">1</i>':`<time>${esc(c.time)}</time>`}</button>`}).join('');
  $$('[data-chat]').forEach(b=>b.onclick=()=>b.dataset.chat==='alt'?openChat():b.dataset.chat==='lilith'?openLilithChat():openRegularChat(b.dataset.chat));save()
}
function updateUnread(){syncTimedChatUnread();$('#navUnread').classList.toggle('hidden',state.unreadChats.size===0);if(state.view==='messages')renderMessages()}
function eligibleActivityEvents(){
  const events=releasedScheduledNews().map(post=>post.id);
  if(state.altFollowed&&hasArrived(RELEASE.altPost))events.push('alt-1113-fraction');
  return events;
}
function activityPosts(){
  const reason=state.followedProfiles.has(NEWS_PROFILE.handle)?'因為你追蹤':'建議串文';
  const news=releasedScheduledNews().map(post=>({...post,feedReason:reason}));
  const alt=state.altFollowed&&hasArrived(RELEASE.altPost)?[{...ALT_POSTS.find(post=>post.id==='alt-1113-fraction'),feedReason:'因為你追蹤'}]:[];
  return [...news,...alt,...ACTIVITY_POSTS].sort((a,b)=>timeMs(b.publishedAt||0)-timeMs(a.publishedAt||0));
}
function updateActivityBadge(){
  const count=eligibleActivityEvents().filter(id=>!state.seenActivityEvents.has(id)).length;
  const badge=$('#activityUnread');
  badge.textContent=String(Math.min(9,count));
  badge.classList.toggle('hidden',count===0);
}
function renderActivity(markSeen=false){
  renderFeed(activityPosts(),'#activityFeed');
  if(markSeen){eligibleActivityEvents().forEach(id=>state.seenActivityEvents.add(id));save()}
  updateActivityBadge();
}
function refreshRelativeTimeLabels(){
  $$('[data-published-at]').forEach(node=>{node.textContent=formatPublishedTime({publishedAt:node.dataset.publishedAt})});
}
let lastTimelineSignature='';
function refreshTimeline(){
  syncTimedChatUnread();
  const signature=[...eligibleActivityEvents(),...releasedProfileOnlyNews().map(post=>post.id),hasArrived(RELEASE.xiaAppointment),hasArrived(RELEASE.xiaReplyDeadline),hasArrived(RELEASE.lilithMessages),hasArrived(RELEASE.xiaEarly),hasArrived(RELEASE.groupFilled),hasArrived(RELEASE.groupArrivedOne),hasArrived(RELEASE.groupArrivedTwo),hasArrived(RELEASE.groupPing)].join('|');
  if(signature!==lastTimelineSignature){
    lastTimelineSignature=signature;
    if(state.view==='newsProfile')renderNewsProfile();
    if(state.view==='activity')renderActivity(false);
    if(state.view==='alt')renderAlt();
    if(state.view==='profile')renderFeed(profilePosts());
    if(state.view==='messages')renderMessages();
    if(state.view==='chat'&&activeChatId==='friend1'){
      if(hasArrived(RELEASE.xiaReplyDeadline)&&!state.xiaAnAppointmentReplied){
        state.seenChatEvents.add('xia-reminder');state.unreadChats.delete('friend1');
      }
      renderRegularChat(CHATS.find(chat=>chat.id==='friend1'));
    }
    if(state.view==='chat'&&activeChatId==='group'){
      if(hasArrived(RELEASE.groupFilled))state.seenChatEvents.add('group-filled');
      if(hasArrived(RELEASE.groupArrivedOne))state.seenChatEvents.add('group-meet');
      state.unreadChats.delete('group');
      renderRegularChat(CHATS.find(chat=>chat.id==='group'));
    }
    updateUnread();updateActivityBadge();save();
  }
  refreshRelativeTimeLabels();
  checkCompletion();
  checkDailyAndGameNotices(false);
}
function openChat(){
  showView('chat','messages');
  activeChatId='alt';
  state.unreadChats.delete('alt');
  save();
  updateUnread();

  const history=state.altChatHistory.length
    ? state.altChatHistory
    : state.mutual?[{text:'0831',correct:true}]:[];

  $('#chatBody').innerHTML=`
    <div class="chat-person">
      <img class="avatar" src="${ALT.avatar}" alt="${esc(ALT.name)}">
      <strong>${esc(ALT.name)}</strong>
      <span>@${esc(ALT.handle)}</span>
    </div>
    <div class="date-divider">今天</div>
    <div class="bubble incoming">你也喜歡他？那你也記得他的生日嗎？</div>
    ${history.map(item=>`
      <div class="bubble outgoing">${esc(item.text)}</div>
      <div class="bubble incoming">${item.correct?'答對了，我追蹤你了。':'答錯了。'}</div>
    `).join('')}
    ${state.mutual?'<button class="view-alt-btn" id="viewAltFromChat">查看帳號</button>':''}
  `;

  const input=$('#codeInput');input.inputMode='numeric';input.maxLength=4;input.placeholder='輸入答案';
  $('#codeForm').classList.toggle('hidden',state.mutual);

  if(state.mutual){
    $('#viewAltFromChat').onclick=openAlt;
  }
}
let activeChatId='';
const ENDING_CONTENT={
  text:'我最親愛的，漢密爾頓：\n「明天，和明天，和明天，一天接著一天，以蹣跚的步伐向前挪去。」\n相信不必多說，你便知道我引用的是哪一齣悲劇。現在外頭的人都這麼說。他們說你是馬克白，受野心與理想驅使，最終自取滅亡。但我始終相信，我們所做的是正確的事——即使世人不明白，即使你我至親之人也不明白。\n我知道你的理想，甚至可以說，我大概是這世上最盼望它成真的人，請你務必記得這一點：我始終站在你這一邊。\n另外，務必謹言慎行。無論文字或話語，一個不合時宜的停頓，都可能造成不必要的誤會；一兩週前我收到你的來信。你在上頭寫著：「我最親愛的，莉莉絲。」\n我希望那個逗號是你故意放的，但我猜不是。\n我知道你向來不樂意講究那些標點符號。放在以前，我自然會替你一一審查講稿和條文；但如今我不在你身邊，請萬事小心。\n\n莉莉絲。\n\n\n\n\n／\n\n\n\n\n「我說過我討厭菸味。」\n莉莉絲．凱特拉開車門，迎面而來的煙霧濃得幾乎令人窒息。她皺了皺眉，向後退開兩步，等車裡的煙散得差不多了，才抱著那束鬱金香坐進副駕駛座。\n「打扮得真隆重。」索恩偏過頭，打量了一眼她身上的白色風衣，輕聲嗤笑，「一個手下敗將，值得嗎？」\n「他是我的導師。」莉莉絲神色冷淡地望向窗外，顯然沒有繼續交談的興致。\n索恩倒不介意。他一手搭著方向盤，對著身旁這個身形幾乎只有自己一半大的女人喋喋不休，「不只如此吧？你跑來投靠我，親手把他弄到這副境地，現在倒擺起學生的架子了。真搞不懂你到底在想什麼……」\n「不管我在想什麼，都和你無關。」莉莉絲望著窗外飛速掠過的街景。\n導師嗎？確實不只如此。\n漢密爾頓．希爾是她的伯樂，是她的恩人，是她的導師和戰友，希爾可以用一個眼神告訴她該往哪走，也可以通過筆尖的輕輕一撇使她心煩意亂。\n她跟在這個人身邊十年，整整十年。她替他修改講稿，替他斟酌那些他從來懶得在意的字句和標點，替他記得每一場會議、每一個承諾，也比任何人都更清楚，他究竟想把高譚變成什麼模樣。\n她知道他的理想，甚至比希爾本人更清楚那些理想，所以她當然也比任何人更早看見結局——莉莉絲從一開始就知道漢密爾頓．希爾會走向滅亡。\n她提醒過他，一次，兩次，無數次，可希爾不以為意。他沉醉在那個近在咫尺的未來裡，一步一步向前走，從未回過頭來看她一眼。\n於是最後，莉莉絲替他停了下來，她將漢密爾頓．希爾出賣給索恩，親手驗證了自己早已說過無數次的預言。\n看吧，我早就告訴過你。莉莉絲垂下眼，指尖輕輕撫過懷裡鬱金香的花瓣，車窗上映出她模糊的倒影。她看著那張臉，忽然很輕地彎起嘴角。\n十分鐘。\n再十分鐘。\n她幾乎已經等不及了。\n至少現在他終於只能看著我了，我最親愛的，漢密爾頓。',
  image:'' // 需要結局圖片時填入，例如：assets/ending.webp
};
let endingTypingTimer=null;
function renderEnding(){
  clearTimeout(endingTypingTimer);
  const text=$('#endingText');
  const characters=Array.from(ENDING_CONTENT.text);
  let index=0;
  text.textContent='';

  const typeNextCharacter=()=>{
    if(state.view!=='ending')return;
    text.textContent+=characters[index]||'';
    index++;
    if(index<characters.length)endingTypingTimer=setTimeout(typeNextCharacter,28);
  };

  typeNextCharacter();
  const image=$('#endingImage');
  image.classList.toggle('hidden',!ENDING_CONTENT.image);
  if(ENDING_CONTENT.image)image.src=ENDING_CONTENT.image;
}
function openLilithChat(){
  if(
    !state.lilithChatStarted &&
    !hasArrived(RELEASE.lilithMessages)
  ){
    return;
  }

  state.lilithChatStarted=true;
  save();

  activeChatId='lilith';
  showView('chat','messages');
  const history=state.lilithChatHistory.length
    ? state.lilithChatHistory
    : state.endingUnlocked?[{text:'你今天要去見他嗎？',correct:true}]:[];

  $('#chatBody').innerHTML=`
    <div class="chat-person">
      <img
        class="avatar"
        src="${PROFILE.avatar}"
        alt="${esc(PROFILE.name)}"
      >
      <strong>${esc(PROFILE.name)}</strong>
      <span>@${esc(PROFILE.handle)}</span>
    </div>

    ${history.map(item=>`<div class="bubble outgoing">${esc(item.text)}</div>`).join('')}
    ${state.endingUnlocked?`
      <div class="bubble incoming">你是誰？</div>
      <div class="bubble incoming">你怎麼知道這些事情？</div>
      <button class="view-alt-btn" id="showEndingBtn">顯示結局</button>
    `:''}
  `;

  const input=$('#codeInput');

  input.inputMode='text';
  input.removeAttribute('maxlength');
  input.placeholder='傳送訊息';

  $('#codeForm').classList.toggle(
    'hidden',
    state.endingUnlocked
  );

  if(state.endingUnlocked){
    $('#showEndingBtn').onclick=()=>{
      state.endingViewed=true;save();
      if(completionTimer){clearTimeout(completionTimer);completionTimer=null}
      showView('ending','chat');
      renderEnding();
    };
  }
}
function chatMessageHTML(message){
  if(message[0]==='date')return `<div class="date-divider">${esc(message[1])}</div>`;
  if(message[0]==='share')return `<button class="shared-post" data-open="${NEWS_1114_POST.id}"><strong>高譚日報</strong><span>${esc(message[1])}</span></button>`;
  return `<div class="bubble ${message[0]==='in'?'incoming':'outgoing'}">${esc(message[1])}</div>`;
}
function renderRegularChat(c){
  const subtitle=c.isGroup?c.subtitle:`@${c.handle}`;
  $('#chatBody').innerHTML=`<div class="chat-person"><img class="avatar" src="${c.avatar}" alt="${esc(c.name)}"><strong>${esc(c.name)}</strong><span>${esc(subtitle)}</span></div>${chatMessages(c).map(chatMessageHTML).join('')}`;
  bindActions();
  const input=$('#codeInput');
  const canReply=c.id==='friend1'&&hasArrived(RELEASE.xiaAppointment)&&!hasArrived(RELEASE.xiaReplyDeadline)&&!state.xiaAnAppointmentReplied;
  input.inputMode='text';input.removeAttribute('maxlength');input.placeholder='輸入訊息';
  $('#codeForm').classList.toggle('hidden',!canReply);
}
function continueXiaEmergency(){
  if(!state.xiaAnEmergencyTriggered)return;
  const messages=['你沒事吧?','你可以回我嗎?','拜託你回我一下'];
  const next=state.xiaAnEmergencyMessagesShown;
  if(next>=messages.length)return;
  setTimeout(()=>{
    state.xiaAnEmergencyMessagesShown++;
    save();
    if(activeChatId==='friend1'){
      $('#chatBody').insertAdjacentHTML('beforeend',chatMessageHTML(['out',messages[next]]));
      scrollTo(0,document.body.scrollHeight);
    }
    continueXiaEmergency();
  },1000);
}
function openRegularChat(id){
  const c=CHATS.find(x=>x.id===id);if(!c)return;
  activeChatId=id;showView('chat','messages');
  if(id==='friend1'){
    if(hasArrived(RELEASE.xiaAppointment))state.seenChatEvents.add('xia-appointment');
    if(hasArrived(RELEASE.xiaReplyDeadline))state.seenChatEvents.add('xia-reminder');
    if(hasArrived(RELEASE.xiaEarly))state.seenChatEvents.add('xia-early');
    state.unreadChats.delete('friend1');
    if(state.museumNewsOpened&&hasArrived(RELEASE.museumExplosion)&&!state.xiaAnEmergencyTriggered){
      state.xiaAnEmergencyTriggered=true;state.xiaAnEmergencyMessagesShown=0;
    }
  }
  if(id==='group'){
    if(hasArrived(RELEASE.groupFilled))state.seenChatEvents.add('group-filled');
    if(hasArrived(RELEASE.groupArrivedOne))state.seenChatEvents.add('group-meet');
    state.unreadChats.delete('group');
  }
  save();updateUnread();renderRegularChat(c);
  if(id==='friend1')continueXiaEmergency();
}
function initProfile(){$('#displayName').textContent=PROFILE.name;$('#handle').textContent=PROFILE.handle;$('#location').textContent=PROFILE.location;$('.flag').textContent=PROFILE.flag;$('#bio').innerHTML=esc(PROFILE.bio).replace(/\n/g,'<br>');$('#tags').innerHTML=PROFILE.tags.map(t=>`<span>${esc(t)}</span>`).join('');$('#followers').textContent=PROFILE.followers;$('#following').textContent=PROFILE.following;$('#profileAvatar').src=PROFILE.avatar}
function toast(t){const x=$('#toast');x.textContent=t;x.classList.add('show');clearTimeout(toast.t);toast.t=setTimeout(()=>x.classList.remove('show'),1800)}
$('#followBtn').onclick=()=>{  toggleProfileFollow('#followBtn',PROFILE.handle);};
$('#messageBtn').onclick=()=>(state.lilithChatStarted||hasArrived(RELEASE.lilithMessages))?openLilithChat():$('#messageDialog').showModal();
$('#closeDialog').onclick=()=>$('#messageDialog').close();
$('#closeCompletionDialog').onclick=()=>$('#completionDialog').close();
$('#closeDailyNoClueDialog').onclick=()=>$('#dailyNoClueDialog').close();
$('#closeGameEndDialog').onclick=()=>{
  state.gameEndNoticeDismissed=true;
  save();
  $('#gameEndDialog').close();
};
$('#gameEndDialog').addEventListener('close',()=>{
  state.gameEndNoticeDismissed=true;
  save();
});

function openCreatorDialog(){
  $('#creatorDialog').showModal();
}

$('#pageTitle').onclick=openCreatorDialog;

$('#pageTitle').onkeydown=e=>{
  if(e.key!=='Enter'&&e.key!==' ')return;

  e.preventDefault();
  openCreatorDialog();
};

$('#closeCreatorDialog').onclick=()=>{
  $('#creatorDialog').close();
};
$('#newsFollowBtn').onclick=()=>{  toggleProfileFollow('#newsFollowBtn',NEWS_PROFILE.handle);};
$('#newsMessageBtn').onclick=()=>$('#messageDialog').showModal();
$('#searchBtn').onclick=()=>showView('search');$('#backBtn').onclick=()=>{
  if(history.state?.argView!=='news'){
    history.back();
  }else{
    showView('news','news',false);
  }
};
$('#followersBtn').onclick=()=>{showView('people');renderPeople('followers')};$('#followingBtn').onclick=()=>{showView('people');renderPeople('following')};$('#followersTab').onclick=()=>renderPeople('followers');$('#followingTab').onclick=()=>renderPeople('following');
$('#altFollowBtn').onclick=followAlt;$('#altMessageBtn').onclick=()=>state.altFollowed?openChat():$('#messageDialog').showModal();
$('#codeForm').onsubmit=e=>{
  e.preventDefault();

  const input=$('#codeInput');
  const answer=input.value.trim().replace(/\s/g,'');

  if(!answer)return;

if(activeChatId==='lilith'){
  const message=input.value.trim();
  const correct=message==='你今天要去見他嗎？';

  state.lilithChatHistory.push({text:message,correct});
  save();

  input.value='';

  $('#chatBody').insertAdjacentHTML(
    'beforeend',
    `<div class="bubble outgoing">${esc(message)}</div>`
  );

  if(correct){
    state.endingUnlocked=true;
    save();

    $('#codeForm').classList.add('hidden');

    setTimeout(()=>{
  if(activeChatId!=='lilith'||state.view!=='chat')return;

  $('#chatBody').insertAdjacentHTML(
    'beforeend',
    `
      <div class="bubble incoming">
        你是誰？
      </div>
    `
  );

  scrollTo(0,document.body.scrollHeight);
},2000);

setTimeout(()=>{
  if(activeChatId!=='lilith'||state.view!=='chat')return;

  $('#chatBody').insertAdjacentHTML(
    'beforeend',
    `
      <div class="bubble incoming">
        你怎麼知道這些事情？
      </div>
    `
  );

  scrollTo(0,document.body.scrollHeight);
},4000);

setTimeout(()=>{
  if(activeChatId!=='lilith'||state.view!=='chat')return;

  $('#chatBody').insertAdjacentHTML(
    'beforeend',
    `
      <button
        class="view-alt-btn"
        id="showEndingBtn"
      >
        顯示結局
      </button>
    `
  );

  $('#showEndingBtn').onclick=()=>{
    state.endingViewed=true;save();
    if(completionTimer){clearTimeout(completionTimer);completionTimer=null}
    showView('ending','chat');
    renderEnding();
  };

  scrollTo(0,document.body.scrollHeight);
},6000);
  }

  return;
}

  if(activeChatId==='friend1'){
    if(hasArrived(RELEASE.xiaReplyDeadline)){
      input.value='';
      state.seenChatEvents.add('xia-reminder');state.unreadChats.delete('friend1');save();
      renderRegularChat(CHATS.find(chat=>chat.id==='friend1'));
      return;
    }
    state.xiaAnReply=input.value.trim();
	state.xiaAnReplyAt=Date.now();
	state.xiaAnAppointmentReplied=true;

		const declineKeywords=[
		  '沒空','不去','不能去','沒辦法去','不想去','不方便','臨時有事',];

state.xiaAnDeclined=declineKeywords.some(keyword=>{
  return state.xiaAnReply.includes(keyword);
});
    input.value='';save();
    renderRegularChat(CHATS.find(chat=>chat.id==='friend1'));
    setTimeout(()=>{
      if(activeChatId==='friend1')renderRegularChat(CHATS.find(chat=>chat.id==='friend1'));
    },1000);
    return;
  }

  const accepted=['八三一','831','0831','8/31','０８／３１','8月31日','八月三十一日','8月31號','8月31','８／３１'];
  const altMessage=input.value.trim();
  const altCorrect=accepted.includes(answer);

  state.altChatHistory.push({text:altMessage,correct:altCorrect});
  save();

  $('#chatBody').insertAdjacentHTML(
    'beforeend',
    `<div class="bubble outgoing">${esc(input.value.trim())}</div>`
  );

  if(altCorrect){
    state.mutual=true;
    save();

    $('#chatBody').insertAdjacentHTML(
      'beforeend',
      `<div class="bubble incoming">答對了，我追蹤你了。</div>
       <button class="view-alt-btn" id="viewAltFromChat">查看帳號</button>`
    );

    input.value='';
    $('#codeForm').classList.add('hidden');
    $('#viewAltFromChat').onclick=openAlt;
  }else{
    $('#chatBody').insertAdjacentHTML(
      'beforeend',
      `<div class="bubble incoming">答錯了。</div>`
    );

    input.value='';
  }
};
$$('[data-nav]').forEach(b=>b.onclick=()=>{
  const v=b.dataset.nav;
  if(v==='news'){openRememberedHome();return}
  showView(v,v);
  if(v==='messages')renderMessages();
  if(v==='activity')renderActivity(true);
  if(v==='search')renderProgress();
  if(v==='viewer')renderViewerTab();
});
const TAB_CONTENT={replies:REPLY_POSTS,media:MEDIA_POSTS,reposts:REPOST_POSTS};$$('[data-profile-tab]').forEach(b=>b.onclick=()=>{$$('[data-profile-tab]').forEach(x=>x.classList.remove('active'));b.classList.add('active');renderFeed(b.dataset.profileTab==='posts'?profilePosts():TAB_CONTENT[b.dataset.profileTab])});
$$('[data-news-tab]').forEach(button=>button.onclick=()=>renderNewsProfile(button.dataset.newsTab));
$$('[data-alt-tab]').forEach(button=>button.onclick=()=>renderAlt(button.dataset.altTab));
function renderViewerTab(tab=viewerProfileTab){
  viewerProfileTab=tab;
  $$('[data-viewer-tab]').forEach(button=>button.classList.toggle('active',button.dataset.viewerTab===tab));
  renderFeed([],'#viewerFeed',EMPTY_TAB_TEXT[tab]);
}
$$('[data-viewer-tab]').forEach(button=>button.onclick=()=>renderViewerTab(button.dataset.viewerTab));
$('#searchInput').oninput=e=>{const q=e.target.value.trim().toLowerCase();if(q==='0826')unlock('p3');const list=POSTS.filter(p=>(p.text+(p.clue||'')+(p.clueTitle||'')).toLowerCase().includes(q));$('#searchResults').innerHTML=q?`<div class="reply-heading">搜尋結果</div>${list.map(p=>postHTML(p)).join('')}`:'';bindActions()};
history.replaceState(
  {
    argView:'news',
    previousView:'news'
  },
  ''
);

window.addEventListener('popstate',event=>{
  const view=event.state?.argView;

  if(!view)return;

  showView(
    view,
    event.state?.previousView||'profile',
    false
  );

  if(view==='messages'){
    renderMessages();
  }

  if(view==='activity'){
    renderActivity(false);
  }

  if(view==='search'){
    renderProgress();
  }

  if(view==='alt'){
    renderAlt();
  }

  if(view==='newsProfile'){
    renderNewsProfile();
  }

  if(view==='viewer'){
    renderViewerTab();
  }
});
initProfile();
renderFollowStates();
renderNews();
unlock(NEWS_POST.id);
renderNewsProfile();
renderFeed();
renderViewerTab();
renderProgress();
updateUnread();
updateActivityBadge();
renderMessages();
checkCompletion();
checkDailyAndGameNotices(true);
refreshTimeline();
setInterval(refreshTimeline,30000);
