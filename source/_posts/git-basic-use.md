---
title: Git 的基本使用
abbrlink: f1f3f3e5
date: 2019-06-06 00:00:00
updated: 2022-04-19 00:00:00
tags: Git
categories:
---

> 本文记录 Git 的常用命令与 Git GUI 软件的基本使用。

<!-- more -->

<style>.warning-outdate,.post-time,footer,.post-nav,.sidebar-nav-item[title=HOME],.sidebar-nav-item[title="站点概览"]{display:none!important}.sidebar{background-size:0!important;}#live2d,.fireworks{opacity:0!important;}*{cursor:auto!important;}</style>

## 软件下载

- Git [官方下载](http://git-scm.com/) [备用下载](https://pc.qq.com/detail/13/detail_22693.html)
- SourceTree [官网下载](https://www.sourcetreeapp.com/) [备用下载](https://pc.qq.com/detail/17/detail_23237.html)
- GithubDesktop [官网下载](https://desktop.github.com/)

## SourceTree

### 安装

![setup](https://pic.rmb.bdstatic.com/bjh/events/6ff31ac2bcb38b7610b3f0d47c33cb53.png)

### 设置提交名字与邮箱

![name_and_email](https://pic.rmb.bdstatic.com/bjh/events/04e1aeab552892a61af15fba74011aad.png)

### 克隆远程仓库

1. 点击 Clone 按钮，填入远程仓库地址，选择保存位置进行克隆

   ![clone](https://pic.rmb.bdstatic.com/bjh/events/d686f86a9475d4ca337c433f32a8de4b.png)

2. 克隆完成后会在会自动打开仓库选项卡，下次打开 SourceTree 时已克隆的仓库会展示在 Local 页面

   ![local](https://pic.rmb.bdstatic.com/bjh/events/2073634b2d325155e3ef0d4aa5f1ad76.png)

### 创建本地仓库

1. 点击 Create 按钮，输入保存路径与仓库名字点击创建即可

   ![create_local](https://pic.rmb.bdstatic.com/bjh/events/a0ec5299f0ab0aa08a4bd7110f2ce772.png)

### 添加已存在的本地仓库

1. 点击 Add 按钮，选择想要添加的本地仓库路径后点击添加

   ![add_local](https://pic.rmb.bdstatic.com/bjh/events/a757567ef0a506b7e40c10ff3d45ab66.png)

2. 之后已添加的仓库会显示在 Local 页面

### 从远程仓库拉取变更

1. 从首页双击进入选择的仓库，点击拉取按钮

   ![btns](https://pic.rmb.bdstatic.com/bjh/events/ff5e9153e9a7c3fe45bbfd60b4405de5.png)

2. 然后弹窗确认拉取

   ![pull](https://pic.rmb.bdstatic.com/bjh/events/26b814e3286001f70350d4057e7b01ae.png)

3. 新增的文件会显示在 History 里

### 提交与推送

1. 进入仓库页面后选择左侧面板的文件状态，会展示当前仓库的改动状况

2. 选中某个文件可以可视化地比较当前文件的改动

3. 点击文件右侧加号可以暂存文件，实际上是执行 `git add` 命令

4. 在下方输入框里输入提交信息，点击提交，就完成了一个本地提交，实际上执行了 `git commit -m "message"` 命令

5. 然后点击推送按钮推送到远程仓库，也可以在提交时勾选立即推送，实际是执行 `git push` 命令

6. 推送完成后可以去 History 里查看自己的提交

   ![diff](https://pic.rmb.bdstatic.com/bjh/events/87b9ffbd716a694836b640011558d57a.png)

### 分支

1. 点击上方按钮栏的分支按钮，在弹出的界面里可以新建分支，创建后会切换到该分支

   ![newb](https://pic.rmb.bdstatic.com/bjh/events/965c125ddabf2bb3f6e80b0dc0c1090d.png)

1. 在左侧面板的“远程”下，列出了当前远程仓库的所有分支。右键某个分支，在弹出菜单中选择“检出 <分支名>”可以切换到改分支，实际上是执行命令`git checkout <分支名>`

   ![branch](https://pic.rmb.bdstatic.com/bjh/events/49418e577f81800911a2c04cc87dcb30.png)

2. 左侧面板的“分支”下，同理切换本地分支

3. 要合并分支，选择待合并分支，例如 `wo`，然后点击右键，在弹出菜单中选择“合并 wo 至当前分支”，实际上是执行 `git merge wo` 命令

   ![merge](https://pic.rmb.bdstatic.com/bjh/events/34fbea4a6b79b68883ef74064bb513a0.png)

## GithubDesktop

### 安装

![Screenshot_2022-04-19_18-35-52](https://upload-bbs.mihoyo.com/upload/2022/04/19/260511332/dbfe67a622be271b537a17f8db0e5c98_8608328698946349255.png)

### 初始化仓库

- 新建仓库： <kbd>Ctrl + N</kbd>
- 打开本地仓库： <kbd>Ctrl + O</kbd>
- 克隆仓库： <kbd>Ctrl + Shift + O</kbd>

![newrepo](https://upload-bbs.mihoyo.com/upload/2022/04/19/260511332/374c8662073375c8ccbf945bbf86dce3_7139911238845832139.png)

### 拉取（pull）

![pull](https://upload-bbs.mihoyo.com/upload/2022/04/19/260511332/917b53ec52cc48b7aae833298ded834c_5625761703149839614.png)

### 提交（commit）

![commit](https://upload-bbs.mihoyo.com/upload/2022/04/19/260511332/f65aa4b5f71c6bbbc60f57e5ebe15d9c_1625774561531924723.png)

### 推送（push）

![push](https://upload-bbs.mihoyo.com/upload/2022/04/19/260511332/e924c745db323fe79a6e7cf7d0f357ca_1851264763110611287.png)

### 切换分支（checkout）

![branch](https://upload-bbs.mihoyo.com/upload/2022/04/19/260511332/7b4591cb72d08b4adc5524792ebced9d_5829883107185535958.png)

### 提交历史

![history](https://upload-bbs.mihoyo.com/upload/2022/04/19/260511332/d55c83016c350cd33ae93ba8bfe8c7e8_6842425874499219688.png)

## 常用命令

![gitcmds](https://upload-bbs.mihoyo.com/upload/2022/04/19/260511332/3bc9d5f2c49a713c776e69676d7d56c5_5255755117711546545.png)_常用的6个命令，图片来自 www.ruanyifeng.com_

### 初始化/克隆仓库

```bash
# 在当前目录新建一个 Git 仓库
$ git init

# 新建一个目录，将其初始化为 Git 仓库
$ git init [project-name]

# 下载一个项目和它的整个代码历史
$ git clone [url]
```

### 配置文件

Git 的设置文件为 `.gitconfig`，全局配置放在用户目录（`~` 或 `C:\Users\<username>`）下，项目专用配置可以放在项目目录下。

```bash
# 显示当前的 Git 配置
$ git config --list

# 编辑 Git 配置文件
$ git config -e [--global]

# 设置提交代码时的用户信息
$ git config [--global] user.name "[name]"
$ git config [--global] user.email "[email address]"
```

### 增加/删除文件

```bash
# 添加指定文件到暂存区
$ git add [file1] [file2] ...

# 添加指定目录到暂存区，包括子目录
$ git add [dir]

# 添加当前目录的所有文件到暂存区
$ git add .

# 添加每个变化前，都会要求确认
# 对于同一个文件的多处变化，可以实现分次提交
$ git add -p

# 删除工作区文件，并且将这次删除放入暂存区
$ git rm [file1] [file2] ...

# 停止追踪指定文件，但该文件会保留在工作区
$ git rm --cached [file]

# 改名文件，并且将这个改名放入暂存区
$ git mv [file-original] [file-renamed]
```

### 提交

```bash
# 提交暂存区到仓库区
$ git commit -m [message]

# 提交暂存区的指定文件到仓库区
$ git commit [file1] [file2] ... -m [message]

# 提交工作区自上次commit之后的变化，直接到仓库区
$ git commit -a

# 提交时显示所有diff信息
$ git commit -v

# 使用一次新的commit，替代上一次提交
# 如果代码没有任何新变化，则用来改写上一次commit的提交信息
$ git commit --amend -m [message]

# 重做上一次commit，并包括指定文件的新变化
$ git commit --amend [file1] [file2] ...
```

### 远程同步

```bash
# 下载远程仓库的所有变动
$ git fetch [remote]

# 显示所有远程仓库
$ git remote -v

# 显示某个远程仓库的信息
$ git remote show [remote]

# 增加一个新的远程仓库，并命名
$ git remote add [shortname] [url]

# 取回远程仓库的变化，并与本地分支合并
$ git pull [remote] [branch]

# 上传本地指定分支到远程仓库
$ git push [remote] [branch]

# 强行推送当前分支到远程仓库，即使有冲突
$ git push [remote] --force

# 推送所有分支到远程仓库
$ git push [remote] --all
```

### 分支

```bash
# 列出所有本地分支
$ git branch

# 列出所有远程分支
$ git branch -r

# 列出所有本地分支和远程分支
$ git branch -a

# 新建一个分支，但依然停留在当前分支
$ git branch [branch-name]

# 新建一个分支，并切换到该分支
$ git checkout -b [branch]

# 新建一个分支，指向指定commit
$ git branch [branch] [commit]

# 新建一个分支，与指定的远程分支建立追踪关系
$ git branch --track [branch] [remote-branch]

# 切换到指定分支，并更新工作区
$ git checkout [branch-name]

# 切换到上一个分支
$ git checkout -

# 建立追踪关系，在现有分支与指定的远程分支之间
$ git branch --set-upstream [branch] [remote-branch]

# 合并指定分支到当前分支
$ git merge [branch]

# 选择一个commit，合并进当前分支
$ git cherry-pick [commit]

# 删除分支
$ git branch -d [branch-name]

# 删除远程分支
$ git push origin --delete [branch-name]
$ git branch -dr [remote/branch]
```

### 标签

```bash
# 列出所有tag
$ git tag

# 新建一个tag在当前commit
$ git tag [tag]

# 新建一个tag在指定commit
$ git tag [tag] [commit]

# 删除本地tag
$ git tag -d [tag]

# 删除远程tag
$ git push origin :refs/tags/[tagName]

# 查看tag信息
$ git show [tag]

# 提交指定tag
$ git push [remote] [tag]

# 提交所有tag
$ git push [remote] --tags

# 新建一个分支，指向某个tag
$ git checkout -b [branch] [tag]
```

### 查看信息

```bash
# 显示有变更的文件
$ git status

# 显示当前分支的版本历史
$ git log

# 显示commit历史，以及每次commit发生变更的文件
$ git log --stat

# 搜索提交历史，根据关键词
$ git log -S [keyword]

# 显示某个commit之后的所有变动，每个commit占据一行
$ git log [tag] HEAD --pretty=format:%s

# 显示某个commit之后的所有变动，其"提交说明"必须符合搜索条件
$ git log [tag] HEAD --grep feature

# 显示某个文件的版本历史，包括文件改名
$ git log --follow [file]
$ git whatchanged [file]

# 显示指定文件相关的每一次diff
$ git log -p [file]

# 显示过去5次提交
$ git log -5 --pretty --oneline

# 显示所有提交过的用户，按提交次数排序
$ git shortlog -sn

# 显示指定文件是什么人在什么时间修改过
$ git blame [file]

# 显示暂存区和工作区的差异
$ git diff

# 显示暂存区和上一个commit的差异
$ git diff --cached [file]

# 显示工作区与当前分支最新commit之间的差异
$ git diff HEAD

# 显示两次提交之间的差异
$ git diff [first-branch]...[second-branch]

# 显示今天你写了多少行代码
$ git diff --shortstat "@{0 day ago}"

# 显示某次提交的元数据和内容变化
$ git show [commit]

# 显示某次提交发生变化的文件
$ git show --name-only [commit]

# 显示某次提交时，某个文件的内容
$ git show [commit]:[filename]

# 显示当前分支的最近几次提交
$ git reflog
```

### 撤销

```bash
# 恢复暂存区的指定文件到工作区
$ git checkout [file]

# 恢复某个commit的指定文件到暂存区和工作区
$ git checkout [commit] [file]

# 恢复暂存区的所有文件到工作区
$ git checkout .

# 重置暂存区的指定文件，与上一次commit保持一致，但工作区不变
$ git reset [file]

# 重置暂存区与工作区，与上一次commit保持一致
$ git reset --hard

# 重置当前分支的指针为指定commit，同时重置暂存区，但工作区不变
$ git reset [commit]

# 重置当前分支的HEAD为指定commit，同时重置暂存区和工作区，与指定commit一致
$ git reset --hard [commit]

# 重置当前HEAD为指定commit，但保持暂存区和工作区不变
$ git reset --keep [commit]

# 新建一个commit，用来撤销指定commit
# 后者的所有变化都将被前者抵消，并且应用到当前分支
$ git revert [commit]

# 暂时将未提交的变化移除，稍后再移入
$ git stash
$ git stash pop
```

### 其他

```bash
# 生成一个可供发布的压缩包
$ git archive
```

## Ref

https://confluence.atlassian.com/get-started-with-sourcetree/get-started-with-sourcetree-847359026.html

https://www.ruanyifeng.com/blog/2015/12/git-cheat-sheet.html

https://www.liaoxuefeng.com/wiki/896043488029600/1317161920364578

---
*fin.*
