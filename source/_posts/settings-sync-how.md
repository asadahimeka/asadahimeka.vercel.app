---
title: 利用 Settings Sync 插件同步 VS Code 设置
tags:
  - VS Code
  - Settings Sync
abbrlink: 9b0da72f
date: 2018-03-04 00:00:00
updated: 2018-03-04 00:00:00
categories:
---
早就听说这个插件了，今天用了一下，确实挺方便的。通过把配置文件创建为 Gist 上来实现了 VS Code 设置的同步，下次换电脑或重装时就很便利了。在插件商店搜索 Settings Sync 然后安装，重载窗口，打开命令面板，输入 sync 即可查看所有相关命令。
<!-- more -->

## 可以同步的设置

```text
1. VSCode 配置文件
2. 键盘绑定文件
3. 启动文件
4. 代码片段（Snippets）
5. 插件
6. 工作区
```

## 快捷键

```text
1. 上传配置：Shift + Alt + U
2. 下载配置 : Shift + Alt + D
```

## 如何从 GitHub 获取 Personal Access Token

这个插件需要你 GitHub 账户的 Personal Access Token. 可以很简单的按照如下步骤创建一个。确保在 scope 里添加了** Gist**.

**到 [Settings](https://github.com/settings) / [Developer settings](https://github.com/settings/tokens) / [Personal access tokens](https://github.com/settings/tokens)  来生成新的 Token**

![Goto Settings / Developer settings / Personal Access Tokens](https://shanalikhan.github.io/img/github1.PNG)

**从 Scopes 里选择 Gist.**

![Select Scopes](https://shanalikhan.github.io/img/github2.PNG)

**得到 Access Token.**

![Get Access Token](https://shanalikhan.github.io/img/github3.PNG)

> 为了将来的使用，保存好这个 Token，因为只会看到一次 (i.e. 从别的机器上传配置）.

## 第一次上传配置

**按下 Shift + Alt + U 来填入 GitHub 账号的 access token.**

按下后会自动打开 GitHub 设置页，然后生成一个 token 来允许插件创建 Gist.

在窗口里输入生成的 token，接着按下回车。
![github account access token](https://shanalikhan.github.io/img/upload1.png)

**自动上传配置文件后插件会给出这个 Gist 的 ID.**
以后需要用这个 Gist ID 来同步你的配置，所以跟 token 一样一起保存好以便在其他电脑上同步你的配置。
![uploaded automatically](https://shanalikhan.github.io/img/upload2.png)

可以通过这个链接查看**是否生成了 Gist**
> ```https://gist.github.com/{你的 GitHub 用户名}/{Gist 的 ID}```

Gist 打不开的话可以在 hosts 里添加 ([hosts 更新地址](https://github.com/googlehosts/hosts/blob/master/hosts-files/hosts))

> ```192.30.253.118 gist.github.com```

这里有一个上传命令全过程的 gif

![Upload](https://media.giphy.com/media/xT9IglKxSqs2Wdwq2c/source.gif)

## 下载你的配置

**按下 Shift + Alt + D 然后会问你要 GitHub Gist ID.**

> 在命令面板里输入 sync 来上传或下载

**输入你的 GitHub Token.**

在窗口中输入你的 token 然后按下回车

![github account access token](https://shanalikhan.github.io/img/upload1.png)

**输入你的 Gist ID.**

需要输入你的 Gist ID 来下载之前上传过的配置

![Enter Your Gist ID](https://shanalikhan.github.io/img/download2.png)

**配置下载完毕。**

所有的配置文件都下载下来了

![Enter Your Gist ID](https://shanalikhan.github.io/img/download3.png)

下载配置的全过程 gif

![Download](https://media.giphy.com/media/xT9Iglsi3CS9noE8tW/source.gif)

## 重置 Token / Gist Settings

> 在命令面板里输入 sync 然后选择 Reset Token and Gist Settings

## 自动下载配置

自动下载 **默认是关闭的**

打开的话要确保已经验证了 token 以及有可用的 Gist

当启动时会自动下载最新的配置文件

通过命令面板里 **"Sync : Advance Options > Toggle Auto-Download On Startup"** 来打开或关闭

## 配置发生变化时自动上传

自动上传 **默认是关闭的**

打开的话要确保已经验证了 token 以及有可用的 Gist

当配置改变时会自动上传最新的配置文件

通过命令面板里 **"Sync : Advance Options > Toggle Auto-Upload on Setting Change"** 来打开或关闭

### 更多查看 [原文 Readme](https://github.com/shanalikhan/code-settings-sync/blob/master/README.md)
