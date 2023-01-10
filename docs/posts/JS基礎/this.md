---
title: this
tags: [javascript, JS基礎]
---

## 前言

在執行上下文的詞法環境中，我們談到 `this binding`，所以我們能夠知道 `this` 的值是在調用函數時才確認，而非創建函數時。  
而該篇我們來談論 `this` 值是如何確定的。

## this 是什麼?
`this` 值是一個物件，該值是指向調用該函數的引用物件。  
這樣設計是方便我們能夠用更隱式的方式傳遞引用物件，使得程式碼更加簡潔。  


## this 的綁定規則

- 默認綁定
  在全局與函數下使用 `this`，`this` 的默認值是指向 `window`。
  ```js
  console.log(this)
  function hello(){
    console.log(this) // this
  }
  hello()
  ``` 
  不過當開啟嚴格模式(`'use strict'`)時， `this` 值將會為 `undefined`。  

   ```js
  function hello(){
    console.log(this) // undefined
  }
  hello()
  ``` 
- 隱式綁定
- 顯式綁定
- new 綁定
- 箭頭函數

## this 的優先級

`new` -> `顯示綁定` -> `隱式綁定` -> `默認綁定`