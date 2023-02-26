import type { DefaultTheme } from 'vitepress'

export const sidebar: DefaultTheme.Config['sidebar'] = {
  '/fe/': [
    {
      text: 'JavaScript基础知识',
      collapsed: false,
      items: [
        { text: '数据类型', link: '/fe/javascript/types/index' },
        { text: '声明变量', link: '/fe/javascript/variables/index' },
        { text: '类型转换', link: '/fe/javascript/conversions/index' },
        { text: '函数', link: '/fe/javascript/fun/index' },
        { text: '作用域', link: '/fe/javascript/scope/index' }
      ]
    },
    {
      text: 'ES6',
      link: '/fe/es6/index'
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
    }
  ],
  '/pit/': [
    {
      text: '踩坑记录',
      link: '/pit/'
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
    }
  ]
}
