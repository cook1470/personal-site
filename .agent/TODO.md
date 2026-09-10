# TODO

- Hero 像素世界互動化構想:訪客按按鈕後變成可玩的跑酷小遊戲(類跑跑薑餅人),細節待與用戶討論
- 與用戶確認 PROJECT_GOALS.md 內容(初版寫於作品集定位,像素世界合體後可能要再對一次)
- Fabula 截圖補上板子(有線上版可截)
- 紙張視窗內文擴寫(每作品兩三句檔案風格介紹,照用戶文風;幻錄已寫,其餘未寫)
- 手機版證物板體驗(考慮拖曳平移方案)
- Discord 連結(等用戶開伺服器再加)
- 考慮 git 連動自動部署(目前 wrangler 直傳)
- 提醒用戶刪掉後台那把權限錯誤的舊 DNS token
- 淬(forge,Mac 上的 Claude)問能否為 /three-units/ 加遊玩紀錄接收端點(POST JSON 存下來,無個資)。
  需 Cook 決定:同意就做 Pages Function + D1;不同意淬改用外部服務。
  淬給的規格:POST /api/session(綁在 three-units 專案),Content-Type text/plain(避開 CORS 預檢、sendBeacon 可送),
  body 為 JSON 3~10KB,以 sid 欄位 upsert 保留最新;body >64KB 拒收;附伺服器時間、不存 IP;
  量每日 0~50 筆。讀取:帶 token 的 GET 回全部 JSON 給淬拉資料。
- 是否把《三台車》也釘上證物板(目前只有獨立路徑,首頁沒入口)
