/* ===== 主要資料：文字與圖片路徑都可在這裡替換 ===== */
const PROFILE={name:'莉莉絲・凱特',handle:'lilith.kate',flag:'🇺🇸',location:'哥譚',bio:'哥譚人\n這裡的言論僅代表我個人。',tags:['#Gotham','#Democrats','#公共政策'],followers:'1,284',following:'156',avatar:'assets/avatar.jpg'};
const ALT={name:'L.K.',handle:'LK555888111222',avatar:'assets/person-alt.jpg'};
const FOLLOWERS=[
 {name:'林七',handle:'lin_seven',bio:'偶爾拍照。',avatar:'assets/person-lin.svg'},
 {name:'雨停以前',handle:'before_rainstops',bio:'你說的不過是如果。',avatar:'assets/person-rain.svg'},
 {name:'無名',handle:'deleted_0826',bio:'',avatar:'assets/person-unknown.svg'},
 {name:'L.K.',handle:'LK555888111222',bio:'好喜歡你。',avatar:'assets/person-alt.jpg',isAlt:true},
 {name:'陳暮',handle:'muchen_26',bio:'Gotham',avatar:'assets/person-chen.svg'},
 {name:'73號',handle:'room_73',bio:'請勿敲門。',avatar:'assets/avatar-3.svg'},
 {name:'路過的人',handle:'passing_by',bio:'只是剛好看到。',avatar:'assets/avatar-2.svg'},
 {name:'艾琳',handle:'erin_writes',bio:'城市裡的一個普通人。',avatar:'assets/avatar-2.svg'},
 {name:'M.',handle:'monday_morning',bio:'咖啡比政治可靠。',avatar:'assets/avatar-3.svg'},
 {name:'北邊的人',handle:'north_side_04',bio:'住在哥譚北邊。',avatar:'assets/person-lin.svg'},
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
 {name:'瑪莎',handle:'martha_works',bio:'工作中，勿擾。',avatar:'assets/avatar-3.svg'},
 {name:'紙上談兵',handle:'on_paper_only',bio:'我只負責提出問題。',avatar:'assets/person-rain.svg'},
 {name:'南邊來的',handle:'from_the_south',bio:'偶爾來市中心。',avatar:'assets/person-chen.svg'},
 {name:'咖啡第二杯',handle:'coffee_second',bio:'第一杯已經喝完了。',avatar:'assets/avatar-2.svg'},
 {name:'伊森',handle:'ethan_works',bio:'城市、工作、睡眠。',avatar:'assets/avatar-3.svg'},
 {name:'晚安哥譚',handle:'goodnight_gotham',bio:'晚上比較清醒。',avatar:'assets/person-lin.svg'},
 {name:'小報讀者',handle:'tabloid_reader',bio:'我只是看看新聞。',avatar:'assets/person-rain.svg'},
 {name:'沒有暱稱',handle:'no_nickname_here',bio:'',avatar:'assets/person-unknown.svg'},
 {name:'星期三',handle:'wednesday_person',bio:'不是每個星期三都一樣。',avatar:'assets/avatar-2.svg'},
 {name:'城市邊緣',handle:'edge_of_city',bio:'離市中心很遠。',avatar:'assets/avatar-3.svg'},
 {name:'阿德',handle:'ade_gotham',bio:'今天也在上班。',avatar:'assets/person-chen.svg'},
 {name:'看熱鬧的',handle:'just_here_for_this',bio:'沒有立場。',avatar:'assets/person-lin.svg'},
 {name:'舊報紙',handle:'old_newspaper',bio:'昨天的新聞也是新聞。',avatar:'assets/avatar-2.svg'},
 {name:'白噪音',handle:'white_noise_g',bio:'保持安靜。',avatar:'assets/avatar-3.svg'},
 {name:'米亞',handle:'mia_afterfive',bio:'五點以後才是我的時間。',avatar:'assets/person-rain.svg'},
 {name:'湯姆森',handle:'thomson_g',bio:'住在河邊。',avatar:'assets/person-chen.svg'},
 {name:'小雨',handle:'rainy_window',bio:'今天也在下雨。',avatar:'assets/avatar-2.svg'},
 {name:'沒有新聞',handle:'no_news_today',bio:'希望今天沒有新聞。',avatar:'assets/avatar-3.svg'},
 {name:'艾倫',handle:'alan_corner',bio:'城市觀察。',avatar:'assets/person-lin.svg'},
 {name:'南區居民',handle:'southside_local',bio:'南區生活紀錄。',avatar:'assets/person-rain.svg'},
 {name:'老麥',handle:'old_mack_g',bio:'這城市比我年輕。',avatar:'assets/person-chen.svg'},
 {name:'卡洛',handle:'carlo_notes',bio:'一些城市雜記。',avatar:'assets/avatar-2.svg'},
 {name:'蘇菲',handle:'sophie_park',bio:'拍照、散步、咖啡。',avatar:'assets/avatar-3.svg'},
 {name:'布朗先生',handle:'mr_brown_g',bio:'退休之後比較有時間。',avatar:'assets/person-lin.svg'},
 {name:'不想上班',handle:'dont_wanna_work',bio:'每天都在努力。',avatar:'assets/person-rain.svg'},
 {name:'報紙角落',handle:'corner_of_paper',bio:'每天看一點新聞。',avatar:'assets/person-unknown.svg'},
 {name:'傑克',handle:'jack_around_g',bio:'哥譚本地人。',avatar:'assets/avatar-2.svg'},
 {name:'艾蜜莉',handle:'emily_gotham',bio:'偶爾發牢騷。',avatar:'assets/avatar-3.svg'},
 {name:'半夜三點',handle:'three_am_again',bio:'又睡不著。',avatar:'assets/person-chen.svg'},
 {name:'城市居民A',handle:'gotham_citizen_a',bio:'普通市民。',avatar:'assets/person-lin.svg'},
 {name:'城市居民B',handle:'gotham_citizen_b',bio:'沒有什麼好介紹的。',avatar:'assets/person-rain.svg'},
 {name:'老朋友',handle:'old_friend_g',bio:'認識一些人，也認識一些事。',avatar:'assets/person-chen.svg'}
];

