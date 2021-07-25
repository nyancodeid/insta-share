<template>
  <AppHeader />

  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" :key="$route.name"/>
    </keep-alive>
  </router-view>

  <ReloadPrompt />
</template>

<script>
import AppHeader from "@src/components/AppHeader.vue";
import ReloadPrompt from "@src/components/ReloadPrompt.vue";

export default {
  name: "App",
  components: {
    AppHeader,
    ReloadPrompt
  }
}
</script>
