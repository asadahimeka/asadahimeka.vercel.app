---
title: Jeecg-vue-tmpl 自用文档
tags:
  - JavaScript
  - Vue
  - Jeecg
categories: Jeecg
abbrlink: 9e50dc76
date: 2021-06-08 19:22:56
updated: 2021-06-08 19:22:56
---

<div class="warning">

> Deprecated. 请使用官方最新版本。

</div>

JeecgBoot 前端初始项目 改 自用文档

<!-- more -->

## npm 脚本

- `yarn serve`:  启动本地开发服务，并将地址复制到剪贴板
- `yarn deploy`:  编译打包并部署（外网部署）
- `yarn build`:  编译打包为生产文件
- `yarn rsync`:  通过 rsync 部署文件到服务器（需要 WSL/Linux 环境支持）
- `yarn scp`:  通过 scp 部署文件到服务器
- `yarn build:repo`:  打包时生成报告文件帮助分析文件大小情况
- `yarn lint`:  运行 eslint 校验并修复可以自动修复的错误
- `yarn lint:nofix`:  只运行 eslint 校验不修复错误
- `yarn preview`:  本地预览打包完的 dist 文件夹
- `yarn instal`:  安装依赖（使用淘宝源）

## 依赖

### moment-range

```js
import moment from 'moment'
import { extendMoment } from 'moment-range'
const momentRange = extendMoment(moment) // 扩展 moment
const rangeMap = {
  'day': { unit: 'days', format: 'YYYY-MM-DD' },
  'week': { unit: 'weeks', format: 'YYYY-w' },
  'month': { unit: 'months', format: 'YYYY-M' }
}
// 图表开发过程中，API 返回结果中缺失一些没有纵轴数据的横坐标，如下进行补零操作，不然会影响图表趋势
// momentRange.range([起始日期，结束日期]).by（日期单位） 进行这一区间的日期迭代
// range 的返回结果可使用 for of 进行迭代，也可转为数组进行迭代
// 具体文档见 https://github.com/rotaready/moment-range
function setBarData(d = [], date = [], type = 'day') {
  let res = []
  let dk = d.reduce((acc, cur) => ((acc[cur.x] = cur), acc), {})
  let { unit, format } = rangeMap[type]
  Array.from(momentRange.range(date).by(unit)).forEach(e => {
    let x = e.format(format)
    let item = dk[x] || { x, y: 0 }
    res.push(item)
  })
  return res
}
```

### numeral

```js
import numeral from 'numeral'
// 使用 numeral 进行精确计算
0.1 + 0.2 === 0.3 // false
numeral(0.1).add(0.2).value() === 0.3 // true
```

### v-distpicker

```html
<template>
  <v-distpicker :province="model.province" :city="model.cityArea" :area="model.counties" @selected="onAreaSelected" />
</template>
<script>
export default {
  data() {
    return {
      model: {
        province: ''
        cityArea: ''
        counties: ''
      }
    }
  },
  methods: {
    onAreaSelected(data) {
      console.log(data.province.value) // 省
      console.log(data.city.value) // 市
      console.log(data.area.value) // 区
    }
  }
}
</script>
```

### vue-svg-loader

svg 图标文件均置于 `@/icons` 下

```html
<template>
  <div>
    <a-icon :component="MyIcon" />
  </div>
</template>
<script>
import MyIcon from '@/icons/MyIcon.svg'
export default {
  data() {
    return {
      MyIcon
    }
  }
}
</script>
```

## 根据模板自动生成页面文件

在 `scripts/comp.list` 填写页面名称，换行分隔，运行  `node scripts/generate` 会根据以下模板生成文件到 `@/views/ab` 文件夹

```html
<template>
  <a-card :bordered="false">
    <search-filter :form="queryParam" :fields="searchCols" @search="searchQuery" @reset="searchReset" />
    <div class="table-operator">
      <a-button type="primary" icon="plus" @click=";">新增</a-button>
    </div>
    <a-table v-bind="aTableProps" @change="handleTableChange" />
  </a-card>
</template>
<script>
import { JeecgListMixin, dealCols } from '@/mixins/JeecgListMixin'
export default {
  name: 'TempNameListPlaceholder',
  mixins: [JeecgListMixin],
  data() {
    return {
      columns: dealCols([
        // title, dateIndex, __filter, customRender, { others },
        ['#'],
        ['字段 1', 'name', true],
        ['字段 2', 'keyWord', 'num'],
        ['字段 3', 'sex', ['select', 'sex'], null],
        ['字段 4', 'createTime', true, null, { _fType: 'daterange' }]
      ]),
      url: {
        list: '/test/jeecgDemo/list',
        delete: '/test/jeecgDemo/delete',
        deleteBatch: '/test/jeecgDemo/deleteBatch'
      }
    }
  }
}
</script>

```

