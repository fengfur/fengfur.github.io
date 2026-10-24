# 幻幀製造局 · Phantom Frame Lab
靜態首頁與作品預覽：https://fengfur.github.io/

## 本機預覽
需要 Python 3，在 repository 根目錄執行：
~~~sh
python -m http.server 8768 --bind 127.0.0.1
~~~
開啟 http://127.0.0.1:8768/ 。

## 更新與發佈
直接修改 HTML、styles.css、gallery.js 或圖片。修改 CSS/JS 後先執行：
~~~sh
python scripts/version_assets.py
~~~
腳本會依內容雜湊建立 assets/styles.<hash>.css 與 assets/gallery.<hash>.js，並更新三個 HTML 頁面的引用。將來源檔、產生的資源與 HTML 一起提交，透過 PR 合併至 main 後由 GitHub Pages 發佈。

保留既有的雜湊資源，讓仍快取舊 HTML 的訪客也能載入對應版本。不要直接修改已發佈的雜湊檔案；請改來源後重新產生。

網站不需要 npm 安裝或建置；作品預覽使用原生 dialog，未開啟 JavaScript 時仍可直接看圖。
