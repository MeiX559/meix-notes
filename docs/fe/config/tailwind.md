# Tailwind CSS 相关

## 文档

[Tailwind 中文网](https://www.tailwindcss.cn)

## 安装配置

```sh
# 安装tailwindcss
npm install -D tailwindcss
# 创建配置文件 tailwind.config.js
```

:::details Tailwind CSS 配置 (tailwind.config.js)

```js
// eslint-disable-next-line @typescript-eslint/no-require-imports
const plugin = require('tailwindcss/plugin')

const flexCenterBaseStyles = {
  display: 'flex',
  'justify-content': 'center',
  'align-items': 'center'
}

/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: 'jit',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      spacing: {
        '351px': '21.9375rem',
        '375px': '23.4375rem'
      }
    }
  },
  plugins: [
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.flex-row-center': flexCenterBaseStyles,
        '.flex-col-center': { ...flexCenterBaseStyles, 'flex-direction': 'column' }
      })
    })
  ]
}
```

:::

```sh
# 安装postcss
npm i postcss
# 创建postcss.config.js文件（这个配置主要是用来添加tailwindcss的插件，这样编写的css才能被tailwindcss处理）
```

```js
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {}
  }
}
```

创建 css 文件

```CSS tailwind.css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

项目主入口引入 `tailwind.css`，这样就可以使用 `tailwind` 的语法了。
