<template>
  <section id="content">
    <div class="main animated">
      <div class="main-content--shadow s-index-1"></div>
      <div class="main-content--shadow s-index-2"></div>
      <div class="main-content">
        <PanelUpload />
        <PanelResult />
      </div>
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
      },
      types: [
        {
          type: 'loading',
          background: 'orange',
          duration: 0,
          dismissible: true,
          icon: {
            className: 'icon icon-loading',
            tagName: 'i'
          }
        },
      ]
    })

    provide("notyf", NotfyProvider);
  }
}
</script>

<style lang="scss">
section#content {
  position: relative;
  height: 100%;

  .main {
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: center;

    height: 100%;

    .main-content {
      position: absolute;
      z-index: 3;

      display: flex;
      border-radius: 1em;
      box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1),0 4px 6px -2px rgba(0,0,0,0.05);
      
      section {
        width: 414px;
        height: 414px;
      }
    }

    .main-content--shadow {
      position: absolute;

      width: 878px;
      height: 464px;

      box-shadow: rgba(0,0,0,0) 0px 0px 0px 0px, rgba(0,0,0,0) 0px 0px 0px 0px, 0 10px 15px -3px rgba(0,0,0,0.1),0 4px 6px -2px rgba(0,0,0,0.05);
      border-radius: 1em;
      
      &.s-index-1 {
        z-index: 1;
        background-image: var(--liniear-gradient-color-1);
        transition: transform .3s ease-in-out;

        transform: rotate(2deg);
      }
      &.s-index-2 {
        z-index: 2;
        background-image: var(--liniear-gradient-color-2);
        transition: transform .3s ease-in-out;

        transform: rotate(-2deg);

        &.animate {
          animation-name: shadow-index--2;
          animation-duration: 1s;
        }
      }
    }

    &.animated {
      .main-content--shadow {
        &.s-index-1 {
          animation-name: shadow-index--1;
          animation-duration: 1s;
        }
        &.s-index-2 {
          animation-name: shadow-index--2;
          animation-duration: 1s;
        }
      }
    }
  }
}

@keyframes shadow-index--1 {
  from {
    transform: rotate(-2deg);
  }
  to { 
    transform: rotate(2deg);
  }
}
@keyframes shadow-index--2 {
  from {
    transform: rotate(2deg);
  }
  to { 
    transform: rotate(-2deg);
  }
}

</style>