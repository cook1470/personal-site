// 全站資料：作品、文章、MC 地圖、畫廊、社群連結。改內容不用動元件邏輯。

export interface Work {
  id: string;
  name: string;
  year: string;
  tag: string;
  desc: string;
  status: string;
  link: string;
  link2?: string;
  link2Label?: string;
  video?: string; // YouTube 影片 ID，紙張視窗開啟時才嵌入
  features?: string[];
  img: string;
  hidden?: boolean; // 暫時下架，資料留著但不上板也不牽線
}

const works: Work[] = [
  { id: 'phantasia', name: 'Phantasia Engine', year: '2026', tag: '視覺小說引擎', desc: '在網頁上創作屬於你的視覺小說。', status: '搶先版', link: 'https://phantasia.cook1470.com', link2: 'https://play.cook1470.com', link2Label: '試玩範例', features: ['點選指令就能寫劇本，對話、選項、分支都是按鈕加出來的', '自己的圖跟音樂直接拖進瀏覽器，馬上出現在遊戲裡', '隨時按試玩，立刻從你選的那句開始跑'], img: '/images/works/phantasia.jpg' },
  { id: 'fabula', name: 'Fabula', year: '2026', tag: 'AI TRPG', desc: '世界在你行動的空檔偷偷長大。', status: '', link: 'https://fabula.b43096022.workers.dev/', img: '', hidden: true },
  { id: 'sitdown', name: '坐下，勇者', year: '2026', tag: '卡牌爬塔', desc: '桌子對面的人會插手。', status: '試玩版', link: 'https://sitdown.cook1470.com', features: ['一座塔、三章、四十分鐘的卡牌爬塔。', '桌子對面坐著地下城主。他一邊看你打一邊講話，心情好壞會改變他給你的牌，偶爾直接伸手進來動你的牌局。', '試玩版是第一章，網頁直接玩，也有 Android 版。'], img: '/images/works/sitdown.jpg', hidden: true },
  { id: 'ledger', name: 'PhantomLedger 幻錄', year: '2026', tag: 'TRPG × Roguelike', desc: '結尾唸帳，逐條清算。', status: '0.1.0 開發中', link: 'https://phantomledger.gamelet.online/', features: ['你奉命進入一座古墓，去找一本書。墓道很長，而你帶不走每一樣東西——這一趟要決定的，多半不是打不打得贏。', '四種職業 × 四種身世，每種身世有自己的開場與際遇。', '抽卡推進的事件流程、3d6 四級判定、回合制戰鬥、商店與背包。', '判定選項直接顯示成功機率分段條，你看得出自己的斤兩，再決定要不要賭。', '六大屬性之外還有第七項，由身世決定。它不會讓你更容易成功，它管的是另一件事。', '支援手機遊玩，建議與回報都歡迎。'], img: '/images/works/ledger.jpg' },
  { id: 'cooktw', name: 'CookTWGame', year: '2026', tag: '光暈戰記同人', desc: '九個遊戲，同一個世界。', status: '持續更新', link: 'https://cooktwgame.gamelet.online/', img: '/images/works/cooktw.jpg' },
  { id: 'ryvexia', name: 'Ryvexia', year: '2024', tag: '音樂遊戲', desc: '譜面編輯器附上，曲庫開放投稿。', status: '', link: 'https://ryvexia.gamelet.online/', img: '/images/works/ryvexia.jpg' },
  { id: 'pixitank', name: 'PixiTank', year: '2026', tag: '多人坦克對戰', desc: '八人混戰，子彈會互抵。', status: '', link: 'https://pixitank.gamelet.online/', img: '/images/works/pixitank.jpg' },
  { id: 'dunjo', name: 'Dunjo', year: '2026', tag: '平台跳躍', desc: '關卡是玩家自己畫的。', status: '', link: 'https://dunjo.gamelet.online/', img: '/images/works/dunjo.jpg' },
  { id: 'witch', name: '小女巫・啟程', year: '2025', tag: '飛行射擊', desc: '鐵人賽三十天寫出來的遊戲。', status: '', link: 'https://littlewitch-thejourney.gamelet.online/', video: 'A1rRHKqjCSc', img: '/images/works/witch.jpg' },
  { id: 'bingo', name: '五十音 BINGO', year: '2025', tag: '日文小品', desc: '連線之前，先認得它們。', status: '', link: 'https://gojuuonbingo.gamelet.online/', img: '/images/works/bingo.jpg' },
  { id: 'three-units', name: '三台車', year: '2026', tag: '夜班派遣', desc: '你只聽得到打電話的人。', status: '', link: 'https://three-units.cook1470.com/', features: ['半夜十一點到清晨六點，你是救護派遣員，手上只有三台車。', '你看不到現場，只能從電話裡的聲音判斷誰先等、誰不能等——而最需要車的人，不一定講得最急。', '一夜約七分鐘，中英文皆可玩。'], img: '/images/works/three-units.jpg' },
  { id: 'cktw', name: 'CK_TWEventsGame', year: '2021–2024', tag: '光暈戰記同人', desc: '三年，一百二十個版本。', status: '', link: 'https://ck-tweventsgame.gamelet.online/', img: '/images/works/cktw.jpg' },
];

