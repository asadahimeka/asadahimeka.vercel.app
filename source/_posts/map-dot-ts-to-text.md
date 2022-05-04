---
title: 让 Windows 把 TypeScript 文件当作文本文件
tags: TypeScript
abbrlink: 47c73f2e
date: 2022-04-24 15:57:09
updated: 2022-04-24 15:57:09
categories:
---

## TL;DR

修改注册表项 `HKEY_CLASSES_ROOT\.ts` 为 `HKEY_CLASSES_ROOT\.txt` 的值

<!-- more -->

## 起因

> Windows10 总把 TypeScript 文件自动当成视频，放 .ts 的文件夹经常被自动识别为视频文件夹，打开后自动刷新一遍，然后变成大图标，并有一个播放选项。

`.ts` 文件格式在 Windows 中默认为 `MPEG 2 TS` 视频格式，当进入 TypeScript 项目目录，会读取 `.ts`  文件获取视频缩略图，造成卡顿。

这本身没有什么问题，因为 .ts 文件，在 TypeScript 出现之前实际上是 Transscript 文件，用于播放 DVD，并且 Windows 支持这种格式。然而把 TypeScript 文件当作视频去解析是无意义的，就使文件管理器变得很卡。

## 解决

修改注册表解决：

1. 打开注册表：<kbd>Win</kbd> + <kbd>R</kbd> 输入 `regedit.exe`
2. 导航到 `HKEY_CLASSES_ROOT\.ts`
3. 修改以下值：
   - (默认) : txtfile
   - Content Type : text/plain
   - PerceivedType : text

也可以直接保存以下代码为 `.reg` 文件双击合并注册表。

```shell
Windows Registry Editor Version 5.00

[HKEY_CLASSES_ROOT\.ts]
@="txtfile"
"Content Type"="text/plain"
"PerceivedType"="text"

[HKEY_LOCAL_MACHINE\SOFTWARE\Microsoft\Windows\CurrentVersion\Explorer\KindMap]
".ts"="document"
```

**修改之前先备份下原先的注册表**。

修改完成以后重启文件管理器或计算机生效。

对于修改注册表之前已存在的项目文件，需要右键项目文件夹点击 `属性`，然后选择 `自定义` 页面，将 `优化此文件夹` 选择为 `常规项目`，并将下方的 `把此模板应用到所有子文件夹` 勾选上，然后确定即可。

## Reference

https://www.zhihu.com/question/373189177

https://stackoverflow.com/questions/32669805

---
*fin.*
