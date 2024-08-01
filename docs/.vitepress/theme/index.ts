import { h } from 'vue'
import { EnhanceAppContext, useData } from 'vitepress'
import DefaultTheme from 'vitepress/theme'
import DocFooter from './components/docFooter.vue'
import { createMediumZoomProvider } from './hooks/useMediumZoom'

import './style/index.css'

export default {
  extends: DefaultTheme,
  Layout: () => {
    const props: Record<string, any> = {}
    // 获取 frontmatter
    const { frontmatter } = useData()

    /* 添加自定义 class */
    if (frontmatter.value?.layoutClass) {
      props.class = frontmatter.value.layoutClass
    }

    return h(DefaultTheme.Layout, props, {
      /**
       * 相关插槽
       * https://vitepress.dev/guide/extending-default-theme#layout-slots
       * https://github.com/vuejs/vitepress/blob/main/src/client/theme-default/Layout.vue
       */
      'doc-after': () => h(DocFooter)
    })
  },
  enhanceApp({ app, router }: EnhanceAppContext) {
    createMediumZoomProvider(app, router)
  }
}
