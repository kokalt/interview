---
title: "Vue 3 响应式原理深入解析"
description: "从 Object.defineProperty 到 Proxy 的演进，深入理解 Vue 3 的响应式系统实现原理"
category: "vue"
tags: ["Vue", "响应式", "Proxy", "Reflect"]
date: "2025-06-03"
difficulty: "hard"
---

## 面试题

> Vue 2 和 Vue 3 的响应式原理有什么区别？为什么 Vue 3 选择使用 Proxy？Vue 3 的 `ref` 和 `reactive` 有什么区别？

## 知识点

### Vue 2 的响应式：Object.defineProperty

```js
// Vue 2 实现
function defineReactive(obj, key, val) {
  Object.defineProperty(obj, key, {
    get() {
      console.log(`读取 ${key}`)
      // 依赖收集
      return val
    },
    set(newVal) {
      console.log(`设置 ${key} = ${newVal}`)
      // 触发更新
      val = newVal
    }
  })
}
```

**局限性：**
- 无法检测属性的添加和删除（需要 `$set` / `$delete`）
- 无法检测数组索引变化和 `length` 变化
- 需要递归遍历所有属性，性能开销大

### Vue 3 的响应式：Proxy

```js
// Vue 3 的 reactive 简化实现
function reactive(target) {
  return new Proxy(target, {
    get(target, key, receiver) {
      // 依赖收集 track
      const result = Reflect.get(target, key, receiver)
      // 懒代理：嵌套对象在访问时才被代理
      if (typeof result === 'object' && result !== null) {
        return reactive(result)
      }
      return result
    },
    set(target, key, value, receiver) {
      const oldValue = target[key]
      const result = Reflect.set(target, key, value, receiver)
      // 触发更新 trigger
      if (oldValue !== value) {
        console.log(`${String(key)} 更新了`)
      }
      return result
    },
    deleteProperty(target, key) {
      const hadKey = Object.prototype.hasOwnProperty.call(target, key)
      const result = Reflect.deleteProperty(target, key)
      if (hadKey) {
        // 触发更新
        console.log(`${String(key)} 被删除`)
      }
      return result
    }
  })
}
```

### ref vs reactive

| 特性 | `ref` | `reactive` |
|------|-------|------------|
| 基本类型 | ✅ 支持 | ❌ 不支持 |
| 对象类型 | ✅ 支持（内部转 reactive） | ✅ 支持 |
| `.value` 访问 | 需要（script中） | 不需要 |
| 解构后响应式 | 不丢失（模板中自动解包） | 会丢失 |
| 使用场景 | 单个值、需要重新赋值 | 复杂对象、表单数据 |

### 核心总结

1. **Proxy 比 Object.defineProperty 更强大**：支持新增、删除属性，以及数组操作
2. **懒代理提升性能**：嵌套对象只在访问时被代理
3. **Reflect 配合 Proxy**：保证 `this` 指向正确，提供一致的返回值
4. **ref 的 .value 是必要的**：因为基本类型无法被 Proxy 代理
