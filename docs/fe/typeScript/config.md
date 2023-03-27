# TypeScript 编译配置

随着 TypeScript 的流行，越来越多的项目通过使用 TypeScript 来实现编写代码时候的类型提示和约束，从开发过程中减少 BUG 出现的概率，以此提升程序的健壮性和团队的研发效率。

越来越多的项目用上了 TypeScript，因此如何按需配置 tsconfig 也应该是前端工程师需要掌握的技能之一。

## 说在前面

在掌握 tsconfig.json 配置前，需要先大概知道 TypeScript 是什么，怎么使用等。

### 什么是 TypeScript

[TypeScript 官网](https://www.typescriptlang.org)

`TypeScript` 是一种基于 `JavaScript` 的强类型编程语言，它使得在前端项目开发过程中更加严谨且流畅，一定程度上保证了大型前端项目程序的健壮性。

- TypeScript 是由微软开发的一款开源的编程语言；
- TypeScript 是 JavaScript 的超集，遵循最新的 ESM 规范，TypeScript 扩展了 JavaScript 的语法；
- TypeScript 更像后端 JAVA、C# 这样的面向对象语言，可以让 JS 开发大型企业级项目。

但是 `TypeScript` 并不可以直接运行，而是需要转换成 `JavaScript` 代码才可以在 `Node.js` 或浏览器环境下执行，因此我们需要通过“编译器”将 TS 代码转换为 JS 代码。

### 什么是 tsc

tsc 的全称是 TypeScript Compiler，也就是将 TypeScript 转码为 JavaScript 代码的编译器。

tsc 的安装：

```sh
npm install typescript -g
```

编译 ts 文件为 js：

```js
tsc ./index.ts
```

tsc 实际就是将 TS 转为 JS 的编译（器）脚手架工具，如果是一个 TS 的前端工程项目，那么就可以通过项目中的 tsconfig.json 文件来自定义配置 TS 编译相关规则。

项目中的 tsconfig.json 文件，一般可通过如下快捷命令生成：

```sh
tsc --init
```

执行完上述命令后，会在项目根目录生成一个简单的初始化 tsconfig.json 配置描述文件，如果没有特别的要求，该初始化配置就足以支持你愉快地使用 TS 开发啦！

更多相关 TS 编译配置和使用说明可以通过 tsc -h 查看。

### tsconfig.json 文件

`tsconfig.json` 文件是用于描述将 `TypeScript` 转为 `JavaScript` 代码的配置文件。

IDE（代码编辑器）将会根据 `tsconfig.json` 文件来对当前项目中支持不同程度的类型约束，同时也是对 TSC 编译 `TypeScript` 代码过程做一些预定义、约束入口和编译输出目录等配置。

因此对于一个支持 `TypeScript` 编程语言的工程来说，`tsconfig.json` 文件就是编码的基础。

## tsconfig.json 配置详解

[tsconfig.json 详细配置文档参考](https://www.typescriptlang.org/tsconfig)

### tsconfig.json 配置全解析

```js
{
  "compilerOptions": {
    /* 基本选项 */
    "target": "es6", // 指定 ECMAScript 目标版本: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', or 'ESNEXT'
    "module": "commonjs", // 指定使用模块: 'commonjs', 'amd', 'system', 'umd' or 'es2015'
    "lib": ["ES5", "ES6", "DOM"], // 指定要包含在编译中的库文件
    "allowJs": true, // 允许编译 javascript 文件
    "checkJs": true, // 报告 javascript 文件中的错误
    "jsx": "preserve", // 指定 jsx 代码的生成: 'preserve', 'react-native', or 'react'
    "declaration": true, // 生成相应的 '.d.ts' 文件
    "declarationDir": "./dist/types", // 生成的 '.d.ts' 文件保存文件夹
    "sourceMap": true, // 生成相应的 '.map' 文件
    "outFile": "./", // 将输出文件合并为一个文件
    "outDir": "./dist", // 指定输出目录
    "rootDir": "./", // 用来控制输出目录结构 --outDir.
    "removeComments": true, // 删除编译后的所有的注释
    "noEmit": true, // 不生成输出文件
    "importHelpers": true, // 从 tslib 导入辅助工具函数
    "isolatedModules": true, // 将每个文件做为单独的模块 （与 'ts.transpileModule' 类似）.

    /* 严格的类型检查选项 */
    "strict": true, // 启用所有严格类型检查选项
    "noImplicitAny": true, // 在表达式和声明上有隐含的 any类型时报错
    "strictNullChecks": true, // 启用严格的 null 检查
    "noImplicitThis": true, // 当 this 表达式值为 any 类型的时候，生成一个错误
    "alwaysStrict": true, // 以严格模式检查每个模块，并在每个文件里加入 'use strict'

    /* 额外的检查 */
    "noUnusedLocals": true, // 有未使用的变量时，抛出错误
    "noUnusedParameters": true, // 有未使用的参数时，抛出错误
    "noImplicitReturns": true, // 并不是所有函数里的代码都有返回值时，抛出错误
    "noFallthroughCasesInSwitch": true, // 报告switch语句的fallthrough错误。（即，不允许switch的case语句贯穿）

    /* 模块解析选项 */
    "moduleResolution": "node", // 选择模块解析策略： 'node' (Node.js) or 'classic' (TypeScript pre-1.6)
    "baseUrl": "./", // 用于解析非相对模块名称的基础目录
    "paths": {}, // 模块名到基于 baseUrl 的路径映射的列表
    "rootDirs": [], // 根文件夹列表，其组合内容表示项目运行时的结构内容
    "typeRoots": [], // 包含类型声明的文件列表
    "types": [], // 需要包含的类型声明文件名列表
    "allowSyntheticDefaultImports": true, // 允许从没有设置默认导出的模块中默认导入。
    "esModuleInterop": true, // 支持合成模块的默认导入

    /* Source Map Options */
    "sourceRoot": "./", // 指定调试器应该找到 TypeScript 文件而不是源文件的位置
    "mapRoot": "./", // 指定调试器应该找到映射文件而不是生成文件的位置
    "inlineSourceMap": true, // 生成单个 soucemaps 文件，而不是将 sourcemaps 生成不同的文件
    "inlineSources": true, // 将代码与 sourcemaps 生成到一个文件中，要求同时设置了 --inlineSourceMap 或 --sourceMap 属性

    /* 其他选项 */
    "experimentalDecorators": true, // 启用装饰器
    "emitDecoratorMetadata": true // 为装饰器提供元数据的支持
  },
  /* 指定编译文件或排除指定编译文件 */
  "include": ["src/**/*"],
  "exclude": ["node_modules", "**/*.spec.ts"],
  "files": ["index.ts", "test.ts"],
  // 从另一个配置文件里继承配置
  "extends": "@tsconfig/recommended",
  // 让 IDE 在保存文件的时候根据 tsconfig.json 重新生成文件
  "compileOnSave": true // 支持这个特性需要Visual Studio 2015， TypeScript 1.8.4 以上并且安装 atom-typescript 插件
}
```

### files

files 字段用于**指明需要** tsc 编译的一个或多个 ts 文件

```js
{
  "compilerOptions": {},
  "files": [
    "index.ts",
    "core.ts",
    "types.ts",
    "global.d.ts"
  ]
}
```

当指定的文件或文件夹不存在时，会提示 ❌ 错误！

### include

`include` 字段用于**指明需要**被 tsc 编译的文件或文件夹列表

```js
{
  "include": [
    "src",
    "global.d.ts"
  ],
}
```

### exclude

`exclude` 字段用于**排除不需要** tsc 编译的文件或文件夹列表

```js
{
  "exclude": ["test.ts", "src/test.ts"],
}
```

::: warning 注意点
exclude 字段中的声明只对 include 字段有排除效果，对 files 字段无影响，即与 include 字段中的值互斥。
:::

如果 `tsconfig.json` 文件中 files 和 include 字段都不存在，则默认包含 `tsconfig.json` 文件所在目录及子目录的所有文件，且排除在 exclude 字段中声明的文件或文件夹。

### compileOnSave

`compileOnSave` 字段声明是否需要在保存时候自动触发 tsc 编译的字段，一般来说，我们的代码编译过程会通过 Rollup、Webpack 等打包构建工具，并且使用热更新，因此无需配置该项，保持缺省即可。

```js
{
  "compileOnSave": false,
}
```

### extends

`extends` 字段用于指明继承已有的 tsconfig 配置规则文件。

该字段可以说是非常有用了，因为 tsconfig 配置其实各个项目之间大同小异，因此完全可以结合自己团队的情况，抽离一个基础且公共的 tsconfig 配置，并将其发包，然后作为 extends 字段的值来继承配置。

继承一个发包后的 tsconfig 基础配置：

```js
{
  "extends": "@tsconfig/recommended/tsconfig.json",
  "compilerOptions": {
    "target": "ES2016"
  }
}
```

[一些常见环境（例如：Nuxt、Vite、Node 等）最佳实践后的基础配置](https://github.com/tsconfig/bases/)

### compilerOptions

`compilerOptions` 是一个描述 `TypeScript` 编译器功能的“大”字段，其值类型是“对象”，因此包含了很多用于描述编译器功能的子字段，其子字段的功能如下：

- target: 指明经过 TSC 编译后的 `ECMAScript` 代码语法版本
- lib:用于为了在我们的代码中显示的指明需要支持的 `ECMAScript` 语法或环境对应的类型声明文件
- module:指明 tsc 编译后的代码应该符合何种“模块化方案”
- esModuleInterop:支持合成默认导入
- moduleResolution:声明如何处理模块
- baseUrl & paths
- rootDir & outDir
- jsx
- importHelpers：是否启用从 tslib 库引入语法降级辅助函数，以避免重复冗余的辅助函数声明
- experimentalDecorators： 用于声明是否启实验性用装饰器模式
- noEmit：设置是否输出 js 文件

#### target

`target` 字段指明经过 TSC 编译后的 `ECMAScript` 代码语法版本，根据 `ECMAScript` 语法标准，默认值为 ES3。

`TypeScript` 是 `JavaScript` 的超集，是对 `JavaScript` 语法和类型上的扩展，因此我们可以使用 ES5、ES6，甚至是最新的 ESNext 语法来编写 TS。

如下使用 ESNext 语法编写 TS，则会将对应使用了最新 ECMAScript 语法的 TS 文件编译为符合 ES 语法规范的 \*.js 文件。

```js
{
  "compilerOptions": {
    "target": "ESNext",
  }
}
```

#### lib

`lib` 字段是用于为了在我们的代码中显示的指明需要支持的 `ECMAScript` 语法或环境对应的类型声明文件。

例如我们的代码会使用到浏览器中的一些对象 window、document，这些全局对象 API 对于 TypeScript Complier 来说是不能识别的,因而需要在 lib 字段中如下配置：

```js
{
  "compilerOptions": {
    "target": "ES5",
    "lib": ["ES5", "ES6", "DOM"],
  }
}
```

来显式引入在 DOM 即浏览器环境下的一些默认类型定义，即可在代码中使用，window、document 等浏览器环境中的对象，TS 在运行时以及编译时就不会报类型错误。

综合 target 和 lib 字段的实际功能表现，可以得出结论：
::: tip 结论
TSC 的编译结果只有部分特性做了 pollyfill 处理，ES6 的一些特性仍然被保留，想要支持完全的降级到 ES5 还是需要额外引入 pollyfill（也就是我们在项目的入口文件处 import 'core-js'），但建议是将 target 字段值设置为 ES6，提升 TSC 的速度。

因此，对于使用 TSC 编译的观点是：
不应该将 TSC 作为编译项目的工具，应该将 TSC 作为类型检查工具，代码编译的工作尽量交给 Rollup、Webpack 或 Babel 等打包工具!
:::

#### module

`module` 字段指明 tsc 编译后的代码应该符合何种“模块化方案”，可以指定的枚举值有：none, commonjs, amd, system, umd, es2015, es2020, 或 ESNext，默认值为 none。

在如今的前端开发趋势来讲，主要是使用 ESM、CommonJS、UMD、IIFE 四种模块化方案，未来会趋向于 ESM，当然我们会根据项目的应用场景来决定使用何种模块化方案，例如：NodeJS 使用 CommonJS，浏览器里可以使用 ESM，不过现在的打包工具，会自动处理 CommonJS 和 ESM 的差异，并包装成符合指定模块化规范的代码，

#### esModuleInterop

支持合成默认导入。
在前端项目开发时，使用 ESM 编写代码引入了 CJS 的模块，由于 CJS 模块没有默认导出内容，因此需要通过工具去自动化合成 CJS 的默认导出，以支持在 ESM 下流畅开发。
当 `esModuleInterop` 字段设置为 true 时候，`allowSyntheticDefaultImports` 字段也会自动设置为 true。

#### moduleResolution

`moduleResolution` 声明如何处理模块，枚举值：classic、node，会根据 module 字段决定默认值。

推荐手动设置为 node，更符合现在大家的编码认识一些，而且大部分的构建打包工具都是基于 Node。
举个 🌰，遇到 import {a} from 'a-lib'; 这样的模块引入代码应该如何去（解析）查找到对应的模块文件。

#### baseUrl & paths

baseUrl：设置基本目录以解析非绝对模块名称（定义一个根目录，以此进行绝对文件路径解析）。

paths：用于设置模块名或路径映射列表，这样就可以简写项目中自定义模块的文件路径。

```js
{
  "compilerOptions": {
    // 注意：baseUrl 必选，与 paths 成对出现，以 tsconfig.json 文件所在目录开始
    "baseUrl": ".", 
    "paths": {
      // 映射列表
      "@/*": [
        "src/*"
      ],
      "moduleA": [
        "src/libs/moduleA"
      ]
    }
  }
}

// 代码里这么写
import Toast from '@/components/Toast.ts' // 模块实际位置: src/components/Toast.ts
import TestModule from 'moduleA/index.js' // 模块实际位置: src/libs/moduleA/index.js
```

#### rootDir & outDir

rootDir：指定 TypeScript 识别读取的根目录，用于所有非声明输入文件的最长公共路径.

例如：'"rootDir": "./src"，则 src 目录下的 TS 文件不能引用 src 目录以外的 ts 文件，一般我们会设置为 ./src 或 ./（即 tsconfig.json 所在目录）

outDir：输出目录，即 tsc 编译后的文件输出的文件夹路径（基于 tsconfig.json 文件的相对路径）.

例如："outDir": "./dist"，及将 TSC 编译输出的 JS 文件，统一输出的 ./dist 目录下。

#### jsx

如果是有 jsx 语法需要支持的项目，可以设置值 preserve、react 等

```js
{
  "compilerOptions": {
    "jsx": "preserve", // 一般 preserve 即可
  },
}
```

#### importHelpers

`importHelpers` 决定是否启用从 tslib 库引入语法降级辅助函数，以避免重复冗余的辅助函数声明。
个人建议是设置为 true 来启用。

#### experimentalDecorators

`experimentalDecorators` 用于声明是否启实验性用装饰器模式。
TypeScript 和 ES6 中引入了 Class 的概念，同时在 Decorators 提出了装饰器模式，通过引入装饰器模式，能极大简化书写代码。
当前对于 Decorator 的支持性不太好，如果是一些涉及到使用了装饰器的需要，就需要开启这个属性。

#### noEmit

`noEmit` 设置是否输出 js 文件，一般是设置为 false，将打包等工作交给 Webpack 等工具。
