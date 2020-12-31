---
title: JS各種繼承方法以及如何用ES5實現ES6的class
tags: [javascript, JS基礎]
---



## 構造函數繼承

構造函數繼承的概念就是子函數透過 call,apply 方式去調用要繼承的父層構造函數。
缺點是我們無法調用父層的 Prototype 並且由於構造函數返回的實例都是各自獨立的，所以我們沒辦法創建一個共用的方法或屬性。

```js
let Parent = function() {
  this.child = []
}
Parent.prototype.hello = function() {
  console.log(`你好，我是你爸爸`)
}

let Child = function(name) {
  Parent.call(this)
  this.name = name
}
let leo = new Child("leo")
leo.name //  leo
leo.child.push(leo.name)
leo.hello() // not a function

let jack = new Child("jack")
jack.child.push(jack.name)
leo.child === jack.child // false
```

## 原型鍊繼承

為了解決 Parent.prototype 無法繼承的問題，我們採用原型鏈來繼承。
而這樣又延伸一個問題，原本使用構造函數繼承時，我們產生的實例皆是獨立的，
但是繼承 Parent 後，Parent 產生的實例也掛載到 Child.prototype 上導致實例被共用。

```js
let Parent = function() {
  this.child = []
}
Parent.prototype.hello = function() {
  console.log(`你好，我是你爸爸`)
}

let Child = function(name) {
  this.name = name
}
Child.prototype = new Parent()
let leo = new Child("leo")
leo.name // leo
leo.child.push(leo.name)
leo.hello()

let jack = new Child("jack")
jack.child.push(jack.name)
leo.child === jack.child // true
```

## 組合型繼承

上述兩種方式都各有缺點，那麼我們如果將兩種方法結合後，是否就能解決這問題呢？

```js
let Parent = function() {
  this.child = []
  console.log("Parent function")
}
Parent.prototype.hello = function() {
  console.log(`你好，我是你爸爸`)
}

let Child = function(name) {
  Parent.call(this)
  this.name = name
}

Child.prototype = new Parent()
let leo = new Child("leo")
leo.name // leo
leo.child.push(leo.name)
leo.hello()

let jack = new Child("jack")
jack.child.push(jack.name)
leo.child === jack.child // false
```

透過上面的方式我們的確解決了 child 屬性私有化以及可以調用父層的 hello 方法。
但上述方式會重複調用 Parent 函數，造成不必要的調用，所以我們來想辦法優化他。

## 優化組合型繼承 1

如何讓 Parent 不會重複調用並且又可以達成上面的功能呢？
我們可以使用 Object.create 來創造一個全新的 Parent.prototype 物件。
註: 若使用 Child.prototype = Parent.prototype 會導致內存共享而可能會不小心修改到 Parent.prototype 上的方法。

```js
let Parent = function() {
  this.child = []
  console.log("Parent function")
}
Parent.prototype.hello = function() {
  console.log(`你好，我是你爸爸`)
}

let Child = function(name) {
  Parent.call(this)
  this.name = name
}

Child.prototype = Object.create(Parent.prototype)

let leo = new Child("leo")
leo.name // leo
leo.child.push(leo.name)
leo.hello()

let jack = new Child("jack")
jack.child.push(jack.name)
leo.child === jack.child // false

leo.constructor === Parent // true
```

這樣我們解決了父層構造函數調用兩次的問題。
而其實組合繼承一開始就有個問題存在，那就是 Child 的實例的 constructor 卻是指向到 Parent 上。

## 優化組合型繼承 2

由於我們要精確的判斷實例是來自哪個構造函數時，必須使用 constructor 來做判斷。
而這個問題產生是因為我們將 Child.prototype 直接等於另一個物件，導致原本自動產生的 constructor 不見了，
所以要解決這個問題的方式就直接將 contructor 再加回去即可。

```js
let Parent = function() {
  this.child = []
  console.log("Parent function")
}
Parent.prototype.hello = function() {
  console.log(`你好，我是你爸爸`)
}

let Child = function(name) {
  Parent.call(this)
  this.name = name
}

Child.prototype = Object.create(Parent.prototype)
Child.prototype.constructor = Child
let leo = new Child("leo")
leo.name // leo
leo.child.push(leo.name)
leo.hello()

let jack = new Child("jack")
jack.child.push(jack.name)
leo.child === jack.child // false

leo.constructor === Parent // false
leo.constructor === Child // true
```

## 使用 ES5 模擬 ES6 class

透過上面的最終版的組合繼承，我們就可以用 ES5 來模擬 ES6 的 class。

ES6 版本

```js
class Parent {
  constructor() {
    this.child = []
  }

  hello() {
    console.log(`你好，我是你爸爸`)
  }

  static money() {
    console.log("老爸的私房錢")
  }
}

class Child extends Parent {
  constructor(name) {
    super() // 調用父層構造函數
    this.name = name
  }
}

let leo = new Child("leo")
leo.name // leo
leo.child.push(leo.name)
leo.hello()
leo.money() // not a function
```

我們使用 ES5 來寫看看

```js
let Parent = function() {
  this.child = []
  console.log("Parent function")
}
Parent.prototype.hello = function() {
  console.log(`你好，我是你爸爸`)
}
// 直接在Parent下創建方法即可模擬私有函數
Parent.money = function() {
  console.log("老爸的私房錢")
}
let Child = function(name) {
  Parent.call(this)
  this.name = name
}

Child.prototype = Object.create(Parent.prototype)
Child.prototype.constructor = Child
let leo = new Child("leo")
leo.name // leo
leo.child.push(leo.name)
leo.hello()
leo.money() // not a function
```

經過這些內容後，對於 javascript 繼承的概念又更加熟悉了。

讓我想起以前第ㄧ次寫 React 時，對於 super()這個方法完全不熟悉，還以為是 React 自己的方法 XD
