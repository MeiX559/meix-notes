---
layout: home
layoutClass: 'mei-home-layout'

hero:
  name: meixiu
  text: 前端大杂烩
  tagline: 知识是进步的阶梯，争取每天都有知识点更新
  image:
    src: /logo.png
    alt: meixiu
  actions:
    - text: 前端知识
      link: /fe/javascript/conversions/index
    - text: 提效工具
      link: /tools/online-tools
      theme: alt
    - text: 站点导航
      link: /siteLink/index
      theme: alt
features:
  - icon: 📖
    title: 前端知识
    details: 整理前端所需要的知识点 <br /> 如有异议按你的理解为主，不接受反驳
  - icon: 🧰
    title: 工具方法
    details: 整理前端的各种工具方法 <br /> 一键 CV 解决开发的各种疑难杂症
  - icon: 💡
    title: 日常记录
    details: 记录日常开发的琐碎 <br /> 日常摸鱼必备
  - icon: 🚀
    title: 站点导航
    details: 收集一些常用的站点 <br /> 站点直达
---

<style>

.mei-home-layout .VPHomeHero .name .clip{
  background:linear-gradient(120deg, #10b981 20%, #facc15);
  background-clip:text;
  -webkit-text-fill-color:transparent;
}  
.mei-home-layout .image-src:hover {
  transform: translate(-50%, -50%) rotate(666turn);
  transition: transform 59s 1s cubic-bezier(0.3, 0, 0.8, 1);
}

.mei-home-layout .details small {
  opacity: 0.8;
}
</style>
