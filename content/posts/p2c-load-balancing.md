---
title: "P2C 负载均衡算法详解与 Go 实现"
date: "2026-03-28"
tags: [Go, 系统设计]
summary: "Power of Two Choices + EWMA 自适应负载均衡，用 Go 实现并对比随机和轮询策略。"
---

负载均衡是分布式系统的核心问题。本文介绍 P2C（Power of Two Choices）算法，这也是 CodeRunner 内部使用的调度策略。

## 为什么不用轮询？

```go
package main

import "fmt"

func roundRobin(nodes []string, n int) map[string]int {
    counts := make(map[string]int)
    for i := 0; i < n; i++ {
        node := nodes[i%len(nodes)]
        counts[node]++
    }
    return counts
}

func main() {
    nodes := []string{"A", "B", "C"}
    result := roundRobin(nodes, 12)
    for node, count := range result {
        fmt.Printf("Node %s: %d requests\n", node, count)
    }
}
```

轮询看起来公平，但它不感知节点的实际负载。如果 Node B 处理慢，轮询还是会给它发请求。

## 随机选择两个，选负载低的

P2C 的核心思想很简单：

```go
package main

import (
    "fmt"
    "math/rand"
)

type Node struct {
    Name string
    Load int
}

func p2c(nodes []Node) *Node {
    i := rand.Intn(len(nodes))
    j := rand.Intn(len(nodes))
    for j == i {
        j = rand.Intn(len(nodes))
    }

    if nodes[i].Load <= nodes[j].Load {
        return &nodes[i]
    }
    return &nodes[j]
}

func main() {
    nodes := []Node{
        {"A", 10},
        {"B", 50},
        {"C", 20},
    }

    counts := make(map[string]int)
    for i := 0; i < 1000; i++ {
        chosen := p2c(nodes)
        counts[chosen.Name]++
    }

    for _, n := range nodes {
        fmt.Printf("Node %s (load=%d): chosen %d times\n",
            n.Name, n.Load, counts[n.Name])
    }
}
```

运行多次你会发现：负载最低的 Node A 被选中的概率最高，负载最高的 Node B 最低。

> P2C 的数学证明表明：只需要随机选 2 个节点比较，就能达到接近最优的负载分布。这比检查所有节点的 O(n) 高效得多。
