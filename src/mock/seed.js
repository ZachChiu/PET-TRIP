/* eslint-disable require-jsdoc */
// 原本的後端（pettrip.ddns.net）已經停止服務，這裡是給 mock API 用的假資料。
// 日期都以「產生資料當下」為基準往前/往後推，確保網站看起來永遠是新的。

const img = (name) => `${process.env.BASE_URL}mock/${name}.jpg`;

const DAY = 24 * 60 * 60 * 1000;
const pad = (n) => String(n).padStart(2, '0');
export const fmtDate = (d) =>
  `${d.getFullYear()}/${pad(d.getMonth() + 1)}/${pad(d.getDate())}`;
export const fmtTime = (d) =>
  `${fmtDate(d)} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
const daysFromNow = (n) => new Date(Date.now() + n * DAY);

const companies = [
  {
    companyseq: 1,
    email: 'PAPA@gmail.com',
    pwd: '12345678',
    companyname: '趴趴寵物有限公司',
    companybrand: 'PAPA 寵物旅館',
    phone: '0912345678',
    country: '臺北市',
    area: '大安區',
    address: '臺北市大安區復興南路一段 100 號',
    pblicense: '北市動保字第 1090001 號',
    effectivedate: '2030/12/31',
    introduce:
      '位於大安區的寵物旅館，每間房都有獨立空調與 24 小時監視器，主人可以隨時透過手機看到毛孩的狀況。每天兩次散步、一次遊戲時間，讓毛孩住得跟在家一樣開心。',
    avatar: img('dog4'),
    bannerimg: img('dog2'),
    morning: true,
    afternoon: true,
    night: true,
    midnight: false,
  },
  {
    companyseq: 2,
    email: 'meow@gmail.com',
    pwd: '12345678',
    companyname: '喵喵生活有限公司',
    companybrand: '喵星人度假村',
    phone: '0922333444',
    country: '臺中市',
    area: '西屯區',
    address: '臺中市西屯區市政路 200 號',
    pblicense: '中市動保字第 1090123 號',
    effectivedate: '2030/06/30',
    introduce:
      '專為貓咪打造的度假村，全館只收貓，不會有狗狗吵鬧。每間房都有貓跳台、窗景和獨立貓砂區，由擁有十年經驗的貓保母照顧。',
    avatar: img('cat6'),
    bannerimg: img('cat1'),
    morning: true,
    afternoon: true,
    night: true,
    midnight: true,
  },
  {
    companyseq: 3,
    email: 'woof@gmail.com',
    pwd: '12345678',
    companyname: '汪汪樂園股份有限公司',
    companybrand: '汪汪樂園',
    phone: '0933555666',
    country: '高雄市',
    area: '左營區',
    address: '高雄市左營區博愛二路 300 號',
    pblicense: '高市動保字第 1090456 號',
    effectivedate: '2029/12/31',
    introduce:
      '擁有 300 坪戶外草皮的狗狗樂園，大型犬也能盡情奔跑。提供洗澡、美容、剪指甲等加值服務。',
    avatar: img('dog7'),
    bannerimg: img('dog5'),
    morning: true,
    afternoon: true,
    night: false,
    midnight: false,
  },
  {
    companyseq: 4,
    email: 'maohai@gmail.com',
    pwd: '12345678',
    companyname: '毛孩之家工作室',
    companybrand: '毛孩の家',
    phone: '0944777888',
    country: '新北市',
    area: '板橋區',
    address: '新北市板橋區文化路一段 50 號',
    pblicense: '新北動保字第 1090789 號',
    effectivedate: '2031/03/31',
    introduce:
      '家庭式寄宿，一次只收少量毛孩，貓狗分層照顧。適合第一次寄宿、比較容易緊張的孩子。',
    avatar: img('cat3'),
    bannerimg: img('dog8'),
    morning: false,
    afternoon: true,
    night: true,
    midnight: false,
  },
  {
    companyseq: 5,
    email: 'forest@gmail.com',
    pwd: '12345678',
    companyname: '森林民宿有限公司',
    companybrand: '森林寵物民宿',
    phone: '0955111222',
    country: '花蓮縣',
    area: '吉安鄉',
    address: '花蓮縣吉安鄉中山路三段 88 號',
    pblicense: '花縣動保字第 1090321 號',
    effectivedate: '2030/09/30',
    introduce:
      '依山傍水的寵物民宿，主人可以跟毛孩一起入住，也可以單獨寄宿。附近就是步道，每天帶狗狗爬山看海。',
    avatar: img('dog9'),
    bannerimg: img('dog10'),
    morning: true,
    afternoon: true,
    night: true,
    midnight: true,
  },
  {
    companyseq: 6,
    email: 'island@gmail.com',
    pwd: '12345678',
    companyname: '小島寵物寄宿社',
    companybrand: '小島寵物寄宿',
    phone: '0966999000',
    country: '臺南市',
    area: '東區',
    address: '臺南市東區大學路 1 號',
    pblicense: '南市動保字第 1090654 號',
    effectivedate: '2029/08/31',
    introduce: null,
    avatar: '',
    bannerimg: '',
    morning: true,
    afternoon: false,
    night: true,
    midnight: false,
  },
];

const roomDefaults = {
  pettype_cat: false,
  pettype_dog: false,
  pettype_other: false,
  petsizes: 1,
  petsizee: 10,
  roomamount: 1,
  roomamount_amt: 300,
  walk: 2,
  canned: true,
  feed: true,
  catlitter: false,
  visit: 12,
  medicine_infeed: true,
  medicine_infeed_amt: 50,
  medicine_pill: false,
  medicine_pill_amt: 0,
  medicine_paste: false,
  medicine_paste_amt: 0,
  bath: false,
  bath_amt: 0,
  hair: false,
  hair_amt: 0,
  nails: false,
  nails_amt: 0,
  img1: '',
  img2: '',
  img3: '',
  img4: '',
  state: true,
};

const rooms = [
  [1, 1, '大安豪華犬房', 1200, {pettype_dog: true, petsizes: 5, petsizee: 20, roomamount: 2, bath: true, bath_amt: 300, nails: true, nails_amt: 100, img1: img('dog2'), img2: img('dog4'), img3: img('dog1')}, '寬敞的木地板房間，附專屬的小庭院，適合中型犬。'],
  [2, 1, '貓咪景觀套房', 900, {pettype_cat: true, petsizes: 1, petsizee: 8, roomamount: 2, walk: 0, catlitter: true, medicine_pill: true, medicine_pill_amt: 50, img1: img('cat8'), img2: img('cat4')}, '落地窗面向大安森林公園，讓貓咪每天都能看鳥。'],
  [3, 1, '小型犬溫馨房', 700, {pettype_dog: true, pettype_other: true, petsizes: 1, petsizee: 5, roomamount: 3, hair: true, hair_amt: 400, img1: img('dog3')}, '適合吉娃娃、博美等小型犬，也可以寄宿兔子、天竺鼠。'],
  [4, 2, '貓跳台豪華房', 1100, {pettype_cat: true, petsizes: 1, petsizee: 10, roomamount: 3, walk: 0, catlitter: true, canned: true, medicine_paste: true, medicine_paste_amt: 80, img1: img('cat6'), img2: img('cat2'), img3: img('cat5')}, '三層貓跳台、貓抓板、逗貓棒一應俱全。'],
  [5, 2, '靜謐和室貓房', 800, {pettype_cat: true, petsizes: 1, petsizee: 8, roomamount: 1, walk: 0, catlitter: true, visit: 24, img1: img('cat7')}, '榻榻米和室，給比較怕生的貓咪一個安靜的空間。'],
  [6, 2, '多貓家庭房', 1500, {pettype_cat: true, petsizes: 1, petsizee: 10, roomamount: 5, walk: 0, catlitter: true, roomamount_amt: 250, img1: img('cat1'), img2: img('cat3')}, '一家的貓咪可以住在一起，不用分開。'],
  [7, 3, '草皮大型犬房', 1300, {pettype_dog: true, petsizes: 15, petsizee: 40, roomamount: 2, walk: 3, bath: true, bath_amt: 500, hair: true, hair_amt: 800, nails: true, nails_amt: 150, img1: img('dog5'), img2: img('dog10')}, '直通戶外草皮，黃金、拉拉、哈士奇都能跑得很開心。'],
  [8, 3, '中型犬標準房', 850, {pettype_dog: true, petsizes: 5, petsizee: 15, roomamount: 2, walk: 2, bath: true, bath_amt: 350, img1: img('dog6')}, '柴犬、柯基最愛的房型。'],
  [9, 4, '家庭式貓狗混住房', 650, {pettype_cat: true, pettype_dog: true, petsizes: 1, petsizee: 12, roomamount: 2, catlitter: true, img1: img('dog8'), img2: img('cat2')}, '跟保母一起住在家裡，貓狗都可以。'],
  [10, 4, '小動物專屬房', 400, {pettype_other: true, petsizes: 1, petsizee: 3, roomamount: 4, walk: 0, canned: false, roomamount_amt: 100, img1: img('cat4')}, '兔子、倉鼠、天竺鼠、鳥類都可以寄宿。'],
  [11, 5, '山景雙人犬房', 1600, {pettype_dog: true, pettype_cat: true, petsizes: 1, petsizee: 30, roomamount: 2, walk: 3, bath: true, bath_amt: 400, img1: img('dog10'), img2: img('dog9'), img3: img('dog1'), img4: img('dog7')}, '每天早晚兩次步道散步，看得到太平洋。'],
  [12, 5, '森林小木屋', 2000, {pettype_dog: true, petsizes: 10, petsizee: 40, roomamount: 3, walk: 3, hair: true, hair_amt: 600, img1: img('dog1')}, '整棟小木屋包下來，適合多隻大型犬。'],
  [13, 6, '府城貓咪小窩', 600, {pettype_cat: true, petsizes: 1, petsizee: 8, roomamount: 2, walk: 0, catlitter: true, img1: img('cat5')}, '老屋改建的貓咪房，安靜又有古早味。'],
  [14, 6, '府城狗狗房', 650, {pettype_dog: true, petsizes: 1, petsizee: 10, roomamount: 2, img1: img('dog3')}, '一天兩次在巷弄裡散步。'],
].map(([roomseq, companyseq, roomname, roomprice, extra, introduce]) => ({
  ...roomDefaults,
  roomseq,
  companyseq,
  roomname,
  roomprice,
  introduce,
  ...extra,
}));

const members = [
  {memberseq: 1, email: 'test-member@gmail.com', pwd: '12345678', membername: '測試會員', avatar: img('cat2')},
  {memberseq: 2, email: 'amy@gmail.com', pwd: '12345678', membername: '王小美', avatar: img('cat8')},
  {memberseq: 3, email: 'jack@gmail.com', pwd: '12345678', membername: '陳大明', avatar: null},
  {memberseq: 4, email: 'lin@gmail.com', pwd: '12345678', membername: '林阿姨', avatar: img('dog6')},
];

// [orderseq, memberseq, roomseq, 開始(距今天數), 住幾天, state]
// state：1 已付款、2 已取消、3 已退款、4 已完成
const orderRows = [
  [1, 1, 1, 7, 3, 1],
  [2, 1, 4, -30, 2, 4],
  [3, 1, 11, -60, 4, 4],
  [4, 1, 7, -15, 2, 2],
  [5, 2, 1, -40, 3, 4],
  [6, 2, 2, 14, 5, 1],
  [7, 3, 1, -20, 2, 4],
  [8, 4, 3, -10, 1, 4],
  [9, 2, 4, -50, 3, 4],
  [10, 3, 7, -35, 2, 4],
  [11, 4, 9, -25, 3, 4],
  [12, 3, 12, -45, 2, 4],
  [13, 4, 13, 3, 4, 1],
  [14, 2, 1, -5, 2, 4],
  [15, 1, 8, -8, 2, 4],
];

const orders = orderRows.map(([orderseq, memberseq, roomseq, start, days, state]) => {
  const room = rooms.find((r) => r.roomseq === roomseq);
  const member = members.find((m) => m.memberseq === memberseq);
  const dates = daysFromNow(start);
  return {
    orderseq,
    memberseq,
    roomseq,
    companyseq: room.companyseq,
    orderdates: fmtDate(dates),
    orderdatee: fmtDate(new Date(dates.getTime() + (days - 1) * DAY)),
    setdate: fmtTime(daysFromNow(start - 10)),
    canceldate: state === 2 ? fmtTime(daysFromNow(start - 3)) : '0001-01-01 00:00',
    state,
    name: member.membername,
    tel: '0987654321',
    pettype: room.pettype_cat && !room.pettype_dog ? '貓' : '狗',
    petsize: '5',
    petamount: 1,
    memo: '',
    medicine_infeed: false,
    medicine_paste: false,
    medicine_pill: false,
    bath: false,
    hair: false,
    nails: false,
    orderprice: room.roomprice * days,
    cancel_reason: state === 2 ? '行程改變' : null,
    cancel_memo: state === 2 ? '臨時要出差，改期再訂，謝謝！' : null,
  };
});

// [orderseq, star, memo, 距今天數]
const evaluations = [
  [2, 5, '貓咪回家後心情超好，每天都有傳照片給我，很放心！', -27],
  [3, 5, '狗狗每天都去爬山，回家累到睡整天哈哈。', -55],
  [5, 4, '環境很乾淨，下次還會再來。', -36],
  [7, 5, '保母很有耐心，我家狗狗很黏她。', -17],
  [8, 4, '小房間很溫馨，價格也實惠。', -8],
  [9, 5, '貓跳台超豪華，我家主子不想回家了。', -46],
  [10, 4, '草皮很大，狗狗玩得很開心。', -32],
  [11, 5, '貓狗一起住也完全沒問題。', -21],
].map(([orderseq, star, memo, day]) => ({
  orderseq,
  star,
  memo,
  postdate: fmtDate(daysFromNow(day)),
}));

// [queseq, memberseq, roomseq, 問題, 回答(null 表示未回覆), 距今天數]
const questions = [
  [1, 1, 1, '請問可以自備飼料嗎？我家狗狗腸胃比較敏感。', '當然可以！入住時一起帶來，我們會照您的份量餵食。', -12],
  [2, 2, 1, '請問房間有監視器可以遠端看嗎？', '有的，入住後會提供 App 帳號給您。', -9],
  [3, 1, 4, '貓咪需要打完哪些疫苗才能入住？', null, -2],
  [4, 3, 7, '哈士奇 28 公斤可以住嗎？', '可以喔，這間房最大可以到 40 公斤。', -20],
  [5, 4, 1, '過年期間有營業嗎？', null, -1],
].map(([queseq, memberseq, roomseq, question, answer, day]) => ({
  queseq,
  memberseq,
  roomseq,
  companyseq: rooms.find((r) => r.roomseq === roomseq).companyseq,
  question,
  question_date: fmtTime(daysFromNow(day)),
  answer: answer || '',
  answer_date: answer ? fmtTime(daysFromNow(day + 1)) : '',
}));

// 通知只給兩個測試帳號
const notices = [
  {noticeseq: 1, owner: 'company:1', type: '問通知', state: '未讀', time: fmtTime(daysFromNow(-1))},
  {noticeseq: 2, owner: 'company:1', type: '下單通知', state: '未讀', time: fmtTime(daysFromNow(-3))},
  {noticeseq: 3, owner: 'company:1', type: '問通知', state: '已讀', time: fmtTime(daysFromNow(-9))},
  {noticeseq: 4, owner: 'member:1', type: '答通知', state: '未讀', time: fmtTime(daysFromNow(-11))},
];

export default function createSeed() {
  return JSON.parse(
    JSON.stringify({companies, rooms, members, orders, evaluations, questions, notices})
  );
}
