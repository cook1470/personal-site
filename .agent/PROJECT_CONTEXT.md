# 專案狀態

- 2026-09-13：改造成遊戲外殼（規格見 features/game_shell.md）。原本的偵探證物板、
  紙張視窗、長頁捲動全部移除，像素世界升格為常駐主選單背景，分頁蓋在上面。
  Fabula 暫時下架（Work.hidden）。程式碼在 components/shell/ 與 scripts/shell.ts。
  現況：主畫面（像素世界＋標題＋五個選單）→ 作品 / 繪圖 / 文 / 磚 / 關於五個分頁。
- 正式網域 cook1470.com（2026-08-11 購於 Cloudflare Registrar）：
  cook1470.com / www → personal-site 專案；phantasia.cook1470.com → phantasia 專案
  （視覺小說編輯器，由 phantasia-engine 的 Claude 出靜態包、我負責部署）；
  play.cook1470.com → phantasia-demo 專案（遊戲 demo）。
  DNS 為四條 proxied CNAME 指向各 pages.dev。DNS 寫入 token（限 cook1470.com zone）存
  %LOCALAPPDATA%\claude-site\cf-dns-token.txt，不進 git。
- 部署：push 到 master 由 GitHub Actions 自動建置並直傳（.github/workflows/deploy.yml，
  2026-09-13 起）。任何機器 push 都會上線，不需本機 wrangler，Windows 不必開機。
  金鑰是 repo secret CLOUDFLARE_API_TOKEN（權限 Account / Cloudflare Pages / Edit），
  帳號編號寫在 workflow 裡。Direct Upload 專案無法改接 Cloudflare 原生 Git 連動，
  官方只能另建專案，所以走 Actions 跑 wrangler，維持現有專案與網域不動。
  要手動出一版仍可在本機跑
  npx wrangler@4.120.0 pages deploy dist --project-name personal-site --branch master。
  GitHub：https://github.com/cook1470/personal-site（master）。
  注意各專案的 production 分支不一致，見 PITFALLS。
- favicon 是自製像素圖釘（scripts/gen-favicon.cjs 產 svg/ico/180png）。
- 2026-09-10：淬（forge，Cook Mac 上的 Claude）的網頁小遊戲《三台車》
  上線於 three-units.cook1470.com，獨立 Pages 專案 three-units，
  本地目錄 ../three-units/（自己一個 git repo，無遠端）。
  更新：從 http://100.121.43.29:4173/single.html（Tailscale）抓下覆蓋 public/index.html，
  在該目錄 `npx wrangler@4.120.0 pages deploy --project-name three-units --branch master`。
  遊玩紀錄端點 functions/api/session.ts：POST 依 sid upsert 進 D1 three-units-db（表 sessions），
  GET 帶 Bearer READ_TOKEN 回全部；token 存 %LOCALAPPDATA%\claude-site\three-units-read-token.txt，
  Pages secret 已設，淬也持有。
  首頁 public/_redirects 把舊路徑 /three-units/ 301 過去。
  Pages 綁自訂網域 wrangler 沒指令，用 wrangler OAuth token
  （%APPDATA%\xdg.config\.wrangler\config\default.toml）
  呼叫 accounts/{id}/pages/projects/{name}/domains API；DNS 用 cf-dns-token。
- 尚未完成的見 TODO.md。
