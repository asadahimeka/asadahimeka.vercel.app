---
title: npm WARN config global `--global` are deprecated 解决办法
tags:
  - Node.js
  - npm
abbrlink: db4d19bf
date: 2022-06-09 11:38:53
updated: 2022-06-09 11:38:53
description:
categories:
---

## TL;DR

```bash
# 以管理员身份运行
npm i -g npm-windows-upgrade
npm-windows-upgrade
# 然后选择最新版本
```

<!-- more -->

## 起因

最近执行 `npm -v` 时，npm 报了如下警告：

```
npm WARN config global `--global`, `--local` are deprecated. Use `--location=global` instead.
```

问题是在 Windows 平台出现的，查了下貌似是 `npm.cmd` 里用了弃用的选项 `-g`，导致出现了这个警告。

## 解决

最新的 npm 应该已经修复了这个问题，但我在使用 `npm i -g npm` 安装最新版本后还是报这个警告，于是使用 `npm-windows-upgrade` 这个包来更新 npm。另外，既然是 `npm.cmd` 使用了废弃的选项，那就直接修改 `npm.cmd` ，把这个选项替换掉。

### 方式一：使用 npm-windows-upgrade

![npm-windows-upgrade](https://github-readme-stats.vercel.app/api/pin/?username=felixrieseberg&repo=npm-windows-upgrade)

首先，要确保可以通过从 PowerShell 执行 npm 脚本。以管理员身份打开 PowerShell，运行以下命令：

```powershell
Set-ExecutionPolicy Unrestricted -Scope CurrentUser -Force
```

然后执行

```bash
npm install --global --production npm-windows-upgrade
npm-windows-upgrade
```

选择最新版本

![图 1](https://pic.rmb.bdstatic.com/bjh/events/192d8487fa5adad5bcecfe083f52219b.png)

### 方式二：修改 `npm.cmd`

1. 进入到 nodejs 安装目录

 ![图 2](https://upload-bbs.mihoyo.com/upload/2022/06/09/260511332/5b5463077bb1d98a3a7e7804bc18767c_601754267090861.png)

2. 替换 `npm.cmd` 第 12 行的 `prefix -g` 为 `prefix --location=global`

 ![图 3](https://pic.rmb.bdstatic.com/bjh/events/a037ae700920c9b683d259a8e6450dbc.png)

3. 同样修改其他几个文件： `npm`, `npx`, `npx.cmd`

4. 保存（以管理员身份）

## Reference

[stackoverflow/72401421](https://stackoverflow.com/questions/72401421)

[npm-windows-upgrade](https://www.npmjs.com/package/npm-windows-upgrade)

---
*fin.*
