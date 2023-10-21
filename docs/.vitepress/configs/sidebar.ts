import type { DefaultTheme } from 'vitepress'

export const sidebar: DefaultTheme.Config['sidebar'] = {
  '/fe/': [
    {
      text: 'JavaScript基础知识',
      collapsed: false,
      items: [
        { text: '数据类型', link: '/fe/javascript/types/index' },
        // { text: '声明变量', link: '/fe/javascript/variables/index' },
        { text: '类型转换', link: '/fe/javascript/conversions/index' },
        { text: '作用域', link: '/fe/javascript/scope/index' },
        { text: '原型与原型链', link: '/fe/javascript/prototype/index' },
        { text: '继承', link: '/fe/javascript/inherit/index' },
        { text: 'JavaScript事件', link: '/fe/javascript/index' },
        { text: 'JavaScript API', link: '/fe/javascript/api' }
        // { text: '函数', link: '/fe/javascript/fun/index' },
      ]
    },
    {
      text: 'ES6',
      link: '/fe/es6/index'
    },
    {
      text: 'CSS 知识概览',
      collapsed: true,
      items: [
        { text: 'CSS居中完全指南', link: '/fe/css/middle' },
        { text: 'CSS 文本换行', link: '/fe/css/wrap_text' },
        { text: 'width和height作用细节', link: '/fe/css/wh' },
        { text: 'line-height', link: '/fe/css/line-height' },
        { text: 'mask 属性介绍', link: '/fe/css/mask' },
        { text: 'CSS 预处理器', link: '/fe/css/preprocessor' },
        { text: 'revert-layer全局关键字', link: '/fe/css/revert-layer' },
        { text: 'CSS炫酷效果', link: '/fe/css/special-effects' },
        { text: 'CSS揭秘', link: '/fe/css/know-css' }
      ]
    },
    {
      text: 'React',
      collapsed: false,
      items: [
        { text: 'React前置知识', link: '/fe/react/pre-konwledge' },
        { text: 'React源码基础', link: '/fe/react/index' },
        { text: 'React18 源码解析', link: '/fe/react/source' },
        { text: 'React常见面试题', link: '/fe/react/interview' }
      ]
    },
    {
      text: 'TypeScript',
      collapsed: false,
      items: [
        { text: 'TypeScript 入门手册', link: '/fe/typeScript/base' },
        // { text: 'TypeScript 泛型', link: '/fe/typeScript/gp' },
        { text: 'TypeScript 编译配置', link: '/fe/typeScript/config' }
      ]
    },
    {
      text: '前端工程化相关',
      collapsed: true,
      items: [
        { text: 'Prettier', link: '/fe/config/prettier' },
        { text: 'Tailwind CSS 配置项', link: '/fe/config/tailwind' }
      ]
    },
    {
      text: '浏览器相关',
      collapsed: false,
      items: [
        { text: '浏览器工作原理', link: '/fe/browser/workPrinciple' },
        { text: '前端缓存指南', link: '/fe/browser/cache' },
        { text: '浏览器监听切屏功能实现', link: '/fe/browser/visibilitychange' },
        { text: '浏览器安全相关', link: '/fe/browser/safety' }
      ]
    }
  ],
  '/pit/': [
    {
      text: '踩坑记录',
      link: '/pit/'
    }
  ],
  '/daily/': [
    {
      text: '日常记录',
      collapsed: false,
      items: [
        { text: '前端页面截图解决方案', link: '/daily/screenshot' },
        { text: 'base64格式的数据实现原理', link: '/daily/base64' },
        { text: 'Server-Sent Events ', link: '/daily/sse' },
        { text: '浅谈Commonjs和Es Module', link: '/daily/module' },
        { text: 'ArrayBuffer、Blob、File、FileReader', link: '/daily/binary/index' },
        { text: '抽象语法树 AST', link: '/daily/ast' }
        // { text: '视频播放器库', link: '/daily/video' }
      ]
    },
    {
      text: '前端小知识',
      link: '/daily/feKnowledge/index'
    },
    {
      text: '前端踩坑记录',
      link: '/daily/pit/index'
    },
    {
      text: '桌面应用开发',
      link: '/daily/electron/index'
    },
    // {
    //   text: '打包编译相关',
    //   collapsed: false,
    //   items: [
    //     { text: 'Vite', link: '/daily/pack/vite' },
    //     { text: 'Webpack', link: '/daily/pack/webpack' },
    //     { text: 'Rollup', link: '/daily/pack/rollup' }
    //   ]
    // },
    {
      text: 'canvas 相关',
      collapsed: false,
      items: [
        { text: 'canvas 入门指南', link: '/daily/canvas/canvas' },
        { text: 'canvas API', link: '/daily/canvas/canvasApi' }
      ]
    },
    {
      text: 'Three.js 相关',
      collapsed: false,
      items: [
        { text: 'Three.js理论知识', link: '/daily/three/index' }
        // { text: 'Three.js实践', link: '/daily/three/three' }
      ]
    },
    {
      text: '通用方法总结',
      link: '/daily/fun/index'
    },
    {
      text: 'SVG',
      link: '/daily/svg'
    },
    {
      text: 'Taro跨端开发小程序',
      link: '/daily/taro'
    }
  ],
  '/tools/': [
    {
      text: '常用工具/方法',
      collapsed: false,
      items: [
        { text: 'VSCode 配置', link: '/tools/vscode' },
        { text: '在线工具', link: '/tools/online-tools' }
      ]
    },
    {
      text: 'Git相关',
      collapsed: false,
      items: [
        { text: 'git相关命令', link: '/tools/git/git' },
        // { text: 'git相关原理', link: '/tools/git/principle' }
        { text: '浅谈git底层原理', link: '/tools/git/underPrinciple' }
      ]
    },
    {
      text: 'JavaScript 常用方法',
      collapsed: false,
      items: [
        { text: 'String 方法', link: '/tools/javascript/index' },
        { text: 'JS 数组方法', link: '/tools/javascript/arr' },
        { text: 'JS 对象方法', link: '/tools/javascript/obj' },
        { text: '时间日期相关', link: '/tools/javascript/date' },
        { text: '循环方法', link: '/tools/javascript/circulate' }
      ]
    },
    {
      text: 'npm 相关',
      collapsed: false,
      items: [
        { text: 'npm 常用命令', link: '/tools/npm/command' }
        // { text: 'npm scripts', link: '/tools/npm/scripts' }
      ]
    }
  ],
  '/sourceCode': [
    {
      text: 'omit源码阅读',
      link: '/sourceCode/omit'
    },
    {
      text: 'await-to-js源码阅读',
      link: '/sourceCode/await'
    },
    {
      text: 'arrify源码阅读',
      link: '/sourceCode/arrify'
    },
    {
      text: 'axios相关',
      collapsed: false,
      items: [
        // { text: 'axios使用手册', link: '/sourceCode/axiosUserManual' },
        { text: 'axios源码阅读', link: '/sourceCode/axios' }
      ]
    },
    {
      text: '前端截图相关',
      collapsed: false,
      items: [
        { text: 'dom-to-image', link: '/sourceCode/dom-to-image' },
        { text: 'html2canvas', link: '/sourceCode/html2canvas' }
      ]
    }
  ]
}
