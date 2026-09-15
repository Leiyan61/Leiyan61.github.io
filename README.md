基于 **Hexo + ZenMind 主题 + GitHub Actions** 的全自动静态博客：写 Markdown 推到 `main`，自动上线。

- 🌐 博客地址：**https://Tprme.github.io**
- 📦 仓库地址：https://github.com/Leiyan61/Leiyan61.github.io
- ⚙️ 自动部署：https://github.com/Leiyan61/Leiyan61.github.io/actions

> ⚠️ 仓库名必须叫 `Leiyan61.github.io`（`<用户名>.github.io`）。
> 改成别的名字，站点会变成 `https://Leiyan61.github.io/<仓库名>/` 子路径，
> 而 ZenMind 主题用的是 `/css/style.css` 这类绝对路径，会全部 404。

## 目录结构

```
ctf-blog/
├── _config.yml                    # 站点主配置（标题、网址、主题开关）
├── source/
│   ├── _posts/                    # 文章都放这里，一个 .md 一篇
│   └── about/index.md             # “关于我们”页面
├── themes/ZenMind/                # 主题（单栏极简风）
├── .github/workflows/deploy.yml   # 自动部署脚本
└── deploy.ps1                     # 首次上线用的一次性脚本
```

## 日常三条命令

```bash
npm run server     # 本地预览 -> http://localhost:4000
npm run clean      # 清掉生成的静态文件
npm run build      # 只生成静态文件到 public/
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

## 首次上线（只需做一次）

在 `D:\code2` 下执行：

```powershell
.\deploy.ps1 -Username Leiyan61 -TeamName "哈理工 Birkenwald"
```

脚本会提示粘贴一个 GitHub Personal Access Token（勾选 `repo` + `workflow` 权限），
然后自动完成：建仓库 → 推送代码 → 开启 Pages。

Token 会存进 Windows 凭据管理器，之后的 `git push` 不用再输入。
