# 交接手冊

## 專案一句話

酷可(cook)的個人網站:地表是活的像素世界(cookland 概念、用戶手繪 sprite),
往地底挖是證物板(作品照片+金線)與 pixiv 畫廊。已上線 cook1470.com。

## 接手必知

- 結構:`src/data/site.ts`(pinned / threads / art / links 資料,改內容不用動邏輯)、
  `src/components/`(Hero 像素世界、Board 證物板+紙張視窗、Gallery 畫廊)、
  `src/pages/index.astro` 只做組裝與全域樣式、背景微粒。
- 設計依據:`.agent/features/creator_profile.md`(創作者輪廓與美學規範,動視覺前必讀)。
- 部署:npm run build → npx wrangler pages deploy dist --project-name personal-site --branch master。
  網域、DNS token、各子網域見 PROJECT_CONTEXT.md。
- 與 phantasia-engine 專案的 Claude 用 claude-bridge 協作(我這邊註冊名 Site,
  群聊房 #site-phantasia):它出靜態包放 %LOCALAPPDATA%\claude-bridge\outbox\,
  我負責 wrangler 部署。部署出口只在本專案,不要教對方自己 deploy(避免雙寫)。
- 紙張視窗(paper dialog)動畫仿 CookTWGame 的 PaperDialog(Back.Out 回彈)。
  hidden 屬性與 display 的坑見 PITFALLS.md,已踩兩次。

## 目前狀態

網站完整上線:hero 像素世界、證物板 12 作品(含兩個鐵人賽教學系列,連結全數填妥,
僅 PhantomLedger 開發中無連結)、紙張視窗(Phantasia 有雙章:GO→編輯器、試玩範例→play)、
畫廊為精選 10 張的拖曳膠卷帶(自動漂移+拖曳,原地點擊才導 pixiv)、社群連結含巴哈姆特。
剩餘工作見 TODO.md。
