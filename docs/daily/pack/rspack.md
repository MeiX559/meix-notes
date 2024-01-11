# Rspack 打包

## Rspack 使用

### 创建项目

项目使用 React+TypeScript 搭建一个 h5 项目

使用 Rspack CLI 脚手架创建项目

```sh
# npm
npm create rspack@latest

# yarn
yarn create rspack

# pnpm
pnpm create rspack@latest
```

### 配置文件 rspack.config.js

#### 生产环境配置打包入口

由于是 h5 项目，打包的时候需要实现选择某个项目单独打包，因此入口需要动态设置。

而开发环境不需要打包，因此直接使用 main.tsx 作为入口，在 main.tsx 中根据 dev.config 判断应该运行哪个 h5 项目

```js
// 动态入口配置 根据打包的build.config.js文件动态生成打包入口
const entry = {
  [pageName]: entryPath
}

// 开发环境入口
const devEntry = {
  main: './src/main.tsx'
}

export default defineConfig({
  entry: dev ? devEntry : entry
})
```

#### 配置 loader

项目使用 sass 来写 css 样式，需要安装 `sass`，`sass-loader`，`postcss`，`postcss-loader`。
使用 `sass-loader` 完成 sass 到 CSS 类型之间的转换，并对转换后的源码使用 postcss-loader 进行二次转换，并最终交给 Rspack 的 CSS 后处理器，完成进一步处理。

#### 设置别名

```js
export default defineConfig({
  resolve: {
    // 别名
    alias: {
      '@': path.resolve(process.cwd(), 'src'),
      '@config': path.resolve(process.cwd(), 'config')
    }
  }
})
```

#### 配置 devServer

```js
export default defineConfig({
  devServer: {
    open: '/index.html?appToken=***',
    proxy: {
      '/proxytest': {
        target: 'https://***-test.***.com',
        changeOrigin: true,
        pathRewrite: { '^/proxytest': '/' }
      },
      // 线上
      '/njia-prod': {
        target: 'https://***.***.com',
        changeOrigin: true,
        pathRewrite: { '^/***-prod': '/' }
      }
    }
  }
})
```

#### 配置 plugins

```js
export default defineConfig({
  plugins: dev
    ? [new rspack.HtmlRspackPlugin({ template: './index.html', filename: 'index.html' })]
    : [
        new rspack.HtmlRspackPlugin(htmlOption),
        // 复制文件夹
        new rspack.CopyRspackPlugin({
          patterns: [{ from: 'public' }]
        }),
        // 自定义plugin 生产环境
        new FxBuildPlugin()
      ]
})
```

#### 完整配置

```js
// eslint-disable-next-line @typescript-eslint/no-require-imports
import path from 'path'
import { defineConfig } from '@rspack/cli'
import rspack from '@rspack/core'
import FxBuildPlugin from './scripts/fx-build.js'
import buildConfig from './config/build.config.js'

const appBasePath = process.cwd()
const { buildPagePath } = buildConfig || {}
const pageName = buildConfig.buildPagePath.split('/').reverse()[0]
const entryPath = `${appBasePath}/src/${buildPagePath}/app.tsx`

// 动态入口配置 根据打包的build.config.js文件动态生成打包入口
const entry = {
  [pageName]: entryPath
}
// 开发环境入口
const devEntry = {
  main: './src/main.tsx'
}

const dev = process.env.NODE_ENV === 'development'

// 打包后的html文件配置
const htmlOption = {
  inject: true,
  title: `${buildConfig.buildPageTitle || '粉象生活'} `,
  template: './index.html',
  filename: 'index.html',
  chunks: [pageName] // 根据设置的pageName打包需要的chunks
}

export default defineConfig({
  entry: dev ? devEntry : entry,
  module: {
    rules: [
      {
        test: /\.svg$/,
        type: 'asset'
      },
      {
        test: /\.scss$/,
        use: [{ loader: 'postcss-loader' }, { loader: 'sass-loader' }],
        type: 'css'
      }
    ]
  },
  resolve: {
    // 别名
    alias: {
      '@': path.resolve(process.cwd(), 'src'),
      '@config': path.resolve(process.cwd(), 'config')
    }
  },
  devServer: {
    open: '/index.html?appToken=***',
    proxy: {
      '/proxytest': {
        target: 'https://***-test.***.com',
        changeOrigin: true,
        pathRewrite: { '^/proxytest': '/' }
      },
      // 线上
      '/njia-prod': {
        target: 'https://***.***.com',
        changeOrigin: true,
        pathRewrite: { '^/***-prod': '/' }
      }
    }
  },
  // 输出文件
  output: {
    filename: 'assets/js/[name]-[contenthash].bundle.js',
    chunkFilename: 'assets/js/[name]-[chunkhash:8].chunk.js',
    cssFilename: 'assets/css/[name].css',
    cssChunkFilename: 'assets/css/[name].chunk.css'
  },
  plugins: dev
    ? [new rspack.HtmlRspackPlugin({ template: './index.html', filename: 'index.html' })]
    : [
        new rspack.HtmlRspackPlugin(htmlOption),
        // 复制文件夹
        new rspack.CopyRspackPlugin({
          patterns: [{ from: 'public' }]
        }),
        // 自定义plugin
        new FxBuildPlugin()
      ]
})
```

