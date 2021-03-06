---
title: 『JS權威指南』- 物件object
tags: [javascript, JS權威指南]
---
## 前言
物件是javascript的引用數據類型，可以通過三種方法來創建物件(物件直接量、透過new、Object.create())。  
物件可以從一個原型物件繼承屬性，這種『原型式繼承』是javascript的核心特徵。  
javascript物件是動態的，意思是你可以對一個物件直接新增屬性，也可以刪除屬性(屬性指的就是物件內的key:value)。  
物件的屬性中有三種特性，而物件本身也有三種特性，下面我們會深入介紹  

### 屬性特性
**可寫(writable attribute)** : 表明是否可以設置該屬性的值。  
**可枚舉(enumerable attribute)** : 表明是否可以通過for in 循環返回該屬性。  
**可配置(configurable attribute)** : 表明是否可以刪除或修改該屬性。  
在ES5以前通過代碼給物件創建的屬性都是可寫、可枚舉、可配置的，而在ES5後則可以對這些屬性特性加以配置(使用Object.defineProperty)。  

### 物件特性
**原型(prototype)** : Ａ物件繼承Ｂ物件，則Ｂ物件的屬性在Ａ物件中稱為原型。  
**類別(class)**: 是一個標示物件類型的字符串。  
**擴展標記(extensible flag)**: 是否可以向該物件添加新屬性。  

## 1. 創建物件的三種方法
 ### 物件直接量
 物件直接量就是最常見的創建物件方式  
 ``` js
  let obj = {}
 ```
 每次運算上面的表達式時都會創建並初始化一個新的對象(包含物件的原型)。  
 ### new 方法創建物件
 ```js
 let obj = new Object() // 創建一個空的物件 {}
 ```
 透過構造函數(constructor)來初始化一個物件，此種方式與物件直接量其實是一樣的。  
 ### Object.create()
此方法擁有兩個參數，第一個是這個物件的原型，第二個可選參數是對這個物件的屬性進行近一步描述。  
註: 用Object.create創建出來的物件是不會有Object本身的原型即Object.prototype(與上述兩種方式不同)。  
```js
 let obj = Object.create({x:1,y:1}) // obj繼承了屬性x和y
 let obj2 = Object.create(null) //obj2不繼承任何屬性和方法
 let obj3 = Object.create(null,{
   p:{
     value:1,
     enumerable:false // 不可枚舉
     writable: false // 不可寫入
   }
 })
```
 
## 2. 檢測屬性 

**以下三種方法可以檢查物件的屬性是否存在**
 
in 運算符: 用來判斷物件中是否有該屬性，可判斷自有屬性以及繼承屬性。

``` js
 var obj = {x: 1}
 'x' in obj // true
 'a' in obj // false
 'toString' in obj // true,為繼承來的屬性
```

hasOwnProperty(): 用來判斷物件中是否有該屬性，可判斷自有屬性。

``` js
 var obj = {x: 1}
 obj.ownProperty('x') // true
 obj.ownProperty('a') // false
 obj.ownProperty('toString') // false,無法判斷繼承的屬性
```

propertyIsEnumerable(): 是hasOwnProperty的加強版，可判斷自有屬性且此屬性的可枚舉性為true時，此返回值才會為true

``` js
 var obj = {x: 1}
 obj.propertyIsEnumerable('x') // true
 obj.propertyIsEnumerable('toString') // false,無法判斷繼承的屬性
 Object.prototype.propertyIsEnumerable('toString') // false,不可枚舉
```

## 3. 枚舉屬性
要檢測物件的屬性是否存在或者要遍歷物件的屬性時，通常我們都使用for in來遍歷。  
要特別注意的是若繼承的屬性中有可枚舉的屬性時，for in 也會將其顯示
```js
var obj = Object.create({x:1,y:2},{
  p:{
    value:1,
    enumerable: true
    }
  })

  for(var i in obj){
    console.log(i) // 印出 x,y,p 
  }
```
遍歷時要過濾掉繼承的屬性時，可以搭配ownProperty方法  
``` js
var obj = Object.create({x:1,y:2},{
  p:{
    value:1,
    enumerable: true
    }
  })

  for(var i in obj){
    if( !obj.ownProperty(i) ) continue;
    console.log(i) // 印出 p 
  }
```
除了for in 外，ES5有提供兩個枚舉屬性名稱的函數。  
第一個是Object.keys()，他返回一個陣列，這個陣列由物件中可枚舉的“自有屬性“的名稱所組成。  
第二個是Object.getOwnPropertyNames()，與Object.keys類似，只是返回的是物件的所有屬性的名稱(包含不可枚舉的屬性)。  
``` js
 var obj = Object.create(null,{
    p:{
      value:1,
      enumerable: true
    },
    o:{
    value:1,
    enumerable: false
    }
  })

  console.log(Object.keys(obj)) // return [p]
  console.log(Object.getOwnPropertyNames(obj)) // return [p,o]
```

## 4. 修改屬性特性
上面有提到三種屬性的特性，在創建物件時可以使用Object.create方式去新增屬性特性，那要編輯已存在的物件時該怎麼辦呢？  
必須使用Object.defineProperty方法去編輯已存在物件的屬性，這個方法對寫library或者框架的使用者來說是很重要的，
因為可以透過這個API對原型物件添加方法，並將它改成不可枚舉，讓他們看起來更像內置方法。
```js
let obj = {x:3}
Object.defineProperty(obj,'x',{ // 修改已存在屬性的特性
  value: 2,
  writable: false,
  enumerable: true
})
console.log(obj.x) // 2

Object.defineProperty(obj,'y',{ // 也可以對存在的物件新增屬性
  value: 2,
  writable: false,
  enumerable: true
})
console.log(obj) // x:2 y:2
```
## 5. 序列化物件(serialzation)
指的是可以將物件轉成字串，以及將字串還原成物件  
JSON.stringify() : 將物件轉為字串。  
JSON.parse() : 將字串還原成物件。  
可以使用此種方法進行深拷貝，但無法拷貝不可枚舉的屬性
```js

let o = Object.create({x:1,y:2},{
  p:{
    value:2,
    enumerable: false
  },
  o:{
    value:3,
    enumerable: true
  }
})

let o2 = Object.create(o,{
  r:{
    value:2,
    enumerable: false
  },
  k:{
    value:3,
    enumerable: true
  }
})

let newO2 = JSON.parse(JSON.stringify(o2)) // 先轉為字串，再轉為物件
console.log(newO2) // {k:3}
console.log(Object.getPrototypeOf(newO2)) //取得原型的方法,原型又變成了Object.prototype
```
## 後續
關於物件還有幾種內建的方法(toString,toJSON...)就不一一介紹了，有興趣的讀者可以自行研究。  
看完這個章節後，發現很多API以前都不曉得，對於物件的掌握也比想像中的還低！  
只能說javascript這門語言太多地方需要琢磨了～