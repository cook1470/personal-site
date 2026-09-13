# 專案狀態

- 2026-09-13:改造成遊戲外殼(規格見 features/game_shell.md)。原本的偵探證物板、
  紙張視窗、長頁捲動全部移除,像素世界升格為常駐主選單背景,分頁蓋在上面。
  Fabula 暫時下架(Work.hidden)。程式碼在 components/shell/ 與 scripts/shell.ts。
- 正式網域 cook1470.com(2026-08-11 購於 Cloudflare Registrar):
  cook1470.com / www → personal-site 專案;phantasia.cook1470.com → phantasia 專案(視覺小說編輯器,
  由 phantasia-engine 的 Claude 出靜態包、經 bridge 協作部署);play.cook1470.com → phantasia-demo 專案(遊戲 demo)。
  DNS 為四條 proxied CNAME 指向各 pages.dev。DNS 寫入 token(限 cook1470.com zone)存
  %LOCALAPPDATA%\claude-site\cf-dns-token.txt,不進 git。
- 部署:直傳模式,npm run build 後 npx wrangler pages deploy dist --project-name personal-site --branch master。
  GitHub:https://github.com/cook1470/personal-site(master)。
- 首頁結構:地表像素世界(cookland 概念,酷可手繪 sprite)→ 土層帶 → 地底證物板
  → 文/磚文件區 → 畫廊 → footer。
- 2026-08-12:favicon 換成自製像素圖釘(scripts/gen-favicon.cjs 產 svg/ico/180png);
  footer 加信箱 b43096022@gmail.com;幻錄公開上線,補連結與紙張視窗介紹。
- 2026-09-10:淬(forge,Cook Mac 上的 Claude,經跨 session 訊息聯絡)的網頁小遊戲《三台車》
  上線於 three-units.cook1470.com,獨立 Pages 專案 three-units,本地目錄 ../three-units/(自己一個 git repo,無遠端)。
  更新:從 http://100.121.43.29:4173/single.html(Tailscale)抓下覆蓋 public/index.html,
  在該目錄 `npx wrangler@4.120.0 pages deploy --project-name three-units --branch master`。
  遊玩紀錄端點 functions/api/session.ts:POST 依 sid upsert 進 D1 three-units-db(表 sessions),
  GET 帶 Bearer READ_TOKEN 回全部;token 存 %LOCALAPPDATA%\claude-site\three-units-read-token.txt,
  Pages secret 已設,淬也持有。已釘上首頁證物板(截圖 images/works/three-units.jpg)。
  首頁 public/_redirects 把舊路徑 /three-units/ 301 過去。
  Pages 綁自訂網域 wrangler 沒指令,用 wrangler OAuth token(%APPDATA%\xdg.config\.wrangler\config\default.toml)
  呼叫 accounts/{id}/pages/projects/{name}/domains API;DNS 用 cf-dns-token。
- 尚未:Fabula 缺圖、Hero 跑酷小遊戲構想,詳見 TODO.md。
