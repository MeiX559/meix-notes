# Webpack 相关

## Webpack 基础

webpack 是一个用于现代 JavaScript 应用程序的静态模块打包工具。我们可以使用 webpack 管理模块。因为在 webpack 看来，项目中的所有资源皆为模块，通过分析模块间的依赖关系，在其内部构建出一个依赖图，最终编绎输出模块为 HTML、JavaScript、CSS 以及各种静态文件（图片、字体等），让我们的开发过程更加高效。

## 常用的 Loader 有哪些？

:::tip
默认情况下，webpack 只支持对 js 和 json 文件进行打包，但是像 css、html、png 等其他类型的文件，webpack 则无能为力。
但是 Webpack 支持使用 loader 对文件进行预处理。你可以构建包括 JavaScript 在内的任何静态资源。并且可以使用 Node.js 轻松编写自己的 loader。
:::

常用的 Loader 如下：

- less-loader： 加载并编译 LESS 文件。
- sass-loader：加载并编译 SASS/SCSS 文件。
- css-loader：加载 CSS，支持模块化、压缩、文件导入等特性，使用 css-loader 必须要配合使用 style-loader。
- style-loader：用于将 CSS 编译完成的样式，挂载到页面的 style 标签上。需要注意 loader 执行顺序，style-loader 要放在第一位，loader 都是从后往前执行。
- postcss-loader：扩展 CSS 语法，使用下一代 CSS，可以配合 autoprefixer 插件自动补齐 CSS3 前缀。
- babel-loader：把 ES6 转换成 ES5
- eslint-loader：通过 ESLint 检查 JavaScript 代码。
- vue-loader：加载并编译 Vue 组件。
- image-loader：加载并且压缩图片文件。
- file-loader：把文件输出到一个文件夹中，在代码中通过相对 URL 去引用输出的文件 (处理图片和字体)
- url-loader：与 file-loader 类似，区别是用户可以设置一个阈值，大于阈值会交给 file-loader 处理，小于阈值时返回文件 base64 形式编码 (处理图片和字体)

