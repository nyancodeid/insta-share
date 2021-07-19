<template>
  <section id="panel-result">
    <div class="panel-result--content">
      <div class="content-file--items">
        <div class="content-file--item" v-for="(item, index) in files" :key="index">
          <div class="item-icon">
            <i class="icon no-pointer icon-file"></i>
          </div>
          <div class="item-detail">
            <span class="item-detail--title" :title="item.file.name">{{ item.file.name }}</span>
            <span class="item-detail--subtitle">{{ fileSize(item.file.size) }} - {{ item.file.type }}</span>
          </div>
          <div class="item-action">
            <i class="icon icon-copy" title="Copy to clipboard" @click="copyFileLink(item)"></i>
            <i class="icon icon-open-link" title="Open Link" @click="openFileLink(item)"></i>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { computed } from "vue";

import { useStore } from "@src/store";
import { fileSize, copyToClipboard } from "@src/services/helpers";

export default {
  name: "PanelResult",
  setup() {
    const store = useStore();

    const copyFileLink = (item) => {
      copyToClipboard(`https://cloudflare-ipfs.com/ipfs/${item.cid}`);
    }
    const openFileLink = (item) => {
      window.open(`https://cloudflare-ipfs.com/ipfs/${item.cid}`, "_blank");
    }

    const files = computed(() => store
        .results.slice()
        .reverse()
        .filter(item => !!item.cid));

    return {
      files,
      fileSize,
      copyFileLink,
      openFileLink
    }
  }
}
</script>

<style lang="scss">
section#panel-result {
  background-color: rgba(255, 255, 255, .2);
  border-top-right-radius: 1rem;
  border-bottom-right-radius: 1rem;

  .panel-result--content {
    padding: 1rem;
    overflow-y: scroll;
    height: calc(100% - 2rem);

    .content-file--items {
      display: flex;
      flex-direction: column;

      .content-file--item {
        width: calc(100% - 2rem);
        padding: 1rem;
        margin-bottom: .5rem;
        display: flex;
        flex-direction: row;
        align-items: center;

        border-radius: 1rem;
        background-color: rgba(0, 0, 0, 0.2);

        .item-icon {
          padding: .5rem;
        }
        .item-detail {
          display: flex;
          flex-direction: column;
          flex: 1;

          .item-detail--title {
            font-size: .7rem;
            width: 220px;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          .item-detail--subtitle {
            font-size: .7rem;
          }
        }
        .item-action {
          display: flex;
          align-items: center;
          padding: .5rem;

          .icon {
            margin-right: .3rem;

            &.icon-open-link {
              width: 20px;
              height: 20px;
            }
          }
        }
      }
    }
  }
}
</style>