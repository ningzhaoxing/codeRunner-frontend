---
title: "Go 并发：sync.WaitGroup 与 Channel 的日常用法"
date: "2026-04-21"
tags: [Go, 并发]
pinned: true
summary: "从片段代码开始理解 Go 并发——每个代码块都是函数级示例，点开 AI 助手让它帮你补全成可运行程序。"
---

学 Go 并发最怕的就是：教程给了一段 `go func() { ... }`，但没有 main、没有 import，你复制到本地还得自己拼装才能跑。

这篇博客里的代码块**故意**只给关键片段——遇到跑不起来的，直接点击右下角的 AI 助手问一句"帮我补全并运行一下"，它会读懂上下文，自动补齐 package、import、main 函数，说明补了什么，经你确认后直接执行，stdout 回流到对话里继续讲解。

## 1. WaitGroup：等一组 goroutine 跑完

`sync.WaitGroup` 的核心就是三件事：`Add` 计数、`Done` 减数、`Wait` 阻塞直到归零。

```go
func fetchAll(urls []string) {
    var wg sync.WaitGroup
    for _, url := range urls {
        wg.Add(1)
        go func(u string) {
            defer wg.Done()
            fmt.Printf("fetching %s\n", u)
            time.Sleep(100 * time.Millisecond)
            fmt.Printf("done %s\n", u)
        }(url)
    }
    wg.Wait()
    fmt.Println("all done")
}
```

注意这里闭包传参 `go func(u string)` 而不是直接引用 `url`，这是 Go 并发里最常见的一个坑。

> 💡 试试：让 AI 助手补全成可运行程序，并传入 `[]string{"api.a.com", "api.b.com", "api.c.com"}` 看输出顺序。

## 2. Channel：goroutine 之间传递数据

Channel 是 Go 推崇的 "通过通信共享内存" 的核心。无缓冲 channel 的收发是同步的——发送方会阻塞直到有人接收。

```go
func producer(ch chan<- int) {
    for i := 1; i <= 5; i++ {
        ch <- i * i
    }
    close(ch)
}

func consumer(ch <-chan int) {
    for v := range ch {
        fmt.Printf("received %d\n", v)
    }
}
```

`chan<- int` 是只写方向、`<-chan int` 是只读方向，用类型约束强制分工，比注释靠谱多了。

> 💡 试试：让 AI 助手拼接 producer 和 consumer，跑一次看看输出。

## 3. Select：多路 channel 复用

`select` 让你在多个 channel 操作中选一个就绪的执行，典型用法是给阻塞操作加超时。

```go
func fetchWithTimeout(result chan string) (string, error) {
    select {
    case v := <-result:
        return v, nil
    case <-time.After(500 * time.Millisecond):
        return "", errors.New("timeout")
    }
}
```

这里只给了核心函数，完整的调用 + 模拟 `result` channel 的代码没写——这正是让 AI 助手帮忙补的场景。

> 💡 试试：问 AI"这个函数怎么调用？帮我写一个会超时的场景运行一下"。

## 4. 常见坑：for 循环变量捕获

Go 1.22 之前这段代码会全部打印 `3 3 3`，而不是 `0 1 2`：

```go
func buggyLoop() {
    var wg sync.WaitGroup
    for i := 0; i < 3; i++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            fmt.Println(i) // ❌ 捕获的是循环变量 i 本身
        }()
    }
    wg.Wait()
}
```

修复方案有两种——传参或者在循环内重新声明。

> 💡 试试：让 AI 助手运行一下这段代码（Go 1.22+ 行为已变更，输出可能出乎意料），然后问它"如何在 1.21 下修复？"

## 小结

本文的每个代码块都是**片段**，不是完整程序。这正是 CodeRunner 代码学习 Agent 的舞台——补全、执行、解释、追问，全部在对话里闭环。

遇到片段跑不起来，别自己拼装，把它交给 Agent。
