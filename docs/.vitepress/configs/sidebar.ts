import type { DefaultTheme } from 'vitepress'

export const sidebar: DefaultTheme.Config['sidebar'] = {
  '/fe/': [
    {
      text: 'JavaScript基础知识',
      collapsed: false,
      items: [
        { text: '数据类型', link: '/fe/javascript/types/index' },
        // { text: '声明变量', link: '/fe/javascript/variables/index' },
        { text: '类型转换', link: '/fe/javascript/conversions/index' }
        // { text: '函数', link: '/fe/javascript/fun/index' },
        // { text: '作用域', link: '/fe/javascript/scope/index' }
      ]
    },
    {
      text: 'ES6',
      link: '/fe/es6/index'
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
      text: 'CSS 知识概览',
      collapsed: false,
      items: [
        { text: 'CSS居中完全指南', link: '/fe/css/middle' },
        { text: 'CSS 文本换行', link: '/fe/css/wrap_text' },
        { text: 'width和height作用细节', link: '/fe/css/wh' },
        { text: 'line-height', link: '/fe/css/line-height' },
        { text: 'mask 属性介绍', link: '/fe/css/mask' },
        { text: 'CSS 预处理器', link: '/fe/css/preprocessor' }
      ]
    },
    {
      text: '浏览器相关',
      collapsed: false,
      items: [
        // { text: '浏览器工作原理', link: '/fe/browser/workPrinciple' },
        // { text: '前端缓存指南', link: '/fe/browser/cache' },
        { text: '浏览器监听切屏功能实现', link: '/fe/browser/visibilitychange' }
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
        { text: 'base64格式的数据实现原理', link: '/daily/base64' }
      ]
    },
    {
      text: 'canvas 相关',
      collapsed: false,
      items: [
        { text: 'canvas 入门指南', link: '/daily/canvas/canvas' },
        { text: 'canvas API', link: '/daily/canvas/canvasApi' }
      ]
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
      link: '/tools/git'
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
