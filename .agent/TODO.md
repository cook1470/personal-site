# TODO

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
- `.agent/features/creator_profile.md` 與 PROJECT_GOALS.md 仍是半形逗號，
  其餘文件與 src 已全數改全形
