# TODO

## 作品挑選（11-19 他定的，已上線）

- 留：深夜怪食堂（他說是目前最完整的作品，而且是獨立作品）、Ryvexia（要換成 Ryvexia II）、CookTWGame、Dunjo、五十音 BINGO
- 其他全部先不放：Phantasia Engine、PhantomLedger、PixiTank、小女巫・啟程、三台車、CK_TWEventsGame、Fabula、坐下，勇者
- CookTWGame 改名「酷可的光暈戰記」，名字、介紹、封面照平台上的專案頁；關於頁還有「九個遊戲同一個世界」，他說是瞎掰的，還沒改
- 封面原檔在 CG 專案的 resource 裡：Ryvexia2/resource/1467/cover_B.png、CookTWGame/main/resource/14bj/twilight_bistro_level_2.png
- 繪圖、文、磚、關於還沒挑

## 需要用戶決定或動手的

- 作品縮圖多數看不出是哪個遊戲，得重新挑有代表性的畫面（只有用戶能做）
- 作品詳情的內文擴寫（每作品兩三句介紹，照用戶文風；幻錄與三台車已寫，其餘未寫）
- 繪圖的份量：那是用戶唯一說滿意的作品，目前只是選單的第二項
- 工具鏈還沒有位置（Mio 指出：完全不露出會把用戶縮小成「做了幾個遊戲的人」）
- PROJECT_GOALS.md 要再對一次：初版寫於作品集定位，且提到用 content collections 管理，
  與現況（src/data/site.ts）不符。該檔規範上不可更動，要改得先問用戶。
- Discord 連結（等用戶開伺服器再加）

## 工程

- phantasia / phantasia-demo 的部署仍綁在 Windows 這台（別的 Claude 出包、這邊 wrangler 傳），
  要脫離得先讓它把產物 push 進 repo，再照 personal-site 的做法接 Actions
- 提醒用戶刪掉後台那把權限錯誤的舊 DNS token
- Pages 綁自訂網域仍只有 Windows 做得到（靠本機 wrangler OAuth，不是 API token），
  該找方法搬到 Mac 或改用帶 Pages 權限的 token
- `.agent/features/creator_profile.md` 與 PROJECT_GOALS.md 仍是半形逗號，
  其餘文件與 src 已全數改全形
