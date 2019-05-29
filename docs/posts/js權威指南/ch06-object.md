---
title: 『JS權威指南』- 物件object
tags: [javascript, JS權威指南]
---
## 前言
物件是javascript的基本數據類型，可以通過三種方法來創建物件(物件直接量、透過new、Object.create())。  
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
此方法擁有兩個參數，第一個是要指定這個物件的原型，第二個可選參數是對這個物件的屬性進行近一步描述。  
註: 用Object.create出來的物件是不會有Object本身的原型(與上述兩種方式不同)。  
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

## 物件的三個屬性
原型(prototype)
類(class): 是一個字串，用來表示物件的類型訊息
可擴展性(extensible attribute): 表示可以給物件添加新屬性