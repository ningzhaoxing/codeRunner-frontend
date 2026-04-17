---
title: "C 语言指针：从地址到数据结构"
date: "2026-04-05"
tags: [C, 基础]
summary: "通过可运行的代码理解 C 语言指针、数组、结构体指针和动态内存分配。"
---

指针是 C 语言的灵魂。它直接操作内存地址，理解了指针就理解了 C。

## 指针基础

```c
#include <stdio.h>

int main() {
    int x = 42;
    int *p = &x;

    printf("x 的值: %d\n", x);
    printf("x 的地址: %p\n", (void*)&x);
    printf("p 指向的值: %d\n", *p);
    printf("p 存储的地址: %p\n", (void*)p);

    *p = 100;
    printf("修改后 x = %d\n", x);

    return 0;
}
```

`&` 取地址，`*` 解引用。通过指针修改 `*p`，原变量 `x` 也跟着变。

## 数组与指针

```c
#include <stdio.h>

int main() {
    int arr[] = {10, 20, 30, 40, 50};
    int *p = arr;

    for (int i = 0; i < 5; i++) {
        printf("arr[%d] = %d, *(p+%d) = %d\n", i, arr[i], i, *(p + i));
    }

    printf("\nsizeof(arr) = %lu bytes\n", sizeof(arr));
    printf("sizeof(p) = %lu bytes\n", sizeof(p));

    return 0;
}
```

数组名就是首元素的地址。`arr[i]` 等价于 `*(arr + i)`。但 `sizeof` 不同 — 数组知道自己的总大小，指针只有 8 字节。

## 结构体指针

```c
#include <stdio.h>

typedef struct {
    char name[20];
    int age;
    float score;
} Student;

void print_student(const Student *s) {
    printf("Name: %s, Age: %d, Score: %.1f\n", s->name, s->age, s->score);
}

int main() {
    Student alice = {"Alice", 20, 95.5};
    Student bob = {"Bob", 21, 88.0};

    print_student(&alice);
    print_student(&bob);

    Student *p = &alice;
    p->age = 21;
    printf("After birthday: ");
    print_student(p);

    return 0;
}
```

> `->` 是 `(*p).member` 的简写。传结构体指针比传值高效 — 不需要复制整个结构体。

## 动态内存

```c
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int main() {
    int n = 5;
    int *arr = (int*)malloc(n * sizeof(int));

    if (arr == NULL) {
        printf("malloc failed\n");
        return 1;
    }

    for (int i = 0; i < n; i++) {
        arr[i] = (i + 1) * 10;
    }

    printf("Dynamic array: ");
    for (int i = 0; i < n; i++) {
        printf("%d ", arr[i]);
    }
    printf("\n");

    arr = (int*)realloc(arr, 8 * sizeof(int));
    arr[5] = 60;
    arr[6] = 70;
    arr[7] = 80;

    printf("After realloc: ");
    for (int i = 0; i < 8; i++) {
        printf("%d ", arr[i]);
    }
    printf("\n");

    free(arr);
    printf("Memory freed.\n");

    return 0;
}
```

> `malloc` 分配、`realloc` 扩容、`free` 释放。忘记 `free` 就是内存泄漏 — C 没有垃圾回收。
