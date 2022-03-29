---
title: 在 Git 提交信息中使用 Emoji
date: 2019-05-01
updated: 2019-05-01
tags: 
  - Git
  - Emoji
categories:
---
<!-- <p align="center">
	<a href="https://gitmoji.dev">
		<img src="https://cloud.githubusercontent.com/assets/7629661/20073135/4e3db2c2-a52b-11e6-85e1-661a8212045a.gif" width="456" alt="gitmoji">
	</a>
</p> -->

[Gitmoji](https://gitmoji.dev/) 旨在解释如何在 **Git 提交消息时使用表情符号**。在**提交信息**时**使用表情符号**，可以更容易地**识别提交的目的或意图**。

<!-- more -->

## Emoji 列表

🎨 ：优化项目结构 / 代码格式

```
:art:
```

⚡️ ：性能提升

```
:zap:
```

🔥 ：移除代码或文件

```
:fire:
```

🐛 ： 修改 bug

```
:bug:
```

🚑️：紧急修复 / Critical hotfix

```
:ambulance:
```

✨ : 引入新功能

```
:sparkles:
```

📝 ：更新文档

```
:memo:
```

🚀 ： 部署工作

```
:rocket:
```

💄 ： UI / 样式更新

```
:lipstick:
```

🎉 ： 初始化项目

```
:tada:
```

✅ ： 添加或更新测试用例

```
:white_check_mark:
```

🔒️ ： 修复安全问题

```
:lock:
```

🔖 : 发布版本 / 创建 tag

```
:bookmark:
```

🚨 ：修复编译器 / linter 报错

```
:rotating_light:
```

🚧 ： 建设中 / WIP / Work in progress.

```
:construction:
```

💚 ： 修复 CI 构建问题

```
:green_heart:
```

⬇️ ： 依赖版本降级

```
:arrow_down:
```

⬆️ ： 依赖版本升级

```
:arrow_up:
```

📌 ：锁定依赖版本

```
:pushpin:
```

👷 ：添加或更新自动构建 / 持续集成

```
:construction_worker:
```

📈 ： 添加或更新分析追踪代码

```
:chart_with_upwards_trend:
```

♻️ ：代码重构

```
:recycle:
```

➕ ：添加依赖

```
:heavy_plus_sign:
```

➖ ： 移除依赖

```
:heavy_minus_sign:
```

🔧 ：更新配置文件

```
:wrench:
```

🔨 ： 更新开发脚本

```
:hammer:
```

🌐 ：国际化与本地化

```
:globe_with_meridians:
```

✏️ ：修复错字 / Fix typos.

```
:pencil2:
```

💩 ： 后续要优化的代码

```
:poop:
```

⏪️ ： 回滚更新 / Revert changes.

```
:rewind:
```

🔀 ：合并分支

```
:twisted_rightwards_arrows:
```

📦️ ：更新打包文件

```
:package:
```

👽️ ： 外部 API 导致的代码更新

```
:alien:
```
🚚  ：移动或重命名资源 (e.g.: files, paths, routes).

```
:truck:
```

📄 ： 更新许可证

```
:page_facing_up:
```

💥 ：引入破坏性更新 / breaking changes.

```
:boom:
```

🍱 : 更新资源 / assets.

```
:bento:
```

♿️ ：提升无障碍体验

```
:wheelchair:
```

💡 ：更新代码注释

```
:bulb:
```

🍻 ：Write code drunkenly.

```
:beers:
```

💬 ： 修改文本 /  text and literals.

```
:speech_balloon:
```

🗃️ : 数据库相关操作

```
:card_file_box:
```

🔊 ： 添加更新日志

```
:loud_sound:
```

🔇 ：移除运行日志

```
:mute:
```

👥 ：更新贡献者

```
:busts_in_silhouette:
```

🚸 提升用户体验与可用性 / UE & usability

```
:children_crossing:
```

🏗️ : 更改架构 / Make architectural changes.

```
:building_construction:
```

📱 : 响应式设计工作

```
:iphone:
```

🤡 ：Mock 数据

```
:clown_face:
```

🥚 ：添加彩蛋

```
:egg:
```

🙈 ：更新 .gitignore 文件

```
:see_no_evil:
```

📸 ：更新快照 / snapshots

```
:camera_flash:
```

⚗️ ： 实验性功能

```
:alembic:
```

🔍️ ： SEO 优化

```
:mag:
```

🏷️ ： Add or update types.

```
:label:
```

🌱 ： Add or update seed files.

```
:seedling:
```

🚩 ： 更新功能标记 / feature flags.

```
:triangular_flag_on_post:
```

🥅 ：异常捕获

```
:goal_net:
```

💫 ： 更新动画过渡效果

```
:dizzy:
```

🗑️ ：待清理的弃用代码

```
:wastebasket:
```

🛂 ：Work on code related to authorization, roles and permissions.

```
:passport_control:
```

🩹 ： 简单问题修复

```
:adhesive_bandage:
```

🧐 ：数据检查 / Data exploration/inspection.

```
:monocle_face:
```

⚰️ ：移除无用代码

```
:coffin:
```

## gitmoji-cli

也可以通过安装 [gitmoji-cli](https://github.com/carloscuesta/gitmoji-cli) 在命令行中使用 gitmoji。

```bash
npm i -g gitmoji-cli
```

## 命令行使用

```bash
$ gitmoji --help
```

```
A gitmoji interactive client for using gitmojis on commit messages.

  Usage
    $ gitmoji
  Options
    --init, -i      Initialize gitmoji as a commit hook
    --remove, -r    Remove a previously initialized commit hook
    --config, -g    Setup gitmoji-cli preferences.
    --commit, -c    Interactively commit using the prompts
    --list, -l      List all the available gitmojis
    --search, -s    Search gitmojis
    --version, -v   Print gitmoji-cli installed version
    --update, -u    Sync emoji list with the repo
```

### Commit

可以直接使用或通过 commit hook 使用。

#### Client

启动命令行，会根据提示自动生成提交。

```bash
$ gitmoji -c
```

#### Hook

初始化钩子之后，添加更改并提交，之后将开始提示并生成提交消息。

```bash
$ gitmoji -i
$ git add .
$ git commit
```

⚠️ 钩子**不要**和 `gitmoji -c` 命令一起使用。

![gitmoji commit](https://user-images.githubusercontent.com/7629661/41189947-1de56124-6bd6-11e8-9567-e7f1a8e99500.png)

### Search

根据关键字搜索适合的 gitmoji。

```bash
$ gitmoji -s "criteria"
```

![gitmoji search](https://user-images.githubusercontent.com/7629661/41189878-d24a3b78-6bd4-11e8-8d47-c8edf3b87e53.png)

### List

打印所有可用的 gitmojis。

```bash
$ gitmoji -l
```

![gitmoji list](https://user-images.githubusercontent.com/7629661/41189877-d22b145a-6bd4-11e8-97f8-a8e36bcab062.png)

### Update

更新 gitmojis 列表，默认情况下，第一次运行 gitmoji 时，cli 会创建一个缓存，以在无网络的情况下使用。

```bash
$ gitmoji -u
```

### Config

运行 `gitmoji -g` 设置首选项。

![gitmoji config](https://user-images.githubusercontent.com/7629661/41189876-d21167ee-6bd4-11e8-9008-4c987502f307.png)

#### Options

- **Automatic git add**: 每次执行 commit 时是否自动执行 `git add .`
- **Emoji format**: 切换表情符号格式
- **Scope prompt**: 启用或禁用 [conventional commits scope prompt](https://www.conventionalcommits.org/en/v1.0.0/#summary).
- **Signed commits**: 是否使用 GPG 签名提交

## REF

[gitmoji](https://gitmoji.dev/)

[gitmoji-cli](https://github.com/carloscuesta/gitmoji-cli/)
