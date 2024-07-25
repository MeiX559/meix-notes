import { defineConfig, PageData } from 'vitepress'
import { createWriteStream } from 'node:fs'
import { resolve } from 'node:path'
import { SitemapStream } from 'sitemap'
import { sidebar } from './configs/sidebar'
import { nav } from './configs/nav'

const links: { url: string; lastmod: PageData['lastUpdated'] }[] = []

export default defineConfig({
  outDir: '../dist',
  head: [['link', { rel: 'icon', href: '/logo.png' }]],

  lang: 'zh-CN',
  title: 'meixiu',
  description: 'meixiu 的成长之路',
  lastUpdated: true,
  /* 主题配置 */
  themeConfig: {
    i18nRouting: false,
    logo: '/logo.png',
    nav,
    sidebar,
    /* 右侧大纲配置 */
    outline: {
      level: 'deep',
      label: '本页目录'
    },
    socialLinks: [{ icon: 'github', link: 'https://github.com/MeiX559' }],

    editLink: {
      pattern: 'https://github.com/MeiX559',
      text: '在 GitHub 上编辑此页面'
    },
    footer: {
      message: '如有转载或 CV 的请标注本站原文地址',
      copyright: 'Copyright © 2023-present  <a href="https://github.com/MeiX559">meixiu</a>'
    },
    darkModeSwitchLabel: '外观',
    returnToTopLabel: '返回顶部',
    lastUpdatedText: '上次更新',
    docFooter: {
      prev: '上一篇',
      next: '下一篇'
    }
  }
  /* 生成站点地图 */
  // transformHtml: (_, id, { pageData }) => {
  //   if (!/[\\/]404\.html$/.test(id))
  //     links.push({
  //       url: pageData.relativePath.replace(/((^|\/)index)?\.md$/, '$2'),
  //       lastmod: pageData.lastUpdated
  //     })
  // },
  // buildEnd: async ({ outDir }) => {
  //   const sitemap = new SitemapStream({ hostname: 'https://meix.netlify.app/' })
  //   const writeStream = createWriteStream(resolve(outDir, 'sitemap.xml'))
  //   sitemap.pipe(writeStream)
  //   links.forEach((link) => sitemap.write(link))
  //   sitemap.end()
  //   await new Promise((r) => writeStream.on('finish', r))
  // }
})
