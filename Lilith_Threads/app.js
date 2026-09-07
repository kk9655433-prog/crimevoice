/* ===== 主要資料：文字與圖片路徑都可在這裡替換 ===== */
const PROFILE={name:'莉莉絲・凱特',handle:'lilith.kate',flag:'🇺🇸',location:'哥譚',bio:'美國民主黨幕僚｜哥譚\n這裡的言論僅代表我個人。',tags:['#Gotham','#Democrats','#公共政策'],followers:'1,284',following:'156',avatar:'assets/avatar.jpg'};
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
    text:'今天下午突然很認真地思考了一件事：\n一個人離職之後，到底需要多久才會停止下意識查看手機通知？\n目前答案是，不知道。',
    likes:418,reposts:29,shares:7,
    replies:[
      {name:'73號',handle:'room_73',avatar:'assets/avatar-3.svg',text:'這在現在會被說是社畜欸，哈哈。',likes:16,reposts:1,shares:0,ownerLiked:true},
      {name:'莉莉絲',handle:'lilith.kate',avatar: 'assets/avatar.jpg',text:'唉。',likes:73,reposts:4,shares:1}
    ]
  },

  {
    id:'p2',
    time:'1天',
    text:'整理衣櫃。\n怎麼這麼多衣服。',
    likes:362,reposts:27,shares:6,
    replies:[
      {name:'路過的人',handle:'passing_by',avatar:'assets/avatar-2.svg',text:'真的需要準備這麼衣服嗎？',likes:21,reposts:2,shares:0},
      {name:'莉莉絲',handle:'lilith.kate',avatar: 'assets/avatar.jpg',text:'看你負責什麼工作。但我以前是需要的。',likes:48,reposts:2,shares:1}
    ]
  },

  {
    id:'p3',
    time:'3天',
    text:'晚上經過都奈橋。\n以前看到這裡第一個想到的是施工進度、活動流程和媒體位置。\n今天什麼都沒想到，只覺得橋上的風很大。',
    likes:591,reposts:43,shares:12,
    replies:[
      {name:'GothamDaily',handle:'gotham_daily',avatar:'assets/avatar-2.svg',text:'這樣不是很好嗎？',likes:18,reposts:1,shares:0},
      {name:'莉莉絲',handle:'lilith.kate',avatar: 'assets/avatar.jpg',text:'是。只是還在習慣。',likes:84,reposts:5,shares:2}
    ]
  },

  {
    id:'p4',
    time:'5天',
    text:'今天第一次在平日下午兩點去買咖啡。\n店員問我是不是請假。\n我說不是。\n現在想想，這可能是我第一次有辦法在這個時間回答這個問題。',
    likes:487,reposts:35,shares:9,
    replies:[
      {name:'無名',handle:'anonymous_gotham',avatar:'assets/person-unknown.svg',text:'突然不知道該說恭喜還是節哀。',likes:27,reposts:2,shares:0},
      {name:'莉莉絲',handle:'lilith.kate',avatar: 'assets/avatar.jpg',text:'我也還在判斷。',likes:61,reposts:3,shares:1}
    ]
  },

  {
    id:'p5',
    time:'1週',
    text:'翻到以前的行事曆。\n每天都被填得滿滿的，連吃午餐都有明確的時間區間。\n現在看著一整個空白的下午，居然不知道要拿它做什麼。',
    likes:704,reposts:52,shares:14,
    replies:[
      {name:'73號',handle:'room_73',avatar:'assets/avatar-3.svg',text:'拿去睡覺。',likes:38,reposts:2,shares:0},
      {name:'莉莉絲',handle:'lilith.kate',avatar: 'assets/avatar.jpg',text:'我正在學習。',likes:93,reposts:6,shares:2}
    ]
  },

  {
    id:'p6',
    time:'2週',
    text:'有人問我為什麼最近幾乎不談以前的工作。\n因為這個帳號本來就是半個工作帳號。\n工作結束了，就沒什麼好一直說的。',
    likes:831,reposts:47,shares:15,
    replies:[
      {name:'路過的人',handle:'passing_by',avatar:'assets/avatar-2.svg',text:'但妳以前真的很常發市政廳的事情。',likes:34,reposts:3,shares:1},
      {name:'莉莉絲',handle:'lilith.kate',avatar: 'assets/avatar.jpg',text:'因為那時候我的生活也真的很常在市政廳。',likes:107,reposts:7,shares:2}
    ]
  },

  {
    id:'p7',
    time:'3週',
    text:'整理抽屜，找到以前的工作證。\n照片拍得很糟。\n證件上的有效期限也已經過了。\n但我還是放回去了。',
    likes:613,reposts:31,shares:8,
    replies:[
      {name:'73號',handle:'room_73',avatar:'assets/avatar-3.svg',text:'這種東西通常最後都會變成紀念品。',likes:25,reposts:1,shares:0},
      {name:'莉莉絲',handle:'lilith.kate',avatar: 'assets/avatar.jpg',text:'可能吧。',likes:46,reposts:2,shares:0}
    ]
  },

  {
    id:'p8',
    time:'1個月',
    text:'今天收到一封寄到舊辦公室的信。\n秘書處轉寄給我了。\n內容其實沒什麼特別的，只是看到信封上的地址，突然有點恍惚。',
    likes:389,reposts:22,shares:5,
    replies:[
      {name:'GothamDaily',handle:'gotham_daily',avatar:'assets/avatar-2.svg',text:'還有人不知道妳已經離開了嗎？',likes:19,reposts:1,shares:0},
      {name:'莉莉絲',handle:'lilith.kate',avatar: 'assets/avatar.jpg',text:'可能還有一些自動寄送的東西沒有改。',likes:37,reposts:2,shares:0}
    ]
  },

  {
    id:'p9',
    time:'1個月',
    text:'今天終於把辦公室時期留下來的最後一箱東西拆完。\n結果裡面有一包餅乾、充電線和一堆不知道為什麼印出來的流程表。',
    likes:451,reposts:28,shares:6,
    replies:[
      {name:'無名',handle:'anonymous_gotham',avatar:'assets/person-unknown.svg',text:'流程表也算你的戰績。',likes:42,reposts:3,shares:1},
      {name:'莉莉絲',handle:'lilith.kate',avatar: 'assets/avatar.jpg',text:'我甚至不記得它們是哪一天的。',likes:59,reposts:3,shares:1}
    ]
  },

  {
    id:'p10',
    time:'2個月',
    text:'最近開始正常吃早餐。\n以前早上不是趕會議就是趕車，早餐通常在路上解決。\n今天坐下來慢慢吃完，突然覺得這件事以前好像很奢侈。',
    likes:537,reposts:34,shares:8,
    replies:[
      {name:'73號',handle:'room_73',avatar:'assets/avatar-3.svg',text:'妳以前到底幾點開始上班？',likes:18,reposts:1,shares:0},
      {name:'莉莉絲',handle:'lilith.kate',avatar: 'assets/avatar.jpg',text:'不想回憶。',likes:77,reposts:5,shares:1}
    ]
  },

  {
    id:'p11',
    time:'2個月',
    text:'有人問我還會不會回市政廳。\n目前沒有這個打算。\n而且我現在發現，不知道下一個會議在哪裡，其實是一件很舒服的事情。',
    likes:614,reposts:39,shares:11,
    replies:[
      {name:'路過的人',handle:'passing_by',avatar:'assets/avatar-2.svg',text:'所以真的完全離開了？',likes:26,reposts:2,shares:0},
      {name:'莉莉絲',handle:'lilith.kate',avatar: 'assets/avatar.jpg',text:'對。',likes:71,reposts:3,shares:1}
    ]
  },

  {
    id:'p12',
    time:'3個月',
    text:'今天有人把我以前的工作群組加回來。\n我看了一眼，然後退出。\n不是因為不想看，是因為我真的已經不知道自己為什麼還在裡面。',
    likes:792,reposts:57,shares:17,
    replies:[
      {name:'73號',handle:'room_73',avatar:'assets/avatar-3.svg',text:'這才是正式離職的儀式。',likes:41,reposts:4,shares:1},
      {name:'莉莉絲',handle:'lilith.kate',avatar: 'assets/avatar.jpg',text:'確實比交接文件有感。',likes:92,reposts:7,shares:2}
    ]
  },

  {
    id:'p13',
    time:'4個月',
    text:'今天經過以前每天上班的路。\n下意識看了一眼時間，然後發現自己根本不用趕。\n站在路口多等了一個紅燈。',
    likes:466,reposts:28,shares:7,
    replies:[
      {name:'無名',handle:'anonymous_gotham',avatar:'assets/person-unknown.svg',text:'這篇居然有點難過。',likes:32,reposts:2,shares:0},
      {name:'莉莉絲',handle:'lilith.kate',avatar: 'assets/avatar.jpg',text:'我只是第一次發現那個紅燈原來這麼久。',likes:81,reposts:4,shares:1}
    ]
  },

  {
    id:'p14',
    time:'2026-3-20',
    text:'離開辦公室的時候，桌上還有一杯沒喝完的咖啡。\n本來想回去拿。\n後來想想，算了。',
    likes:718,reposts:54,shares:16,
    replies:[
      {name:'73號',handle:'room_73',avatar:'assets/avatar-3.svg',text:'那杯咖啡最後怎麼辦？',likes:27,reposts:1,shares:0},
      {name:'莉莉絲',handle:'lilith.kate',avatar: 'assets/avatar.jpg',text:'不知道。',likes:119,reposts:8,shares:2}
    ]
  },

  {
    id:'p15',
    time:'2026-3-15',
    text:'昨晚結束之後，接了一整晚的電話。\n',
    likes:936,reposts:81,shares:25,
    replies:[
      {name:'GothamDaily',handle:'gotham_daily',avatar:'assets/avatar-2.svg',text:'昨晚辛苦了。',likes:44,reposts:5,shares:1},
      {name:'莉莉絲',handle:'lilith.kate',avatar: 'assets/avatar.jpg',text:'謝謝。',likes:103,reposts:6,shares:2}
    ]
  },

  {
    id:'p16',
    time:'2026-3-14',
    text:'都奈橋建成周年紀念晚會開始了。',
    likes:1328,reposts:117,shares:42,
	image:'assets/party.jpg',
    replies:[
      {name:'73號',handle:'room_73',avatar:'assets/avatar-3.svg',text:'沒有想到市長是這樣的人。',likes:51,reposts:5,shares:1},
      {name:'GothamDaily',handle:'gotham_daily',avatar:'assets/avatar-2.svg',text:'你是否知情市長私底下做的這些事？',likes:32,reposts:4,shares:1},
      {name:'莉莉絲',handle:'lilith.kate',avatar: 'assets/avatar.jpg',text:'我不想回答這些事。',likes:138,reposts:9,shares:3}
    ]
  },

  {
    id:'p17',
    time:'2026-3-12',
    text:'距離晚宴還有兩天。\n座位表今天又改了一次。\n我現在已經不敢說這是最後一次了。',
    likes:845,reposts:74,shares:20,
    replies:[
      {name:'路過的人',handle:'passing_by',avatar:'assets/avatar-2.svg',text:'座位到底有多難排？',likes:28,reposts:2,shares:0},
      {name:'莉莉絲',handle:'lilith.kate',avatar: 'assets/avatar.jpg',text:'你不知道一張桌子可以牽涉多少人的自尊。',likes:113,reposts:8,shares:3}
    ]
  },

  {
    id:'p18',
    time:'2026-3-08',
    text:'今天確認晚宴媒體名單。\n有人問為什麼記者席不能再靠前。\n因為再靠前就是主桌。\n再靠前就是市長。\n再靠前就是我們的工作時間增加。',
    likes:1064,reposts:91,shares:28,
    replies:[
      {name:'記者A',handle:'daily_reporter',avatar:'assets/avatar-2.svg',text:'收到，懂了。',likes:34,reposts:3,shares:1},
      {name:'73號',handle:'room_73',avatar:'assets/avatar-3.svg',text:'最後一句才是真正的理由。',likes:52,reposts:5,shares:1},
      {name:'莉莉絲',handle:'lilith.kate',avatar: 'assets/avatar.jpg',text:'非常正確。',likes:96,reposts:6,shares:2}
    ]
  },

  {
    id:'p19',
    time:'2026-3-01',
    text:'三月到了。\n辦公室裡現在每個人看到「3/14」都會自動開始核對自己的待辦事項。\n包括我。',
    likes:583,reposts:41,shares:10,
    replies:[
      {name:'無名',handle:'anonymous_gotham',avatar:'assets/person-unknown.svg',text:'這個日期現在是不是已經變成某種心理陰影？',likes:31,reposts:2,shares:0},
      {name:'莉莉絲',handle:'lilith.kate',avatar: 'assets/avatar.jpg',text:'還有十三天，不要提醒我。',likes:84,reposts:5,shares:1}
    ]
  },

  {
    id:'p20',
    time:'2026-2-18',
    text:'今天市長的公開行程結束得比預定早十五分鐘。\n整個辦公室安靜了三秒。\n沒有人知道該怎麼處理這種突發狀況。',
    likes:739,reposts:62,shares:17,
    replies:[
      {name:'73號',handle:'room_73',avatar:'assets/avatar-3.svg',text:'所以最後怎麼辦？',likes:21,reposts:1,shares:0},
      {name:'莉莉絲',handle:'lilith.kate',avatar: 'assets/avatar.jpg',text:'大家開始確認下一場行程。',likes:63,reposts:3,shares:1}
    ]
  },

  {
    id:'p21',
    time:'2026-2-02',
    text:'今天收到周年晚宴的第一版流程表。\n六頁。\n我看完之後問：「這是第一版？」\n對方說：「對。」\n很好。',
    likes:624,reposts:48,shares:12,
    replies:[
      {name:'GothamDaily',handle:'gotham_daily',avatar:'assets/avatar-2.svg',text:'第一版通常代表什麼？',likes:25,reposts:2,shares:0},
      {name:'莉莉絲',handle:'lilith.kate',avatar: 'assets/avatar.jpg',text:'代表後面還有第二版。',likes:97,reposts:7,shares:2}
    ]
  },

  {
    id:'p22',
    time:'2026-1-16',
    text:'今年第一場大型活動開始準備。\n今天的工作是確認名單。\n明天的工作大概是重新確認今天確認過的名單。',
    likes:471,reposts:36,shares:8,
    replies:[
      {name:'路過的人',handle:'passing_by',avatar:'assets/avatar-2.svg',text:'這就是幕僚生活嗎？',likes:19,reposts:1,shares:0},
      {name:'莉莉絲',handle:'lilith.kate',avatar: 'assets/avatar.jpg',text:'這只是其中一部分。',likes:52,reposts:3,shares:1}
    ]
  },

  {
    id:'p23',
    time:'2026-1-05',
    text:'新年第一個工作日。\n市長說今年會是非常重要的一年。\n我低頭看了一眼一月份的行程表。\n我相信他。',
    likes:813,reposts:63,shares:18,
    replies:[
      {name:'73號',handle:'room_73',avatar:'assets/avatar-3.svg',text:'妳那個「我相信他」看起來很不像相信。',likes:46,reposts:3,shares:1},
      {name:'莉莉絲',handle:'lilith.kate',avatar: 'assets/avatar.jpg',text:'我相信今年會很忙。',likes:103,reposts:7,shares:2}
    ]
  },

  {
    id:'p24',
    time:'2025-12-20',
    text:'年底清辦公室。\n今年留下最多的不是文件，是便利貼。\n其中一張寫著「記得吃飯」。\n不知道誰寫的，但我決定保留。',
    likes:687,reposts:42,shares:10,
    replies:[
      {name:'無名',handle:'anonymous_gotham',avatar:'assets/person-unknown.svg',text:'這可能是整個辦公室最重要的文件。',likes:37,reposts:3,shares:1},
      {name:'莉莉絲',handle:'lilith.kate',avatar: 'assets/avatar.jpg',text:'同意。',likes:72,reposts:4,shares:1}
    ]
  },

  {
    id:'p25',
    time:'2025-11-06',
    text:'今天市長的簡報稿改到第九版。\n我問還要不要繼續改。\n對方說：「再順一下。」\n這四個字通常意味著至少還有三版。',
    likes:902,reposts:79,shares:22,
    replies:[
      {name:'記者A',handle:'daily_reporter',avatar:'assets/avatar-2.svg',text:'新聞稿也是這樣。',likes:29,reposts:2,shares:0},
      {name:'莉莉絲',handle:'lilith.kate',avatar: 'assets/avatar.jpg',text:'我們互相理解。',likes:81,reposts:6,shares:2}
    ]
  },

  {
    id:'p26',
    time:'2025-10-18',
    text:'今天陪市長去社區活動。\n小朋友問他是不是每天都穿西裝。\n市長說差不多。\n我站在旁邊想，這個答案其實已經很接近真相了。',
    likes:776,reposts:54,shares:14,
    replies:[
      {name:'73號',handle:'room_73',avatar:'assets/avatar-3.svg',text:'那妳呢？',likes:15,reposts:1,shares:0},
      {name:'莉莉絲',handle:'lilith.kate',avatar: 'assets/avatar.jpg',text:'我每天都在想今天要不要穿西裝。',likes:48,reposts:3,shares:1}
    ]
  },

  {
    id:'p27',
    time:'2025-09-16',
    text:'今天整理市長今年的公開活動照片。\n剪綵、握手、演講、參觀、再剪綵。\n攝影師說這些照片看起來很像不同的人生。\n我說其實是同一週。',
    likes:641,reposts:45,shares:11,
    replies:[
      {name:'GothamDaily',handle:'gotham_daily',avatar:'assets/avatar-2.svg',text:'市長本人應該也分不清。',likes:24,reposts:2,shares:0},
      {name:'莉莉絲',handle:'lilith.kate',avatar: 'assets/avatar.jpg',text:'我有時候也分不清。',likes:63,reposts:4,shares:1}
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
    text:'開始有人提醒我市長生日快到了。\n我說我知道。\n早在兩個月以前，行程、賓客名單和備用方案就已經確認完畢了！\n謝謝大家對我記憶力的關心。',
    likes:513,reposts:31,shares:7,
    replies:[
      {name:'無名',handle:'anonymous_gotham',avatar:'assets/person-unknown.svg',text:'幕僚的生日提醒系統是不是很可怕。',likes:27,reposts:2,shares:0},
      {name:'莉莉絲',handle:'lilith.kate',avatar: 'assets/avatar.jpg',text:'非常有效率。',likes:51,reposts:3,shares:1}
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
      {name:'莉莉絲',handle:'lilith.kate',avatar: 'assets/avatar.jpg',text:'他剛剛又抓我了啦。',likes:116,reposts:8,shares:3}
    ]
  },

  {
    id:'p31',
    time:'2025-4-23',
    text:'今天是都奈橋公共建設說明會。',
    likes:947,reposts:84,shares:24,
    replies:[
      {name:'73號',handle:'room_73',avatar:'assets/avatar-3.svg',text:'我有看到直播',likes:26,reposts:1,shares:0},
      {name:'莉莉絲',handle:'lilith.kate',avatar: 'assets/avatar.jpg',text:'唉。',likes:129,reposts:9,shares:3}
    ]
  },

  {
    id:'p32',
    time:'2025-2-14',
    text:'今天辦公室收到很多花。\n但有時候送花的人未必都懷著愛意。',
    likes:438,reposts:28,shares:6,
    replies:[
      {name:'無名',handle:'anonymous_gotham',avatar:'assets/person-unknown.svg',text:'你們到底都收到了些什麼...？',likes:17,reposts:1,shares:0},
      {name:'莉莉絲',handle:'lilith.kate',avatar: 'assets/avatar.jpg',text:'我不方便回答這個問題。',likes:54,reposts:3,shares:1}
    ]
  },

  {
    id:'p33',
    time:'2024-11-29',
    text:'年底整理市長今年的公開活動。\n會議、視察、剪綵、演講，共四百二十七場，這還不含質詢和市政事務，不愧是希爾。',
    likes:529,reposts:37,shares:9,
    replies:[
      {name:'GothamDaily',handle:'gotham_daily',avatar:'assets/avatar-2.svg',text:'市長好強喔。',likes:31,reposts:2,shares:0},
      {name:'莉莉絲',handle:'lilith.kate',avatar: 'assets/avatar.jpg',text:'還有機場。忘了說。',likes:44,reposts:2,shares:1}
    ]
  },

  {
    id:'p34',
    time:'2024-8-07',
    text:'市長今天從早上八點一路跑到晚上九點。\n大家都在車上睡著了。',
    likes:614,reposts:48,shares:12,
    replies:[
      {name:'73號',handle:'room_73',avatar:'assets/avatar-3.svg',text:'市長有睡嗎？',likes:28,reposts:2,shares:0},
      {name:'莉莉絲',handle:'lilith.kate',avatar: 'assets/avatar.jpg',text:'他很努力抓時間休息啦。',likes:66,reposts:4,shares:1}
    ]
  },

  {
    id:'p35',
    time:'2024-2-16',
    text:'收到現場傳過來的一些文件，看來這不是只是簡單修改一下法案能解決的事情。',
    likes:483,reposts:39,shares:9,
    replies:[
      {name:'路過的人',handle:'passing_by',avatar:'assets/avatar-2.svg',text:'市政工作感覺好累。',likes:22,reposts:1,shares:0},
      {name:'莉莉絲',handle:'lilith.kate',avatar: 'assets/avatar.jpg',text:'但蠻開心的。',likes:58,reposts:3,shares:1}
    ]
  },

  {
    id:'p36',
    time:'2023-12-11',
    text:'明天市長有六場公開行程，橫跨三個行政區。\n光明天的行程表和行車路線我就做了10頁，已經感受到是地獄行程了。',
    likes:367,reposts:24,shares:5,
    replies:[
      {name:'無名',handle:'anonymous_gotham',avatar:'assets/person-unknown.svg',text:'這樣有做意外備案嗎？',likes:12,reposts:1,shares:0},
      {name:'莉莉絲',handle:'lilith.kate',avatar: 'assets/avatar.jpg',text:'後面三頁全是備案。',likes:39,reposts:2,shares:0}
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
      {name:'莉莉絲',handle:'lilith.kate',avatar: 'assets/avatar.jpg',text:'我也這麼認為。',likes:31,reposts:1,shares:0}
    ]
  },

  {
    id:'p38',
    time:'2023-7-09',
    text:'辦了脆的帳號。\n大家好，我是莉莉絲AKA希爾的第一助理，哈哈。',
    likes:341,reposts:26,shares:6,
    replies:[
      {name:'路過的人',handle:'passing_by',avatar:'assets/avatar-2.svg',text:'莉莉絲也辦脆啦。',likes:14,reposts:1,shares:0},
      {name:'莉莉絲',handle:'lilith.kate',avatar: 'assets/avatar.jpg',text:'對啊，現在還在熟悉脆的操作。',likes:43,reposts:2,shares:0}
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
    id:'repost1',

    isRepost:true,

    author:'BTA250',
    handle:'BTA250',
    avatar:'assets/al520.jpg',

    time:'6小時',

    text:'現代人常陷入一種迷思：認為在愛情中做到絕對的真實與毫无保留，才是通往深層連結的唯一路徑。\n然而從心理學與實務經驗來看，缺乏界線的「過度自我暴露」往往事與願違。當真誠失去了分寸，它不再是建立信任的橋樑，反而可能轉化為對關係的隱形施壓，進而加速親密關係的崩解。究竟這份「毫無保留」背後隱藏著怎樣的心理機制，又是如何一步步侵蝕了彼此的感情？',
    imageCount:'1／7',

    likes:302,
    reposts:74,
    shares:22,

    replies:[
      {
        name:'林七',
        handle:'lin_seven',
        avatar:'assets/person-lin.svg',
        text:'這篇分析寫得滿準的。',
        likes:18,
        reposts:4,
        shares:2
      }
    ]
  }
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
 {id:'friend2',name:'阿哲',handle:'che_1204',avatar:'assets/person-lin.svg',time:'昨天',preview:'你有看到莉莉絲的新串文嗎？',messages:[['in','你有看到莉莉絲的新串文嗎？'],['out','剛看到。怎麼了？'],['in','沒事，只是覺得她最近發的東西有點奇怪。']]},
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
function showView(v,previous=state.view){state.previous=previous;state.view=v;$$('.view').forEach(x=>x.classList.remove('active'));$('#'+v+'View').classList.add('active');const root=v==='profile';$('#backBtn').classList.toggle('hidden',root||['messages','search','activity','viewer'].includes(v));$('#searchBtn').classList.toggle('hidden',v!=='profile');scrollTo(0,0)}
function openPost(id){const p=ALL_POSTS.find(x=>x.id===id);unlock(id);showView('detail');$('#detailPost').innerHTML=postHTML(p);const ordered=p.replies.map((r,i)=>({...r,index:i})).sort((a,b)=>Number(b.ownerLiked)-Number(a.ownerLiked));$('#detailReplies').innerHTML=ordered.length?ordered.map(r=>{const key=id+'r'+r.index,on=localStorage.getItem('liked-'+key)==='1';return `<article class="reply">${avatar(r.name,r.avatar)}<div><div class="post-header"><strong>${esc(r.name)}</strong><span class="meta">@${esc(r.handle)}</span>${r.ownerLiked?`<span class="owner-liked">♥<img src="${PROFILE.avatar}" alt="${PROFILE.name}"></span>`:''}</div><p class="post-text">${esc(r.text)}</p>${r.link?`<a class="reply-link" href="${esc(r.link)}" target="_blank" rel="noopener noreferrer">${esc(r.link)}</a>`:''}<div class="actions"><button class="action heart ${on?'liked':''}" data-reply-like="${key}">${icon('i-heart')}<span>${r.likes+(on?1:0)}</span></button><button class="action">${icon('i-comment')}<span>0</span></button><button class="action">${icon('i-repost')}<span>${r.reposts||0}</span></button><button class="action">${icon('i-send')}<span>${r.shares||0}</span></button></div></div></article>`}).join(''):'<div class="empty">尚無回覆</div>';bindActions();$$('[data-reply-like]').forEach(b=>b.onclick=()=>{const on=b.classList.toggle('liked');localStorage.setItem('liked-'+b.dataset.replyLike,on?'1':'0')})}
function unlock(id){if(!CLUES.some(c=>c.id===id)||state.unlocked.has(id))return;state.unlocked.add(id);save();toast('解謎進度已更新');renderProgress()}
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
$('#searchBtn').onclick=()=>showView('search');$('#backBtn').onclick=()=>showView(state.previous||'profile');
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
initProfile();renderFeed();renderProgress();updateUnread();renderMessages();
