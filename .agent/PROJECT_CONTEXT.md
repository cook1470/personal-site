# 專案狀態

- 2026-08-11:首頁骨架完成,用戶對方向表示滿意(尤其畫廊)。
- 概念:偵探證物板——作品是圖釘釘上的照片、金線牽連、點擊攤開紙張介紹(仿
  CookTWGame PaperDialog 動畫),GO 才前往。視覺:暗底 #0c0c0e + 金 #e8b463。
- 已完成:hero(酷可 cook + 頭像)、10 個遊戲作品上板(8 個有 CG 封面)、
  紙張介紹視窗、29 張 pixiv 畫作瀑布流畫廊(點回 pixiv 原頁)。
- 正式網域 cook1470.com(2026-08-11 購於 Cloudflare Registrar):
  cook1470.com / www → personal-site 專案;phantasia.cook1470.com → phantasia 專案(視覺小說編輯器,
  由 phantasia-engine 的 Claude 出靜態包、經 bridge 協作部署);play.cook1470.com → phantasia-demo 專案(遊戲 demo)。
  DNS 為四條 proxied CNAME 指向各 pages.dev。DNS 寫入 token(限 cook1470.com zone)存
  %LOCALAPPDATA%\claude-site\cf-dns-token.txt,不進 git。
- 部署:直傳模式,npm run build 後 npx wrangler pages deploy dist --project-name personal-site --branch master。
  GitHub:https://github.com/cook1470/personal-site(master)。
- 首頁結構:地表像素世界(cookland 概念,酷可手繪 sprite)→ 土層帶 → 地底證物板 + 畫廊。
- 尚未:社群連結仍是 # 佔位、Fabula 與 Phantasia 缺圖、主站 GO 尚未指向編輯器/demo(等用戶)。
