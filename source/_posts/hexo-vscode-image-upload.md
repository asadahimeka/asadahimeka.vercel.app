---
title: Hexo + VSCode 插入 Markdown 图片解决办法
description: 本文记录使用 VSCode 编写 Markdown 时配合 Markdown Image 插件插入图片的方式
tags:
  - Hexo
  - VS Code
  - Markdown
abbrlink: e5b6f57d
date: 2022-06-23 19:44:26
updated: 2022-06-23 19:44:26
categories:
---

最近打开 typora 时发现弹窗强更，不让用 beta 版了

![图 1](https://pic.rmb.bdstatic.com/bjh/events/54cec84bc1cc95d36cf0c7bdbc94d2d1.png)

想到自己并不是非常需要 WYSIWYG，而且也不是经常使用 typora，于是直接退回到 VSCode 了，而且在 VSCode 里可以直接打开终端操作，写完了推送到 GitHub 都很方便。
然后就是老生常谈的图片问题，之前记录过 typora 上的 [解决办法](https://kanata.ml/posts/12a70b22) ，VSCode 上利用扩展也可以解决，下面简单记录下。

## 推荐插件

[Markdown All in One](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one) : 快捷键、生成目录、自动预览等等

[Markdown Image](https://marketplace.visualstudio.com/items?itemName=hancel.markdown-image) : 方便地在 Markdown 中插入图片，支持本地、图床或对象存储

[Pangu-Markdown](https://marketplace.visualstudio.com/items?itemName=xlthu.Pangu-Markdown) : 在中英文之间加空格

[Office Viewer(Markdown Editor)](https://marketplace.visualstudio.com/items?itemName=cweijan.vscode-office) : 如果有 WYSIWYG 需求的话推荐

## 图片插件使用方式

首先安装 [Markdown Image](https://marketplace.visualstudio.com/items?itemName=hancel.markdown-image) 插件

可复制图片文件或截图粘贴，快捷键 <kbd>Shift</kbd> + <kbd>Alt</kbd> + <kbd>V</kbd>，或右键菜单粘贴图片

![图 2](https://pic.rmb.bdstatic.com/bjh/events/8fbeb71eea4993a750a8494d3cf93b85.png)

## 插件基本配置

- `markdown-image.base.uploadMethod`: 上传图片的方式，根据不同的方式，须设置不同的项目
- `markdown-image.base.fileNameFormat`: 图片文件命名格式化字符串。支持多种变量做格式化，可同时配置文件夹格式，具体见设置

`uploadMethod` 可选值为：

![图 1](https://pic.rmb.bdstatic.com/bjh/events/3cabeddf1adb220a7cad65b79e6fdb5e.png)

## 复制到本地

`uploadMethod` 设置为 `Local`

`markdown-image.local.path`: 图片本地存放路径，支持相对路径，相对于所粘贴 Markdown 文件，`/` 表示打开的文件夹根目录。若路径不存在，将会自动创建

## 上传到图床或 OSS

按需选择，具体见 [文档](https://github.com/imlinhanchao/vsc-markdown-image/blob/HEAD/README.zh-cn.md#%E6%89%A9%E5%B1%95%E8%AE%BE%E7%BD%AE%E9%A1%B9%E7%9B%AE)

![图 3](https://dd-static.jd.com/ddimg/jfs/t1/121254/30/24285/128558/62b466bcE1b396f7e/d016bfc52e5d8518.png)

## 自定义上传

当你用的图床不在默认支持列表时可以编写自定义代码来上传图片，配置 `markdown-image.DIY.path` 为你写的代码的路径

你的代码必须 exports 一个像 `async function (filePath:string, savePath:string, markdownPath:string):string` 的函数

如：

```js
const path = require('path');
module.exports = async function(filePath, savePath, markdownPath) {
  // Return a picture access link
  return path.relative(path.dirname(markdownPath), filePath);
}
```

<details>
<summary>我的自定义代码：</summary>

```js
const { createReadStream } = require('fs')
const fetch = require('node-fetch') // ^2.6.7
const FormData = require('form-data')

async function upload({ filePath, preUpload, ...options }) {
  const form = new FormData()
  if (preUpload) await preUpload(filePath, form, options)
  const { api, fileField = 'file', formData = {}, headers = {}, isSuccess, returnUrl } = options
  form.append(fileField, createReadStream(filePath))
  for (const [formKey, formValue] of Object.entries(formData)) {
    form.append(formKey, formValue)
  }
  const response = await fetch(api, {
    body: form,
    method: 'POST',
    headers: {
      ...headers,
      ...form.getHeaders()
    }
  })
  if (!response.ok) throw new Error(response.statusText)
  const json = await response.json()
  if (isSuccess?.(json)) {
    return returnUrl(json)
  } else {
    throw new Error(JSON.stringify(json, null, 2))
  }
}

// 以 bilibili 为例
module.exports = async function (filePath) {
  const result = await upload({
    api: 'https://api.bilibili.com/x/dynamic/feed/draw/upload_bfs',
    filePath,
    fileField: 'file_up',
    formData: {
      biz: 'new_dyn',
      category: 'daily',
      csrf: '你的 CSRF Token'
    },
    headers: {
      Cookie: '你的 Cookie',
      Origin: 'https://t.bilibili.com',
      Referer: 'https://t.bilibili.com/'
    },
    isSuccess: d => d.code == 0,
    returnUrl: d => d.data.image_url.replace('http:', 'https:')
  })
  return result
}
```

</details>

<details>
<summary>使用 upimg 上传：</summary>

```js
const upimg = require('upimg')
module.exports = async function (filePath) {
  // 以 bilibili 为例，文档见 https://www.npmjs.com/package/upimg
  const { url } = await upimg.bilibili.set('cookie', '你的 Cookie').upload(filePath)
  return url
}
```

</details>

## Reference

[Markdown Image Readme](https://github.com/imlinhanchao/vsc-markdown-image/blob/HEAD/README.zh-cn.md)

---
*fin.*
