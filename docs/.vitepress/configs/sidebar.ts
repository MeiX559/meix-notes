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
    }
  ],
  '/pit/': [
    {
      text: '踩坑记录',
      link: '/pit/'
    }
  ]
}