const FOLLOWING=[
 {name:'73號',handle:'room_73',bio:'請勿敲門。',avatar:'assets/avatar-3.svg'},
 {name:'路過的人',handle:'passing_by',bio:'只是剛好看到。',avatar:'assets/avatar-2.svg'},
 {name:'林七',handle:'lin_seven',bio:'偶爾拍照。',avatar:'assets/person-lin.svg'},
 {name:'雨停以前',handle:'before_rainstops',bio:'你說的不過是如果。',avatar:'assets/person-rain.svg'},
 {name:'陳暮',handle:'muchen_26',bio:'Gotham',avatar:'assets/person-chen.svg'},
 {name:'艾琳',handle:'erin_writes',bio:'城市裡的一個普通人。',avatar:'assets/avatar-2.svg'},
 {name:'夜班記者',handle:'night_shift',bio:'還沒下班。',avatar:'assets/avatar-2.svg'},
 {name:'安娜',handle:'anna_in_gotham',bio:'在這座城市生活。',avatar:'assets/person-rain.svg'},
 {name:'R.',handle:'r_after_work',bio:'下班之後才是人生。',avatar:'assets/avatar-3.svg'},
 {name:'晚安哥譚',handle:'goodnight_gotham',bio:'晚上比較清醒。',avatar:'assets/person-lin.svg'},
 {name:'米亞',handle:'mia_afterfive',bio:'五點以後才是我的時間。',avatar:'assets/person-rain.svg'},
 {name:'湯姆森',handle:'thomson_g',bio:'住在河邊。',avatar:'assets/person-chen.svg'},
 {name:'艾倫',handle:'alan_corner',bio:'城市觀察。',avatar:'assets/person-lin.svg'},
 {name:'蘇菲',handle:'sophie_park',bio:'拍照、散步、咖啡。',avatar:'assets/avatar-3.svg'},
 {name:'卡洛',handle:'carlo_notes',bio:'一些城市雜記。',avatar:'assets/avatar-2.svg'},
 {name:'舊報紙',handle:'old_newspaper',bio:'昨天的新聞也是新聞。',avatar:'assets/avatar-2.svg'},
 {name:'老城區居民',handle:'old_gotham_resident',bio:'搬來很多年了。',avatar:'assets/person-chen.svg'},
 {name:'看熱鬧的',handle:'just_here_for_this',bio:'沒有立場。',avatar:'assets/avatar-3.svg'},
 {name:'老朋友',handle:'old_friend_g',bio:'認識一些人，也認識一些事。',avatar:'assets/person-chen.svg'},
 {name:'沒有新聞',handle:'no_news_today',bio:'希望今天沒有新聞。',avatar:'assets/avatar-2.svg'}
];
const POSTS=[
  {
    id:'p1',
    time:'2小時',
    text:'今天下午突然很認真地思考了一件事：\n工作究竟代表什麼，是為了錢，還是生活的意義。',
    likes:418,reposts:29,shares:7,
    replies:[
      {name:'73號',handle:'room_73',avatar:'assets/avatar-3.svg',text:'你上班上瘋了吧，哈哈。',likes:16,reposts:1,shares:0,ownerLiked:true},
      {name:'莉莉絲・凱特',handle:PROFILE.handle,avatar:PROFILE.avatar,isAuthor:true,text:'唉。',likes:73,reposts:4,shares:1}
    ]
  },

  {
    id:'p2',
    time:'1天',
    text:'整理衣櫃。\n怎麼這麼多衣服。',
    likes:362,reposts:27,shares:6,
    replies:[
      {name:'路過的人',handle:'passing_by',avatar:'assets/avatar-2.svg',text:'真的需要準備這麼衣服嗎？',likes:21,reposts:2,shares:0},
      {name:'莉莉絲・凱特',handle:PROFILE.handle,avatar:PROFILE.avatar,isAuthor:true,text:'看你負責什麼工作。但我以前是需要的。',likes:48,reposts:2,shares:1}
    ]
  },

  {
    id:'p3',
    time:'3天',
    text:'晚上經過都奈橋。\n現在都要拆了嗎。',
    likes:591,reposts:43,shares:12,
    replies:[
      {name:'GothamDaily',handle:'gotham_daily',avatar:'assets/avatar-2.svg',text:'畢竟有可能有安全疑慮？',likes:18,reposts:1,shares:0},
      {name:'莉莉絲・凱特',handle:PROFILE.handle,avatar:PROFILE.avatar,isAuthor:true,text:'是啊，只是很感嘆。',likes:84,reposts:5,shares:2}
    ]
  },


  {
    id:'p6',
    time:'2週',
    text:'有人問我為什麼最近幾乎不談現在的工作。\n因為現在這份工作不太算是鎂光燈下的工作。\n沒什麼好一直說的。',
    likes:831,reposts:47,shares:15,
    replies:[
      {name:'路過的人',handle:'passing_by',avatar:'assets/avatar-2.svg',text:'但妳以前真的很常發工作的事情耶。',likes:34,reposts:3,shares:1},
      {name:'莉莉絲・凱特',handle:PROFILE.handle,avatar:PROFILE.avatar,isAuthor:true,text:'因為那時候的工作也確實蠻有意思的。',likes:107,reposts:7,shares:2}
    ]
  },

  
  {
    id:'p10',
    time:'2個月',
    text:'最近開始正常吃早餐。\n以前早上不是趕會議就是趕車，早餐通常在路上解決。\n今天坐下來慢慢吃完，突然覺得這件事以前好像很奢侈。',
    likes:537,reposts:34,shares:8,
    replies:[
      {name:'73號',handle:'room_73',avatar:'assets/avatar-3.svg',text:'妳以前到底幾點開始上班？',likes:18,reposts:1,shares:0},
      {name:'莉莉絲・凱特',handle:PROFILE.handle,avatar:PROFILE.avatar,isAuthor:true,text:'不想回憶。',likes:77,reposts:5,shares:1}
    ]
  },


  {
    id:'p14',
    time:'2026-3-16',
    text:'最近收到大家很多的訊息，謝謝大家。\n我已經正式從民主黨市府幕僚這份工作離職。\n感謝各界的關心。',
	clueTitle:'市長犯罪',
    clue:'市長在晚宴上似乎爆出醜聞，被蝙蝠俠(的羅賓們)當眾逮捕。',
    likes:5718,reposts:54,shares:816,
    replies:[
      {name:'瑪莎',handle:'martha_works',avatar:'assets/avatar-3.svg',text:'希爾市長無罪！！！！',likes:27,reposts:1,shares:0},
      {name:'蘇菲',handle:'sophie_park',avatar:'assets/avatar-3.svg',text:'希爾市長不可能犯罪！。',likes:119,reposts:8,shares:2},
	  {name:'湯姆森',handle:'thomson_g',avatar:'assets/person-chen.svg',text:'希爾王八蛋背信棄義！',likes:85,reposts:2,shares:0},
      {name:'小報讀者',handle:'tabloid_reader',avatar:'assets/person-rain.svg',text:'報紙上說的都是真的嗎？？天啊。',likes:128,reposts:6,shares:0},
	  {name:'米亞',handle:'mia_afterfive',avatar:'assets/person-rain.svg',text:'希爾市長沒有錯！！',likes:150,reposts:1,shares:2},
      {name:'布朗先生',handle:'mr_brown_g',avatar:'assets/person-lin.svg',text:'哇這邊太精采了吧，留友看。',likes:58,reposts:7,shares:3},
	  {name:'安娜',handle:'anna_daily',avatar:'assets/avatar-3.svg',text:'希爾市長無罪！那些報導根本沒有證據！',likes:96,reposts:4,shares:1},
	  {name:'傑克',handle:'jack_in_city',avatar:'assets/person-chen.svg',text:'都爆出這麼多事情了，還有人相信他？',likes:143,reposts:11,shares:3},
	  {name:'凱特',handle:'kate_k',avatar:'assets/person-rain.svg',text:'一張報紙寫什麼你們就信什麼，也太好操弄了吧。',likes:87,reposts:5,shares:0},
	  {name:'老城居民',handle:'oldtown_resident',avatar:'assets/person-lin.svg',text:'我住這裡二十年了，希爾上任後城市明明變得更好。',likes:171,reposts:13,shares:5},
	  {name:'艾倫',handle:'allen_watch',avatar:'assets/person-chen.svg',text:'蝙蝠俠都把他抓走了，相信蝙蝠俠。',likes:204,reposts:18,shares:4},
	  {name:'露西',handle:'lucy_says',avatar:'assets/avatar-3.svg',text:'蝙蝠俠才是社會亂源！',likes:118,reposts:7,shares:2},
	  {name:'喬治',handle:'george_news',avatar:'assets/person-lin.svg',text:'嚴格來說，逮捕他的是夜翼和紅頭罩跟羅賓們，\n英雄大集結！我在現場！',likes:775,reposts:13,shares:152},
	  {name:'匿名市民',handle:'citizen_404',avatar:'assets/person-rain.svg',text:'笑死，報紙寫了就一定是真的？記者從來不會說謊是不是？',likes:189,reposts:16,shares:3},
	  {name:'海倫',handle:'helen_home',avatar:'assets/avatar-3.svg',text:'你要不要自己出來選?',likes:131,reposts:6,shares:1},
	  {name:'威廉',handle:'william_w',avatar:'assets/person-chen.svg',text:'希望蝙蝠俠趕快把希爾送進監獄。',likes:156,reposts:12,shares:4},
	  {name:'莉莎',handle:'lisa_coffee',avatar:'assets/person-rain.svg',text:'蝙蝠俠只負責抓人\n送進監獄是檢察官的事啦，你是法盲喔？',likes:102,reposts:5,shares:2},
	  {name:'馬克',handle:'mark_truth',avatar:'assets/person-lin.svg',text:'做過好事就能偷工減料？他還脅持布魯斯韋恩耶，這是什麼邏輯？',likes:220,reposts:21,shares:7},
	  {name:'城南阿姨',handle:'southside_auntie',avatar:'assets/avatar-3.svg',text:'我不管你們怎麼說，反正我相信希爾市長！',likes:64,reposts:2,shares:0},
	  {name:'戴維',handle:'david_question',avatar:'assets/person-chen.svg',text:'所以這樣希爾會和柯波特成為獄友嗎？',likes:147,reposts:9,shares:2},
	  {name:'珍妮',handle:'jenny_j',avatar:'assets/person-rain.svg',text:'哈哈你們自己選的，留友看民主黨支持者崩潰。',likes:198,reposts:14,shares:5},
	  {name:'保羅',handle:'paul_cityhall',avatar:'assets/person-lin.svg',text:'都是經濟罪犯，還真的有可能關在一起。',likes:91,reposts:5,shares:1},
	  {name:'報童',handle:'paperboy_7',avatar:'assets/person-chen.svg',text:'這周的報紙銷量都很好，整條街都在討論這件事。',likes:112,reposts:8,shares:3},
	  {name:'莎拉',handle:'sarah_here',avatar:'assets/avatar-3.svg',text:'連幕僚都落跑了，還能有什麼假的。',likes:176,reposts:15,shares:6},
	  {name:'尼克',handle:'nick_no_filter',avatar:'assets/person-rain.svg',text:'說不定只是正常換工作啊\n怎樣，幕僚就不能換工作喔?',likes:163,reposts:10,shares:2}
	  
    ]
  },

  {
  id:'p15',
  time:'2026-3-15',
  text:'昨晚結束之後，接了一整晚的電話。\n',
  likes:936,reposts:81,shares:25,
  replies:[
    {name:'GothamDaily',handle:'gotham_daily',avatar:'assets/avatar-2.svg',text:'昨晚辛苦了。',likes:44,reposts:5,shares:1},
    {name:'莉莉絲・凱特',handle:PROFILE.handle,avatar:PROFILE.avatar,isAuthor:true,text:'謝謝。',likes:103,reposts:6,shares:2},
    {name:'莎拉',handle:'sarah_here',avatar:'assets/avatar-3.svg',text:'所以市政府到底知不知道希爾做了什麼？',likes:186,reposts:17,shares:5},
    {name:'安娜',handle:'anna_daily',avatar:'assets/avatar-3.svg',text:'她只是一個幕僚，你們為什麼要把市長做的事情算在她頭上？',likes:121,reposts:6,shares:2},
    {name:'傑克',handle:'jack_in_city',avatar:'assets/person-chen.svg',text:'市長在晚宴上被當眾抓走，市府幕僚一句話都不用交代？',likes:215,reposts:19,shares:7},
    {name:'凱特',handle:'kate_k',avatar:'assets/person-rain.svg',text:'要交代也是警方和市長本人交代，騷擾基層工作人員幹嘛。',likes:98,reposts:5,shares:1},
    {name:'尼克',handle:'nick_no_filter',avatar:'assets/person-rain.svg',text:'整晚打電話去騷擾人的是有什麼毛病？\n她看起來也根本不知道發生什麼事。',likes:177,reposts:13,shares:4},
    {name:'馬克',handle:'mark_truth',avatar:'assets/person-lin.svg',text:'不知道？晚會是市府辦的，希爾還在現場挾持布魯斯・韋恩，她怎麼可能完全不知情？',likes:249,reposts:24,shares:9},
    {name:'露西',handle:'lucy_says',avatar:'assets/avatar-3.svg',text:'現在連「挾持」都是你們自己說的，現場那麼亂，誰看清楚了？',likes:114,reposts:8,shares:2},
    {name:'喬治',handle:'george_news',avatar:'assets/person-lin.svg',text:'我在現場，韋恩確實被希爾控制住了。\n夜翼他們衝進來之後才把人救下來。',likes:681,reposts:72,shares:118},
    {name:'匿名市民',handle:'citizen_404',avatar:'assets/person-rain.svg',text:'又一個自稱在現場的，現在網路上每個人都坐第一排是不是？',likes:203,reposts:15,shares:4},
    {name:'報童',handle:'paperboy_7',avatar:'assets/person-chen.svg',text:'昨天星球日報已經刊出現場照片了，不用在場才能看到喔！',likes:156,reposts:12,shares:3},
    {name:'小報讀者',handle:'tabloid_reader',avatar:'assets/person-rain.svg',text:'每一家報紙寫的版本都不一樣，我已經不知道該信誰了。',likes:139,reposts:7,shares:1},
    {name:'艾倫',handle:'allen_watch',avatar:'assets/person-chen.svg',text:'相信蝙蝠俠就好，他們不會無緣無故在公開場合抓走市長吧。',likes:281,reposts:23,shares:8},
    {name:'城南阿姨',handle:'southside_auntie',avatar:'assets/avatar-3.svg',text:'蒙面義警想抓誰就抓誰，這樣還有人覺得很正常？',likes:91,reposts:4,shares:1},
    {name:'威廉',handle:'william_w',avatar:'assets/person-chen.svg',text:'現場還有警察，最後是警察把希爾帶走的，不是義警私刑。',likes:194,reposts:14,shares:4},
    {name:'戴維',handle:'david_question',avatar:'assets/person-chen.svg',text:'那些電話是記者打的，還是市民打的？\n市府什麼時候開記者會？',likes:133,reposts:6,shares:2},
    {name:'莉莉絲・凱特',handle:PROFILE.handle,avatar:PROFILE.avatar,isAuthor:true,text:'我目前沒有能夠公開說明的內容。',likes:347,reposts:28,shares:11},
    {name:'海倫',handle:'helen_home',avatar:'assets/avatar-3.svg',text:'辛苦了。',likes:224,reposts:18,shares:6},
    {name:'米亞',handle:'mia_afterfive',avatar:'assets/person-rain.svg',text:'也可能是市府要求所有人封口啊，她說了才會害到自己吧。',likes:148,reposts:9,shares:2},
    {name:'保羅',handle:'paul_cityhall',avatar:'assets/person-lin.svg',text:'如果事情涉及正在調查的案件，本來就不能隨便對外透露。',likes:172,reposts:11,shares:3},
    {name:'老城居民',handle:'oldtown_resident',avatar:'assets/person-lin.svg',text:'先等調查結果吧，現在網路上連希爾已經認罪的謠言都有了。',likes:127,reposts:8,shares:2},
    {name:'湯姆森',handle:'thomson_g',avatar:'assets/person-chen.svg',text:'他好像的確已經在現場認罪了耶報導有寫。',likes:269,reposts:25,shares:9},
    {name:'瑪莎',handle:'martha_works',avatar:'assets/avatar-3.svg',text:'我不管，希爾無罪！',likes:101,reposts:6,shares:1},
    {name:'布朗先生',handle:'mr_brown_g',avatar:'assets/person-lin.svg',text:'留言區怎麼又打起來了，留友看。',likes:76,reposts:9,shares:2}
  ]
},

{
  id:'p16',
  time:'2026-3-14',
  text:'都奈橋建成周年紀念晚會開始了。',
  clueTitle:'周年紀念晚會',
  clue:'莉莉絲似乎因為周年紀念晚會的事情很頭痛。',
  likes:1328,reposts:117,shares:42,
  image:'assets/party.jpg',
  replies:[
    {name:'73號',handle:'room_73',avatar:'assets/avatar-3.svg',text:'沒有想到市長是這樣的人。',likes:51,reposts:5,shares:1},
    {name:'GothamDaily',handle:'gotham_daily',avatar:'assets/avatar-2.svg',text:'你是否知情市長私底下做的這些事？',likes:32,reposts:4,shares:1},
    {name:'莉莉絲・凱特',handle:PROFILE.handle,avatar:PROFILE.avatar,isAuthor:true,text:'我不想回答這些事。',likes:138,reposts:9,shares:3},
    {name:'喬治',handle:'george_news',avatar:'assets/person-lin.svg',text:'現場現在一團亂，希爾市長剛剛被夜翼和紅頭罩攔下來了！',likes:892,reposts:146,shares:203},
    {name:'小報讀者',handle:'tabloid_reader',avatar:'assets/person-rain.svg',text:'真的假的？？我朋友說現場連羅賓都出現了。',likes:327,reposts:31,shares:12},
    {name:'艾倫',handle:'allen_watch',avatar:'assets/person-chen.svg',text:'是真的，至少有三個人從宴會廳上方跳下來。\n好多英雄喔！',likes:614,reposts:88,shares:76},
    {name:'露西',handle:'lucy_says',avatar:'assets/avatar-3.svg',text:'一群蒙面人闖進市府活動抓走民選市長，你們還在那邊歡呼？',likes:194,reposts:16,shares:5},
    {name:'威廉',handle:'william_w',avatar:'assets/person-chen.svg',text:'希爾當時手上有人質，不攔他難道站著看？',likes:353,reposts:29,shares:11},
    {name:'安娜',handle:'anna_daily',avatar:'assets/avatar-3.svg',text:'誰說是人質？影片根本看不清楚，只看到韋恩先生站在他旁邊。',likes:142,reposts:9,shares:2},
    {name:'馬克',handle:'mark_truth',avatar:'assets/person-lin.svg',text:'他拿槍抵著布魯斯・韋恩，這還不叫人質嗎？',likes:428,reposts:42,shares:16},
    {name:'瑪莎',handle:'martha_works',avatar:'assets/avatar-3.svg',text:'那支槍也可能不是希爾市長的！現場這麼亂，誰都能塞給他！',likes:116,reposts:7,shares:1},
    {name:'傑克',handle:'jack_in_city',avatar:'assets/person-chen.svg',text:'都已經親眼看到他拿著了，支持者還能說是別人塞的，民主黨支持者腦子有洞吧。',likes:311,reposts:26,shares:8},
    {name:'凱特',handle:'kate_k',avatar:'assets/person-rain.svg',text:'新聞上爆的那些料不是真的吧？',likes:163,reposts:10,shares:3},
    {name:'匿名市民',handle:'citizen_404',avatar:'assets/person-rain.svg',text:'你們哥譚真亂。',likes:295,reposts:34,shares:9},
    {name:'星球日報',handle:'daily_Planet',avatar:'assets/Planet01.jpg',text:'我們報社記者就在現場，希爾確實被警方帶走了，今晚就會有現場完整報導。',likes:248,reposts:22,shares:7},
    {name:'尼克',handle:'nick_no_filter',avatar:'assets/person-rain.svg',text:'被帶走調查不等於有罪好嗎。\n拜託大家先分清楚逮捕和定罪。',likes:271,reposts:19,shares:6},
    {name:'湯姆森',handle:'thomson_g',avatar:'assets/person-chen.svg',text:'都奈橋偷工減料如果出事會害多少人？？現在證據都被報導出來了還想裝無辜？',likes:387,reposts:37,shares:14},
    {name:'老城居民',handle:'oldtown_resident',avatar:'assets/person-lin.svg',text:'橋剛蓋完就發現偷工減料，這些證據誰知道是真是假？？？',likes:155,reposts:12,shares:3},
    {name:'保羅',handle:'paul_cityhall',avatar:'assets/person-lin.svg',text:'工程款挪用被爆料跟橋蓋好多久是兩件事吧？',likes:306,reposts:25,shares:8},
    {name:'米亞',handle:'mia_afterfive',avatar:'assets/person-rain.svg',text:'希爾上任後明明做了那麼多建設，現在所有人都當他是定罪的罪犯。',likes:173,reposts:11,shares:2},
    {name:'珍妮',handle:'jenny_j',avatar:'assets/person-rain.svg',text:'做建設花的是納稅人的錢，不是希爾自己掏腰包，少把他說得像慈善家。',likes:344,reposts:32,shares:10},
    {name:'城南阿姨',handle:'southside_auntie',avatar:'assets/avatar-3.svg',text:'我只知道希爾上任後治安真的有變好。',likes:124,reposts:6,shares:1},
    {name:'戴維',handle:'david_question',avatar:'assets/person-chen.svg',text:'可是抓他的不就是每天晚上在處理治安問題的那些人嗎？',likes:283,reposts:21,shares:6},
    {name:'莎拉',handle:'sarah_here',avatar:'assets/avatar-3.svg',text:'莉莉絲你是晚會的工作人員吧？市長被抓之前有沒有什麼異常？',likes:237,reposts:17,shares:5},
    {name:'莉莉絲・凱特',handle:PROFILE.handle,avatar:PROFILE.avatar,isAuthor:true,text:'請恕我無法回答。',likes:292,reposts:23,shares:9},
    {name:'海倫',handle:'helen_home',avatar:'assets/avatar-3.svg',text:'「無法回答」跟「不知情」不一樣喔。',likes:319,reposts:28,shares:8},
    {name:'安娜',handle:'anna_daily',avatar:'assets/avatar-3.svg',text:'你們不要一直逼問她，她又不是警察，也不是希爾的律師。',likes:168,reposts:10,shares:2},
    {name:'傑克',handle:'jack_in_city',avatar:'assets/person-chen.svg',text:'她是市府幕僚，也是晚會工作人員，記者問她很正常吧。',likes:226,reposts:15,shares:4},
    {name:'露西',handle:'lucy_says',avatar:'assets/avatar-3.svg',text:'正常採訪跟跑到私人帳號圍攻是兩回事。',likes:192,reposts:13,shares:3},
    {name:'布朗先生',handle:'mr_brown_g',avatar:'assets/person-lin.svg',text:'原本只是周年晚會，最後變成市長被英雄包圍，我今晚真的沒白來。',likes:481,reposts:49,shares:21},
    {name:'喬治',handle:'george_news',avatar:'assets/person-lin.svg',text:'更新：布魯斯・韋恩已經被救護人員帶離現場，看起來沒有受傷。',likes:734,reposts:103,shares:89},
    {name:'小報讀者',handle:'tabloid_reader',avatar:'assets/person-rain.svg',text:'韋恩先生又被綁架了嗎？他到底為什麼每次參加活動都會出事？？',likes:516,reposts:61,shares:34},
    {name:'匿名市民',handle:'citizen_404',avatar:'assets/person-rain.svg',text:'哥譚首富的日常行程：慈善晚會、發表演說、被綁架。',likes:917,reposts:126,shares:52}
  ]
},

  {
    id:'p17',
    time:'2026-3-12',
    text:'距離晚宴還有兩天。\n座位表今天又改了一次。',
    likes:845,reposts:74,shares:20,
    replies:[
      {name:'路過的人',handle:'passing_by',avatar:'assets/avatar-2.svg',text:'座位到底有多難排？',likes:28,reposts:2,shares:0},
      {name:'莉莉絲・凱特',handle:PROFILE.handle,avatar:PROFILE.avatar,isAuthor:true,text:'你不知道一張桌子可以牽涉多少人的自尊。',likes:113,reposts:8,shares:3}
    ]
  },

  {
    id:'p18',
    time:'2026-3-08',
    text:'今天確認晚宴媒體名單。\n有人問為什麼記者席不能再靠前一點。\n因為再靠前就全都是投資人了，抱歉啦！',
    likes:1064,reposts:91,shares:28,
    replies:[
      {name:'星球日報記者',handle:'daily_Planet',avatar:'assets/Planet01.jpg',text:'好吧🥹',likes:34,reposts:3,shares:1},
      {name:'克朗',handle:'Krona458',avatar:'assets/Krona01.jpg',text:'投資人太重要了，對吧。',likes:52,reposts:5,shares:1},
      {name:'莉莉絲・凱特',handle:PROFILE.handle,avatar:PROFILE.avatar,isAuthor:true,text:'成年人的社會啊。',likes:96,reposts:6,shares:2}
    ]
  },

  {
    id:'p20',
    time:'2026-2-18',
    text:'今天市長的公開行程結束得比預定早半小時！圓滿達成提早回家！\n',
    likes:739,reposts:62,shares:17,
    replies:[
      {name:'73號',handle:'room_73',avatar:'assets/avatar-3.svg',text:'恭喜！',likes:21,reposts:1,shares:0},
      {name:'莉莉絲・凱特',handle:PROFILE.handle,avatar:PROFILE.avatar,isAuthor:true,text:'好累！',likes:63,reposts:3,shares:1}
    ]
  },

  {
    id:'p21',
    time:'2026-2-02',
    text:'今天終於收到所有人的周年晚宴邀請答覆了！布魯斯韋恩堂堂登場！',
    likes:624,reposts:48,shares:12,
    replies:[
      {name:'GothamDaily',handle:'gotham_daily',avatar:'assets/avatar-2.svg',text:'天啊，哥譚甜心欸，他去晚宴幹什麼？',likes:25,reposts:2,shares:0},
      {name:'莉莉絲・凱特',handle:PROFILE.handle,avatar:PROFILE.avatar,isAuthor:true,text:'哥譚甜心、晚宴，多麼搭配的兩個詞。',likes:97,reposts:7,shares:2}
    ]
  },

  {
    id:'p22',
    time:'2026-1-16',
    text:'今年第一場大型活動開始準備！',
    likes:471,reposts:36,shares:8,
    replies:[
      {name:'路過的人',handle:'passing_by',avatar:'assets/avatar-2.svg',text:'加油！',likes:19,reposts:1,shares:0},
      {name:'莉莉絲・凱特',handle:PROFILE.handle,avatar:PROFILE.avatar,isAuthor:true,text:'謝謝你～',likes:52,reposts:3,shares:1}
    ]
  },

  {
    id:'p23',
    time:'2026-1-05',
    text:'新年第一個工作日。\n市長說今年會是非常重要的一年。\n我看過第一季的行程表了，滿滿當當的。\n。',
    likes:813,reposts:63,shares:18,
    replies:[
      {name:'73號',handle:'room_73',avatar:'assets/avatar-3.svg',text:'天啊，感覺就很累。',likes:46,reposts:3,shares:1},
      {name:'莉莉絲・凱特',handle:PROFILE.handle,avatar:PROFILE.avatar,isAuthor:true,text:'我相信今年會很忙。',likes:103,reposts:7,shares:2}
    ]
  },

  {
    id:'p24',
    time:'2025-12-20',
    text:'年底辦公室大掃除！\n今年有很多便利貼。\n其中一張寫著「記得吃飯」。\n忘記是誰寫的了，但我決定保留！',
	image:'assets/GA.jpg',
    likes:687,reposts:42,shares:10,
    replies:[
      {name:'無名',handle:'anonymous_gotham',avatar:'assets/person-unknown.svg',text:'吃飯是很重要的事！',likes:37,reposts:3,shares:1},
      {name:'莉莉絲・凱特',handle:PROFILE.handle,avatar:PROFILE.avatar,isAuthor:true,text:'對呀！',likes:72,reposts:4,shares:1}
    ]
  },

  {
    id:'p25',
    time:'2025-11-06',
    text:'分享一下市長的趣事，他今天進辦公室的時候才發現他鞋子左右穿反了。',
    likes:902,reposts:79,shares:22,
    replies:[
      {name:'小雨',handle:'rainy_window',avatar:'assets/avatar-2.svg',text:'這樣穿不會不舒服嗎？',likes:29,reposts:2,shares:0},
      {name:'莉莉絲・凱特',handle:PROFILE.handle,avatar:PROFILE.avatar,isAuthor:true,text:'顯然他累到沒辦法意識到不舒服這件事。',likes:81,reposts:6,shares:2}
    ]
  },

  {
    id:'p26',
    time:'2025-10-18',
    text:'今天和市長去社區活動。\n小朋友問他是不是每天都穿西裝。\n那確實',
    likes:776,reposts:54,shares:14,
    replies:[
      {name:'73號',handle:'room_73',avatar:'assets/avatar-3.svg',text:'那妳呢？',likes:15,reposts:1,shares:0},
      {name:'莉莉絲・凱特',handle:PROFILE.handle,avatar:PROFILE.avatar,isAuthor:true,text:'我每天都在想今天要不要穿西裝。',likes:48,reposts:3,shares:1}
    ]
  },

  {
    id:'p27',
    time:'2025-09-16',
    text:'又被貓咬了。',
    likes:641,reposts:45,shares:11,
    replies:[
      {name:'GothamDaily',handle:'gotham_daily',avatar:'assets/avatar-2.svg',text:'你家貓蠻兇的。',likes:24,reposts:2,shares:0},
      {name:'莉莉絲・凱特',handle:PROFILE.handle,avatar:PROFILE.avatar,isAuthor:true,text:'又凶又胖。',likes:63,reposts:4,shares:1}
    ]
  },

  {
    id:'p28',
    time:'2025-8-31',
    text:'恭喜希爾市長\n生日快樂！',
    likes:1384,reposts:26,shares:48,
    clueTitle:'希爾市長的生日',
    clue:'希爾的生日是8月31日。',
    replies:[
      {name:'73號',handle:'room_73',avatar:'assets/avatar-3.svg',text:'希爾市長生日快樂！',likes:18,reposts:24,shares:1},
      {name:'陳暮',handle:'muchen_26',avatar:'assets/person-chen.svg',text:'希爾生日快樂！你也辛苦了。',likes:16,reposts:17,shares:1}
    ]
  },

  {
    id:'p29',
    time:'2025-8-20',
    text:'開始有人提醒我市長生日快到了。\n早在兩個月以前，行程、賓客名單和備用方案就已經確認完畢了！\n謝謝大家對我記憶力的關心。',
    likes:513,reposts:31,shares:7,
    replies:[
      {name:'無名',handle:'anonymous_gotham',avatar:'assets/person-unknown.svg',text:'幕僚的生日提醒系統是不是很可怕。',likes:27,reposts:2,shares:0},
      {name:'莉莉絲・凱特',handle:PROFILE.handle,avatar:PROFILE.avatar,isAuthor:true,text:'非常有效率。',likes:51,reposts:3,shares:1}
    ]
  },

  {
    id:'p30',
    time:'2025-7-04',
    text:'你們看我養的貓。',
	image:'assets/cat01.jpg',
    likes:882,reposts:71,shares:20,
    replies:[
      {name:'路過的人',handle:'passing_by',avatar:'assets/avatar-2.svg',text:'好可愛',likes:37,reposts:3,shares:1},
      {name:'莉莉絲・凱特',handle:PROFILE.handle,avatar:PROFILE.avatar,isAuthor:true,text:'他剛剛又抓我了啦。',likes:116,reposts:8,shares:3}
    ]
  },

  {
    id:'p31',
    time:'2025-4-23',
    text:'今天是都奈橋公共建設說明會。',
    likes:947,reposts:84,shares:24,
    replies:[
      {name:'73號',handle:'room_73',avatar:'assets/avatar-3.svg',text:'我有看到直播',likes:26,reposts:1,shares:0},
      {name:'莉莉絲・凱特',handle:PROFILE.handle,avatar:PROFILE.avatar,isAuthor:true,text:'唉。',likes:129,reposts:9,shares:3},
	  {name:'報紙角落',handle:'corner_of_paper',avatar:'assets/person-unknown.svg',text:'所以都奈橋到底要蓋多久？已經蓋五年了！',likes:26,reposts:1,shares:0},
    ]
  },

  {
    id:'p32',
    time:'2025-2-14',
    text:'今天辦公室收到很多花。\n但有時候送花的人未必都懷著愛意。',
    likes:438,reposts:28,shares:6,
    replies:[
      {name:'無名',handle:'anonymous_gotham',avatar:'assets/person-unknown.svg',text:'你們到底都收到了些什麼...？',likes:17,reposts:1,shares:0},
      {name:'莉莉絲・凱特',handle:PROFILE.handle,avatar:PROFILE.avatar,isAuthor:true,text:'我不方便回答這個問題。',likes:54,reposts:3,shares:1}
    ]
  },

  {
    id:'p33',
    time:'2024-11-29',
    text:'年底整理市長今年的公開活動。\n會議、視察、剪綵、演講，共四百二十七場，這還不含質詢和市政事務，不愧是希爾市長。',
    likes:529,reposts:37,shares:9,
    replies:[
      {name:'GothamDaily',handle:'gotham_daily',avatar:'assets/avatar-2.svg',text:'市長好強喔。',likes:31,reposts:2,shares:0},
      {name:'莉莉絲・凱特',handle:PROFILE.handle,avatar:PROFILE.avatar,isAuthor:true,text:'還有機場。忘了說。',likes:44,reposts:2,shares:1}
    ]
  },

  {
    id:'p39',
    time:'2024-8-21',
    text:'祝我生日快樂！收到來自市府同僚的好多生日禮物！謝謝大家！',
	image:'assets/cake.jpg',
	clueTitle:'莉莉絲的生日',
    clue:'莉莉絲的生日是8月21日。',
    likes:614,reposts:48,shares:12,
    replies:[
      {name:'艾蜜莉',handle:'emily_gotham',avatar:'assets/avatar-3.svg',text:'市長有送你嗎？',likes:28,reposts:2,shares:0},
      {name:'莉莉絲・凱特',handle:PROFILE.handle,avatar:PROFILE.avatar,isAuthor:true,text:'秘密。',likes:66,reposts:4,shares:1}
    ]
  },

  {
    id:'p34',
    time:'2024-8-07',
    text:'市長今天從早上八點一路跑到晚上九點。\n大家都在車上睡著了。',
    likes:614,reposts:48,shares:12,
    replies:[
      {name:'73號',handle:'room_73',avatar:'assets/avatar-3.svg',text:'市長有睡嗎？',likes:28,reposts:2,shares:0},
      {name:'莉莉絲・凱特',handle:PROFILE.handle,avatar:PROFILE.avatar,isAuthor:true,text:'他很努力抓時間休息啦。',likes:66,reposts:4,shares:1}
    ]
  },

  {
    id:'p35',
    time:'2024-2-16',
    text:'收到現場傳過來的一些文件，看來這不是只是簡單修改一下法案能解決的事情。',
    likes:483,reposts:39,shares:9,
    replies:[
      {name:'路過的人',handle:'passing_by',avatar:'assets/avatar-2.svg',text:'市政工作感覺好累。',likes:22,reposts:1,shares:0},
      {name:'莉莉絲・凱特',handle:PROFILE.handle,avatar:PROFILE.avatar,isAuthor:true,text:'但蠻開心的。',likes:58,reposts:3,shares:1}
    ]
  },

  {
    id:'p36',
    time:'2023-12-11',
    text:'明天市長有六場公開行程，橫跨三個行政區。\n光明天的行程表和行車路線我就做了10頁，已經感受到是地獄行程了。',
    likes:367,reposts:24,shares:5,
    replies:[
      {name:'無名',handle:'anonymous_gotham',avatar:'assets/person-unknown.svg',text:'這樣有做意外備案嗎？',likes:12,reposts:1,shares:0},
      {name:'莉莉絲・凱特',handle:PROFILE.handle,avatar:PROFILE.avatar,isAuthor:true,text:'後面三頁全是備案。',likes:39,reposts:2,shares:0}
    ]
  },

  {
    id:'p37',
    time:'2023-9-03',
    text:'今天市政活動好忙。\n但希爾市長閃閃發光的耶，你們看。',
    likes:298,reposts:19,shares:4,
	image:'assets/HILL01.jpg',
    replies:[
      {name:'73號',handle:'room_73',avatar:'assets/avatar-3.svg',text:'哇這個光線很棒欸。',likes:17,reposts:1,shares:0},
      {name:'莉莉絲・凱特',handle:PROFILE.handle,avatar:PROFILE.avatar,isAuthor:true,text:'我也這麼認為。',likes:31,reposts:1,shares:0}
    ]
  },

  {
    id:'p38',
    time:'2023-7-09',
    text:'辦了脆的帳號。\n大家好，我是莉莉絲 凱特 目前擔任希爾的幕僚。\n請多指教！',
    likes:341,reposts:26,shares:6,
    replies:[
      {name:'路過的人',handle:'passing_by',avatar:'assets/avatar-2.svg',text:'莉莉絲也辦脆啦。',likes:14,reposts:1,shares:0},
      {name:'莉莉絲・凱特',handle:PROFILE.handle,avatar:PROFILE.avatar,isAuthor:true,text:'對啊，現在還在熟悉脆的操作。',likes:43,reposts:2,shares:0}
    ]
  }
];
const REPLY_POSTS=[
 {
	id:'reply1',
	time:'2025-08-11',
	text:'天神降臨。',
	likes:57,reposts:8,shares:2,
	replies:[
	 {
		name:'哥譚觀察',
		handle:'gotham_watch',
		avatar:'assets/person-chen.svg',
		text:'民主黨現在都自認是神了？',
		likes:21,reposts:5,shares:1,
		ownerLiked:true
	 }
	]
 }
];
const MEDIA_POSTS=POSTS.filter(post=>post.image);
const REPOST_POSTS=[
  {
    id:'repost1',isRepost:true,
    author:'BTA250',handle:'BTA250',avatar:'assets/al520.jpg',time:'6小時',
    text:'現代人常陷入一種迷思：認為在愛情中做到絕對的真實與毫无保留，才是通往深層連結的唯一路徑。\n然而從心理學與實務經驗來看，缺乏界線的「過度自我暴露」往往事與願違。當真誠失去了分寸，它不再是建立信任的橋樑，反而可能轉化為對關係的隱形施壓，進而加速親密關係的崩解。究竟這份「毫無保留」背後隱藏著怎樣的心理機制，又是如何一步步侵蝕了彼此的感情？',
    likes:302,reposts:74,shares:22,
    replies:[{name:'林七',handle:'lin_seven',avatar:'assets/person-lin.svg',
		text:'這篇分析寫得滿準的。',likes:18,reposts:4,shares:2}]}
];
const ALT_POSTS=[
  {
    id:'alt1',
    author:ALT.name,
    handle:ALT.handle,
    avatar:ALT.avatar,
    time:'2026-8-31',
    text:'他說生日不是值得慶祝的日子。\n可每年的今天，他還是會特地抓時間回家跟家人團聚。',
    likes:31,reposts:4,shares:1,
    replies:[
      {
        name:'無名',
        handle:'deleted_0826',
        avatar:'assets/person-unknown.svg',
        text:'祝那個人生日快樂。',
        likes:7,reposts:0,shares:0
      }
    ]
  },

  {
    id:'alt2',
    author:ALT.name,
    handle:ALT.handle,
    avatar:ALT.avatar,
    time:'2026-8-26',
    text:'我想見他，但他不可能願意見我吧',
    likes:18,reposts:2,shares:0,
    replies:[]
  },

  {
    id:'alt3',
    author:ALT.name,
    handle:ALT.handle,
    avatar:ALT.avatar,
    time:'2026-3-14',
    text:'這樣他就見不到他老婆了吧。\n這樣一想，一切痛也是甜的。',
    likes:24,reposts:3,shares:1,
    replies:[]
  }
];
const ACTIVITY_POSTS=[
 {id:'a1',author:'Gotham Transit',handle:'gotham_transit',avatar:'assets/person-chen.svg',time:'18分鐘',text:'中央線因號誌異常延誤約 12 分鐘。',likes:42,reposts:8,shares:3,replies:[]},
 {id:'a2',author:'雨停以前',handle:'before_rainstops',avatar:'assets/person-rain.svg',time:'1小時',text:'今晚的哥譚下雨了。',likes:17,reposts:1,shares:0,replies:[]},
 {id:'a3',author:'Gotham Ledger',handle:'gotham_ledger',avatar:'assets/person-lin.svg',time:'2小時',text:'市政廳拒絕回應 8 月 26 日會議紀錄缺頁一事。',likes:318,reposts:91,shares:36,replies:[{name:'哥譚觀察',handle:'gotham_watch',avatar:'assets/person-chen.svg',text:'缺的剛好是附件第三頁。',likes:55,reposts:12,shares:4,ownerLiked:true}]},
 {id:'a4',author:'Coffee in Gotham',handle:'coffee_gotham',avatar:'assets/avatar-2.svg',time:'4小時',text:'秋季限定肉桂拿鐵今天開始供應。',likes:73,reposts:6,shares:2,replies:[]},
 {id:'a5',author:'哥譚舊聞考察',handle:'gotham_oldnews',avatar:'assets/person-unknown.svg',time:'5小時',text:'大家還有人記得大概十年前的爆炸案嗎？',likes:86,reposts:13,shares:4,replies:[
   {name:'路過的人',handle:'passing_by',avatar:'assets/avatar-2.svg',text:'哪次？誰做的？',likes:12,reposts:0,shares:0},
   {name:'南區居民',handle:'southside_local',avatar:'assets/person-rain.svg',text:'小丑炸的。',likes:19,reposts:1,shares:0},
   {name:'夜班記者',handle:'night_shift',avatar:'assets/avatar-2.svg',text:'哪次，靠北，小丑炸了好幾次。',likes:44,reposts:3,shares:1},
   {name:'舊報紙',handle:'old_newspaper',avatar:'assets/avatar-2.svg',text:'炸阿卡漢監獄的那次啦！',likes:28,reposts:2,shares:0},
   {name:'小雨',handle:'rainy_window',avatar:'assets/avatar-2.svg',text:'有炸過阿卡漢監獄喔！？',likes:8,reposts:0,shares:0},
   {name:'沒有新聞',handle:'no_news_today',avatar:'assets/avatar-3.svg',text:'阿卡漢監獄現在還在嗎？',likes:11,reposts:0,shares:0},
   {name:'哥譚觀察',handle:'gotham_watch',avatar:'assets/person-chen.svg',text:'欸大家！我找到當時的報導！',link:'https://www.facebook.com/profile.php?id=61579296969600',likes:53,reposts:7,shares:4}
 ]}
];
const CHATS=[
 {id:'friend1',name:'小安',handle:'an_an',avatar:'assets/person-rain.svg',time:'下午 6:42',preview:'週末還要去看展嗎？',messages:[['in','週末還要去看展嗎？'],['out','要啊，時間不變。'],['in','好，那我到捷運站再找你。']]},
 {id:'friend2',name:'艾利',handle:'ALY_1204',avatar:'assets/person-lin.svg',time:'昨天',preview:'你有看到那個貼文嗎？',messages:[['in','你有看到那個貼文嗎？有狗遺失，飼主懸賞十萬的那個'],['out','剛看到。怎麼了？'],['in','在我家附近，我有點想去找看看，哈。']]},
 {id:'group',name:'週五桌遊團',handle:'friday_games',avatar:'assets/person-chen.svg',time:'星期一',preview:'Mika：這週缺一個人',messages:[['in','Mika：這週缺一個人，有誰能帶朋友？'],['out','我再問問看。'],['in','Joe：記得不要再遲到了。']]}
];
const ALL_POSTS=[
  ...new Map(
    [
      ...POSTS,
      ...REPLY_POSTS,
      ...MEDIA_POSTS,
      ...REPOST_POSTS,
      ...ALT_POSTS,
      ...ACTIVITY_POSTS
    ].map(post=>[post.id,post])
  ).values()
];
const CLUES=ALL_POSTS.filter(p=>String(p.clueTitle||'').trim()&&String(p.clue||'').trim());
const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
const STORAGE_KEY='lilith-arg-state-v2';
const saved=JSON.parse(localStorage.getItem(STORAGE_KEY)||'{}');
const state={unlocked:new Set(saved.unlocked||[]),altFollowed:!!saved.altFollowed,mutual:!!saved.mutual,unread:!!saved.unread,view:'profile',previous:'profile'};
function save(){localStorage.setItem(STORAGE_KEY,JSON.stringify({unlocked:[...state.unlocked],altFollowed:state.altFollowed,mutual:state.mutual,unread:state.unread}))}
function esc(v=''){return String(v).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function icon(id){return `<svg><use href="#${id}"/></svg>`}
function avatar(name,src){return `<img class="avatar post-avatar" src="${src}" alt="${esc(name)} 的頭像">`}
function actions(p){const liked=localStorage.getItem('liked-'+p.id)==='1';return `<div class="actions"><button class="action heart ${liked?'liked':''}" data-like="${p.id}">${icon('i-heart')}<span>${p.likes+(liked?1:0)}</span></button><button class="action" data-open="${p.id}">${icon('i-comment')}<span>${p.replies.length}</span></button><button class="action">${icon('i-repost')}<span>${p.reposts||0}</span></button><button class="action">${icon('i-send')}<span>${p.shares||0}</span></button></div>`}
function postHTML(p){const own=!p.author;return `<article class="post" data-post="${p.id}">${avatar(own?PROFILE.name:p.author,own?PROFILE.avatar:p.avatar)}<div><div class="post-header"><strong>${esc(own?PROFILE.handle:p.handle)}</strong><span class="meta">${own?PROFILE.flag+' '+PROFILE.location+' · ':''}${p.time}</span><span class="dots">•••</span></div><p class="post-text">${esc(p.text)}</p>${p.image?`<img class="post-image" src="${p.image}" alt="串文圖片">`:''}${actions(p)}</div></article>`}
function renderFeed(list=POSTS,target='#feed'){const el=$(target);el.innerHTML=list.length?list.map(postHTML).join(''):'<div class="empty">目前沒有內容</div>';bindActions()}
function bindActions(){$$('[data-like]').forEach(b=>b.onclick=e=>{e.stopPropagation();const p=ALL_POSTS.find(x=>x.id===b.dataset.like),on=b.classList.toggle('liked');localStorage.setItem('liked-'+p.id,on?'1':'0');b.querySelector('span').textContent=p.likes+(on?1:0)});$$('[data-post]').forEach(x=>x.onclick=()=>openPost(x.dataset.post));$$('[data-open]').forEach(x=>x.onclick=e=>{e.stopPropagation();openPost(x.dataset.open)})}
function showView(v,previous=state.view,addHistory=true){
  if(!$('#'+v+'View'))return;

  state.previous=previous;
  state.view=v;

  $$('.view').forEach(view=>{
    view.classList.remove('active');
  });

  $('#'+v+'View').classList.add('active');

  const root=v==='profile';

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
function openPost(id){const p=ALL_POSTS.find(x=>x.id===id);unlock(id);showView('detail');$('#detailPost').innerHTML=postHTML(p);const ordered=p.replies.map((r,i)=>({...r,index:i})).sort((a,b)=>Number(b.ownerLiked)-Number(a.ownerLiked));$('#detailReplies').innerHTML=ordered.length?ordered.map(r=>{
  const key=id+'r'+r.index;
  const on=localStorage.getItem('liked-'+key)==='1';

  const isAuthor=
    r.isAuthor===true ||
    r.handle===PROFILE.handle;

  return `<article class="reply">${avatar(r.name,r.avatar)}<div><div class="post-header">
  <strong>${esc(r.handle)}</strong>

<span class="meta">
  ${r.time?`${esc(r.time)} · `:''}
  ${esc(r.flag||'🇺🇸')} ${esc(r.location||'哥譚')}
  ${isAuthor?' · 作者':''}
</span>

  ${
    r.ownerLiked
      ? `
        <span class="owner-liked">
          ♥
          <img src="${PROFILE.avatar}" alt="${esc(PROFILE.name)}">
        </span>
      `
      : ''
  }
</div><p class="post-text">${esc(r.text)}</p>${r.link?`<a class="reply-link" href="${esc(r.link)}" target="_blank" rel="noopener noreferrer">${esc(r.link)}</a>`:''}<div class="actions"><button class="action heart ${on?'liked':''}" data-reply-like="${key}">${icon('i-heart')}<span>${r.likes+(on?1:0)}</span></button><button class="action">${icon('i-comment')}<span>0</span></button><button class="action">${icon('i-repost')}<span>${r.reposts||0}</span></button><button class="action">${icon('i-send')}<span>${r.shares||0}</span></button></div></div></article>`}).join(''):'<div class="empty">尚無回覆</div>';bindActions();$$('[data-reply-like]').forEach(b=>b.onclick=()=>{const on=b.classList.toggle('liked');localStorage.setItem('liked-'+b.dataset.replyLike,on?'1':'0')})}
function unlock(id){if(!CLUES.some(c=>c.id===id)||state.unlocked.has(id))return;state.unlocked.add(id);save();toast('已更新搜尋歷史紀錄');renderProgress()}
function renderProgress(){const found=CLUES.filter(c=>state.unlocked.has(c.id));$('#clueList').innerHTML=found.map((p,i)=>`<div class="clue"><span class="clue-num">${i+1}</span><div><h3>${esc(p.clueTitle)}</h3><p>${esc(p.clue)}</p></div></div>`).join('')}
function renderPeople(type='followers'){const list=type==='followers'?FOLLOWERS:FOLLOWING;$('#followersTab').classList.toggle('active',type==='followers');$('#followingTab').classList.toggle('active',type==='following');$('#peopleList').innerHTML=list.map((p,i)=>`<article class="person ${p.isAlt?'clickable-person':''}" ${p.isAlt?'data-alt-profile="1"':''}><img class="avatar person-avatar" src="${p.avatar}" alt="${esc(p.name)}"><div class="person-copy"><strong>${esc(p.name)}</strong><span>@${esc(p.handle)}</span>${p.bio?`<p>${esc(p.bio)}</p>`:''}</div><button class="mini-follow" data-person-follow="${type}-${i}">追蹤</button></article>`).join('');$$('[data-alt-profile]').forEach(x=>x.onclick=e=>{if(!e.target.closest('[data-person-follow]'))openAlt()});$$('[data-person-follow]').forEach(b=>b.onclick=()=>{const on=b.classList.toggle('following');b.textContent=on?'追蹤中':'追蹤'})}
function openAlt(){showView('alt');renderAlt()}
function renderAlt(){$('#altProfileAvatar').src=ALT.avatar;const follow=$('#altFollowBtn');follow.textContent=state.altFollowed?'追蹤中':'追蹤';follow.classList.toggle('following',state.altFollowed);$('#followsYou').classList.toggle('hidden',!state.mutual);$('#altGate').classList.toggle('hidden',state.mutual);$('#altFeed').classList.toggle('hidden',!state.mutual);if(state.mutual)renderFeed(ALT_POSTS,'#altFeed')}
function followAlt(){if(state.altFollowed)return;state.altFollowed=true;state.unread=true;save();renderAlt();updateUnread();toast('追蹤邀請已送出')}
function renderMessages(){const mystery=state.altFollowed?`<button class="message-row" data-chat="alt"><img class="avatar" src="${ALT.avatar}" alt="${ALT.name}"><span><strong>${ALT.handle}</strong><small>你也喜歡他？那你也記得他的生日嗎？</small></span>${state.unread?'<i class="unread-dot">1</i>':''}</button>`:'';$('#messageList').innerHTML=mystery+CHATS.map(c=>`<button class="message-row" data-chat="${c.id}"><img class="avatar" src="${c.avatar}" alt="${esc(c.name)}"><span><strong>${esc(c.name)}</strong><small>${esc(c.preview)}</small></span><time>${esc(c.time)}</time></button>`).join('');$$('[data-chat]').forEach(b=>b.onclick=()=>b.dataset.chat==='alt'?openChat():openRegularChat(b.dataset.chat))}
function updateUnread(){$('#navUnread').classList.toggle('hidden',!state.unread);if(state.view==='messages')renderMessages()}
function openChat(){
  showView('chat','messages');
  state.unread=false;
  save();
  updateUnread();

  $('#chatBody').innerHTML=`
    <div class="date-divider">今天</div>
    <div class="bubble incoming">你也喜歡他？那你也記得他的生日嗎？</div>
    ${state.mutual
      ? `
        <div class="bubble outgoing">0831</div>
        <div class="bubble incoming">答對了，我追蹤你了。</div>
        <button class="view-alt-btn" id="viewAltFromChat">查看帳號</button>
      `
      : ''
    }
  `;

  $('#codeForm').classList.toggle('hidden',state.mutual);

  if(state.mutual){
    $('#viewAltFromChat').onclick=openAlt;
  }
}
function openRegularChat(id){const c=CHATS.find(x=>x.id===id);showView('chat','messages');$('#codeForm').classList.add('hidden');$('#chatBody').innerHTML=`<div class="chat-person"><img class="avatar" src="${c.avatar}" alt="${esc(c.name)}"><strong>${esc(c.name)}</strong><span>@${esc(c.handle)}</span></div><div class="date-divider">較早</div>${c.messages.map(m=>`<div class="bubble ${m[0]==='in'?'incoming':'outgoing'}">${esc(m[1])}</div>`).join('')}`}
function initProfile(){$('#displayName').textContent=PROFILE.name;$('#handle').textContent=PROFILE.handle;$('#location').textContent=PROFILE.location;$('.flag').textContent=PROFILE.flag;$('#bio').innerHTML=esc(PROFILE.bio).replace(/\n/g,'<br>');$('#tags').innerHTML=PROFILE.tags.map(t=>`<span>${esc(t)}</span>`).join('');$('#followers').textContent=PROFILE.followers;$('#following').textContent=PROFILE.following;$('#profileAvatar').src=PROFILE.avatar}
function toast(t){const x=$('#toast');x.textContent=t;x.classList.add('show');clearTimeout(toast.t);toast.t=setTimeout(()=>x.classList.remove('show'),1800)}
$('#followBtn').onclick=()=>{const on=$('#followBtn').classList.toggle('following');$('#followBtn').textContent=on?'追蹤中':'追蹤'};
$('#messageBtn').onclick=()=>$('#messageDialog').showModal();$('#closeDialog').onclick=()=>$('#messageDialog').close();
$('#searchBtn').onclick=()=>showView('search');$('#backBtn').onclick=()=>{
  if(history.state?.argView!=='profile'){
    history.back();
  }else{
    showView('profile','profile',false);
  }
};
$('#followersBtn').onclick=()=>{showView('people');renderPeople('followers')};$('#followingBtn').onclick=()=>{showView('people');renderPeople('following')};$('#followersTab').onclick=()=>renderPeople('followers');$('#followingTab').onclick=()=>renderPeople('following');
$('#altFollowBtn').onclick=followAlt;$('#altMessageBtn').onclick=()=>state.altFollowed?openChat():$('#messageDialog').showModal();
$('#codeForm').onsubmit=e=>{
  e.preventDefault();

  const input=$('#codeInput');
  const answer=input.value.trim().replace(/\s/g,'');

  if(!answer)return;

  const accepted=['0831','8/31','08/31','8月31日','八月三十一日','8月31號','08-31'];

  $('#chatBody').insertAdjacentHTML(
    'beforeend',
    `<div class="bubble outgoing">${esc(input.value.trim())}</div>`
  );

  if(accepted.includes(answer)){
    state.mutual=true;
    save();

    $('#chatBody').insertAdjacentHTML(
      'beforeend',
      `<div class="bubble incoming">答對了，我追蹤你了。</div>
       <button class="view-alt-btn" id="viewAltFromChat">查看小帳</button>`
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
$$('[data-nav]').forEach(b=>b.onclick=()=>{const v=b.dataset.nav;showView(v,v);if(v==='messages')renderMessages();if(v==='activity')renderFeed(ACTIVITY_POSTS,'#activityFeed');if(v==='search')renderProgress()});
const TAB_CONTENT={posts:POSTS,replies:REPLY_POSTS,media:MEDIA_POSTS,reposts:REPOST_POSTS};$$('[data-profile-tab]').forEach(b=>b.onclick=()=>{$$('[data-profile-tab]').forEach(x=>x.classList.remove('active'));b.classList.add('active');renderFeed(TAB_CONTENT[b.dataset.profileTab])});
$('#searchInput').oninput=e=>{const q=e.target.value.trim().toLowerCase();if(q==='0826')unlock('p3');const list=POSTS.filter(p=>(p.text+(p.clue||'')+(p.clueTitle||'')).toLowerCase().includes(q));$('#searchResults').innerHTML=q?`<div class="reply-heading">搜尋結果</div>${list.map(postHTML).join('')}`:'';bindActions()};
history.replaceState(
  {
    argView:'profile',
    previousView:'profile'
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
    renderFeed(
      ACTIVITY_POSTS,
      '#activityFeed'
    );
  }

  if(view==='search'){
    renderProgress();
  }

  if(view==='alt'){
    renderAlt();
  }
});
initProfile();renderFeed();renderProgress();updateUnread();renderMessages();
