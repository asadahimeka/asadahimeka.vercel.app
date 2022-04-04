---
title: hexo + typora 图片插入解决办法
tags:
  - Hexo
  - Typora
abbrlink: 12a70b22
date: 2020-04-10 00:00:00
updated: 2020-04-10 00:00:00
categories:
---

Typora 是一款知名的 Markdown 编辑器，简单好用，体验良好。使用 hexo 搭建好博客后，主要是用 Markdown 来编写博客，typora 便是我的首选编辑器。但直接使用 typora 编写的 Markdown 文件，图片路径可能存在问题，就导致页面上图片无法显示。自己去改路径的话那就很麻烦了，好在  Typora 支持拖拽或复制来插入图片，并且可以复制到指定路径，或直接上传到图床，这就非常方便了。

<!-- more -->

## 本地图片

博客的 Markdown 文档都存储在 `source/_posts` 下，然后博客相关图片都存在 `source/images` 下，接着来修改 typora 的设置。

打开 `文件 - 偏好设置 - 图像` 进行修改如下图修改

![typora-setting-image](https://upload-bbs.mihoyo.com/upload/2022/04/05/260511332/b3c14f030f1b7bed65563ad2e3d75e6e_8404618712675426050.png)

这样拖拽或粘贴过来的图片会自动复制到 `source/images` 下面，不过这样只是可以在 typora 中查看图片了，要想在 hexo 中查看就需要图片路径与服务器中相符合， `source/images` 文件夹下的图片在 hexo 中可以用如 `/images/abc.png` 的路径访问到，而 typora 可以设置图片根目录，设置完了后图片路径都是 `/images/abc.png` 这样的，这样一配合就解决了图片路径问题，具体做法是在 `格式 - 图像 - 设置图片根目录` 中 将 `source` 文件夹设置为图片根目录，也可在每篇 Markdown 文档中 YAML Front Matter 中添加 `typora-root-url: ..`，或者直接在 `scaffolds` 中的模板里直接添加，这样每次 `hexo new post` 时就会自动生成了。

==注意先设置图片根目录，再进行图片的插入。==

## 上传到图床

上边的方法适用于博客文件放在根目录的情况，如果文件放在子目录下的话暂时没找到解决办法，便直接上传到图床采用绝对路径了。

在 typora 里可以设置插入图片时自动上传，如下图设置，这里使用 `PicGo` App 来上传图片。

![BaiduShurufa_2021-5-21_20-12-18](https://upload-bbs.mihoyo.com/upload/2022/04/05/260511332/674295d13cd41f130573cfa5fb8d09e5_1232174737957433436.png)

PicGo 可以点击下载按钮到浏览器下载，安装完成后配置好图床，就可以上传图片了。这里使用 GitHub 图床（SM.MS 体验应该更好）。

![image-20210521202345259](https://upload-bbs.mihoyo.com/upload/2022/04/05/260511332/2e9e821e12eddbadeac9dde9a53dbbf9_2453065688534570503.png)

具体就是在 GitHub 新建一个仓库专门用来存放图片，然后在 PicGo 里填写 用户名/仓库名，分支一般写 main ，token 在 GitHub 设置里生成。

下边是 PicGo 文档里 GitHub 图床的详细步骤，其他图床可参考官方文档。
如果 GitHub 图片访问过慢的话，可以将自定义域名设置为 `https://cdn.jsdelivr.net/gh/{用户名}/{仓库名}@{分支名}`

> **1.** 首先你得有一个 GitHub 账号。注册 GitHub 就不用我多言。
>
> **2.** 新建一个仓库
>
> ![img](https://pic.rmb.bdstatic.com/bjh/events/ab89561593817c156265527cf8b8dc53.png)
>
> 记下你取的仓库名。
>
> **3.** 生成一个 token 用于 PicGo 操作你的仓库：
>
> 访问：https://github.com/settings/tokens
>
> 然后点击`Generate new token`。
>
> ![img](https://pic.rmb.bdstatic.com/bjh/events/8e70f6462768dbab79f7510bcf128e2e.png)
>
> 把 repo 的勾打上即可。然后翻到页面最底部，点击`Generate token`的绿色按钮生成 token。
>
> ![img](https://pic.rmb.bdstatic.com/bjh/events/3bde3bb9b7f2d7716404c9eed1f21d53.png)
>
> **注意：**这个 token 生成后只会显示一次！你要把这个 token 复制一下存到其他地方以备以后要用。
>
> ![img](https://pic.rmb.bdstatic.com/bjh/events/39f88acf6f5890b5eed5ae6caaa0c341.png)
>
> **4.** 配置 PicGo
>
> **注意：**仓库名的格式是`用户名/仓库`，比如我创建了一个叫做`test`的仓库，在 PicGo 里我要设定的仓库名就是`Molunerfinn/test`。一般我们选择`main`分支即可。然后记得点击确定以生效，然后可以点击`设为默认图床`来确保上传的图床是 GitHub。
>
> ![img](https://pic.rmb.bdstatic.com/bjh/events/c39ff4607de74eb6f9093539fa1304b8.png)
>
> 至此配置完毕，已经可以使用了。当你上传的时候，你会发现你的仓库里也会增加新的图片了：
>
> ![img](https://pic.rmb.bdstatic.com/bjh/events/f88f55737ac44d0cd193fbd103ca09d1.png)

## REF

[typora + hexo 博客中插入图片](https://blog.csdn.net/qq_32623363/article/details/100524856)

[PicGo 文档](https://picgo.github.io/PicGo-Doc/zh/guide/config.html)
