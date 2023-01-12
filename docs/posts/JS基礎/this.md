---
title: this
tags: [javascript, JS基礎]
---

## 前言

在執行上下文的詞法環境中，我們談到在創建詞法階段時會綁定 `this` 值，所以我們能夠知道 `this` 的值是在調用函數時才確認，而非創建函數時。  
而該篇我們來談論 `this` 值是如何確定的。

## this 是什麼?
`this` 值是一個物件，該值是指向調用該函數的引用物件。  
這樣設計是方便我們能夠用更隱式的方式傳遞引用物件，使得程式碼更加簡潔。  


## this 的綁定規則
先說自己總結的結論為，`this` 值是指向 "最後" 調用該函數的物件。  

- 默認綁定

  在全局與函數下使用 `this`，默認值是指向 `window`。
  ```js
  console.log(this)
  function hello(){
    console.log(this) // this
  }
  hello() // 可以看作 window.hello()
  ``` 
  不過當開啟嚴格模式(`use strict`)時， 函數中的 `this` 值將會為 `undefined`。  

   ```js
  function hello(){
    'use strict'
    console.log(this) // undefined
  }
  hello()
  ``` 
  多層嵌套的函數中，由於 `c` 函數並未有物件調用，所以默認指向 `window`。  
  ```js
  var msg = 'global' // 如果使用 let, const 來定義變數，變數並不會添加到 window 上
  function a(){
    function b(){
      var msg = 'bMsg'
      function c(){
        console.log(this.msg) // global
      }
      c()
    }
    b()
  }
  a()
  ```
- 隱式綁定

  透過物件調用的函數，則屬於隱式綁定的一種。  
  ```js
  var msg = 'global'
  function fn(){
    console.log(this.msg)
  }
  let obj = {
    msg:'objMsg',
    func:fn
  }
  
  fn() // global
  obj.func() // objMsg
  ```

  不過需要注意可能會有 `this` 丟失物件的問題。  
  下方例子，`newFn` 賦值 `obj.func`，初學者可能會認為 `this` 值應該為 `obj`，可是實際調用後會發現 `this` 值變為 `window`。  
  按照我們最一開始的結論來看，實際上是 `window` 調用 `newFn` 函數。   
  ```js
  var msg = 'global'
  function fn(){
    console.log(this.msg)
  }
  let obj = {
    msg:'objMsg',
    func:fn
  }

  var newFn = obj.func

  fn() // global
  obj.func() // objMsg
  newFn() // global
  ```
- 顯式綁定

 我們可以透過 `call`、`apply`、`bind` 來綁定函數內的 `this` 值。  
 簡單說明一下 `call`、`apply`、`bind` 區別
 - call - 可以改變函數內 `this` 值，第一個參數為要改變 `this` 值的物件，剩餘參數則用逗號隔開，為綁定的函數參數。  
 - apply - 與 `call` 相同，只有傳入函數參數的格式不同，為陣列。  
 - bind - 僅綁定 `this` 值而不會執行該函數。  


 ```js
 var obj1 = {
  msg:'obj1Msg'
 }

 var obj2 = {
  msg:'obj2Msg'
 }
 
 var msg = 'globalMsg'

 function fn(){
  console.log(this.msg)
 }
 
 fn() // globalMsg
 fn.call(obj1)  //obj1Msg
 fn.apply(obj2) //obj2Msg
 var newFn = fn.bind(obj1)
 newFn() //obj2Msg

 ```

 有一些內置函數的餐數其實也提供綁定 `this` 值。  
 ex: `forEach`
 ```js
 let obj = {
  extraNumber:10
 }
 
 const newData = [1,2,3].map(function(number){
   return number + this.extraNumber
 },obj)

 console.log(newData) // [11,12,13]
 ```

- new 綁定

使用 `new` 呼叫構造函數時，`new` 內部會將 `new` 中創建的新物件賦值給 `this`。  
其實我們了解 `new` 主要做了哪些事情，就很容易明白 `this` 值怎麼被賦值了。  
主要有四個步驟：  
 1. 創建新的物件。  
 2. 讓新物件連結構造函數的原型鏈，使新物件能夠訪問構造函數的原型鏈。  
 3. 呼叫構造函數並將新物件當作 `this` 傳入給構造函數。  
 4. 若構造函數本身有返回物件則返回，若無則將新的物件返回。  

 ```js
 function fakeNew(con,...args){
    let obj = {}
    Object.setPrototypeOf(obj,con.prototype) // obj.__proto__ = con.prototype
    let result = con.call(obj,...args)
    return typeof result === 'object' ? result : obj
 }

 let Person = function(name,age){
  this.name = name
  this.age = age
 }

 Person.prototype.hello = function(){
  console.log(`hello, ${this.name}, your age: ${this.age}`)
 }

 let leo = fakeNew(Person,'leo',27)
 leo.hello()
 ```

- 箭頭函數
箭頭函數中是不存在 `this` 的，所以在函數中用 `this` ，其實是指向父層的 `this`。  

```js
var msg = 'globalMsg'

var fn1 = () =>{
  console.log(this.msg)
}

function fn2(){
  console.log(this.msg)
}

let obj ={
  msg:'objMsg',
  fn1: fn1,
  fn2: fn2,
  fn3: () => {
    console.log(this.msg)
  },
  fn4: function() {
    var callback = () =>{
      console.log(this.msg)
    }
    callback()
  }
}
obj.fn1() // globalMsg
obj.fn2() // objMsg
obj.fn3() // globalMsg
obj.fn4() // objMsg

```

順帶一提，使用箭頭函數時無法當做構造函數。  
根據我們上面分析的 `new` 原理，其中有一條是鏈結構造函數原型鏈以及呼叫構造函數並將新物件當作 `this` 傳入。  
但是在箭頭函數中是沒有 `this` 以及原型鏈的，所以無法使用 `new`，也就無法當做構造函數。    


## this 的優先級
有時候可能會應用到多條規則，那麼必須清楚知道其先後順序。  
先說結論， `new` > `顯示綁定` > `隱式綁定` > `默認綁定`， 接著我們分析是為什麼？  

1. 默認綁定與隱式綁定很容易理解，`this` 終究指向最後調用該函數的物件。

```js
var msg = 'globalMsg'

function fn(){
  console.log(this.msg)
}

let obj = {
  msg:'objMsg',
  fn:fn
}

obj.fn() // objMsg 
```

2. 隱式綁定與顯式綁定

```js

function fn(){
  console.log(this.msg)
}


let obj = {
  msg:'objMsg',
  fn:fn
}


let obj2 = {
  msg:'obj2Msg',
  fn:fn
}

obj.fn() // objMsg
obj.fn.call(obj2) // obj2Msg
```

我們會發現用顯式綁定的話，原本隱式綁定的 `msg=objMsg` 變成輸出了 `msg=obj2Msg`，證明了顯式綁定比隱式綁定優先級還高。

3. `new` 與顯式綁定 

```js
function fn(){
  console.log(this.msg)
}


let obj = {
  msg:'objMsg',
  fn:fn
}

let bindFn = fn.bind(obj)
bindFn() // 'objMsg'
let newFn = new bindFn() // undefined
```

先用 `bind` 做顯式綁定，在用 `new` 將顯示綁定的函數當作構造函數，會發現我們之前顯示綁定的值被替代掉了，變成 `undefined`。  

## 參考
- [你小子,又在偷偷学this指向](https://juejin.cn/post/7162747517350707213)
- [ES6 系列之箭头函数](https://github.com/mqyqingfeng/Blog/issues/85)
- 你不知道的JS