### 打包部署

```sh
npm run deploy
```

自定义打包插件：

```js
import fs from 'fs'
import buildConfig from '../config/build.config.js'
import { green, link } from './color.js'

// 删除文件夹和里面的内容
function emptyDir(path) {
  const files = fs.readdirSync(path)

  files.forEach((file) => {
    const filePath = `${path}/${file}`
    const stats = fs.statSync(filePath)
    if (stats.isDirectory()) {
      emptyDir(filePath)
      return
    } else {
      fs.unlinkSync(filePath)
    }
  })
  fs.rmdirSync(path)
}

export default class FxBuildPlugin {
  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  apply(compiler) {
    const appBasePath = process.cwd()
    const { buildPagePath, buildApiEnv, buildPageTitle } = buildConfig || {}
    const inputName = buildPagePath.split('/').reverse()[0]

    compiler.hooks.emit.tapAsync('FxBuildPlugin', (compilation, callback) => {
      // 获取打包的index.html资源
      const asset = Object.keys(compilation.assets).filter((val) => {
        return val === 'index.html'
      })
      const source = compilation.assets[asset].source()
      const ouputHtml = source
        .toString()
        .replace(
          '<script type="module" src="/src/main.tsx"></script>',
          '<script type="module" src="app.tsx"></script>'
        )
        .replace('<title>粉象生活</title>', `<title>${inputName}</title>`)

      // 修改输出的index.html资源
      compilation.assets[asset] = {
        source: () => {
          return ouputHtml
        },
        size: () => {
          return Buffer.byteLength(ouputHtml, 'utf8')
        }
      }

      // 输出文件前先判断是否有dist文件夹，如果有则删除
      if (fs.existsSync(`${appBasePath}/dist`)) {
        emptyDir(`${appBasePath}/dist`)
      }

      // 这是一个异步事件，使用tapAsync才可执行成功，tap会报错
      callback()
    })

    // 上传文件到OSS
    const { h5Url, uploadPromise } = uploadFiles(buildApiEnv, buildPagePath)
    uploadPromise.then(() => {
      console.log(green(`${buildPageTitle} 页面上传成功`))
      console.log(link(`页面链接：${h5Url}`))
    })
  }
}
```

### 编写 webpack 插件调试方法

```sh
# 在package.json文件的scripts添加下面这条启动命令
node --inspect-brk ./node_modules/@rspack/cli/bin/rspack
# 在浏览器打开这个链接：chrome://inspect，点击最下面的inspect链接按钮，即可跳转到对应的调试界面
```

## webpack 迁移到 Rspack

由于业务项目使用的大部分应用是依赖于 Create React App（简称 CRA）构建的，而 CRA 本身内置了很多的工程能力，手动从`@rspack/cli`搭建出一个对等能力的配置并非易事，而 Rspack 提供了一种方法，通过将 CRA 应用迁移到 Rsbuild 来使用 Rspack 的能力。

