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

## 约定式路由

[参考链接](https://d.umijs.org/guide/conventional-routing)

为了使得路由生成更容易理解、更易于控制，dumi 对 Markdown 文档的目录解析做了『文档路由』及『资产路由』的概念拆分。

默认情况下，docs 目录下的 Markdown 文档及.dumi/pages 下的 React 组件会根据目录结构解析为文档路由，src 目录下第一层级的 Markdown 文档会被解析为 /components 下的资产路由，我们可以通过配置项 resolve.atomDirs 对资产路由前缀及解析目录进行更改。

示例：
| 磁盘路径 | 解析路径 |
| ------ | -------- |
| /path/to/.dumi/pages/hello.tsx | - 导航：hello <br /> - 页面路由：/hello |
| /path/to/docs/guide | - 导航：Guide <br /> - 页面路由：/guide |
| /path/to/src/Foo/index| - 导航：Foo <br /> - 页面路由：/components/foo |

:::warning 亲测踩坑

对于/path/to/src/Foo/index 的页面路由不能定义成/components/foo/index，或者/components/Foo/index，否则会找不到该页面。

不能识别的文档路径：

- `/path/to/src/hello/world.md`
- `/path/to/src/hello/another/world.md`
- 以 . 开头的目录及文档
- 以 \_ 开头的目录及文档

:::
