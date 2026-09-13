# 踩坑紀錄

- wrangler 未鎖版時 npx 抓最新版,4.121.0 相依的 miniflare 版本不存在導致部署失敗
  (2026-08-12)。部署改用 `npx wrangler@4.120.0`;上游修復後可拿掉鎖版。

- wrangler pages deploy 的 `--branch` 決定進 production 還是 preview,各專案的
  production 分支不一定相同:personal-site / three-units 是 master,
  phantasia / phantasia-demo 是 main。帶錯只會安靜地落在 Preview,
  預覽網址內容正確、正式網域不動,很難察覺。

- HTML `hidden` 屬性會被自己 CSS 的 `display: flex/inline-block` 蓋掉(UA 樣式必輸給
  作者樣式)。已踩三次(paper-overlay 整頁不可點、paper-go 未公開仍顯示 GO、
  作品格子 display:grid 沒收起來,詳情長在格子下面)。
  規則:任何會用 `hidden` 切換的元素,設 display 時必須同時寫 `[hidden] { display: none }`。

- 看畫面用 Windows 內建 Edge 截圖，不必裝 playwright：
  `msedge.exe --headless=new --disable-gpu --hide-scrollbars --force-prefers-reduced-motion
  --window-size=1600,900 --screenshot=out.png --virtual-time-budget=5000 <url>`
  `--force-prefers-reduced-motion` 不可省：headless 的虛擬時鐘會把進場動畫凍結在
  opacity 0 的中間狀態，拍出來像「CSS 完全沒生效」，會誤判成樣式壞掉（已誤判一次）。
  另外要截 build 後的 `astro preview`，dev server 的 HMR 注入在 headless 下不穩。
  **`--window-size` 壓不到手機寬度**：Windows 上 Edge 視窗最小寬度約 492px，
  設 390 也還是用 492 排版，截圖卻只裁 390 寬，看起來像整頁往右溢出（誤判過一次）。
  要看手機版得另外寫一頁 `<iframe width=390>` 指向網站，再截那個框。

- 用 PowerShell Set-Content 改含中文的原始碼會把編碼弄壞成亂碼(2026-08-11 踩過,
  靠 git checkout 救回)。改檔一律用 Write/Edit 工具,shell 只跑指令不碰檔案內容。
- CG 封面圖:專案未公開時 full_project API 回 400,但發布成品可從
  POST /api/search/resources(types: buildApp)的 refp.cover.url 取得。

- Astro 模板自帶的 CLAUDE.md 是指向 AGENTS.md 的 symlink,已改為實體檔;AGENTS.md 保留原樣。
