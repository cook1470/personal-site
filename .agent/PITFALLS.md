# 踩坑紀錄

- wrangler 未鎖版時 npx 抓最新版,4.121.0 相依的 miniflare 版本不存在導致部署失敗
  (2026-08-12)。部署改用 `npx wrangler@4.120.0`;上游修復後可拿掉鎖版。

- HTML `hidden` 屬性會被自己 CSS 的 `display: flex/inline-block` 蓋掉(UA 樣式必輸給
  作者樣式)。已踩兩次(paper-overlay 整頁不可點、paper-go 未公開仍顯示 GO)。
  規則:任何會用 `hidden` 切換的元素,設 display 時必須同時寫 `[hidden] { display: none }`。

- 用 PowerShell Set-Content 改含中文的原始碼會把編碼弄壞成亂碼(2026-08-11 踩過,
  靠 git checkout 救回)。改檔一律用 Write/Edit 工具,shell 只跑指令不碰檔案內容。
- CG 封面圖:專案未公開時 full_project API 回 400,但發布成品可從
  POST /api/search/resources(types: buildApp)的 refp.cover.url 取得。

- Astro 模板自帶的 CLAUDE.md 是指向 AGENTS.md 的 symlink,已改為實體檔;AGENTS.md 保留原樣。
