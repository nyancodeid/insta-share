<template>
  <section id="panel-result">
    <div class="panel-result--content">
      <div class="content-file--items">
        <div class="content-file--item" v-for="(item, index) in files" :key="index">
          <div class="item-content">
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
          <div class="item-cid">
            <input class="input-cid" type="text" readonly @focus="$event.target.select()" :value="`ipfs://${item.cid}`" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import {computed, inject} from "vue";

import { useStore } from "@src/store";
import { fileSize, copyToClipboard, generateLink } from "@src/services/helpers";

export default {
  name: "PanelResult",
  setup() {
    const notyf = inject("notyf");
    const store = useStore();

    const copyFileLink = (item) => {
      copyToClipboard(generateLink(item));

      notyf.success("Copied to clipboard!");
    }
    const openFileLink = (item) => {
      window.open(generateLink(item), "_blank");
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
        margin-bottom: 1rem;
        display: flex;
        flex-direction: column;

        border-radius: 1rem;
        background-color: rgba(0, 0, 0, 0.2);

        .item-content {
          width: 100%;
          display: flex;
          flex-direction: row;
          align-items: center;

          .item-icon {
            padding: .5rem .5rem .5rem 0;
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

              margin-bottom: .4rem;
            }
            .item-detail--subtitle {
              font-size: .7rem;
            }
          }
          .item-action {
            display: flex;
            align-items: center;
            padding: .5rem 0 .5rem .5rem;

            .icon {
              &:not(:last-child) {
                margin-right: .3rem;
              }

              &.icon-open-link {
                width: 20px;
                height: 20px;
              }
            }
          }
        }
        .item-cid {
          margin-top: .7rem;
          width: 100%;

          .input-cid {
            width: calc(100% - 16px);
            background-color: rgba(0, 0, 0, .3);
            outline: none;
            border: none;
            color: #ffffff;
            padding: 8px 8px;
            border-radius: .5rem;
            font-size: .7rem;
          }
        }
      }
    }
  }
}
</style>