---
title: "Python 装饰器：从入门到实战"
date: "2026-04-12"
tags: [Python, 设计模式]
summary: "理解 Python 装饰器的本质，通过可运行的代码示例掌握函数装饰器和类装饰器。"
---

装饰器是 Python 中最优雅的语法糖之一。本质上，它就是一个接收函数、返回函数的高阶函数。

## 最简单的装饰器

```python
def timer(func):
    import time
    def wrapper(*args, **kwargs):
        start = time.time()
        result = func(*args, **kwargs)
        print(f"{func.__name__} took {time.time() - start:.4f}s")
        return result
    return wrapper

@timer
def slow_add(a, b):
    import time
    time.sleep(0.1)
    return a + b

print(slow_add(1, 2))
```

`@timer` 等价于 `slow_add = timer(slow_add)`。运行后你会看到函数执行耗时。

## 带参数的装饰器

如果装饰器本身需要参数，就再套一层函数：

```python
def repeat(n):
    def decorator(func):
        def wrapper(*args, **kwargs):
            for i in range(n):
                result = func(*args, **kwargs)
            return result
        return wrapper
    return decorator

@repeat(3)
def greet(name):
    print(f"Hello, {name}!")

greet("World")
```

三层嵌套看起来复杂，但逻辑很清晰：`repeat(3)` 返回真正的装饰器，装饰器再包装目标函数。

## 实用场景：缓存

标准库 `functools.lru_cache` 就是一个装饰器：

```python
from functools import lru_cache

@lru_cache(maxsize=128)
def fibonacci(n):
    if n < 2:
        return n
    return fibonacci(n - 1) + fibonacci(n - 2)

print(fibonacci(30))
print(f"Cache info: {fibonacci.cache_info()}")
```

> 试试把 `@lru_cache` 注释掉再运行 `fibonacci(30)`，感受一下缓存的威力。
