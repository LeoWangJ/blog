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
當使用字串驗證時必須使用單引號(' ')來包覆字串，因為Vue會將v-validate中未包覆成單引號的字串當成methods或者prop而導致錯誤  

```js
<input v-validate="required" type="password" name="password" > // 錯誤
<input v-validate="'required'" type="password" name="password" > // 正確
```

## 錯誤顯示
所有取得錯誤的方法都會存在errors這個物件實例裡,以下我們來介紹顯示錯誤的幾種方法。

1. 同個欄位下顯示單個錯誤
2. 同個欄位下顯示多個錯誤
3. 顯示全部欄位的錯誤

### 同個欄位下顯示單個錯誤

這是官方預設的顯示錯誤方式,是採用fast-exit策略,意思是當有偵測到第一個錯誤資訊時,他的錯誤訊息將會被生成並儲存在errors實例中,而其他錯誤資訊就會被忽略掉  

使用errors.first('欄位名稱')方法來顯示該欄位的錯誤

```js
<input type="text" name="fieldName" v-validate="'required'">
<span>{{ errors.first('fieldName') }}</span>
```

### 同個欄位下顯示多個錯誤

預設是只能顯示第一個錯誤資訊,但是官方有提供continues方法能夠讓你顯示多個錯誤訊息,用法可以查看下面usage  
假如你該欄位的錯誤訊息不止一個時,可以使用errors.collect('欄位名稱')方法來顯示所有錯誤


```js
<input type="text" name="fieldName" v-validate.continues="'required|alpha|min:5'">
<ul>
  <li v-for="error in errors.collect('fieldName')">{{ error }}</li>
</ul>
```

### 顯示全部欄位的錯誤

若要顯示全部欄位的錯誤時,可以使用errors.all()方法來呈現

```js
<input type="text" name="first" v-validate.continues="'required|alpha|min:5'">

<input type="text" name="second" v-validate.continues="'required|alpha|min:5'">

<ul>
  <li v-for="error in errors.all()">{{ error }}</li>
</ul>
```

另一種方式是使用errors.collect(),但要注意的是他的格式是欄位名稱為key,錯誤訊息為value且是array格式

```js
格式
{
  username: ['不能為空'],
  password: ['不能為空']
}

使用方式
<input type="text" name="first" v-validate.continues="'required|alpha|min:5'">

<input type="text" name="second" v-validate.continues="'required|alpha|min:5'">

<ul>
  <li v-for="group in errors.collect()">
    <ul>
      <li v-for="error in group">{{ error }}</li>
    </ul>
  </li>
</ul>
```

## 驗證規則
官方有提供一些驗證規則讓我們可以使用,以下就來介紹各項驗證用法

- after 合法日期(可用date_format來定義日期格式)必須大於target參數欄位  
  params:  
  target: 用來判斷的日期  
  inclusion: 當日期與target日期相同時,是否符合規則,預設為false(不符合)  

- before 合法日期(可用date_format來定義日期格式)必須小於target參數欄位  
  params與after相同

- alpha 僅能輸入英文字
- alpha_dash 能輸入英文字、數字、下劃線(_)與破折號(-)
- alpha_num 僅能輸入英文字與數字
- alpha_spaces 僅能輸入英文字與空白
- between 數字介於min與max之間  
  params:  
  min: 最小值  
  max: 最大值  
```html
  <input v-validate="'between:1,11'" name="between_field" type="text">
```
- confirmed 判斷兩個欄位之間的值是否相等,必須有ref屬性欄位供comfirmed判斷參考依據的欄位    
```html
  <input v-validate="'required'" name="password" type="text" ref="password">
  <input v-validate="'required|confirmed:password'" name="between_field" type="text">
```
- credit_card 驗證信用卡號
- date_between 驗證所填日期是否介於min與max日期之間  
  params:  
  min: 最小日期  
  max: 最大日期  
  inclusion  是否包含min與max的日期;預設為false  
```html
  <input v-validate="'date_format:dd/MM/yyyy|date_between:10/09/2016,20/09/2016'" name="date_between_field" type="text">
```
- date_format 日期格式,在使用任何的日期規則時,必須傳入
```html
<input v-validate="'date_format:dd/MM/yyyy'" name="date_format_field" type="text">
```

## 客製化錯誤訊息
如果不喜歡vee-validate 預設的錯誤訊息,官方有提供修改的方式

## localization
由於我們的用戶不一定是英文語系國家的人,所以我們需要依照地區來顯示相對應語系的錯誤訊息  
我會介紹如何載入語系以及客製化錯誤訊息

```js
import zh_CN from 'vee-validate/dist/locale/zh_CN'

const custom_CN = {
  password: {
    required: '密码 不能为空'
  },
  username: {
    required: () => '用户名 不能为空',
    min: '123'
  }
}

VeeValidate.Validator.localize('zh_CN', { ...zh_CN, custom: custom_CN })
```