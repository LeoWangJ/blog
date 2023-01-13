---
title: call、apply、bind區別以及手寫
tags: [javascript, JS基礎]
---

## call、apply、bind 區別

`call`、`apply` 這兩個方法可以調用函數並且修改 `this` 值，方便我們同一個函數傳遞不同的物件上下文達到復用。

- call - 第一個參數為 `this` 值，後續參數則為要當作函數的參數。
- apply - 第一個參數一樣為 `this` 值，而第二個參數為陣列，一樣為當作函數的參數。

至於 `bind` 也能夠綁定 `this` 值，但是並不會調用函數，而是將函數返回。

## 手寫 call

我們可以先思考一下要怎麼改變一個函數的 `this` 值。

```js
function fn() {
  console.log(this.msg);
}

let obj = {
  msg: "objMsg",
};

fn.call(obj); // objMsg
```

首先，我們將 `fn` 添加到 `obj` 中，即可獲得他的 `this` 值，接著在呼叫在 `obj` 裡的 `fn` 後再刪除即可以完成。
不過要注意幾個點:

1. 如果 `this` 參數傳的是一個非真值的物件時，則直接回傳 `window`
2. 臨時的 `key` 不能夠覆蓋到原先的物件上的值，所以用唯一值 `symbol`就很好解決這件事。
3. 要如何獲得調用的函數呢? 其實我們 `Call` 函數的 `this` 值就是指向該調用的函數 (`fn.call`)。
4. 我們需要將呼叫的函數回傳值返回

```js
Function.prototype.Call = function (target, ...args) {
  target = target || window;
  let key = Symbol();
  target[key] = this;
  const res = target[key](...args);
  delete target[key];
  return res;
};
```

邏輯清楚後，實現 `call` 是很簡單的。

## 手寫 apply

`apply` 與 `call` 差別只有在傳參的不同，`call` 源碼中，我們只要改變傳餐的方法即可實現。

```js
Function.prototype.Apply = function (target, argsArr) {
  target = target || window;
  let key = Symbol();
  target[key] = this;
  let res = target[key](...argsArr);
  delete target[key];
  return res;
};
```

## bind

首先可以看一下 [bind](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Function/bind) 的定義以及傳了什麼參數。

接著我們可以依照上面的理解，來實作 `bind` 源碼。  
透過上面文章，我們能夠知道 `bind` 除了傳入要修改的 `this`值 當作第一個參數，還包含要傳入到函數的參數。

```js
Function.prototype.Bind = function (target, ...args) {
  target = target || {};
  let key = Symbol();
  target[key] = this;
  return function (...innerArgs) {
    return target[key](...args, ...innerArgs);
  };
};
```

由於 `bind` 也可以傳入預設參數但是返回的函數也能夠傳入參數，所以我們需要將兩組參數依序傳給閉包中的 `target[key]`。  
至於不刪除 `target[key]` 則是因為 `bind` 後的函數是可以重複調用的。

## 參考

- [面试官为啥总是让我们手撕 call、apply、bind](https://juejin.cn/post/7128233572380442660)
