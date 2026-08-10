# 設計原則

- 保持純靜態輸出;需要後端功能時才考慮 Cloudflare Workers,不預先引入。
- 作品資料用 Astro content collections 管理,不寫死在頁面元件裡。
