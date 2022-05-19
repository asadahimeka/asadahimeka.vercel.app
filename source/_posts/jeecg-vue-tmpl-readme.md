---
title: Jeecg-vue-tmpl Readme
tags:
  - JavaScript
  - Vue
  - Jeecg
categories: Jeecg
abbrlink: 59df13e1
date: 2021-06-08 10:23:12
updated: 2021-06-08 10:23:12
---

<div class="warning">

> Deprecated. 请使用官方最新版本。

</div>

JeecgBoot 前端初始项目

<!-- more -->

## 项目下载和运行

- 拉取项目代码
```bash
git clone https://gitlab.com/wuniutech/jeecg-vue-temp.git
cd  jeecg-vue-temp
git checkout v2.4.0
```

- 安装依赖
```sh
yarn run instal
```

- 开发模式运行
```
yarn serve
```
> 附加选项：

  ```sh
  --open    在服务器启动时打开浏览器
  --copy    在服务器启动时将 URL 复制到剪切版
  --mode    指定环境模式 （默认值：development)
  --host    指定 host （默认值：0.0.0.0)
  --port    指定 port （默认值：8080)
  --https   使用 https （默认值：false)
  ```

- 编译项目
```
yarn build
```
> 附加选项：

  ```sh
  --mode        指定环境模式 （默认值：production)
  --dest        指定输出目录 （默认值：dist)
  --modern      面向现代浏览器带自动回退地构建应用
  --no-clean    在构建项目之前不清除目标目录
  --report      生成 report.html 以帮助分析包内容
  --report-json 生成 report.json 以帮助分析包内容
  --watch       监听文件变化
  ```

- 校验并修复文件中的错误
```
yarn lint
```
> 附加选项：

  ```sh
  --no-fix      只校验而不修复错误
  ```

- 编译并部署项目到**测试**服务器 (_需 WSL 环境_)
```
yarn deploy
```

- 无 WSL 环境时使用 scp 部署
```
yarn build && yarn scp
```

- 本地预览打包完的项目
```
yarn preview
```

---

## 参考链接

- [Jeecg-Boot 技术文档](http://doc.jeecg.com/1273752)

- [Ant Design Vue 文档](https://vuecomponent.github.io/ant-design-vue/docs/vue/introduce-cn)

- [路由/菜单说明](https://github.com/zhangdaiscott/jeecg-boot/tree/master/ant-design-jeecg-vue/src/router/README.md)

- [默认配置项](https://github.com/zhangdaiscott/jeecg-boot/tree/master/ant-design-jeecg-vue/src/defaultSettings.js) - Antdv Pro

- [eslint 规则](https://eslint.cn/docs/rules/)

- [eslint-plugin-vue 规则](https://eslint.vuejs.org/rules/)

- [Vue 文档](https://cn.vuejs.org/v2/guide)

- [Vue-CLI 文档](https://cli.vuejs.org/zh/guide)

- [Vue Docs 中文文档翻译合集](https://github.com/vuejs/vue-docs-zh-cn)

- [@antv/g2](https://antv.alipay.com/zh-cn/index.html) - AntV 数据可视化图表

- [Viser-Vue](https://viserjs.github.io/docs.html#/viser/guide/installation)  - antv/g2 封装实现

- [Viser-Vue Demo](https://viserjs.github.io/demo.html#/viser/bar/basic-bar) - Viser 示例
