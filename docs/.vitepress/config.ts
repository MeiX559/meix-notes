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
        link: '/fe/'
      },
      {
        text: '工具方法',
        link: '/tools/'
      },
      {
        text: '踩坑记录',
        link: '/pit/'
      },
      {
        text: '个人主页',
        link: 'https://github.com/MeiX559'
      }
    ],
    sidebar,
    /* 右侧大纲配置 */
    outline: {
      level: 'deep',
      label: '本页目录'
    }
  }
})
