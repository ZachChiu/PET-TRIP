# Vue Cli 專案：Pet Trip 寵物寄宿平台

此專案採前後端分離，前端的畫面設計與前端路由、API 介接皆由本人完成。

### 2026 復活說明

線上網址：https://pet-trip.kamee.workers.dev/

原本的後端（pettrip.ddns.net）已經停止服務，現在網站改用前端內建的假資料（`src/mock`）運作：
所有 API 請求都由 axios adapter 攔截，資料存在瀏覽器的 localStorage，所以登入、下訂、上架、問答都還能操作，
但資料只存在自己的瀏覽器裡。下訂不會進入綠界付款頁，會直接成立一筆已付款訂單；SignalR 即時通知改成載入時查詢一次。

```bash
nvm use        # Node 22（16 ~ 24 都可以）
npm install
npm run serve  # 本機開發
npm run build  # 產出 dist/，放到任何靜態主機即可
PUBLIC_PATH=/PET-TRIP/ npm run build  # 部署在子路徑時
```

部署到 Cloudflare / Netlify / Vercel：連結這個 repo，build 指令填 `npm run build`，輸出資料夾填 `dist`。
SPA 路由已經用 `wrangler.jsonc`（Cloudflare Workers）、`netlify.toml`（Netlify）和 `vercel.json`（Vercel）設定好了。

若有一天要接回真的後端，build 時加上 `VUE_APP_MOCK=false` 即可關掉假資料。

### 使用技術：

1. Vue 2 前端框架
2. Axios
3. SignalR 即時通知系統
4. RESTful API 介接
5. Bootstrap + SCSS 版面設計
6. Veevalidate 資料驗證
7. [用 Figma 製作 Wireframe](https://www.figma.com/file/arMSShyhoHvQ1ux5CEANw8/%E7%AC%AC%E4%B8%80%E7%89%88?node-id=0%3A1)

### 網頁功能：

1. 首頁形象頁
2. 會員與廠商註冊登入、資料管理
3. 空間上架、下訂
4. **綠界金流 / 原採用藍新金流**
5. 問與答
6. 評價
7. **即時通知（ SignalR ）**

### 測試：

1. 廠商測試帳號 PAPA@gmail.com / 12345678
2. 會員測試帳號 test-member@gmail.com / 12345678
3. 測試卡號：4000-2211-1111-1111，有效期限：比今日大，測試三碼：任意輸入
