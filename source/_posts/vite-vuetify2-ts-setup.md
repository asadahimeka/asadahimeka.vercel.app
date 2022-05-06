---
title: Vite + Vue2 + Vuetify2 + <script setup> + TypeScript 搭配开发项目
abbrlink: fb7525a
date: 2022-05-04 19:57:35
updated: 2022-05-04 19:57:35
tags: [Vite, Vue, Vuetify]
categories:
---

> 本文记录如何在 Vue2 环境下尽量使用 Vue3 的 Composition-api 并配合 Vuetify2 使用

<!-- more -->

## 前言

之前在改造一个用 Vuetify2 的 [项目](https://github.com/asadahimeka/userscripts/tree/master/yandere-masonry)，由于 Vuetify3 还处于 beta 阶段并且与 Vuetify2 相比缺失一些特性，但又想用 Vue3 的 `<script setup>` 语法，于是寻找了下相关方案，下面简单记录一下。

## 开始之前

建议使用 VSCode 开发并安装以下插件且禁用 Vetur：

[Vue Language Features (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

[TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin)

## 初始化

使用 `npm init` 初始化项目

## 添加所需依赖

- vue@2.6.14: 指定 2 版本，不指定的话默认安装 3 版本
- vue-template-compiler: 将 Vue 2.0 模板预编译为渲染函数
- vite-plugin-vue2: 让 Vite 支持 Vue2
- @vue/composition-api: 在 Vue2 项目中使用组合 API
- unplugin-vue2-script-setup: 在 Vue2 项目中使用 `<script setup>` 语法糖
- unplugin-vue-components: 按需自动引入组件
- @vue/runtime-dom: 配合 Volar

完整依赖如下：

```json
  "dependencies": {
    "@mdi/font": "5.9.55",
    "@vue/composition-api": "^1.6.0",
    "roboto-fontface": "*",
    "vue": "^2.6.14",
    "vuetify": "^2.6.4",
    "webfontloader": "^1.0.0"
  },
  "devDependencies": {
    "@types/node": "^17.0.29",
    "@types/webfontloader": "^1.6.34",
    "@vue/runtime-dom": "^3.2.33",
    "sass": "1.32.12",
    "typescript": "^4.6.3",
    "unplugin-vue-components": "^0.19.3",
    "unplugin-vue2-script-setup": "^0.10.2",
    "vite": "^2.9.5",
    "vite-plugin-vue2": "^2.0.0",
    "vue-template-compiler": "^2.6.14",
    "vue-tsc": "^0.34.10"
  }
```

## 文件目录结构

```
📦project
 ┣ 📂.vscode
 ┣ 📂dist
 ┣ 📂node_modules
 ┣ 📂src
 ┃ ┣ 📂common
 ┃ ┣ 📂components
 ┃ ┣ 📂plugins
 ┃ ┃ ┣ 📜vuetify.ts
 ┃ ┃ ┗ 📜webfontloader.ts
 ┃ ┣ 📂styles
 ┃ ┣ 📜App.vue
 ┃ ┣ 📜env.d.ts
 ┃ ┗ 📜main.ts
 ┣ 📜.gitattributes
 ┣ 📜.gitignore
 ┣ 📜components.d.ts
 ┣ 📜index.html
 ┣ 📜package.json
 ┣ 📜readme.md
 ┣ 📜tsconfig.json
 ┣ 📜tsconfig.node.json
 ┣ 📜vite.config.ts
 ┗ 📜yarn.lock
```
### index.html

来自 [Vite 官网](https://cn.vitejs.dev/guide/#index-html-and-project-root)：

> 你可能已经注意到，在一个 Vite 项目中，`index.html` 在项目最外层而不是在 `public` 文件夹内。这是有意而为之的：在开发期间 `Vite` 是一个服务器，而 `index.html` 是该 Vite 项目的入口文件。Vite 将 `index.html` 视为源码和模块图的一部分。Vite 解析 `<script type="module" src="...">` ，这个标签指向你的 JavaScript 源码。甚至内联引入 JavaScript 的 `<script type="module">` 和引用 CSS 的 `<link href>` 也能利用 Vite 特有的功能被解析。另外，`index.html` 中的 URL 将被自动转换，因此不再需要 `%PUBLIC_URL%` 占位符了。

```html
<!DOCTYPE html>
<html lang="zh">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Vite App</title>
</head>

<body>
  <div id="app"></div>
  <script type="module" src="/src/main.ts"></script>
</body>

</html>
```

### components.d.ts

由 `unplugin-vue-components` 自动生成，为自动引入组件提供支持，在 `vite.config.ts` 中通过以下设置打开

```js
Components({
  dts: true, // enabled by default if `typescript` is installed
})
```

记得把 `components.d.ts` 添加到 `tsconfig.json` 的 `includes`

### tsconfig.json

> `tsconfig.json` 文件中指定了用来编译这个项目的根文件和编译选项。

配置全局类型：

```json
  "compilerOptions": {
    "types": [
      "vite/client",
      "node",
      "vue",
      "vuetify",
      "unplugin-vue2-script-setup/types"
    ],
  },
```

Volar 需要以下配置来支持 Vue2

```json
  "vueCompilerOptions": {
    "experimentalCompatMode": 2,
    "experimentalTemplateCompilerOptions": {
      "compatConfig": {
        "MODE": 2 // optional
      }
    }
  },
```

完整配置见 [yandere-masonry/tsconfig.json](https://github.com/asadahimeka/userscripts/blob/master/yandere-masonry/tsconfig.json)

### tsconfig.node.json

配置 `vite.config.ts` 的 TypeScript 选项

```json
{
  "compilerOptions": {
    "composite": true,
    "module": "esnext",
    "moduleResolution": "node",
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "types": ["node"]
  },
  "include": ["vite.config.ts"]
}
```

### vite.config.ts

Vite 配置文件，之前安装的插件需要这个文件里配置一下来支持 Vue2、`<script setup>` 等等

```typescript
import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import { createVuePlugin as Vue2 } from 'vite-plugin-vue2'
import { VuetifyResolver } from 'unplugin-vue-components/resolvers'
import Components from 'unplugin-vue-components/vite'
import ScriptSetup from 'unplugin-vue2-script-setup/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // https://github.com/underfin/vite-plugin-vue2
    Vue2({ target: 'esnext' }),
    // https://github.com/antfu/unplugin-vue2-script-setup
    ScriptSetup(),
    // https://github.com/antfu/unplugin-vue-components
    Components({
      // generate `components.d.ts` global declarations
      dts: true,
      // auto import for directives
      directives: true,
      // resolvers for custom components
      resolvers: [
        // Vuetify
        VuetifyResolver(),
      ],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('src', import.meta.url))
    },
  },
})
```

### src/env.d.ts

提供类型支持：

```typescript
/// <reference types="vite/client" />

declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'vuetify/lib/framework' {
  import 'vuetify/types'
  import Vuetify from 'vuetify'
  export default Vuetify
}
```

### src/main.ts

入口文件，在此安装 `VueCompositionAPI` 与 `Vuetify`：

```typescript
import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api'
import installVuetify from './plugins/vuetify'
import App from './App.vue'

Vue.use(VueCompositionAPI)

const vuetify = installVuetify()
const app = new Vue({
  vuetify,
  render: h => h(App),
})
app.$mount('#app')
```

### src/App.vue

直接使用 `<script setup>` 语法：

```html
<template>
  <v-app :theme="store.theme">
    <v-app-bar />
    <v-navigation-drawer />
    <v-main app>
      <v-container />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup

import { onMounted } from '@vue/composition-api'
import { useVuetify } from './plugins/vuetify'

const vuetify = useVuetify()

onMounted(() => {
  vuetify.theme.dark = true
})
</script>
```

### src/plugins/vuetify.ts

安装 `Vuetify`，并通过 `useVuetify` 暴露 `$vuetify` 实例：

```typescript
// Styles
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/dist/vuetify.min.css'

import Vue from 'vue'
import Vuetify from 'vuetify'
import { getCurrentInstance } from '@vue/composition-api'
import { loadFonts } from './webfontloader'

loadFonts()

function installVuetify() {
  Vue.use(Vuetify)
  return new Vuetify({})
}

export default installVuetify

/** Get vuetify instance (For Composition api) */
export function useVuetify() {
  /** Get Instance */
  const instance = getCurrentInstance()
  if (!instance) {
    throw new Error('Should be used in setup().')
  }
  return instance.proxy.$vuetify
}
```

### src/plugins/webfontloader.ts

加载字体：

```typescript
/**
 * plugins/webfontloader.js
 *
 * webfontloader documentation: https://github.com/typekit/webfontloader
 */

export async function loadFonts() {
  const webFontLoader = await import('webfontloader')

  webFontLoader.load({
    google: {
      families: ['Roboto:100,300,400,500,700,900&display=swap'],
    },
  })
}
```

## Conclusion

启动项目

```bash
yarn dev
```

![图 1](https://pic.rmb.bdstatic.com/bjh/events/e5482b5a51ea9f2f0968d207ba92d137.png)

项目代码见 [yandere-masonry](https://github.com/asadahimeka/userscripts/tree/master/yandere-masonry)

## Reference

https://juejin.cn/post/7012240119465771038

https://github.com/logue/vite-vue2-vuetify-ts-starter

https://github.com/antfu/unplugin-vue2-script-setup

---
*fin.*
