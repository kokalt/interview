---
title: "浏览器渲染流程详解"
description: "从输入URL到页面呈现，完整解析浏览器的渲染流程：DOM树、CSSOM树、布局、绘制、合成"
category: "browser"
tags: ["浏览器", "渲染", "DOM", "回流重绘"]
date: "2025-05-25"
difficulty: "medium"
---

## 面试题

> 从输入 URL 到页面呈现，浏览器经历了哪些步骤？什么是回流（Reflow）和重绘（Repaint），如何减少？

## 知识点

### 完整的渲染流程

1. **解析 HTML → DOM 树**
2. **解析 CSS → CSSOM 树**
3. **DOM + CSSOM → Render 树**
4. **布局（Layout/Reflow）**：计算每个节点的几何位置
5. **绘制（Paint）**：将每个节点绘制到屏幕上
6. **合成（Composite）**：将多个图层合并显示

```js
// 强制同步布局的典型场景
element.style.width = '100px'       // 样式修改
const height = element.offsetHeight // 强制布局！读取尺寸前必须重算
element.style.height = '200px'      // 又被修改，下次读取时再次强制布局
```

### 回流 vs 重绘

| 操作 | 触发条件 | 性能成本 |
|------|----------|----------|
| **回流** | 修改几何属性（宽高、位置） | 高 —— 重新布局 |
| **重绘** | 修改外观属性（颜色、背景） | 较低 —— 只重新绘制 |

### 优化策略

- 使用 `transform` 和 `opacity` 实现动画（只触发合成，不回流）
- 批量 DOM 操作：使用 `DocumentFragment` 或 `display:none`
- 避免频繁读取布局属性（`offsetTop`, `scrollTop` 等）
- CSS 选择器从右向左匹配，保持选择器简洁