[webpack 完整的 Loader 文档](https://www.webpackjs.com/loaders/)

## 关于图片和字体处理的 loader

```html
<!-- 本地可以访问，生产环境会找不到图片 -->
<img src="/logo.png" alt="" />
```

主要原因是 Webpack 无法识别图片文件，因此需要再打包的时候进行转换处理，此时就需要使用以下几个 loader 进行处理：

- file-loader： 把文件输出到一个文件夹中，在代码中通过相对 URL 去引用输出的文件 (处理图片和字体)
- url-loader： 与 file-loader 类似，区别是用户可以设置一个阈值，大于阈值会交给 file-loader 处理，小于阈值时返回文件 base64 形式编码 (处理图片和字体)
- img-loader： loader：加载并且压缩图片文件。

:::warning 注意点
Webpack5 之后内置了资源处理模块，file-loader 和 url-loader 都可以不用安装。

webpack5 新增资源模块(asset module)，允许使用资源文件（字体，图标等）而无需配置额外的 loader。
:::

资源模块支持以下几个配置：

1. asset/resource 将资源分割为单独的文件，并导出 url，类似之前的 file-loader 的功能.
2. asset/inline 将资源导出为 dataUrl 的形式，类似之前的 url-loader 的小于 limit 参数时功能.
3. asset/source 将资源导出为源码（source code）. 类似的 raw-loader 功能.
4. asset 会根据文件大小来选择使用哪种类型，当文件小于 8 KB（默认） 的时候会使用 asset/inline，否则会使用 asset/resource

## 常见的 plugin 有哪些？

:::tip
Loader 虽然可以对文件进行预处理，将特定的文件转换为浏览器能识别的文件，但是 Loader 不能对 Webpack 打包的过程中执行操作，而 Plugin 可以贯穿 Webpack 打包的整个生命周期以执行不同的任务。例如，想要在打包之后的资源文件中自动引入 JS，CSS 到 HTML 文件中，就可以使用插件 html-webpack-plugin 来帮助你完成这个操作。
:::

常用的 Plugin 如下：

- HtmlWebpackPlugin：简化 HTML 文件创建 (依赖于 html-loader),该插件会自动生成一个 html 文件，在 body 中使用 script 标签引入你所有 webpack 生成的 bundle。
- mini-css-extract-plugin: 本插件会将 CSS 提取到单独的文件中，为每个包含 CSS 的 JS 文件创建一个 CSS 文件，并且支持 CSS 和 SourceMaps 的按需加载。
- copy-webpack-plugin：复制文件或目录到输出产物文件夹
- clean-webpack-plugin：清空 dist 文件夹

[webpack 完整的 plugin 文档](https://www.webpackjs.com/plugins/)

## Loader 和 Plugin 的区别

- loader 是文件加载器，能够加载资源文件，并对这些文件进行一些处理，诸如编译、压缩等，最终一起打包到指定的文件中。
- plugin 赋予了 webpack 更加灵活的功能，例如打包优化、资源管理、环境变量注入等，目的是解决 loader 无法实现的其他事。
- 执行时机不同：Loader 是运行在打包文件之前，而 Plugin 贯穿 Webpack 打包的整个生命周期。

## Babel 如何配置？Babel 插件如何使用？

## 如何编写 Loader

Loader 本质上是导出为函数的 JavaScript 模块，它接收资源文件的内容，返回转换后的结果。它有以下几个特性：

- Loader 支持链式调用：即上一个 loader 的返回结果会作为下一个 loader 的资源文件（即下一个 loader 的入参）。
- Loader 的主要职责就是将代码转换为 Webpack 可以理解的代码。
- Loader 应该符合单一职责原则，一个 loader 只做一件事。
- Webpack 默认会缓存 loader 的处理结果，直到资源/所依赖的资源发生变化。如果想要 loader 不缓存 可以通过 this.cacheble 显式声明不做缓存。
- loader 接收三个参数：
  - source： 资源文件的输入 对于第一个执行的 loader 为资源文件的内容， 后续执行的 loader 则为前一个 loader 的执行结果， 也可能是字符串 或者是代码的 AST 结构
  - sourceMap： 可选参数 代码的 sourcemap 结构
  - data： 可选参数 其他需要在 Loader 链中传递的信息

例如创建一个去除 console 的 loader：

```js
// 创建/src/drop-console-loader.js 文件
// 去除文件中的console的loader
const parser = require('@babel/parser')
const traverse = require('@babel/traverse').default
const generator = require('@babel/generator').default
const t = require('@babel/types')
module.exports = function (source) {
  // 将源代码解析成 AST
  const ast = parser.parse(source, { sourceType: 'module' })
  // 遍历AST
  traverse(ast, {
    CallExpression(path) {
      if (
        t.isMemberExpression(path.node.callee) &&
        t.isIdentifier(path.node.callee.object, { name: 'console' })
      ) {
        path.remove()
      }
    }
  })
  const output = generator(ast, {}, source)
  return output.code
}
```

在 webpack 配置文件中引入自定义的 loader

```js
// webpack.prod.js配置文件中引入自定义的loader
const Webpack = require('webpack')
const webpackConfig = require('./webpack.config.js')
const { merge: WebpackMerge } = require('webpack-merge')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = WebpackMerge(webpackConfig, {
  mode: 'none',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: path.resolve(__dirname, '../drop-console-loader.js') //移除代码中的console的loader
      }
    ]
  },
  optimization: {
    minimize: true,
    minimizer: [new MiniCssExtractPlugin({})]
  },
  plugins: [
    // 执行build之前清空dist文件夹
    new CleanWebpackPlugin()
  ]
})
```

## 如何编写 plugin

Plugin 是通过监听 webpack 构建过程中发布的 hooks 来执行对应的操作从而影响构建逻辑和更改生成的产物，而在这个过程中 compiler 和 compilation 是最核心的两个对象了，其中通过 compiler 暴露构建过程中的 hooks，而 compilation 则暴露了更细粒度的 hooks。

:::tip
compiler 对象是一个全局单例，代表了 webpack 从开启到关闭的整个生命周期，负责启动编译和监听文件，而 compilation 是每次构建过程的上下文对象，包含当次构建所需要的信息。

每次热更新和重新编译都会创建一个新的 compilation 对象，compilation 对象只代表当次编译
:::

plugin 是通过监听 Webpack 构建过程中发布的 hooks 来达到更改产物的目的的，因此可以监听一些具有特定意义的 hook 来影响构建：

- compiler.hooks.compilation:webpack 刚启动完并创建 compilation 对象后触发
- compiler.hooks.make:webpack 开始构建时触发
- compiler.hooks.done:webpack 完成编译时触发，此时可以通过 stats 对象得知编译过程中的各种信息

例如编写如下插件，修改产物的内容：

```js
export default class MyBuildPlugin {
  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  apply(compiler) {
    const appBasePath = process.cwd()
    const apiEnv = process.env.REACT_APP_SECRET_API
    const { buildPagePath, buildApiEnv, buildPageTitle } = buildConfig || {}
    const inputName = buildPagePath.split('/').reverse()[0]

    compiler.hooks.emit.tapAsync('MyBuildPlugin', (compilation, callback) => {
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

    // 在compilation执行完成后在上传文件到OSS
    compiler.hooks.done.tapAsync('FxBuildPlugin', (compilation, callback) => {
      // 上传文件到OSS
      const { h5Url, uploadPromise } = uploadFiles(buildApiEnv, buildPagePath)
      uploadPromise.then(() => {
        console.log(green(`${buildPageTitle} 页面上传成功`))
        console.log(link(`页面链接：${h5Url}`))
      })
      callback()
    })
  }
}
```
