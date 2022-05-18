---
title: 解决 AMD 笔记本不插电源时屏幕偏暗的问题
tags:
  - AMD
  - Screen
abbrlink: 6b7b7700
date: 2021-06-06 00:00:00
updated: 2021-06-06 00:00:00
categories:
---

> 办法：关掉显卡设置里的 Vari-Bright 选项

<!-- more -->

最近换了锐龙版的笔记本，用着还不错，就是不插电源时看屏幕亮度不太适应，整体偏暗，有点费眼，差点就觉得 AMD 不 Yes 了。然后网上一顿找，发现在 AMD 显卡设置一个选项就好了。想起之前的笔记本好像也是这样，也是在英特尔核显设置里关掉省电就好了……[允悲]。设置里说 Vari-Bright 是根据图像内容自适应调整显示亮度来省电，通过调整伽马等级来补偿亮度变化，从而保持色彩保真度。说的是挺好，但是眼睛难受，还是关了吧。

具体步骤：

- 打开 AMD Radeon Software，点击右上角的设置图标，

![open_ars_1](https://pic.rmb.bdstatic.com/bjh/events/ee8b87a4d57efc8a42ec8f232148ae48.jpeg)

![open_ars_2](https://pic.rmb.bdstatic.com/bjh/events/5d09436a935aee025dd60fcd34185a25.jpeg)

- 找到设置里的显示器选项，关掉显示选项里的 Vari-Bright。

![disable_vari-bright](https://pic.rmb.bdstatic.com/bjh/events/fca69fba1d4193ba3239a7bb9bec25d5.jpeg)

感觉 AMD 的笔记本都可以通过这个办法来解决不插电源时屏幕暗的问题。

> REF: https://byokpg.smartapps.cn/pages/pb/pb?tid=7175083311
