<template>
  <section id="content">
    <div class="main">
      <section id="about">
        <h1>InstaShare<span class="emoji">⚡</span></h1>
        <p>a Instant File Sharing powered by IPFS Protocol. Build with <a href="https://v3.vuejs.org/" target="_blank">Vue 3</a> and
          <a href="https://vitejs.dev/" target="_blank">ViteJS</a>.</p>
        <p>InstaShare (Instant Share) is a simple web-based application that simply upload your files to Interplanetary File System (IPFS) Network using NFT Storage API. We created free account with Public API Key so you can use it instantly without creating API Key first.</p>
        <p>InstaShare build with Latest Web Technology that makes hopefully can access this app even in offline mode (cache-first). And the other cool thing is PWA (Progressive Web App) makes this app installable on Android devices, allow us to use this app to run native-like on an Android.</p>

        <p>Build with &#x1f604; by NyanCodeID</p>
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
      color: #ffffff;
      font-weight: bold;
      border-bottom: 1px solid #ffffff;
      text-decoration: none;
    }

    p {
      line-height: 1.7;
    }
  }
}
</style>