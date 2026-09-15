基于 **Hexo + ZenMind 主题 + GitHub Actions** 的全自动静态博客：写 Markdown 推到 `main`，自动上线。

- 博客地址：**https://Tprme.github.io**
- 仓库地址：https://github.com/Leiyan61/Leiyan61.github.io
- 自动部署：https://github.com/Leiyan61/Leiyan61.github.io/actions


## 目录结构

```
ctf-blog/
├── _config.yml                    
├── source/
│   ├── _posts/                  
│   └── about/index.md            
├── themes/ZenMind/               
├── .github/workflows/deploy.yml  
└── deploy.ps1                     
```

## 日常三条命令

```bash
npm run server    
npm run clean     
npm run build    
```

## 写一篇新文章

```bash
npx hexo new "第 2 期周报"
```

编辑 `source/_posts/` 下新生成的文件，然后发布：

```bash
git add .
git commit -m "新增第 2 期周报"
git push
```

push 之后 GitHub Actions 会自动构建并部署，1-2 分钟后刷新博客即可看到。

## 文章头部的写法（Front-matter）

```yaml
---
title: 第 2 期周报：XX 杯复盘
date: 2026-09-22 20:00:00
categories:
  - 周报
tags:
  - 周报
  - Web
  - Pwn
---
```

正文里写一行 `<!-- more -->`，首页就只显示它之前的内容作为摘要。
