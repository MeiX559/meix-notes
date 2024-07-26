<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'

const { theme, page, site } = useData()

const hasSidebar = computed(() => {
  return site.value.themeConfig.sidebar !== false
})

const isDocFooterVisible = computed(() => {
  const { footer = {} } = theme.value
  return footer.copyright
})

const lastUpdatedText = computed(() => {
  return theme.value.lastUpdatedText || '上次更新'
})

const lastUpdatedDate = computed(() => {
  return page.value.lastUpdated
})
</script>

<template>
  <div v-if="isDocFooterVisible" v-show="hasSidebar" class="sh-doc-footer">
    <p class="sh-doc-footer-copyright" v-if="theme.footer?.copyright">
      版权所有 © 2023-{{ new Date().getFullYear() }} meixiu
    </p>
    <p v-if="lastUpdatedDate">
      {{ lastUpdatedText }}：{{ new Date(lastUpdatedDate).toLocaleString() }}
    </p>
  </div>
</template>

<style scoped>
.sh-doc-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 24px;
  border-top: 1px solid var(--vp-c-gutter);
  padding: 24px 0;
  line-height: 24px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}
</style>
