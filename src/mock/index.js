/* eslint-disable require-jsdoc */
// 前端內建的假後端：用 axios adapter 攔截所有 API 請求，資料存在 localStorage。
// 原本的 API 規格已經找不到了，回應格式是從各元件怎麼讀 response.data 反推出來的。
import createSeed, {fmtDate, fmtTime} from './seed';

const STORAGE_KEY = 'pettrip-mock-db-v1';
const AVATAR_DEFAULT = '';

let db = load();

function load() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return JSON.parse(saved);
  } catch (e) {
    // 無痕模式或 localStorage 被擋時，就只存在記憶體裡
  }
  return createSeed();
}

function save() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(db));
  } catch (e) {
    // 空間不足時放棄保存，不影響當下操作
  }
}

export function resetMockDb() {
  db = createSeed();
  save();
}

// ---------- 小工具 ----------

const nextId = (list, key) => Math.max(0, ...list.map((x) => x[key])) + 1;
const toBool = (v) => v === true || v === 'true';
const toNum = (v) => Number(v) || 0;
const now = () => fmtTime(new Date());
const withoutPwd = ({pwd, ...rest}) => rest; // eslint-disable-line no-unused-vars

function parseDate(str) {
  if (!str || str === 'undefined' || str === 'null') return null;
  const d = new Date(str);
  return isNaN(d) ? null : new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function overlaps(order, start, end) {
  const s = parseDate(order.orderdates);
  const e = parseDate(order.orderdatee);
  return s <= end && e >= start;
}

function paginate(list, page, perPage = 6) {
  const total = list.length;
  const totalPage = Math.max(1, Math.ceil(total / perPage));
  const current = Math.min(Math.max(1, parseInt(page, 10) || 1), totalPage);
  return {
    items: list.slice((current - 1) * perPage, current * perPage),
    meta: {current_page: current, total_page: totalPage, total},
  };
}

function whoAmI(headers) {
  const auth = (headers && headers.Authorization) || '';
  const match = /mock\.(company|member)\.(\d+)/.exec(auth);
  if (!match) return null;
  const id = Number(match[2]);
  if (match[1] === 'company') {
    const company = db.companies.find((c) => c.companyseq === id);
    return company && {type: 'company', id, company};
  }
  const member = db.members.find((m) => m.memberseq === id);
  return member && {type: 'member', id, member};
}

// ---------- 組合出前端需要的資料形狀 ----------

const companyOf = (seq) => db.companies.find((c) => c.companyseq === seq);
const roomOf = (seq) => db.rooms.find((r) => r.roomseq === seq);
const memberOf = (seq) => db.members.find((m) => m.memberseq === seq);
const orderOf = (seq) => db.orders.find((o) => o.orderseq === seq);
const evaluationOf = (orderseq) =>
  db.evaluations.find((e) => e.orderseq === orderseq);

function companyEvaluations(companyseq) {
  return db.orders
    .filter((o) => o.companyseq === companyseq)
    .map((o) => ({order: o, evaluation: evaluationOf(o.orderseq)}))
    .filter((x) => x.evaluation);
}

function companyView(c) {
  const company = withoutPwd(c);
  const rooms = db.rooms.filter((r) => r.companyseq === c.companyseq && r.state);
  const evals = companyEvaluations(c.companyseq);
  const prices = rooms.map((r) => r.roomprice);
  const avg = evals.length
    ? evals.reduce((sum, x) => sum + x.evaluation.star, 0) / evals.length
    : 0;
  return {
    ...company,
    rooms: rooms.length,
    count: rooms.length,
    evaluation: Math.round(avg * 10) / 10,
    evaluation_count: evals.length,
    roomprice_min: prices.length ? Math.min(...prices) : 0,
    roomprice_max: prices.length ? Math.max(...prices) : 0,
    pettype_cat: rooms.some((r) => r.pettype_cat),
    pettype_dog: rooms.some((r) => r.pettype_dog),
    pettype_other: rooms.some((r) => r.pettype_other),
  };
}

function roomView(r) {
  const c = companyOf(r.companyseq);
  return {...r, companybrand: c ? c.companybrand : ''};
}

function bookedDates(roomseq) {
  return db.orders
    .filter((o) => o.roomseq === roomseq && o.state === 1)
    .map((o) => ({orderdates: o.orderdates, orderdatee: o.orderdatee}));
}

function orderListItem(o, me) {
  const room = roomOf(o.roomseq);
  const evaluated = !!evaluationOf(o.orderseq);
  const done = o.state === 4;
  return {
    orderseq: o.orderseq,
    companyseq: o.companyseq,
    roomseq: o.roomseq,
    roomname: room ? room.roomname : '（已刪除的空間）',
    state: o.state,
    orderdates: o.orderdates,
    orderdatee: o.orderdatee,
    canceldate: o.canceldate,
    // 會員：完成的訂單都能按評價；廠商：只有已被評價的訂單能查看
    btn_Evalution: me.type === 'member' ? done : done && evaluated,
    // 列表上這個欄位為 false 時顯示「已評價」
    btn_Evalution_readonly: !evaluated,
  };
}

function orderDetail(o) {
  const room = roomOf(o.roomseq) || {};
  const company = companyOf(o.companyseq) || {};
  return {
    order: {
      orderseq: o.orderseq,
      state: o.state,
      address: company.address,
      country: company.country,
      companyname: company.companybrand,
      roomname: room.roomname,
      roomamt: room.roomprice || 0,
      orderdates: o.orderdates,
      orderdatee: o.orderdatee,
      setdate: o.setdate,
      canceldate: o.canceldate,
    },
    detail: {
      name: o.name,
      tel: o.tel,
      pettype: o.pettype,
      petsize: o.petsize,
      petamount: o.petamount,
      memo: o.memo,
      orderprice: o.orderprice,
      btn_cancel: o.state === 1 && parseDate(o.orderdates) > new Date(),
      medicine: {
        medicine_infeed: o.medicine_infeed,
        medicine_infeed_amt: room.medicine_infeed_amt || 0,
        medicine_paste: o.medicine_paste,
        medicine_paste_amt: room.medicine_paste_amt || 0,
        medicine_pill: o.medicine_pill,
        medicine_pill_amt: room.medicine_pill_amt || 0,
      },
      plus: {
        bath: o.bath,
        bath_amt: room.bath_amt || 0,
        hair: o.hair,
        hair_amt: room.hair_amt || 0,
        nails: o.nails,
        nails_amt: room.nails_amt || 0,
      },
    },
    cancel: {reason: o.cancel_reason, memo: o.cancel_memo},
  };
}

function questionListItem(q) {
  const room = roomOf(q.roomseq);
  return {
    queseq: q.queseq,
    companyseq: q.companyseq,
    roomseq: q.roomseq,
    roomname: room ? room.roomname : '（已刪除的空間）',
    message: q.question,
    postday: q.question_date,
    state: q.answer ? '已回覆' : '未回覆',
  };
}

function questionDetail(q) {
  const member = memberOf(q.memberseq);
  return {
    queseq: q.queseq,
    name: member ? member.membername : '',
    question: q.question,
    question_date: q.question_date,
    answer: q.answer,
    answer_date: q.answer_date,
  };
}

function notify(owner, type) {
  db.notices.unshift({
    noticeseq: nextId(db.notices, 'noticeseq'),
    owner,
    type,
    state: '未讀',
    time: now(),
  });
}

function noticesFor(me) {
  const owner = `${me.type}:${me.id}`;
  return db.notices.filter((n) => n.owner === owner);
}

function readImage(file) {
  // 縮圖成 800px 的 JPEG，避免 localStorage 爆掉
  return new Promise((resolve, reject) => {
    if (!file || !/^image\//.test(file.type)) return reject(new Error('format'));
    const reader = new FileReader();
    reader.onerror = reject;
    reader.onload = () => {
      const image = new Image();
      image.onerror = reject;
      image.onload = () => {
        const scale = Math.min(1, 800 / Math.max(image.width, image.height));
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(image.width * scale);
        canvas.height = Math.round(image.height * scale);
        canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height);
        resolve(canvas.toDataURL('image/jpeg', 0.8));
      };
      image.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

// 首頁精選：每家廠商輪流挑一間，最多 6 間
function featuredRooms(rooms) {
  const queues = db.companies.map((c) =>
    rooms.filter((r) => r.companyseq === c.companyseq)
  );
  const picked = [];
  while (picked.length < 6 && queues.some((q) => q.length)) {
    queues.forEach((q) => q.length && picked.length < 6 && picked.push(q.shift()));
  }
  return picked;
}

// ---------- API ----------

const UNAUTHORIZED = {status: 401, data: {result: '無授權'}};

const routes = {
  // 首頁
  'GET Home/GetAllInfo'() {
    const rooms = db.rooms.filter((r) => r.state);
    const companies = db.companies
      .map(companyView)
      .sort((a, b) => b.evaluation - a.evaluation);
    return {
      rooms: featuredRooms(rooms).map(roomView),
      company: companies.slice(0, 4),
      compantcount: db.companies.length,
      roomcount: rooms.length,
      ordercount: db.orders.length,
    };
  },

  // 尋找寄宿：廠商列表
  'GET Room/GetCompanys'({query}) {
    let list = db.companies.map(companyView);
    const keyword = (query.keyword || '').trim();
    if (keyword) {
      list = list.filter((c) =>
        [c.companybrand, c.companyname, c.address].some((s) => s.includes(keyword))
      );
    }
    if (query.country) list = list.filter((c) => c.country === query.country);
    if (query.area) list = list.filter((c) => c.area === query.area);
    const sortBy = query.money ? 'roomprice_min' : query.evaluation ? 'evaluation' : null;
    if (sortBy) {
      const dir = (query.money || query.evaluation) === 'ASC' ? 1 : -1;
      list.sort((a, b) => (a[sortBy] - b[sortBy]) * dir);
    }
    const {items, meta} = paginate(list, query.page, 6);
    return {companies: items, meta};
  },

  // 尋找寄宿：空間列表
  'GET Room/GetRoom'({query}) {
    let list = db.rooms.filter((r) => r.state);
    const types = ['cat', 'dog', 'other'].filter((t) => toBool(query[`chk_${t}`]));
    if (types.length) {
      list = list.filter((r) => types.some((t) => r[`pettype_${t}`]));
    }
    const start = parseDate(query.dates);
    const end = parseDate(query.datee);
    if (start && end) {
      list = list.filter(
        (r) =>
          !db.orders.some(
            (o) => o.roomseq === r.roomseq && o.state === 1 && overlaps(o, start, end)
          )
      );
    }
    const size = toNum(query.size);
    if (size) {
      list = list.filter((r) => (size > 25 ? r.petsizee > 25 : r.petsizes <= size));
    }
    const amount = toNum(query.amount);
    if (amount) list = list.filter((r) => r.roomamount >= amount);
    if (query.money) {
      const dir = query.money === 'ASC' ? 1 : -1;
      list = [...list].sort((a, b) => (a.roomprice - b.roomprice) * dir);
    }
    const {items, meta} = paginate(list, query.page, 6);
    return {rooms: items.map(roomView), remove: [], meta};
  },

  // 廠商頁
  'GET Room/GetRoomslist'({query}) {
    const company = companyOf(toNum(query.id));
    if (!company) return {status: 404, data: {}};
    return {
      company: companyView(company),
      roomlists: db.rooms
        .filter((r) => r.companyseq === company.companyseq && r.state)
        .map(roomView),
      evaluation: companyEvaluations(company.companyseq)
        .sort((a, b) => b.order.orderseq - a.order.orderseq)
        .map(({order, evaluation}) => {
          const member = memberOf(order.memberseq) || {};
          return {
            avatar: member.avatar || AVATAR_DEFAULT,
            poster: member.membername,
            star: evaluation.star,
            memo: evaluation.memo,
            postdate: evaluation.postdate,
          };
        }),
    };
  },

  // 空間頁
  'GET Room/GetRoomsFront'({query}) {
    const room = roomOf(toNum(query.id));
    if (!room) return {status: 404, data: {}};
    const qa = db.questions
      .filter((q) => q.roomseq === room.roomseq)
      .sort((a, b) => b.queseq - a.queseq)
      .map((q, i) => ({...questionDetail(q), index: i + 1}));
    const {items, meta} = paginate(qa, query.page, 5);
    return {
      company: {...companyView(companyOf(room.companyseq)), isopen: room.state},
      room: roomView(room),
      remove: bookedDates(room.roomseq),
      qa: items,
      meta,
    };
  },

  // 登入 / 註冊 / 身分
  'POST Company/Login'({body}) {
    const c = db.companies.find(
      (x) => x.email.toLowerCase() === String(body.email).toLowerCase()
    );
    if (!c || c.pwd !== body.pwd) return {result: '帳號或密碼錯誤'};
    return {result: '登入成功', token: `mock.company.${c.companyseq}`};
  },
  'POST Member/Login'({body}) {
    const m = db.members.find(
      (x) => x.email.toLowerCase() === String(body.email).toLowerCase()
    );
    if (!m || m.pwd !== body.pwd) return {result: '帳號或密碼錯誤'};
    return {result: '登入成功', token: `mock.member.${m.memberseq}`};
  },
  'POST Company/Register'({body}) {
    const exists = [...db.companies, ...db.members].some(
      (x) => x.email.toLowerCase() === String(body.email).toLowerCase()
    );
    if (exists) return {result: '此信箱已被註冊'};
    db.companies.push({
      ...body,
      companyseq: nextId(db.companies, 'companyseq'),
      introduce: null,
      avatar: '',
      bannerimg: '',
      morning: true,
      afternoon: true,
      night: false,
      midnight: false,
    });
    return {result: '註冊成功'};
  },
  'POST Member/Register'({body}) {
    const exists = [...db.companies, ...db.members].some(
      (x) => x.email.toLowerCase() === String(body.email).toLowerCase()
    );
    if (exists) return {result: '此信箱已被註冊'};
    db.members.push({
      memberseq: nextId(db.members, 'memberseq'),
      email: body.email,
      pwd: body.pwd,
      membername: body.membername,
      avatar: null,
    });
    return {result: '註冊成功'};
  },
  'GET GetIdentity'({me}) {
    if (!me) return {result: '無授權'};
    if (me.type === 'company') {
      return {result: {identity: '廠商', avatar: me.company.avatar || null}};
    }
    return {result: {identity: '會員', avatar: me.member.avatar || null}};
  },

  // 通知（原本是 SignalR 即時推播，這裡只保留查詢）
  'GET Notice/GetNotice'({me}) {
    if (!me) return UNAUTHORIZED;
    const notices = noticesFor(me);
    return {
      notices: notices.length ? notices : null,
      unread: notices.filter((n) => n.state === '未讀').length,
    };
  },
  'GET Notice/Readall'({me}) {
    if (!me) return UNAUTHORIZED;
    noticesFor(me).forEach((n) => (n.state = '已讀'));
    return {result: '成功'};
  },
  'POST Notice/Readone'({me, body}) {
    if (!me) return UNAUTHORIZED;
    const n = noticesFor(me).find((x) => x.noticeseq === toNum(body.noticeseq));
    if (n) n.state = '已讀';
    return {result: '成功'};
  },
  'POST Notice/Sendid'() {
    return {result: '成功'};
  },

  // 訂單
  'GET Order/Getorder'({me, query}) {
    if (!me) return UNAUTHORIZED;
    const mine = (o) =>
      me.type === 'member' ? o.memberseq === me.id : o.companyseq === me.id;
    if (query.id) {
      const o = orderOf(toNum(query.id));
      if (!o || !mine(o)) return {status: 404, data: {}};
      return orderDetail(o);
    }
    let list = db.orders.filter(mine);
    const state = toNum(query.state);
    if (state) list = list.filter((o) => o.state === state);
    const keyword = (query.roomname || '').trim();
    if (keyword) {
      list = list.filter((o) => (roomOf(o.roomseq) || {roomname: ''}).roomname.includes(keyword));
    }
    const start = parseDate(query.datetimes);
    const end = parseDate(query.datetimee);
    if (start && end) list = list.filter((o) => overlaps(o, start, end));
    list.sort((a, b) => b.orderseq - a.orderseq);
    const {items, meta} = paginate(list, query.page, toNum(query.paged) || 6);
    return {order: items.map((o) => orderListItem(o, me)), meta};
  },
  'POST Order/Cancelorder'({me, body}) {
    if (!me) return UNAUTHORIZED;
    const o = orderOf(toNum(body.orderseq));
    if (!o) return {status: 404, data: {}};
    o.state = 2;
    o.canceldate = now();
    o.cancel_reason = body.reason || null;
    o.cancel_memo = body.memo || null;
    return {result: '取消成功'};
  },

  // 下訂：原本會導去綠界付款，這裡直接成立一筆已付款訂單
  'POST Pay/ECPayGetinfo'({me, body}) {
    if (!me || me.type !== 'member') return UNAUTHORIZED;
    const room = roomOf(toNum(body.roomseq));
    if (!room) return {status: 404, data: {}};
    const start = parseDate(body.orderdates);
    const end = parseDate(body.orderdatee);
    const days = Math.round((end - start) / 86400000) + 1;
    const amount = toNum(body.petamount) || 1;
    const addons = [
      ['medicine_infeed', 'medicine_infeed_amt'],
      ['medicine_paste', 'medicine_paste_amt'],
      ['medicine_pill', 'medicine_pill_amt'],
      ['bath', 'bath_amt'],
      ['hair', 'hair_amt'],
      ['nails', 'nails_amt'],
    ];
    const addonPrice = addons
      .filter(([flag]) => toBool(body[flag]))
      .reduce((sum, [, price]) => sum + toNum(room[price]) * amount, 0);
    const order = {
      orderseq: nextId(db.orders, 'orderseq'),
      memberseq: me.id,
      roomseq: room.roomseq,
      companyseq: room.companyseq,
      orderdates: fmtDate(start),
      orderdatee: fmtDate(end),
      setdate: now(),
      canceldate: '0001-01-01 00:00',
      state: 1,
      name: body.name,
      tel: body.tel,
      pettype: body.pettype,
      petsize: body.petsize,
      petamount: amount,
      memo: body.memo,
      orderprice: (room.roomprice + (amount - 1) * room.roomamount_amt) * days + addonPrice,
      cancel_reason: null,
      cancel_memo: null,
    };
    addons.forEach(([flag]) => (order[flag] = toBool(body[flag])));
    db.orders.push(order);
    notify(`company:${room.companyseq}`, '下單通知');
    return {mock: true, orderseq: order.orderseq};
  },

  // 評價
  'GET Evaluation/Get'({me, query}) {
    if (!me) return UNAUTHORIZED;
    const o = orderOf(toNum(query.id));
    if (!o) return {status: 404, data: {}};
    const company = companyOf(o.companyseq) || {};
    const member = memberOf(o.memberseq) || {};
    const evaluation = evaluationOf(o.orderseq);
    return {
      company: {
        orderseq: o.orderseq,
        avatar: (me.type === 'member' ? company.avatar : member.avatar) || '',
        companybrand: company.companybrand,
        membername: member.membername,
        amt: o.orderprice,
      },
      evalution: evaluation
        ? {star: evaluation.star, memo: evaluation.memo}
        : {star: 0, memo: ''},
      state: {btn_Evalution_readonly: !!evaluation || me.type !== 'member'},
    };
  },
  'POST Evaluation/Set'({me, body}) {
    if (!me || me.type !== 'member') return UNAUTHORIZED;
    const orderseq = toNum(body.orderseq);
    if (evaluationOf(orderseq)) return {result: '已評價過'};
    db.evaluations.push({
      orderseq,
      star: toNum(body.star),
      memo: body.memo || '',
      postdate: fmtDate(new Date()),
    });
    return {result: '評價成功'};
  },

  // 問與答
  'GET Qa/GetQuestion'({me, query}) {
    if (!me) return UNAUTHORIZED;
    let list = db.questions.filter((q) =>
      me.type === 'member' ? q.memberseq === me.id : q.companyseq === me.id
    );
    if (query.state === '1') list = list.filter((q) => !q.answer);
    if (query.state === '2') list = list.filter((q) => q.answer);
    list.sort((a, b) => b.queseq - a.queseq);
    const {items, meta} = paginate(list, query.page, 6);
    return {question: items.map(questionListItem), meta};
  },
  'GET Qa/GetQuestionDetail'({me, query}) {
    if (!me) return UNAUTHORIZED;
    const q = db.questions.find((x) => x.queseq === toNum(query.queseq));
    if (!q) return {status: 404, data: {}};
    return questionDetail(q);
  },
  'POST Qa/PostQuestion'({me, body}) {
    if (!me || me.type !== 'member') return UNAUTHORIZED;
    const room = roomOf(toNum(body.roomseq));
    if (!room) return {status: 404, data: {}};
    db.questions.push({
      queseq: nextId(db.questions, 'queseq'),
      memberseq: me.id,
      roomseq: room.roomseq,
      companyseq: room.companyseq,
      question: body.message,
      question_date: now(),
      answer: '',
      answer_date: '',
    });
    notify(`company:${room.companyseq}`, '問通知');
    return {result: '提問成功'};
  },
  'POST Qa/PostAnswer'({me, body}) {
    if (!me || me.type !== 'company') return UNAUTHORIZED;
    const q = db.questions.find((x) => x.queseq === toNum(body.queseq));
    if (!q) return {status: 404, data: {}};
    q.answer = body.message;
    q.answer_date = now();
    notify(`member:${q.memberseq}`, '答通知');
    return {result: '回覆成功'};
  },

  // 廠商後台：空間管理
  'GET Room/GetRooms'({me, query}) {
    if (!me || me.type !== 'company') return UNAUTHORIZED;
    if (query.id) {
      const room = roomOf(toNum(query.id));
      return room && room.companyseq === me.id ? {...room} : {status: 404, data: {}};
    }
    let list = db.rooms.filter((r) => r.companyseq === me.id);
    const keyword = (query.roomname || '').trim();
    if (keyword) list = list.filter((r) => r.roomname.includes(keyword));
    const {items, meta} = paginate(list, query.page, 6);
    return {room: items, meta};
  },
  'POST Room/Create'({me, body}) {
    if (!me || me.type !== 'company') return UNAUTHORIZED;
    db.rooms.push(normalizeRoom({
      ...body,
      roomseq: nextId(db.rooms, 'roomseq'),
      companyseq: me.id,
      state: true,
    }));
    return {result: '上架成功'};
  },
  'PATCH Room/Edit'({me, body}) {
    if (!me || me.type !== 'company') return UNAUTHORIZED;
    const index = db.rooms.findIndex(
      (r) => r.roomseq === toNum(body.roomseq) && r.companyseq === me.id
    );
    if (index === -1) return {status: 404, data: {}};
    db.rooms.splice(index, 1, normalizeRoom({...db.rooms[index], ...body}));
    return {result: '修改成功'};
  },
  'POST Room/Clone'({me, query}) {
    if (!me || me.type !== 'company') return UNAUTHORIZED;
    const room = roomOf(toNum(query.id));
    if (!room || room.companyseq !== me.id) return {status: 404, data: {}};
    db.rooms.push({
      ...room,
      roomseq: nextId(db.rooms, 'roomseq'),
      roomname: `${room.roomname}（複製）`,
      state: false,
    });
    return {result: '複製成功'};
  },
  'POST Room/StateUpdate'({me, query}) {
    if (!me || me.type !== 'company') return UNAUTHORIZED;
    const room = roomOf(toNum(query.id));
    if (!room || room.companyseq !== me.id) return {status: 404, data: {}};
    room.state = !room.state;
    return {result: '修改成功'};
  },
  'DELETE Room/Delete'({me, query}) {
    if (!me || me.type !== 'company') return UNAUTHORIZED;
    db.rooms = db.rooms.filter(
      (r) => !(r.roomseq === toNum(query.id) && r.companyseq === me.id)
    );
    return {result: '刪除成功'};
  },

  // 設定頁
  'GET Company/GetOne'({me}) {
    if (!me || me.type !== 'company') return UNAUTHORIZED;
    return withoutPwd(me.company);
  },
  'PATCH Company/Patchcompany'({me, body}) {
    if (!me || me.type !== 'company') return UNAUTHORIZED;
    Object.assign(me.company, {
      introduce: body.introduce,
      morning: toBool(body.morning),
      afternoon: toBool(body.afternoon),
      night: toBool(body.night),
      midnight: toBool(body.midnight),
      bannerimg: body.bannerimg,
    });
    return {result: '修改成功'};
  },
  'PATCH Company/Resetpwd'({me, body}) {
    if (!me || me.type !== 'company') return UNAUTHORIZED;
    me.company.pwd = body.pwd;
    return {result: '修改成功'};
  },
  'GET Member/GetOne'({me}) {
    if (!me || me.type !== 'member') return UNAUTHORIZED;
    return withoutPwd(me.member);
  },
  'PATCH Member/Resetpwd'({me, body}) {
    if (!me || me.type !== 'member') return UNAUTHORIZED;
    me.member.pwd = body.pwd;
    return {result: '修改成功'};
  },

  // 圖片上傳：直接轉成 data URL
  async 'POST Uploadimg'({body}) {
    try {
      return {result: await readImage(body.get('file'))};
    } catch (e) {
      return {result: '圖片格式錯誤'};
    }
  },
  async 'POST Company/Uploadimg'({me, body}) {
    if (!me || me.type !== 'company') return UNAUTHORIZED;
    try {
      me.company.avatar = await readImage(body.get('file'));
      return {result: me.company.avatar};
    } catch (e) {
      return {result: '圖片格式錯誤'};
    }
  },
  async 'POST Member/Uploadimg'({me, body}) {
    if (!me || me.type !== 'member') return UNAUTHORIZED;
    try {
      me.member.avatar = await readImage(body.get('file'));
      return {result: me.member.avatar};
    } catch (e) {
      return {result: '圖片格式錯誤'};
    }
  },
};

const ROOM_NUMBERS = [
  'petsizes', 'petsizee', 'roomamount', 'roomprice', 'roomamount_amt', 'walk', 'visit',
  'medicine_infeed_amt', 'medicine_pill_amt', 'medicine_paste_amt',
  'bath_amt', 'hair_amt', 'nails_amt',
];
const ROOM_FLAGS = [
  'pettype_cat', 'pettype_dog', 'pettype_other', 'canned', 'feed', 'catlitter',
  'medicine_infeed', 'medicine_pill', 'medicine_paste', 'bath', 'hair', 'nails', 'state',
];

function normalizeRoom(room) {
  ROOM_NUMBERS.forEach((k) => (room[k] = toNum(room[k])));
  ROOM_FLAGS.forEach((k) => (room[k] = toBool(room[k])));
  room.roomseq = toNum(room.roomseq);
  return room;
}

// ---------- axios adapter ----------

export default function mockAdapter(config) {
  const [rawPath, rawQuery = ''] = config.url.trim().split('?');
  const path = rawPath.replace(/^\/+/, '').replace(/^api\//, '');
  const method = config.method.toUpperCase();
  const query = {...Object.fromEntries(new URLSearchParams(rawQuery)), ...config.params};
  let body = config.data;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch (e) {
      // 保持原樣
    }
  }
  body = body || {};

  const handler = routes[`${method} ${path}`];
  const respond = (status, data) => {
    const response = {data, status, statusText: String(status), headers: {}, config, request: {}};
    return status >= 200 && status < 300
      ? response
      : Promise.reject(Object.assign(new Error(`Request failed with status code ${status}`), {config, response}));
  };

  // 模擬一點網路延遲，讓 loading 動畫有機會出現
  const delay = new Promise((resolve) => setTimeout(resolve, 250));

  if (!handler) {
    console.warn(`[mock] 沒有對應的 API：${method} ${path}`);
    return delay.then(() => respond(404, {result: 'Not Found'}));
  }

  return delay
    .then(() => handler({me: whoAmI(config.headers), query, body}))
    .then((result) => {
      save();
      if (result && result.status && result.data !== undefined) {
        return respond(result.status, result.data);
      }
      return respond(200, result);
    });
}
