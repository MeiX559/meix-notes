<script setup lang="ts">
import { ref } from 'vue'
import { useData } from 'vitepress'

import VPImage from 'vitepress/dist/client/theme-default/components/VPImage.vue'
import VPLink from 'vitepress/dist/client/theme-default/components/VPLink.vue'

import { computed } from 'vue'
interface NavLink {
  icon?: string
  title: string
  desc: string
  link?: string
  linkText?: string
}
const props = defineProps<{
  list: NavLink[]
}>()

const grid = computed(() => {
  const length = props.list.length
  if (!length) {
    return
  } else if (length === 2) {
    return 'grid-2'
  } else if (length === 3) {
    return 'grid-3'
  } else if (length % 3 === 0) {
    return 'grid-6'
  } else if (length % 2 === 0) {
    return 'grid-4'
  } else if (length % 3 === 2) {
    return 'grid-3'
  } else if (length % 3 === 1) {
    return 'grid-4'
  }
})
</script>

<template>
  <div v-if="list" class="webDoc">
    <div class="container">
      <div v-for="nav in list" :key="nav.title">
        <h2 class="title" v-html="nav.title"></h2>
        <div class="nav-items">
          <div v-for="item in nav.items" :key="item.title" class="nav-box">
            <VPLink class="NavLink nav-item" :href="item.link" :no-icon="true" v-if="item.icon">
              <div class="top">
                <VPImage class="link-icon" :image="item.icon" alt="Meix" />
              </div>
              <p v-if="item.desc" class="item-title" v-html="item.title"></p>
              <p v-if="item.desc" class="details" v-html="item.desc"></p>
            </VPLink>
            <VPLink class="NavLink item" :href="item.link" :no-icon="true" v-if="!item.icon">
              <p v-if="item.desc" class="no-icon-title" v-html="item.title"></p>
              <p v-if="item.desc" class="no-icon-details" v-html="item.desc"></p>
            </VPLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
.NavLink {
  display: block;
  border: 1px solid var(--vp-c-bg-soft);
  border-radius: 12px;
  height: 100%;
  background-color: var(--vp-c-bg-soft);
  transition: border-color 0.25s, background-color 0.25s;
}
.NavLink.link:hover {
  border-color: var(--vp-c-brand);
  background-color: var(--vp-c-bg-soft-up);
}
.nav-box {
  display: flex;
  flex-direction: column;
  text-align: center;
  padding: 18px;
  width: 18.75rem;
}
.nav-box .top {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 128px;
  height: 128px;
  margin: 0 auto;
}
.NavLink:deep(.link-icon) {
  width: 36px;
  height: 36px;
  border-radius: 50%;
}
.link-icon {
  width: 128px;
  height: 128px;
}
.title {
  margin: 0 0 0 12px;
  padding: 0;
  line-height: 24px;
  font-size: 16px;
  font-weight: 600;
  border: none;
}
.item-title {
  flex-grow: 1;
  margin-top: 8px;
  padding-top: 8px;
  line-height: 24px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
  border-top: 1px solid var(--vp-c-divider);
}
.no-icon-details {
  flex-grow: 1;
  line-height: 24px;
  padding-top: 16px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
  border-top: 1px solid var(--vp-c-divider);
}
.details {
  flex-grow: 1;
  margin-top: 0px !important;
  line-height: 24px;
  font-size: 14px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}
.webDoc {
  position: relative;
  padding: 0 24px;
}
/* @media (min-width: 640px) {
  .webDoc {
    padding: 0 48px;
  }
}
@media (min-width: 960px) {
  .webDoc {
    padding: 0;
  }
} */
.container {
  margin: 0 auto;
  max-width: 1152px;
}
.nav-items {
  display: flex;
  flex-wrap: wrap;
  margin: -8px;
}
.nav-item {
  padding: 8px;
  width: 100%;
}
/* @media (min-width: 640px) {
  .item.grid-2,
  .item.grid-4,
  .item.grid-6 {
    width: calc(100% / 2);
  }
}
@media (min-width: 768px) {
  .item.grid-2,
  .item.grid-4 {
    width: calc(100% / 2);
  }
  .item.grid-3,
  .item.grid-6 {
    width: calc(100% / 3);
  }
} */
@media (min-width: 960px) {
  .item.grid-3,
  .item.grid-6 {
    width: calc(100% / 3);
  }
  .item.grid-2 {
    width: calc(100% / 2);
  }
  .item.grid-4 {
    width: calc(100% / 4);
  }
  .nav-items {
    width: 56.25rem;
  }
}
</style>
