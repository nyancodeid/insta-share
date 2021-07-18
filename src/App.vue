<template>
  <AppHeader />

  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" :key="$route.name"/>
    </keep-alive>
  </router-view>
</template>

<script>
import AppHeader from "@src/components/AppHeader.vue";

export default {
  name: "App",
  components: {
    AppHeader
  }
}
</script>
