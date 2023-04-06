# dumi 使用说明

:::warning 注意点
使用 `dumi` 开发组件需要确保`Node.js` 版本为 14+。
:::

[dumi 文档](https://d.umijs.org/guide/initialize)

## 安装

建议使用官方提供的工具 `create-dumi` 创建项目.

::: details dumi 安装及创建项目

```sh
# 全局安装create-dumi
$ npm install create-dumi -g

# 通过官方工具创建项目，选择你需要的模板
$ npx create-dumi

# 选择一个模板
$ ? Pick template type › - Use arrow-keys. Return to submit.
$ ❯   Static Site # 用于构建网站
$     React Library # 用于构建组件库，有组件例子
$     Theme Package # 主题包开发脚手架，用于开发主题包

# 安装依赖后启动项目
$ npm start
```

:::

## 目录结构

:::details 目录结构

```text
├── docs               # 组件库文档目录
│   ├── index.md       # 组件库文档首页
│   ├── guide          # 组件库其他文档路由表（示意）
│   │   ├── index.md
│   │   └── help.md
├── src                # 组件库源码目录
│   ├── Button         # 单个组件
│   │   ├── index.tsx  # 组件源码
│   │   ├── index.less # 组件样式
│   │   └── index.md   # 组件文档
│   └── index.ts       # 组件库入口文件
├── .dumirc.ts         # dumi 配置文件
└── .fatherrc.ts       # father-build 的配置文件，用于组件库打包
```

:::
