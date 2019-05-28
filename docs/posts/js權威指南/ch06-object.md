---
title: 『JS權威指南』- 物件object
tags: [javascript, JS權威指南]
---
[[toc]]

## 屬性特性

可寫(writable attribute) : 表明是否可以設置該屬性的值


object.create new {}

# 6.4 檢測屬性 

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

# 6.5 枚舉屬性
