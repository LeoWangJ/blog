---
title: ch02 - HTML中的JS
tags: [javascript, JS高級程序]
---

要將 JavaScript 引入網頁的話，首先必須解決與網頁的主導語言 HTML 的相關問題。要如何兼容到 HTML? 最終使用&lt;\script&gt;來加載腳本。

## script 元素

提供八種屬性，這裡只介紹其中幾個常用的

1. defer: 能夠使腳本先被加載，等到頁面解析至&lt;/html&gt;時才會執行腳本內容
2. async: 與 defer 相似，但在加載時不會按照腳本順序去執行。
3. type: 代表腳本語言的內容類型。module 代表 code 會被當作 ES6 模塊，能夠使用 import 與 export。
4. src: 加載外部腳本的來源路徑。

## 加載順序

腳本在被加載時(包含內聯腳本)會是由上往下的依序執行。並且在執行時不會執行其他內容，所以容易導致畫面渲染被阻塞。為了避免畫面空白時間過久，通常會將&lt;script&gt;放到&lt;/body&gt;前來達到優化的效果。

## 動態加載腳本

除了使用&lt;script&gt;去加載外，還可以使用 JS 去加載腳本，但難以管理從哪邊加載的。要讓預加載器知道有哪些動態腳本存在，可以在&lt;head&gt;裡聲明:

> &lt;link rel="preload" href="a.js"/&gt;
