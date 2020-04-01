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


## 參考
- [該來理解 JavaScript 的原型鍊了](https://blog.techbridge.cc/2017/04/22/javascript-prototype/)
- [从__proto__和prototype来深入理解JS对象和原型链](https://github.com/creeperyang/blog/issues/9)
- [原型与原型链详解](https://github.com/ljianshu/Blog/issues/18)
- [Javascript继承机制的设计思想](http://www.ruanyifeng.com/blog/2011/06/designing_ideas_of_inheritance_mechanism_in_javascript.html)