export const pinned: Work[] = works.filter((w) => !w.hidden);

// 文件區塊(文章、MC 舊藏)：非圖釘照片，走檔案文件卡形式
export interface Doc {
  name: string;
  year: string;
  tag: string;
  desc: string;
  link: string;
}

export const articles: Doc[] = [
  { name: '什麼!在網頁上也可以寫遊戲?', year: '2023', tag: 'iThome 鐵人賽', desc: '30 天，帶你在瀏覽器裡做出遊戲。', link: 'https://ithelp.ithome.com.tw/users/20152368/ironman/6932' },
  { name: '用 PixiJS 寫遊戲!', year: '2025', tag: 'iThome 鐵人賽', desc: '從 Sprite 到特效,PixiJS 入門 30 講。', link: 'https://ithelp.ithome.com.tw/users/20152368/ironman/8417' },
  { name: '嘎姆期刊第八期', year: '2023', tag: '受訪', desc: '本期人物專訪：酷可。', link: 'https://haskasu.com/gamelet/gamelet_periodical_8/' },
];

export const mcMaps: Doc[] = [
  { name: '阿呆的大冒險', year: '2018', tag: '小品劇情', desc: '1.13 劇情地圖。', link: 'https://forum.gamer.com.tw/Co.php?bsn=18673&sn=874743' },
  { name: '獄牢', year: '2018', tag: '恐怖解謎', desc: '1.13 小品恐怖解謎。', link: 'https://forum.gamer.com.tw/Co.php?bsn=18673&sn=875924' },
  { name: '轟炸超人', year: '2018', tag: '多人小品', desc: 'function 指令包，和朋友互丟炸彈。', link: 'https://forum.gamer.com.tw/Co.php?bsn=18673&sn=876780' },
];

// 畫廊精選:pixiv 作品縮圖(public/images/art/<id>.jpg)，點擊回 pixiv 原頁。
// 縮圖檔全數保留在 public/images/art/，要換精選改這裡即可。
export const art = [
  { id: '122084482', title: 'のんちぃ' },
  { id: '122109596', title: '哆啦A夢生誕祭 2024' },
  { id: '121870206', title: '不死川実弥' },
  { id: '121738829', title: '兔女郎晚晚' },
  { id: '121626728', title: '9S' },
  { id: '104897257', title: '梅可MEKO' },
  { id: '100345461', title: '夕刻ロベル' },
  { id: '100187485', title: '柴犬抱枕' },
  { id: '98708829', title: '皇家騎士' },
  { id: '97748427', title: '天影武士' },
];

export const PIXIV_HOME = 'https://www.pixiv.net/users/18579339';

export const links = [
  { name: 'YouTube', url: 'https://www.youtube.com/@cook1470' },
  { name: 'X', url: 'https://x.com/cook1470' },
  { name: 'GitHub', url: 'https://github.com/cook1470' },
  { name: 'pixiv', url: 'https://www.pixiv.net/users/18579339' },
  { name: '巴哈姆特', url: 'https://home.gamer.com.tw/profile/index.php?owner=cook1470' },
];
