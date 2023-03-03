import { defineConfig } from 'vitepress'

import { sidebar } from './configs/sidebar'

export default defineConfig({
  outDir: '../dist',

  lang: 'zh-CN',
  title: 'meixiu',
  description: 'meixiu 的成长之路',

  /* 主题配置 */
  themeConfig: {
    i18nRouting: false,
    logo: '/logo.png',
    nav: [
      {
        text: '前端知识',
        link: '/fe/javascript/conversions/index'
      },
      {
        text: '工具方法',
        link: '/tools/vscode'
      },
      // {
      //   text: '踩坑记录',
      //   link: '/pit/'
      // },
      // {
      //   text: '日常记录',
      //   link: '/daily/screenshot'
      // },
      {
        text: '前端书籍',
        link: '/books/'
      },
      {
        text: '个人主页',
        link: '/about/'
      }
    ],
    sidebar,
    /* 右侧大纲配置 */
    outline: {
      level: 'deep',
      label: '本页目录'
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/MeiX559' }],

    footer: {
      message: '如有转载或 CV 的请标注本站原文地址',
      copyright: 'Copyright © 2023 meixiu'
    },
    darkModeSwitchLabel: '外观',
    returnToTopLabel: '返回顶部',
    lastUpdatedText: '上次更新',
    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    }
  }
})