## JeecgListMixin

具体可查看 `@/mixins/JeecgListMixin.js` 源码了解可用变量与函数或自己改写

### 混入变量、方法

- `this.selectedRowKeys` :  table 选中行的 keys/ids

- `this.selectionRows` :  table 选中行数据

- `this.extraParams` :  额外的查询条件

- `this.doMixinCreated`:  true 的话自动执行 created 钩子中的 loadData

- `this.loadData(args)`: 列表数据加载方法，args 传 1 的话加载第一页内容

- `this.selAll()`:  选择当页全部行

- `this.clearSel()`:  取消全选

- `this.getSelRows()`:  获取所选行 `{ rows, keys }`

- `this.setSelRows(rows)`:  设置所选行

- `this.checkOneSel(callback)`: 检查是否选择了一条记录

###  SearchFilter / columns 配置格式

```js
[ 字段名称，字段名字，是否为筛选项，自定义渲染方法，{ ... 其他配置 } ]
```

- 具体参数可查阅 `@/components/SearchFilter/index.vue` 源码查看
- 是否为筛选项 可填 `boolean`/`string` /`array`，
​如 `true`, `'date'`,`['select', 'sex']`

- 填 `true` 默认为模糊查询文本类型，即最终处理为如 \*qwe\* 的格式；

- 字符串可选类型有 select / date / select2 / daterange / num / numrange / input / custom

   - 选 select 时需传入数据字典 code， 如`['select', 'sex']`

   - 选 select2 时需传入下拉选择项列表，如 `['字段 1', 'name', 'select2', null, { _fOptions: this.someOptions }] `，
下拉列表数据需遵循如 `[{ label: 'label', value: 'value' }]` 格式

   - 对于其他类型可在组件源码中自行加入，或使用 custom 类型
     如： `['字段 1', 'name', 'custom', null, { _fSlotName: 'slotName' }]`
     模板中 :
     ```html
     <search-filter ...>
       <template #slotName>自定义内容</template>
     </search-filter>
     ```

- 自定义渲染方法 接受参数 `(text, record) => '处理结果'`

   `text` 为当前数据值，`record` 为当前行数据

## 自用组件

### PercentNum

输入时输入百分数，自动将 value 转为对应小数值

```html
<percent-num v-model="value" :max="100" />
```

### v-switch: 模板中的 switch case

使用方法

```html
<v-switch :value="value">
  <template #default>默认后备内容</template>
  <template #qwe>value 为 qwe 时的内容</template>
  <template #asd>value 为 asd 时的内容</template>
</v-switch>
```

源码：

```html
<!-- File: `v-switch.vue` -->
<script>
export default {
  name: 'VSwitch',
  functional: true,
  props: {
    value: {
      type: [String, Number],
      default: null
    }
  },
  render(h, { data, props, scopedSlots }) {
    const { value } = props
    const slotFn = value in scopedSlots ? scopedSlots[value] : scopedSlots.default

    return slotFn ? slotFn(data.attrs) : null
  }
}
</script>
```

## 自用函数

### @/api/manage.js

```js
// Get 请求
export function getAction(url, parameter): Promise<Res>

// Post 请求
export function postAction(url, parameter, options): Promise<Res>

// Put 请求
export function putAction(url, parameter = {}): Promise<Res>

// Delete 请求
export function deleteAction(url, parameter, data): Promise<Res>

// 下载文件 用于 excel 导出
export function downFile(url, parameter): Promise<Res>

// 下载文件
export function downloadFile(url, fileName, parameter): Promise<Res>

// 文件上传 用于富文本上传图片
export function uploadAction(url, parameter): Promise<Res>

// 获取文件服务访问路径
export function getFileAccessHttpUrl(avatar, subStr = 'http'): string

// 导出（后端生成）文件用
export function getBlob(url, params): Promise<Blob>
```

### clipboard 复制文本到剪贴板

```typescript
// text：要复制的文本，event：点击或其他事件
export default function handleClipboard(text: string, event: Event): void
```

```js
import clip from '@/utils/clipboard'
export default {
  data() {
    return {
      columns: dealCols([
        ['下载地址', 'downloadUrl', false, t => (<span>
          <AButton title='复制' icon='copy' onClick={e => clip(t, e)} />
        </span>)],
      ])
    }
  }
}
```

### transDict 数据字典翻译

