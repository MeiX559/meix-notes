# React 之如何调试源码

:::tip 前言
想要阅读 React 源码，但又不知道怎么调试？看这篇 👇︎：
:::

## 创建项目

使用 create-react-app 创建一个 React 项目

```sh
npx create-react-app react-app
cd react-app

```

## 下载 React 源码

我阅读的源码为 v18.2.0，下载 v18.2.0 tag 的版本

```sh
cd src
git clone --branch v18.2.0 https://github.com/facebook/react.git
```

## 开启自定义配置

`create-react-app`的 webpack 配置在内部已经封装过了，如果想要自定义配置，可以使用`npm run eject`命令

```warning 注意点
执行npm run eject命令前，需要把本地代码提交（当然不提交也会提示让你提交），然后执行npm run eject命令后，script命令会发生改变
```

```js
// 修改前
{
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  }
}

// 修改后
{
  "scripts": {
    "start": "node scripts/start.js",
    "build": "node scripts/build.js",
    "test": "node scripts/test.js"
  },
}
```

可以看到，执行 npm run start 或其他命令的时候，是去找 scripts 文件夹下的文件，同时可以知道 webpack 的配置放在了`config/webpack.config.js`下

## 修改 webpack alias

打开`config/webpack.config.js`，找到 alias

```js
// 修改之前
alias: {
    // Support React Native Web
    // https://www.smashingmagazine.com/2016/08/a-glimpse-into-the-future-with-react-native-for-web/
    'react-native': 'react-native-web',
    // Allows for better profiling with ReactDevTools
    ...(isEnvProductionProfile && {
      'react-dom$': 'react-dom/profiling',
      'scheduler/tracing': 'scheduler/tracing-profiling',
    }),
    ...(modules.webpackAliases || {}),
},

// 修改之后
alias: {
  react: path.join(paths.appSrc, 'react/packages/react'),
  'react-dom': path.join(paths.appSrc, 'react/packages/react-dom'),
  shared: path.join(paths.appSrc, 'react/packages/shared'),
  'react-reconciler': path.join(paths.appSrc, 'react/packages/react-reconciler')
}

```

执行 npm run start 命令后，你会发现有 5 个报错......

### 错误 1

修改 React 和 ReactDOM 引入方式

打开`react-app/src/index.js`,修改 React 和 ReactDOM 的引入方式：

```js
// react-app/src/index.js

// 修改前
import React from 'react'
import ReactDOM from 'react-dom/client'

// 修改后
import * as React from 'react'
import * as ReactDOM from 'react-dom/client'
```

### 错误 2 修改 Scheduler

打开`react-app/src/react/packages/react-reconciler/src/Scheduler.js`

```js
// 在开头引入
import * as SchedulerMock from '../../scheduler/src/forks/SchedulerMock'

// 修改前
export const unstable_yieldValue = Scheduler.unstable_yieldValue
export const unstable_setDisableYieldValue = Scheduler.unstable_setDisableYieldValue

// 修改后
export const unstable_yieldValue = SchedulerMock.unstable_yieldValue
export const unstable_setDisableYieldValue = SchedulerMock.unstable_setDisableYieldValue
```

### 错误 3 关掉 ESlint

打开`react-app/config/webpack.config.js`,找到 disableESLintPlugin

```js
// 修改前
const disableESLintPlugin = process.env.DISABLE_ESLINT_PLUGIN === 'true'
// 修改后
const disableESLintPlugin = true
```

### 错误 4 环境变量

打开`react-app/config/env.js`

```js
// 修改前
const stringified = {
  'process.env': Object.keys(raw).reduce((env, key) => {
    env[key] = JSON.stringify(raw[key])
    return env
  }, {})
}

// 修改后
const stringified = {
  'process.env': Object.keys(raw).reduce((env, key) => {
    env[key] = JSON.stringify(raw[key])
    return env
  }, {}),
  __DEV__: true,
  __EXPERIMENTAL__: true,
  __PROFILE__: true
}
```

### 错误 5

找到`react-app/src/react/packages/shared/ReactSharedInternals.js`

```js
// react-app/src/react/packages/shared/ReactSharedInternals.js

// 修改前
const ReactSharedInternals = React.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED

// 修改后
import ReactSharedInternals from '../react/src/ReactSharedInternals'
```

### 错误 6

找到`src/react/packages/react-reconciler/src/ReactFiberHostConfig.js`

```js
// src/react/packages/react-reconciler/src/ReactFiberHostConfig.js

// 修改前
throw new Error('This module must be shimmed by a specific renderer.')

// 修改后
export * from './forks/ReactFiberHostConfig.dom'
```

## 开始调试