[Rsbuild](https://rsbuild.dev/zh/guide/start/index) 是一个基于 Rspack 的 web 构建工具，它的目标是为 Rspack 用户提供开箱即用的构建能力，使开发者能够在零配置的情况下启动一个 web 项目。

### 从 Create React App 迁移到 Rspack

#### 安装依赖

移除 CRA 的依赖

```sh
# npm
npm remove react-scripts
# yarn
yarn remove react-scripts
# pnpm
pnpm remove react-scripts
```

安装 Rsbuild 的依赖

```sh
# npm
npm add @rsbuild/core @rsbuild/plugin-react -D
# yarn
yarn add @rsbuild/core @rsbuild/plugin-react -D
# pnpm
pnpm add @rsbuild/core @rsbuild/plugin-react -D
```

更新 npm scripts

```js
// 更新package.json中的npm scripts命令
{
  "scripts": {
-   "start": "react-scripts start",
-   "build": "react-scripts build",
-   "eject": "react-scripts eject"
+   "start": "rsbuild dev",
+   "build": "rsbuild build",
+   "preview": "rsbuild preview"
  }
}
```

#### 创建配置文件

在 `package.json` 的同级目录下创建 `Rsbuild` 的配置文件 `rsbuild.config.ts`，并添加以下内容：

```ts
import { defineConfig } from '@rsbuild/core'
import { pluginReact } from '@rsbuild/plugin-react'

export default defineConfig({
  plugins: [pluginReact()]
})
```

上述只是完成了从 CRA 到 Rsbuild 的基本迁移，但是在业务项目中可能还需要其他的一些配置来完成我们项目的迁移，以下将以我的一个 CRA 项目从 0 到 1 迁移到 Rsbuild 作为介绍，并贴出我的一些踩坑记录。

#### 配置详情及踩坑记录

**定义 html 模版参数：**

在 html 模板中，可能需要使用参数来读取

```ts
html: {
  template: './public/index_rspack.html',
  templateParameters: {
    PUBLIC_URL: '.'
  }
}
```

在 rsbuild 中使用`<%= PUBLIC_URL %>`来读取

**process.env 变量设置：**

在原来的 CRA 应用中，使用了`cross-env`来定义变量，在打包的时候根据定义的变量选择打包上传的目录（如 dev/test1/test2/pre/prod），node 环境下只定义了两个全局的`process.env`，如果需要使用自定义的，那么需要将其全局化。

CRA 应用中由于它本身已经内置了一些工程能力（可在 node_mudules/react-script/config/webpack.config.js 下查看它的 webpack 配置），它要使用环境变量只需要在根目录下创建.env 文件就可以。

而 Rsbuild 中，需要在 source/define 将其全局化。

**服务器代理配置：**

在 server/proxy 配置服务器代理

**打包输出相关配置（output）：**

在输出文件 index.html 中，rsbuild 默认使用的是绝对路径，因此在打包上传到 OSS 上，通过域名访问 index.html 时，找不到打包产物的文件，因此需要改为相对路径。

在 rspack 中，可以设置 output 的 publicPath 属性为'./'将打包产物改为相对路径（即相对 index.html 文件路径），但是经过尝试 rsbuild 中没有 publicPath 的配置，在 rsbuild 中有个 tools/rspack 属性，它主要用于配置原生的 rspack,因此可以选择使用以下方法配置：

```ts
tools: {
  rspack: (config: any) => {
    config.output.publicPath = './'
    return config
  }
}
```

完整配置：`rsbuild.config.ts`

```ts
import { defineConfig } from '@rsbuild/core'
import { pluginReact } from '@rsbuild/plugin-react'
import path from 'path'

const isProduction = process.env.NODE_ENV === 'production'

export default defineConfig({
  dev: {
    hmr: isProduction ? false : true
  },
  source: {
    // process.env环境变量相关
    define: {
      'process.env.REACT_APP_BASE_URL_SUFFIX': JSON.stringify('***'),
      'process.env.REACT_APP_DEPLOY_ENV': JSON.stringify(process.env.REACT_APP_DEPLOY_ENV)
    }
  },
  // 服务器代理，在这里配置服务器代理
  server: {
    proxy: {
      '/proxydev': {
        target: 'https://***-dev.***.com',
        changeOrigin: true,
        pathRewrite: { '^/proxydev': '/' }
      },
      '/proxytest': {
        target: 'https://***-test.***.com',
        changeOrigin: true,
        pathRewrite: { '^/proxytest': '/' }
      },
      '/proxyprod/***': {
        target: 'https://***.***.com',
        changeOrigin: true,
        pathRewrite: { '^/proxyprod/***': '/' }
      },
      '/***': {
        target: 'http://***',
        changeOrigin: true,
        pathRewrite: { '^/***': '/***' }
      }
    }
  },
  html: {
    title: 'title',
    template: './public/index_rspack.html',
    templateParameters: {
      PUBLIC_URL: '.'
    }
  },
  // 打包输出相关
  output: {
    distPath: {
      root: path.resolve(process.cwd(), 'dist'),
      html: '',
      js: 'static/js',
      css: 'static/css'
    },
    disableSourceMap: true,
    // 复制静态文件到dist目录
    copy: [
      { from: './public/manifest.json', to: '' },
      { from: './public/fenxiang.ico', to: '' },
      { from: './public/logo.png', to: '' }
    ],
    //
    filename: {
      js: '[name]-[contenthash].js'
    }
  },
  plugins: [pluginReact()],
  tools: {
    rspack: (config: any) => {
      config.output.publicPath = './'
      return config
    }
  }
})
```

## 官方文档

- [Rspack 官方文档](https://www.rspack.dev/zh/)
- [Rsbuild 文档](https://rsbuild.dev/zh/guide/start/index)
