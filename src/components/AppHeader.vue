<template>
  <header id="header">
    <div class="header-title">
      <h1>InstaShare<span class="emoji">⚡</span></h1>
      <span>Instant File Sharing powered by IPFS Protocol</span>
    </div>
    <div class="header-menu">
      <nav class="header-navbar">
        <router-link :to="{ name: 'home' }" active-class="active" exact>Home</router-link>

        <a href="https://github.com/nyancodeid/insta-share" target="_blank" rel="noopener">Github</a>

        <router-link :to="{ name: 'about' }" active-class="active" exact>About</router-link>

        <i :title="`Switch to ${isDark ? 'Light' : 'Dark'} Theme`">
          <IconLight v-if="isDark" class="icon-color" @click="toggleTheme" />
          <IconDark v-else class="icon-color" @click="toggleTheme" />
        </i>
      </nav>
    </div>
  </header>
</template>

<script>
import { ref } from "vue";

import IconLight from "virtual:vite-icons/mdi/brightness-7";
import IconDark from "virtual:vite-icons/mdi/brightness-4";

export default {
  name: "AppHeader",
  components: {
    IconLight,
    IconDark
  },
  setup() {
    const isDarkClassAvailable = document.body.classList.contains("dark-theme");

    const isDark = ref(isDarkClassAvailable);
    const toggleTheme = () => {
      document.body.classList.toggle("dark-theme");

      toggleAnimation();

      isDark.value = !isDark.value;
    }
    const toggleAnimation = () => {
      const element = document.querySelector("section#content .main");

      element.classList.remove("animated");
      void element.offsetWidth;
      element.classList.add("animated");
    }

    return {
      isDark,
      toggleTheme
    }
  }
}
</script>

<style lang="scss">
#header {
  display: flex;
  justify-content: space-between;
  align-items: center;

  padding: 1.3em 64px;
  border-bottom: 1px solid rgb(243,244,246);

  .header-title {
    h1 {
      font-size: 1.7rem;
      font-weight: 700;
      margin: 0 0 8px 0;
      color: #333;

      span.emoji {
        font-size: 1.6rem;
      }
    }
    span {
      font-size: .9rem;
    }
  }

  .header-menu {
    display: flex;
    align-items: center;

    nav {
      display: flex;
      align-items: center;
      text-align: right;
      padding: 0.3em;

      a {
        color: var(--contrast-color);
        margin-right: 16px;
        padding-bottom: 8px;
        text-decoration: none;

        border-bottom: 1px solid;
        cursor: pointer;

        &.active {
          font-weight: bold;
        }
      }

      svg {
        cursor: pointer;
        font-size: 2em;
      }
    }
  }
}

body.dark-theme {
  #header {
    border-bottom: 1px solid #1c2435;

    .header-title h1 {
      color: #ffffff;
    }
  }
}
</style>