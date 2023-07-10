# Electron

`Electron` 是一个使用 Web 技术(HTML、CSS 和 JavaScript)来构建的开源的跨平台桌面应用程序开发框架，由 GitHub 公司开发，可以在 Windows、MacOS 和 Linux 等操作系统上运行。

`Electron` 基于 `Chromium` 浏览器引擎，提供了一个完整的 GUI 界面，包括窗口、菜单、工具栏、对话框等。同时，它还支持多种编程语言，如 `JavaScript`、`Python`、`C++`等，使得开发者可以更加灵活地选择适合自己的编程语言进行开发。

Electron = `Chromium + Node.js + Native API`

- **Chromium**：提供了强大的 ui 能力，利用强大的 web 生态来开发界面。
- **Node.js**：让 Electron 有了底层才能做的能力，比如读写能力，并且可以使用大量的开源包来完成项目的开发。
- **Native API**：让 Electron 有了跨平台和桌面端的原生能力，比如有同意的原生界面、窗口、托盘。

## 安装 + 创建 Electron 应用

:::warning
在创建项目和安装`Electron`之前，请先确保已经正确安装了`Node.js`.
:::

1、初始化项目

```sh
npm init
```

2、安装 Electron

```sh
npm install --save-dev electron
```

在安装的时候，`electron` 模块会通过 electron-download 为您的平台下载 `Electron` 的预编译二进制文件。可能导致的问题是安装报错或太慢，可以考虑切换镜像

```sh
# 配置淘宝镜像
npm config set registry https://registry.npm.taobao.org

# OR 配置electron镜像
npm config set ELECTRON_MIRROR http://npm.taobao.org/mirrors/electron/
```

3、创建主程序入口文件 main.js

`Electron` 应用基于 npm 搭建，以 `package.json` 文件作为入口点。在`package.json`中设置

```json
{
  "main": "main.js"
}
```

这个文件即`Electron`程序的入口，这个文件控制 主程序 (main process)，它运行在 Node.js 环境里，负责控制您应用的生命周期、显示原生界面、执行特殊操作并管理渲染器进程 (renderer processes)。

4、运行`Electron`程序

在 package.json 中设置运行命令：

```json
{
  "scripts": {
    "start": "electron ."
  }
}
```

```sh
npm run start
```

## 使用 React 创建 Electron 应用

1、搭建一个 react 项目

2、在项目根目录下创建文件夹 electron，然后在这个目录下创建 main.js，作为`Electron`程序的入口

3、修改`package.json`文件

```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "electron-start": "electron ."
  }
}
```

以上的这些操作中，我们以 main.js 作为`Electron`程序的入口，它可以使用`electron`命令执行任意的`Node.js`代码.我们的 react 项目作为`Electron`程序的渲染进程，负责应用页面的布局和样式。

## Electron 的运行流程

1. 读取 `package.json` 文件中的入口文件，这里就是 `main.js`
2. `main.js` 中引入 `electron` 创建了渲染进程
3. react 项目 就是应用页面的布局和样式
4. 使用 IPC 在主进程执行任务并获取信息

## 主进程文件(main.js)

```js
const { app, BrowserWindow } = require('electron')
// 判断是否是开发环境（本地加载的话使用http://localhost:5173，生产环境需要加载index.html
const isDev = require('electron-is-dev')
const path = require('path')

// createWindow函数用于将页面加载到新的 BrowserWindow 实例中
function createWindow() {
  //创建浏览器窗口,宽高自定义具体大小你开心就好
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true, //是否启用Node integration（即在前端应用中使用Node.js的功能和模块）. 默认值为 false
      contextIsolation: true, // 是否在独立 JavaScript 环境中运行 Electron API和指定的preload 脚本. 默认为 true
      preload: path.join(__dirname, 'preload.js') // 在页面运行其他脚本之前预先加载指定的脚本
    }
  })
  // 加载渲染进程应用
  if (isDev) {
    mainWindow.loadURL('http://localhost:5173')
    // mainWindow.loadURL('../index.html');
  } else {
    mainWindow.loadFile(path.resolve(__dirname, '../dist/index.html'))
  }
  // 打开调试控制台
  // mainWindow.webContents.openDevTools()
}

app.whenReady().then(() => {
  // 使用app.whenReady() 方法，作为其 ready 事件的专用监听器，当ready事件成功触发后创建BrowserWindows实例
  createWindow()

  app.on('activate', () => {
    // 如果没有窗口打开则打开一个窗口
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// 关闭所有窗口时退出应用
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
```

