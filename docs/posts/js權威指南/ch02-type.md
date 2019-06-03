---
title: 『JS權威指南』- 類型
tags: [javascript, JS權威指南]
---

## 數據類型
js的數據類型分成兩類：原始類型(primitive type)與對象類型(object type)。  
原始類型包含Number,String,Boolean,null,undefined,Symbol(es6)。  

## 原始類型
創造Number,String,Boolean 變數時可以使用直接量定義,也可以透過new 來創造構建函數。
```js
var num = 9
var str = 'test'
var boo = true

var num1 = new Number(9)
var str1 = new String('test')
var boo1 = new Boolean(true)
```
上面兩種創造出來的值是相同的，那這兩種方式有什麼差別嗎？  

先來看一個例子

```js
var s = "test";
console.log(s.toLocaleUpperCase())
s.len = 4;
var t = s.len; // undefined
```

1.為什麼字串可以使用方法?  
2.既然可以使用方法,也能創建屬性,那為什麼t依舊為undefined?  

因為當使用字串直接量的方法或者屬性時，JS就會將字串值通過調用new String的構建方式轉成物件，這個物件中有繼承一些方法可以使用，並且被轉成物件後，當然可以添加屬性。  
但是因為通過String()構造函數創建的是一個臨時物件，所以當方法或屬性使用結束後，這個物件就會被銷毀，所以導致t為undefined。  
所以直接量與new String的差別就在於直接量是當有使用方法或者屬性時才會創建一個臨時物件，而new String則是一開始就已經創建出來了，並且兩者類型也不同。  

``` js
var num = 9
var num1 = new Number(9)

console.log(num == num1); // true
console.log(num === num1); // falase,因為他們的類型不同

console.log(typeof num);
console.log(typeof num1);
```

## 字串加減乘除

先看一個例子,你能答對嗎？  
```js
console.log("10" + "5")
console.log("10" - "5")
console.log("10" * "5")
console.log("10" / "5")
```

答案依序是什麼呢？  
  
  
  
  
  


分別就是105,5,50,2
這是因為JS會根據需要來自動轉換類型，那為什麼 + 卻還是一樣是字串呢？  
那是因為在兩個字串中的＋被判斷為連接符號，而非運算符號！
  
