---
title: Jeecg-vue-tmpl 相关说明
tags:
  - JavaScript
  - Vue
  - Jeecg
categories: Jeecg
abbrlink: afb3a8de
date: 2021-06-08 15:31:45
updated: 2021-06-08 15:31:45
---

<div class="warning">

> Deprecated. 请使用官方最新版本。

</div>

Jeecg-vue-tmpl 修改自原版 JeecgBoot 前端项目，根据自身需求进行若干修改，如果有其它需求，比如使用 online 开发功能，建议直接拉取官方代码自行修改，此自用项目模板维护至 2.4.2 版本不再更新。
<!-- more -->

## 关于版本

暂未发现前端版本与 jeecg 后端版本不同时有何问题，如有问题，请使用官方项目。

## 参考文档
- JeecgBoot 官方文档见 [http://doc.jeecg.com](http://doc.jeecg.com/2043868)

- JeecgBoot 官方更新日志见 [http://www.jeecg.com/doc/log](http://www.jeecg.com/doc/log)

- 自用模板项目 Readme 见 [Jeecg-vue-tmpl Readme](/z/2021/06/08/jeecg-vue-tmpl-readme/)
- 更多参考文档见 [Jeecg-vue-tmpl Readme](/z/2021/06/08/jeecg-vue-tmpl-readme/) 参考链接部分

## 修改内容

1. 添加部分 npm 脚本

   - 如 `yarn deploy` ：通过 `rsync` 命令自动部署到服务器，
   - 如 `yarn scp` ：无 Linux 环境时，通过 `scp` 命令自动部署到服务器，

   - 如 `yarn build:repo` ：生成打包分析文件帮助分析文件大小，

   - 具体用法见项目 Readme： [Jeecg-vue-tmpl Readme](jeecg-vue-tmpl-readme)。

2. 添加 git hooks

   ```json
     "gitHooks": {
       "pre-commit": "lint-staged"
     },
     "lint-staged": {
       "*.{js,vue}": [
         "vue-cli-service lint",
         "git add"
       ]
     }
   ```

3. 移除 online 开发部分，原因是占用体积较大且暂时未用到，如需使用，拉取官方前端代码自行使用

4. 移除自带地区选择组件

5. 添加部分依赖

   - `moment-range` : Fancy date ranges for Moment.js，日期范围计算

   - `numeral`： Format and manipulate numbers，数字格式化、精确计算

   - `v-distpicker` : 省市区下拉选择框

   - `@vue/eslint-config-standard`： eslint 之 standard 规则

   - `compression-webpack-plugin` ：打包时进行 gzip 压缩

   - `lint-staged` ：往 git 提交代码时进行 eslint 校验

   - `serve`： 本地静态服务器

   - `vue-svg-loader`： Use SVG files as Vue Components，自定义图标配合 `<a-icon />` 使用

6. 添加 `jsconfig.json` 文件，使 vscode 提供智能补全等功能

7. 添加 vscode 工作区设置文件，扩展推荐文件，建议使用 vscode 并安装相关插件进行开发

8. 对整体代码按 eslint 规则格式进行 fix

9. 添加环境变量文件，区分开发与生产环境使用

   ```env
   NODE_ENV = 'development'
   # API 接口地址
   VUE_APP_BASE_API = ''
   # 系统名称
   VUE_APP_LOGO_TITLE = 'Admin'
   # [暂不可用] 是否需要错误上报（钉钉机器人提醒）
   VUE_APP_NEED_REPO = 'no'
   ```

10. 配置 eslint 规则，主要使用 eslint 官方推荐规则、vue 官方推荐规则与 standard 规则，并忽略部分难以修改的 jeecg 代码

11. 修改 `vue.config.js` 配置文件

    - 官方参考文档 https://cli.vuejs.org/zh/config/

    - moment 语言包只加载中文

      ```js
       configureWebpack: config => {
        // moment 语言包只加载 zh-cn; load `moment/locale/zh-cn.js`
        config.plugins.push(new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn/))
       },
      ```

    - 配置 svg loader

    - 打包文件优化，合并小文件

    - 配置 gzip 压缩，提高加载速度

    - 修改 ant-design-vue 主题色

    - 配置开发环境代理

12. 添加 tinymce powepaste 插件，修改皮肤文件结构

13. 将一些在线图标改为本地图标，置于 `public/default` 文件夹下

14. 将 `polyfill.js` 替换为压缩后的 `polyfill.min.js`

15. 打包完后可在 `index.html` 中直接修改接口前缀地址，方便部署时修改

16. 添加自动生成组件文件的 nodejs 脚本

17. 添加路由切换时的 transition 效果

18. 将 `~@/assets/less/common.less` 通用样式文件置于 `App.vue` 中加载，不再在组件中重复加载

19. 修改项目默认配置项 `@/defaultSettings.js`

20. 在 `@/main.js` 中移除不用的 import

21. 在 `@/permission.js` 中添加不勾选自动登录时的处理办法

22. 在 `@/api/manage.js` 中添加相关 JSDoc 声明，方便类型联想；并添加导出后端生成文件方法：`getBlob`

23. 修改一些样式置于`@/assets/less/cover.less`

24. 按自身需求修改 `@/components/chart` 下的图表组件

25. 修改 tinymce 富文本编辑器组件 `JEditor` 为如下效果
    ![tinymce](https://upload-bbs.mihoyo.com/upload/2022/05/18/260511332/e15872a1e2f258a86e9e3a5f029eba8e_8169569522840383566.png)

26. 添加时间选择组件 `JTime`

27. 添加上传按钮组件 `JUploadBtn` 、拖拽上传图片组件 `JUploadImageD`

28. 添加自动拼接 jeecg 文件前缀 url 的组件 `MyImg`

29. 添加搜索筛选组件 `SearchFilter` 与模板中的 switch case 组件 `<v-switch />`

30. 修改 Logo 组件、搜索菜单组件，添加时间显示组件、待办事项组件

31. 添加百分比输入组件 `PercentNum`

32. `@/icons `为自定义图标存放处

33. 修改通用列表混入文件 `@/mixins/JeecgListMixin.js`

34. hack router push callback

35. 添加工具方法 点击复制 `@/src/utils/clipboard.js`

36. 于 `@/src/utils/dicts.js` 添加数据字典翻译函数 `transDict` 并且将其添加到过滤器

37. 于 `@/src/utils/hasPermission.js `中添加当 `v-has` 指令不便使用时的替代函数： `checkPermission`

38. 添加自用工具方法 `@/src/utils/index.js`

39. 封装 axios : `@/src/utils/request.js`

40. 封装 localStorage、sessionStorage：`@/src/utils/storage.js`

41. `@/src/utils/validate.js` 中添加身份证号校验

42. layouts 移至 views 文件夹中

## 组件文档

Jeecg 组件文档见官网文档或 `docs`文件夹下或各组件位置处的 md 文件

自用文档见 [Jeecg-vue-tmpl 自用文档](/z/2021/06/08/jeecg-vue-tmpl-comp-doc/)

---
*fin.*
