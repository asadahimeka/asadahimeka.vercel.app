# Hexo Site Source Files

Hexo Theme：[Yun](https://github.com/YunYouJun/hexo-theme-yun/)

- URL：https://asadahimeka.github.io/z/

## Setup
```
yarn install
```

### Local server preview
```
yarn serve
```

### Create new posts
```
yarn new "post name"
```

### Deploy to GitHub Pages
```
yarn deploy
```

### Modify Outdate Warning
themes\yun\layout\post.pug Line 25
```pug
        - var diff = moment(new Date()).diff(moment(page.date), 'year')
        if diff > 2
          div.warning-outdate
            blockquote This post was written #{diff} years ago, some information may be outdated.
```

### Customize configuration

See [Hexo Configuration Reference](https://hexo.io/zh-cn/).
See [Theme Yun Configuration Reference](http://yun.yunyoujun.cn/).
