# 交接手冊

## 專案一句話

酷可（cook）的個人網站：整個網站是一款遊戲而不是一份文件。
一個畫面不捲動，像素世界當常駐主選單背景，分頁蓋在上面。已上線 cook1470.com。

## 接手必知

- **動視覺前必讀** `.agent/features/game_shell.md`（形式判準、文字與符號規範、視覺規範）
  與 `.agent/features/creator_profile.md`（創作者輪廓）。
  改造過程中被退回很多次，規範多半是用戶當場講的，照著做能少走冤枉路。
- 結構：`src/data/site.ts`（pinned / articles / mcMaps / art / links，改內容不用動邏輯）、
  `src/components/shell/`（PixelWorld 背景、MainMenu 主選單、Panel 視窗外框、各分頁）、
  `src/scripts/shell.ts`（分頁與詳情的開關、鍵盤）、`src/pages/index.astro` 只做組裝與全域樣式。
- 網址 hash 直接開分頁：`#works`、`#art`、`#docs`、`#maps`、`#about`，
  `#works/<作品 id>` 連詳情一起開。截圖驗證與對外分享都用得到。
- 作品與關於是整片全畫面（自己的容器，不套 Panel）；文、磚、繪圖仍用 Panel 視窗。
- 看畫面的方法與手機版怎麼截，見 PITFALLS.md。改版面務必自己截圖看過再交出去。
- 部署：npm run build → npx wrangler@4.120.0 pages deploy dist --project-name personal-site --branch master。
  網域、DNS token、各子網域見 PROJECT_CONTEXT.md。
- 與 phantasia-engine 專案的 Claude 用內建 SendMessage 聯絡（ListAgents 找得到）。
  它出靜態包放 %LOCALAPPDATA%\claude-bridge\outbox\，我負責 wrangler 部署。
  部署出口只在本專案，不要教對方自己 deploy（避免雙寫）。
  注意 phantasia / phantasia-demo 的 production 分支是 main，不是 master。
- Mac 端由 Mio 一起開發，clone 在 /Users/cook/agents/_public/projects/personal-site。
  部署出口只有 Windows 這台（wrangler token 在本機），Mac 端只 push master，不自己 deploy。

## 目前狀態

主畫面：像素世界 + 標題 + 五個選單按鈕（數字鍵 1-5 可開）。
作品：一排三張卡（16:9 縮圖不裁切、標題、年份類型、一句簡述），點開是霧面玻璃詳情。
繪圖：pixiv 精選 10 張縮圖牆。文 / 磚：文件清單，共用 DocSection。
關於：整片深色背景 + 圓框大頭貼，點任何空白處關閉。
Esc 一律可關；作品詳情開著時 Esc 先關詳情。

favicon 是像素風金色圖釘，改造型改 `scripts/gen-favicon.cjs` 裡的像素格再執行
（專案是 ESM，腳本必須用 .cjs）。部署暫鎖 wrangler@4.120.0（見 PITFALLS）。
剩餘工作見 TODO.md。
