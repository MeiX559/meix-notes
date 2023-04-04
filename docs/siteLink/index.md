# 站点导航

<script setup>
  import NavLink from '../components/NavLink.vue'
  import {NAV_DATA} from './navData.js'
</script>

<NavLink :list="NAV_DATA" />
