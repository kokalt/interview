---
title: "React useEffect 依赖数组详解"
description: "深入理解 useEffect 依赖数组的工作原理、常见误区以及最佳实践，包括如何处理对象和函数依赖"
category: "react"
tags: ["React", "Hooks", "useEffect"]
date: "2025-06-01"
difficulty: "medium"
---

## 面试题

> 请解释 React 中 `useEffect` 的依赖数组机制，为什么不能省略依赖？如何正确处理对象和函数类型的依赖？

## 知识点

`useEffect` 是 React 中最常用的 Hook 之一，用于处理副作用。它的第二个参数 —— 依赖数组，决定了 effect 何时重新执行。

### 基本规则

```jsx
// 1. 没有依赖数组 —— 每次渲染都执行
useEffect(() => {
  console.log('每次渲染都执行')
})

// 2. 空依赖数组 —— 只在挂载时执行一次
useEffect(() => {
  console.log('仅挂载时执行')
}, [])

// 3. 有依赖 —— 依赖变化时才执行
useEffect(() => {
  console.log('count 变化时执行')
}, [count])
```

### 常见误区

**误区一：对象作为依赖引起无限循环**

```jsx
// 错误写法 ❌
const options = { key: 'value' }
useEffect(() => {
  fetchData(options)
}, [options]) // 每次渲染 options 都是新对象，导致无限循环

// 正确写法 ✅
useEffect(() => {
  fetchData({ key: 'value' })
}, []) // 或者使用 useMemo 稳定引用
```

### 核心总结

1. 依赖数组使用 `Object.is` 进行浅比较
2. 永远不要在 effect 中直接修改依赖项
3. 使用 ESLint 的 `react-hooks/exhaustive-deps` 规则辅助检查
4. 复杂依赖使用 `useMemo` / `useCallback` 稳定引用
