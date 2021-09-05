<template>
  <section id="content">
    <div class="main">
      <section id="about">
        <h1>InstaShare<span class="emoji">⚡</span></h1>
        <p>an Instant File Sharing powered by IPFS Protocol. Build with <a href="https://v3.vuejs.org/" target="_blank" rel="noopener">Vue 3</a> and
          <a href="https://vitejs.dev/" target="_blank" rel="noopener">ViteJS</a>.</p>
        <p>InstaShare (Instant Share) is a simple web-based application that simply upload your files to Interplanetary File System (IPFS) Network using <a href="https://infura.io/product/ipfs" target="_blank" rel="noopener">Infura API</a>.</p>
        <p>InstaShare build with Latest Web Technology that makes hopefully can access this app even in offline mode (cache-first). And the other cool thing is PWA (Progressive Web App) makes this app installable on Android devices, allow us to use this app to run native-like on an Android.</p>

        <p>Build with &#x1f604; by <a href="https://github.com/nyancodeid" rel="noopener" class="author">nyancodeid</a></p>
      </section>
    </div>
  </section>
</template>

<script>
export default {
  name: "VAbout"
}
</script>

<style lang="scss">
section#content .main {
  section#about {
    width: 70vw;
    height: auto;

    h1 {
      img {
        display: inline-block;
      }
    }

    a {
      color: var(--contrast-color);
      font-weight: bold;
      border-bottom: 1px solid var(--contrast-color);
      text-decoration: none;

      &.author {
        padding: 6px 12px;
        border-radius: 8px;
        background-color: var(--gradient-100);
        color: var(--icon-color);
        font-size: 0.85rem;

        border-bottom: none;
      }
    }

    p {
      line-height: 1.7;
    }
  }
}

body.dark-theme {
  section#content .main section#about .author {
    background-color: var(--gradient-800);
  }
}
</style>