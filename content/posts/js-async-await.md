---
title: "JavaScript Promise 与 async/await 完全指南"
date: "2026-04-08"
tags: [JavaScript, 异步]
summary: "从回调地狱到 async/await，理解 JavaScript 异步编程的演进。"
---

JavaScript 是单线程语言，异步编程是它的核心能力。我们来看这个演进过程。

## 回调的问题

```javascript
function fetchData(callback) {
    setTimeout(() => {
        callback(null, { name: "Alice", age: 25 });
    }, 100);
}

fetchData((err, data) => {
    if (err) {
        console.log("Error:", err);
        return;
    }
    console.log("Got:", JSON.stringify(data));
});
```

单层回调还好，嵌套多了就是"回调地狱"。

## Promise 解决嵌套

```javascript
function fetchUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (id <= 0) reject(new Error("Invalid ID"));
            else resolve({ id, name: "User_" + id });
        }, 50);
    });
}

function fetchPosts(userId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([
                { title: "Post 1", author: userId },
                { title: "Post 2", author: userId },
            ]);
        }, 50);
    });
}

fetchUser(1)
    .then(user => {
        console.log("User:", user.name);
        return fetchPosts(user.id);
    })
    .then(posts => {
        console.log("Posts:", posts.length);
    })
    .catch(err => {
        console.log("Error:", err.message);
    });
```

链式调用比嵌套清晰很多。

## async/await — 最终形态

```javascript
async function main() {
    try {
        const user = await fetchUser(1);
        console.log("User:", user.name);

        const posts = await fetchPosts(user.id);
        console.log("Posts:", posts.length);

        // 并行请求
        const [user1, user2] = await Promise.all([
            fetchUser(1),
            fetchUser(2),
        ]);
        console.log("Parallel:", user1.name, user2.name);
    } catch (err) {
        console.log("Error:", err.message);
    }
}

// 上面的辅助函数
function fetchUser(id) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (id <= 0) reject(new Error("Invalid ID"));
            else resolve({ id, name: "User_" + id });
        }, 50);
    });
}

function fetchPosts(userId) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([{ title: "Post 1" }, { title: "Post 2" }]);
        }, 50);
    });
}

main();
```

> `async/await` 本质是 Promise 的语法糖，让异步代码看起来像同步代码。注意 `Promise.all` 实现并行请求。
