<template>
  <section id="content">
    <div class="main">
      <PanelUpload />
      <PanelResult />
    </div>
  </section>
</template>

<script>
import { provide } from "vue";
import { Notyf } from "notyf";

import PanelUpload from "@src/components/VUpload/PanelUpload.vue";
import PanelResult from "@src/components/VUpload/PanelResult.vue";

export default {
  name: "VUpload",
  components: {
    PanelUpload,
    PanelResult
  },
  setup() {
    const NotfyProvider = new Notyf({
      duration: 2000,
      position: {
        x: 'center',
        y: 'bottom'
      }
    })

    provide("notyf", NotfyProvider);
  }
}
</script>

<style lang="scss">
section#content {
  height: 100%;

  .main {
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: center;

    height: 100%;
    
    section {
      width: 414px;
      height: 414px;
    }
  }
}
</style>