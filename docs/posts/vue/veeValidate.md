---
title: Vue的表單驗證套件 - VeeValidate!
tags: [vue]  
---

在做表單時總是需要告訴使用者輸入是否正確，所以我們需要去驗證輸入文字是否符合規則，並顯示錯誤。  
透過這個驗證套件我們能夠更快速的驗證錯誤，至於我為何會選擇VeeValidate呢？  
因為他目前還有持續在維護並且star數也蠻多的，代表使用者有一定的量！接下來就來介紹囉  

## 安裝與usage
```js
npm i vee-validate --save
```

安裝完後需要在main.js中import並使用VeeValidate  

```js
import Vue from 'vue'
import VeeValidate from 'vee-validate'

Vue.use(VeeValidate)
```
此時就能使用VeeValidate了！
簡單的範例:
```js
<input v-validate="'required|email'" name="email" type="text"/> //name屬性是需要告訴套件哪個輸入框驗證錯誤; v-validate裡面則是條件
<span>{{errors.first('email')}}</span> // 若驗證未通過時，則會顯示文字
```

## 語法
可以透過字串去定義要驗證的規則若規則不止一項可以透過 ｜ 來添加
```js
 const single = 'required' // 單一規則
 const multiple = 'required|numeric' // 多個規則
```
當然也可以用物件方式來呈現，一切看你的習慣
```js
const single = { required: true}
const multiple = {
  required: true,
  numeric: true,
  email: true
}
```
另外有些驗證規則會有些參數，也可以使用上面的方式呈現
```js
// 驗證規則:必須包含1,2,3其中一個數字
const someRule = 'included:1,2,3' //透過:區分驗證規則與參數
const someRuleObj = {
  included: [1,2,3] //物件中單個參數時可以使用字串，多個參數時必須使用陣列來包覆參數
}
```
當使用字串驗證時必須使用單引號('')來包覆字串，因為Vue會將v-validate中未包覆成單引號的字串當成methods或者prop而導致錯誤  

```js
<input v-validate="required" type="password" name="password" > // 錯誤
<input v-validate="'required'" type="password" name="password" > // 正確
```

## 錯誤顯示