---
title: 为博客添加 Pixiv 每日排行榜小挂件
tags:
  - Pixiv
  - Widget
abbrlink: '9253784'
date: 2022-07-22 21:39:13
updated: 2022-07-22 21:39:13
description:
categories:
---

> 一行代码为博客添加一个 Pixiv 每日排行榜小挂件，来自 [mokeyjay](https://github.com/mokeyjay/Pixiv-daily-ranking-widget/tree/develop)

<!-- more -->

之前偶然发现的一款博客小挂件，可以非常方便地在博客展示 Pixiv 每日排行榜，就很爱。下面记录一下使用方法，喜欢的话可以去给作者点一个 [star](https://github.com/mokeyjay/Pixiv-daily-ranking-widget)。

## 挂件特色

> - 一行 HTML 代码即可调用，方便快捷
>
> - 自适应宽高。推荐宽度 240px、高度 380px 或以上
>
> - 点击图片可跳转到对应作品详情页
>
> - 每日自动更新，无需人工干预
>
> - 内置多图床支持、按需加载图片，极低资源消耗
>
> - 提供 API 服务，含有排行榜更新日期、缩略图 url 及详情页 url 等
>

## 挂件使用

把下面这行代码放到网页合适位置即可，样式可自行调整，预览效果可以查看 [我的博客园](https://www.cnblogs.com/himeka) 页面右侧

```html
<iframe src="https://cloud.mokeyjay.com/pixiv" style="width:240px; height:380px; border: 0"></iframe>
```

### 在博客园中使用

首先开通博客园 JS 权限，然后在博客后台设置里的 `页脚 HTML 代码` 栏里添加如下代码

```html
<script>
  $(function() {
    setTimeout(function() {
      const f = document.createElement('iframe');
      f.src = 'https://cloud.mokeyjay.com/pixiv/';
      f.setAttribute('frameborder', 0);
      f.setAttribute('style', 'width:240px;height:380px;display:block;margin:0 auto;');
      $('#blog-calendar').html('<h3 style="text-align: center;">Pixiv 日榜 Top 50</h3>').append(f);
    });
  });
</script>
```

我是直接把博客日历替换成了这个小挂件，效果如下图，可自己按需更改插入的位置

![图 1](https://dd-static.jd.com/ddimg/jfs/t1/196952/1/25639/132508/62dabe09E9f66b34d/0096b55d7005e3dc.png)

### API 使用

如果想自定义或者单纯调用接口，作者提供了以下 API：

- [排行榜数据（已上传至图床）](https://cloud.mokeyjay.com/pixiv/?r=api/pixiv-json)（推荐）
- [排行榜数据（pixiv url）](https://cloud.mokeyjay.com/pixiv/?r=api/source-json)

> 其中 `data` 为排行榜数据，`date` 为排行榜日期（可能是昨天或者前天，因为官方更新时间不一定），这两个接口都会自动根据请求头的 `Origin` 或者 `Referer` 返回对应跨域头，可供前端直接调用。

API 返回结构

![图 2](https://pic.rmb.bdstatic.com/bjh/events/d0381a3c7c2610f34894f9fa1453e5d7.png)

## 替代方案

因为 cloud.mokeyjay.com 部署在韩国，访问起来可能有点慢，有大佬自己在国内搭建了一个，对速度不满意的可以使用如下代码

```html
<iframe src="https://fun.hujingnb.com/pixiv/i?w=300" frameborder="0" style="width:300px; height:400px;" ></iframe>
```

另外，这个链接可以使用下面这些参数

例如：`https://fun.hujingnb.com/pixiv/i?w=300&interval=1500&bg=red&limit=10&rand=1`

- `interval`: 页面轮播时长（毫秒）. 默认 5000
- `bg`: 背景色，默认 `transparent`
  - 注意，若你的色值为 `#000`, 请传递参数 `%23000`. 在 get uri 中`#`符号需要进行转义
  - 当然，其他在 `HTML` 中用于标识颜色的都可以哦。比如 `black`
- `w`: 图片宽度。默认 `100`
  - 可选值：`50, 100, 200, 300`
  - 图片压缩后，可提高访问速度
  - 因只进行缩略图展示，故下载的图片宽度最大为 240, 未下载原图（应该也用不到吧）
  - 请按需使用，不要超过窗口的宽度，否则徒增图片大小（也会增加流量消耗）
- `limit`: 轮播的排名区间。默认 `1,50`
  - `1,50` 为显示排名 1-50 的图片
  - 最大排名 `100`, 暂时看 `100` 应该够用了，故只拉取了日榜的 top 100
- `type`: 榜单类型，默认 `daily`
  - 日榜 (`daily`), 月榜 (`monthly`)
  - 周榜介于日榜和月榜之间，感觉没人用吧，就没有爬
- `rand`: 是否随机起始图片，默认 `0`
  - 若为 1, 则每次进入页面，都会随机一个起始位置
- `c_type`: 图片点击行为。默认为 `img`
  - 可能值如下：
    - `img`: 在新页面打开图片
    - `none`: 点击无反应
    - `p_detail`: 打开 pixiv 站点的图片页面
    - `p_user`: 打开 pixiv 站点的作者页面
- cursor: 鼠标在图片上的样式，可配合 `c_type` 使用。默认为 `pointer`
  - 此样式请参数 css 属性 `cursor`

## P.S.

如果想查看排行榜详情的话，可以前往我做的页面 [Pixiv Ranking](https://www.nanoka.top/illust/pixiv/index.html) 😸

![图 3](https://upload-bbs.mihoyo.com/upload/2022/07/23/260511332/0a847e54da91da3c8a1ba2c709625192_9173308788344150353.png)

## Reference

[Pixiv-daily-ranking-widget](https://github.com/mokeyjay/Pixiv-daily-ranking-widget)

[pixiv 小控件](https://hujingnb.com/archives/666)

---
*fin.*