```typescript
// value: 要翻译的值，code: 数据字典 code
export function transDict(value: string, code: string): string
```

```js
import { transDict } from '@/utils/dicts'
export default {
  data() {
    return {
      columns: dealCols([
        ['任务类型', 'mainType', false, v => transDict(v, 'main_task_type')]
      ])
    }
  }
}
```

### checkPermission 检查数据权限

```typescript
// value：数据权限标识
export function checkPermission(value: string): boolean
```

```html
<template>
  <a-card>
    <span v-if="ckp('form:can:edit')">需要进行权限处理的地方</span>
  </a-card>
</template>
<script>
import { checkPermission } from '@/utils/hasPermission'
export default {
  methods: {
    ckp: checkPermission
  }
}
</script>
```

### storage 存储相关封装

```js
import { $ls, storage, storageSess } from '@/utils/storage'
// vue-ls
$ls.get('USER_INFO')
$ls.set('USER_INFO', {a: 1})
$ls.remove('USER_INFO')
$ls.clear()
// localStorage
storage.get('USER_INFO')
storage.set('USER_INFO', {a: 1})
storage.remove('USER_INFO')
storage.clearAll()
// sessionStorage
storageSess.get('USER_INFO')
storageSess.set('USER_INFO', {a: 1})
storageSess.remove('USER_INFO')
storageSess.clearAll()
```

### @/utils/index.js

```typescript
// 判断 val 是否为 null 或 undefined 或 空字符串
export function isNUE(val): boolean

// 判断 n 是否为数字
export function isNumeric(n): boolean

/**
 * 判断 fields 中的字段是否有空值
 * @param {any[]} fields - the fields to check
 * @param {object} ctx - use this when `fields` is a string array
 */
export function notFulfill(fields: any[], ctx: object): boolean

//  一言 随机古诗词
export async function hitokoto(): Promise

/**
 * 树形结构转为数组形式
 * @param {[]} tree
 * @param {string} key 子节点的 key，默认 *children*
 */
export function treeToArr(tree = [], key = 'children'): []

/**
 * 列表转树
 * @param {[]} arr
 * @param {string} pidKey 指向父节点 id 的 key，默认为 *pid*
 */
export function arrToTree(arr = [], pidKey = 'pid'): []

// 下载文件 **非同源文件会在新标签页打开**
export function downloadFile(url: string, name = ''): void

// 下载文件，blob 保存方式
export function saveBlob(data: Blob, fileName = '')

// 处理 emoji 显示问题
export function decodeName(val = ''): string

// Promise.allSettled polyfill
export function allSettled(promises: Promise[]): Promise[]

// 拷贝文本到剪贴板，只在用户触发动作时有用（比如在点击事件监听器内）
export function copyToClipboard(str: string): void

// 时间段格式化 输入 formatDuration(218923) 结果 "3 分，38 秒，923 毫秒"
export function formatDuration(ms: number): string

// Generates an array with the given amount of items, using the given function.
export function generateItems(n: number, fn: Function): []

// 生成随机字符串
export function createUniqueString(): string

// Returns a random string with the specified length.
export function randomAlphaNumeric(length: number): string

// Returns an object containing the parameters of the current URL.
// 获取 url 参数
export function getURLParameters(url: string = location.search):

// Returns a query string generated from the key-value pairs of the given object.
// 对象转 URL 参数字符串
export function objectToQueryString(queryParameters: object): string

//  Generates a UUID in a browser.Use crypto API to generate a UUID, compliant with RFC4122 version 4.
export function generateUUID(): string

/**
 * 将数组分为指定长度的更小数组
 * Chunks an array into smaller arrays of a specified size.
 * If the original array can't be split evenly,
 * the final chunk will contain the remaining elements.
 */
export function chunk(arr: [], size: number): [][]

/**
 * 将数组分为 n 个更小数组
 * Chunks an array into n smaller arrays.
 * If the original array can't be split evenly,
 * the final chunk will contain the remaining elements.
 */
export function chunkIntoN(arr: [], n: number): [][]

// 平滑滚动到页面顶部
export function scrollToTop(): void

/**
 * 模糊搜索
 * Returns true if needle matches haystack using a fuzzy-searching algorithm.
 * The method will return true only if each character in the needle can be found in the haystack
 * and occurs after the preceding character.
 * @see https://www.npmjs.com/package/fuzzysearch
 * @param {string} needle query word
 * @param {string} haystack where to find
 * @returns whether if needle matches haystack
 */
export function fuzzysearch(needle: string, haystack: string): boolean
```

---
*fin.*
