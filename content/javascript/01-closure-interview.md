---
title: "JavaScript 闭包经典面试题解析"
description: "通过经典面试题深入理解闭包的概念、形成条件、实际应用场景以及内存泄漏问题"
category: "javascript"
tags: ["JavaScript", "闭包", "作用域"]
date: "2025-05-28"
difficulty: "hard"
---

## 面试题

```js
for (var i = 1; i <= 5; i++) {
  setTimeout(function () {
    console.log(i)
  }, i * 1000)
}
// 输出什么？为什么？如何修复使其输出 1, 2, 3, 4, 5？
```

## 知识点

### 闭包的定义

闭包是指函数能够访问其词法作用域中变量的能力，即使该函数在其词法作用域之外执行。

### 形成条件

1. 函数嵌套
2. 内部函数引用外部函数的变量
3. 内部函数被返回或以其他方式传递到外部作用域

### 原理解析

上面的代码会输出 5 个 `6`。原因是：

1. `var` 声明的变量 `i` 具有函数作用域，不是块级作用域
2. `setTimeout` 是异步的，回调执行时循环早已结束
3. 所有回调共享同一个 `i`，此时 `i` 已经是 6

### 修复方案

```js
// 方案一：使用 let（块级作用域）
for (let i = 1; i <= 5; i++) {
  setTimeout(() => console.log(i), i * 1000)
}

// 方案二：使用 IIFE 创建独立作用域
for (var i = 1; i <= 5; i++) {
  (function (j) {
    setTimeout(() => console.log(j), j * 1000)
  })(i)
}

// 方案三：使用 setTimeout 的第三个参数
for (var i = 1; i <= 5; i++) {
  setTimeout(console.log, i * 1000, i)
}
```

### 实际应用

- 数据私有化（模块模式）
- 函数柯里化
- 防抖和节流
- React 中的 `useState` 状态保持
- 事件处理中的参数传递

### 注意事项

闭包会导致外部函数的变量无法被垃圾回收，需要注意内存泄漏的问题。例如：

```js
function createHeavyObject() {
  const heavyData = new Array(1000000).fill('*')
  return function () {
    console.log(heavyData.length)
  }
}
// heavyData 永远不会被回收
```
