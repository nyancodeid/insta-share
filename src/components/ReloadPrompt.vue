<template>
  <div v-if="offlineReady || needRefresh" class="pwa-toast" role="alert">
    <div class="pwa-toast--offline" v-if="offlineReady">
      <i-mdi-flash-outline />
      <span>Offline Mode Ready</span>
    </div>

    <div class="pwa-toast--update" v-if="needRefresh">
      <i-mdi-timer-sand />
      <span>Working Auto Update</span>
    </div>
  </div>
</template>

<script>
import { useRegisterSW } from "virtual:pwa-register/vue";

import { watch } from '@vue/runtime-core';

const { offlineReady, needRefresh, updateServiceWorker } = useRegisterSW();

export default {
  name: "ReloadPrompt",
  setup() {
    const watcherStop = watch([ offlineReady, needRefresh ], (now, prev) => {
      const [ offlineNow, refreshNow ] = now;
      const [ offlinePrev, refreshPrev ] = prev;

      if (offlineNow === true && offlinePrev === false) {
        setTimeout(() => {
          offlineReady.value = false;
          watcherStop();
        }, 3000);
      } else if (refreshNow === true && refreshPrev === false) {
        setTimeout(() => {
          needRefresh.value = false;
          updateServiceWorker();
          watcherStop();
        }, 3000);
      }
    });

    return {
      offlineReady,
      needRefresh
    }
  }
};
</script>

<style lang="scss">
.pwa-toast {
  position: fixed;
  right: 2em;
  bottom: 1em;
  border-radius: 4px;
  z-index: 1;

  .pwa-toast--offline,
  .pwa-toast--update {
    background-color: var(--gradient-800);
    color: var(--contrast-color);

    display: flex;
    align-items: center;
    border-radius: 1rem;
    padding: 0.8rem;
    margin-bottom: 0.8rem;
    
    font-size: 0.8rem;

    svg {
      display: inline-flex;
      margin-right: 0.4rem;
    }
  }
}
</style>