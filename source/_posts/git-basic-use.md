---
title: Git 的基本使用
date: 2022-04-19 16:00:05
updated: 2022-04-19 16:00:05
tags:
categories:
---

> 本文记录 Git 的常用命令与 Git GUI 软件 SourceTree 与 GithubDesktop 的基本使用。

<!-- more -->

<style></style>

## 软件下载

- Git [官方下载](http://git-scm.com/) [备用下载](https://pc.qq.com/detail/13/detail_22693.html)
- SourceTree [官网下载](https://www.sourcetreeapp.com/) [备用下载](https://pc.qq.com/detail/17/detail_23237.html)
- GithubDesktop [官网下载](https://desktop.github.com/)

## GithubDesktop

### 初始化仓库

- 新建仓库： <kbd>Ctrl + N</kbd>
- 打开本地仓库： <kbd>Ctrl + O</kbd>
- 克隆仓库： <kbd>Ctrl + Shift + O</kbd>

![newrepo](https://upload-bbs.mihoyo.com/upload/2022/04/19/260511332/374c8662073375c8ccbf945bbf86dce3_7139911238845832139.png)



## 常用命令

<figure>
<img src="https://upload-bbs.mihoyo.com/upload/2022/04/19/260511332/3bc9d5f2c49a713c776e69676d7d56c5_5255755117711546545.png" alt="gitcmds">
<figcaption style="text-align:center">常用的6个命令，图片来自 www.ruanyifeng.com</figcaption>
</figure>

### 初始化/克隆仓库

```sh
# 在当前目录新建一个 Git 仓库
$ git init

# 新建一个目录，将其初始化为 Git 仓库
$ git init [project-name]

# 下载一个项目和它的整个代码历史
$ git clone [url]
```

### 配置文件

Git的设置文件为 `.gitconfig`，全局配置放在用户目录（`~` 或 `C:\Users\<username>`）下，项目专用配置可以放在项目目录下。

```sh
# 显示当前的 Git 配置
$ git config --list

# 编辑 Git 配置文件
$ git config -e [--global]

# 设置提交代码时的用户信息
$ git config [--global] user.name "[name]"
$ git config [--global] user.email "[email address]"
```





---
*fin.*