- [app](https://www.electronjs.org/zh/docs/latest/api/app):控制应用程序的事件生命周期
- [BrowserWindow](https://www.electronjs.org/zh/docs/latest/api/browser-window):创建并控制浏览器窗口

:::warning

- `Electron` 目前对 `ECMAScript` 语法 (如使用 import 来导入模块) 的支持还不完善，因此暂时只能使用 `CommonJS` 来导入模块。
- 在 `Electron` 中，只有在 app 模块的 ready 事件触发后才能创建 `BrowserWindows` 实例。

:::

## 进程间通信

进程间通信 (IPC) 是在 `Electron` 中构建功能丰富的桌面应用程序的关键部分之一。 由于主进程和渲染器进程在 `Electron` 的进程模型具有不同的职责，因此 IPC 是执行许多常见任务的唯一方法。

:::tip IPC 通道
在 `Electron` 中，进程使用 `ipcMain` 和 `ipcRenderer` 模块，通过开发人员定义的“通道”传递消息来进行通信。 这些通道是 任意 （您可以随意命名它们）和 双向 （您可以在两个模块中使用相同的通道名称）的。
:::

**electron 新版本默认禁止页面中直接操作 electron 的相关 api**，要想在页面中使用 electron 相关的 api，可以使用以下的解决方案：

创建一个`preload.js`文件，同时在`main.js`中设置`contextIsolation`为 true,设置 `preload` 属性为你创建的 `preload.js`

`main.js`内容

```js
const { ipcMain } = require('electron')

const mainWindow = new BrowserWindow({
  width: 800,
  height: 600,
  webPreferences: {
    nodeIntegration: true,
    contextIsolation: true,
    preload: path.join(__dirname, 'preload.js')
  }
})

// ipcMain.handle 表明主进程如何响应来自HTML页面上的按钮点击事件
ipcMain.handle('dark-mode:toggle', () => {
  if (nativeTheme.shouldUseDarkColors) {
    nativeTheme.themeSource = 'light'
  } else {
    nativeTheme.themeSource = 'dark'
  }
  return nativeTheme.shouldUseDarkColors
})

ipcMain.handle('dark-mode:system', () => {
  nativeTheme.themeSource = 'system'
})
```

`preload.js`内容

```js
const { contextBridge, ipcRenderer } = require('electron') //引入electron模块

contextBridge.exposeInMainWorld('darkMode', {
  toggle: () => ipcRenderer.invoke('dark-mode:toggle'),
  system: () => ipcRenderer.invoke('dark-mode:system')
})
```

web 页面内容

```tsx
const handleToggle = async () => {
  const isDarkMode = await window.darkMode.toggle()
  setDarkText(isDarkMode ? 'Dark' : 'Light')
}

const handleSystem = async () => {
  await window.darkMode.system()
  setDarkText('System')
}
```

## 打包

`Electron` 的核心模块中没有捆绑任何用于打包或分发文件的工具。 如果您在开发模式下完成了一个`Electron`应用，需要使用额外的工具来打包应用程序(也称为可分发文件)并分发给用户。

官方推荐的打包工具是[Electron Forge](https://www.electronforge.io/),它是一个处理 `Electron` 应用程序打包与分发的一体化工具。

将`Electron Forge`的 CLI 工具包安装到项目的 devDependencies 依赖中

```sh
npm install --save-dev @electron-forge/cli
```

使用现成的转化脚本将项目导入至`Electron Forge`

```sh
npx electron-forge import
```

转换后的 package.json 文件会添加几个脚本,同时在 devDependencies 中也安装了几个包，另外创建了一个导出配置的新 `forge.config.js` 文件

```json
{
  "scripts": {
    "start": "electron-forge start",
    "package": "electron-forge package",
    "make": "electron-forge make"
  },
  "devDependencies": {
    "@electron-forge/cli": "^6.2.1",
    "@electron-forge/maker-deb": "^6.2.1",
    "@electron-forge/maker-rpm": "^6.2.1",
    "@electron-forge/maker-squirrel": "^6.2.1",
    "@electron-forge/maker-zip": "^6.2.1",
    "@electron-forge/plugin-auto-unpack-natives": "^6.2.1"
  }
}
```

创建一个可分发版本

```sh
# 要创建一个可分发版本，需要运行makes命令，
npm run makes
```

makes 命令包含两步：

- 它将首先运行 electron-forge package ，把您的应用程序 代码与 Electron 二进制包结合起来。 完成打包的代码将会被生成到一个特定的文件夹中(out 文件夹)。
- 然后它将使用这个文件夹为每个 maker 配置生成一个可分发文件。

之后在 out 文件夹下就可以启动你的应用程序。

## 文档

- [Electron 官方文档](https://www.electronjs.org/zh/docs/latest/)
