---
title:  談談構造函數(constructor)與原型(prototype)的設計
tags: [javascript, JS基礎]
---

本文將會談到
- 構造函數(constructor)是什麼?
- 原型(prototype)是什麼?
- prototype與__proto__ 關聯性
- new操作符實際做了什麼事?
- 如何查找原型方法及屬性

## 前言
由於JS作者在開發時，是將其定位在簡單的腳本語言，所以就沒打算引入Class的概念。但是又需要設計繼承的概念，方便將物件關聯起來。所以最終作者還是設計了繼承。

作者設計繼承時參考了JAVA生成實例的方法:
```js
Foo foo = new Foo()
```
但是JS沒有Class(ES6的Class只是語法糖)，那要怎麼表示呢？ 他想到JAVA使用new 命令時，都會調用Class的構造函數(constructor)。所以他就做了一個簡化的設計，在JS語言中，new命令後面調用的不是Class而是構造函數(constructor)。

## 構造函數(constructor)是什麼?
構造函數其實就是物件的模板，方便我們重複調用相同格式的物件實例。順帶一提構造函數與函數的差別在於呼叫的方式不同，用new呼叫的函式就為構造函式。

```js
let Car = function(name,color,amount,countryTax){
    this.name = name
    this.color = color
    this.amount = amount
    this.tax = function(){
        return amount * countryTax
    }
}

let car1 = new Car('toyota', 'yellow','700000','1.2')
console.log(car1.name,car1.tax()) // toyota 840000
let car2 = new Car('BMW', 'black','1200000','1.3')
console.log(car2.name,car2.tax()) // BMW 1560000
```

根據上面的例子，構造函數生成出來的物件實例各有自己的屬性與方法，無法共享。這有好處也有壞處，好處是修改屬性時不會全部實例跟著改變;而壞處就是共用的方法或屬性在每次創建實例時都會被創造出來，造成記憶體的消耗。為了解決這個問題，作者在函數中設置了一個prototype屬性。

## 原型(prototype)是什麼?
原型讓我們不需要再重複創建一個屬性或者方法，它可以讓我們將共用的方法放到一個物件中。
prototype是函式中會自行創建的一種物件。當創建一個實例時，會自動將原型綁定到該實例上。

```js
let Car = function(name,color,amount){
    this.name = name
    this.color = color
    this.amount = amount
}

Car.prototype.tax = function(countryTax){
    return this.amount * countryTax
}
let car1 = new Car('toyota', 'yellow','700000')
console.log(car1.name,car1.tax('1.2')) // toyota 840000
let car2 = new Car('BMW', 'black','1200000')
console.log(car2.name,car2.tax('1.3')) // BMW 1560000
console.log(car1.tax === car2.tax) // true, 這表示了來自同一個函式
```

那麼到底car1.tax是怎麼知道要從哪邊去找tax這個方法呢? 將car1打印出來後會發現有一個方法__proto__, 查看後有tax這個方法，看起來就是透過這個方法去繼承的。

## prototype與__proto__ 關聯性
這個__proto__(應該用Object.getPrototypeOf會更嚴謹，但為了方便我們使用__proto__來描述)也是JS自動生成的，他只會存在物件當中，是用來獲取創造實例的構造函數的原型，也是實現原型鏈的原理。

```js
let Person = function(){}
Person.prototype.hello = function() {
    console.log('hello')
}
let leo = new Person()

leo.hello() // 通過__proto__原型鏈使用Person.prototype的方法
leo.hasOwnProperty() // 通過__proto__原型鏈使用Object.prototype的方法

leo.__proto__ === Person.prototype // true
Person.__proto__ === Function.prototype // true

```

值得注意的是Person.\_\_proto\_\_ 繼承的是Function.prototype。函式也是物件的一種，在函式中同時擁有__proto__與prototype。

那麼什麼時候__proto__指向構造函數的prototype呢? 這就與new有關聯。

## new操作符實際做了什麼事?
在上面的那些例子中，我們知道new 一個構造函數後所產生的實例是物件並且原型指向構造函數的prototype。除了這些new還做了什麼?

其實new一共幫我們做了四件事情:
1. 新增一個物件
2. 將構造函數的prototype指向物件的__proto__
3. 呼叫構造函數並且使用新增的物件當作this傳入
4. 若呼叫的構造函數有返回物件則返回(若是一般屬性則不返回)，若無則返回新增的物件

```js
// con - 構造函數
// arg - 參數
function fakeNew(con,...arg){
    let obj = {}
    Object.setPrototypeOf(obj,con.prototype) // obj.__proto__ = con.prototype
    let result = con.call(obj,...arg)
    return typeof result === 'object' ? result : obj
}

let Person = function(name,age){
    this.name = name
    this.age = age
}

Person.prototype.hello = function() {
    console.log(`hello, ${this.name} , age = ${this.age}`)
}

let leo = fakeNew(Person,'leo',18)
leo.hello() // hello, leo , age = 18
```

## 如何查找原型繼承及方法屬性
- instanceof
- isPrototypeOf
- constructor判斷
- hasOwnProperty
- in

### instanceof 
這個方法是用來判斷實例是否繼承某個構造函數

> 實例 instanceof 構造函數

```js
let Person = function(name,age){
    this.name = name
    this.age = age
}

Person.prototype.hello = function() {
    console.log(`hello, ${this.name} , age = ${this.age}`)
}

let leo = new Person('leo','18')
console.log(leo instanceof Person) //true
console.log(leo instanceof Object) //true
```
根據上面例子，我們可以知道構造函數只要是有在原型鏈上就會為true，並不是判斷生成該實例的構造函數。
這個方法其實很好自我實現

```js
/**
* instance - 實例 
* con - 構造函數
*/
let polyfillInstanceof = function(instance,con){
 if(!instance) return false

 return instance.__proto__ === con.prototype ? true : polyfillInstanceof(instance.__proto__, con)
}
```

### isPrototypeOf
這個方法基本上完全與instanceof相同，只是參數位置不同
> 實例.isPrototypeOf(構造函數)

```js
leo.isPrototypeOf(Person) // true
leo.isPrototypeOf(Array) // false
```

### constructor
若想要知道實例真正繼承哪個構造函數時，我們可以用constructor方法來判斷

```js
leo.__proto__.constructor === Person // true
leo.__proto__.constructor === Object //false 
```

### hasOwnProperty
這個方法能判斷是否擁有該屬性或者方法，這使我們能夠判斷該方法與屬性是來自哪裡

```js
leo.hasOwnProperty('name') //true
leo.hasOwnProperty('name') //true
leo.__proto__.hasOwnProperty('hello') //true
```

### in
in與hasOwnProperty一樣都是用來查找方法與屬性，差別在與只要方法與屬性有存在實例或原型鏈上，就會返回true
```js
'name' in leo // true
'hello' in leo // true
```

## 參考
- [該來理解 JavaScript 的原型鍊了](https://blog.techbridge.cc/2017/04/22/javascript-prototype/)
- [从__proto__和prototype来深入理解JS对象和原型链](https://github.com/creeperyang/blog/issues/9)
- [原型与原型链详解](https://github.com/ljianshu/Blog/issues/18)
- [Javascript继承机制的设计思想](http://www.ruanyifeng.com/blog/2011/06/designing_ideas_of_inheritance_mechanism_in_javascript.html)