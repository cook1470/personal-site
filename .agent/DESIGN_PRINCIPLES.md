# 設計原則

- 保持純靜態輸出；需要後端功能時才考慮 Cloudflare Workers，不預先引入。
- 資料與呈現分離：所有內容集中在 `src/data/site.ts`，元件只負責畫。改內容不用動邏輯。
  （原本寫的是「用 Astro content collections」，實際上沒走這條，資料量也還不需要。）
- 改版面之前先看畫面，不要憑程式碼想像。方法見 PITFALLS.md 的 Edge 截圖那條。
- 形式上的判準集中在 `features/game_shell.md`，動視覺前必讀。
