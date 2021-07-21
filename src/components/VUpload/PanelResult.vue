<template>
  <section id="panel-result">
    <div class="panel-result--content">
      <SearchResult :search="search" :count="files.length" @onChanged="onSearchChanged" />

      <div class="content-file--items">
        <div class="content-file--item empty" v-if="files.length === 0">
          <span v-if="search !== ''">No results. Try other file name.</span>
          <span v-else>List of files that you upload will appear here.</span>
        </div>

        <div class="content-file--item" v-for="(item, index) in files" :key="index">
          <div class="item-content">
            <div class="item-icon">
              <i class="icon no-pointer icon-file"></i>
            </div>
            <div class="item-detail">
              <span class="item-detail--title" :title="item.file.name">{{ item.file.name }}</span>
              <span class="item-detail--subtitle">{{ fileSize(item.file.size) }} • {{ item.file.type }}</span>
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
import { ref, computed, inject } from "vue";

import { useStore } from "@src/store";
import { fileSize, copyToClipboard, generateLink } from "@src/services/helpers";

import SearchResult from "@src/components/VUpload/SearchResult.vue";

export default {
  name: "PanelResult",
  components: {
    SearchResult
  },
  setup() {
    const notyf = inject("notyf");
    const store = useStore();

    const search = ref("");

    const copyFileLink = (item) => {
      const url = generateLink(item);
      copyToClipboard(url);

      notyf.success("Copied to clipboard!");
    }
    const openFileLink = (item) => {
      const url = generateLink(item);
      window.open(url, "_blank");
    }
    const onSearchChanged = ($event) => {
      search.value = $event.target.value;
    }

    const files = computed(() => store
        .results.slice()
        .reverse()
        .filter(item => !!item.cid)
        .filter(item => {
          if (search.value === "") return true;

          return item.file.name.indexOf(search.value) >= 0;
        }));

    return {
      search,
      files,
      fileSize,
      copyFileLink,
      openFileLink,
      onSearchChanged
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
    padding: 0.8rem;
    height: calc(100% - 1.6rem);

    .content-file--items {
      display: flex;
      flex-direction: column;

      overflow-y: scroll;
      scrollbar-width: thin;
      scrollbar-color: rgba(0, 0, 0, .4) rgba(255, 255, 255, .2);

      height: calc(100% - 2.95rem);

      &::-webkit-scrollbar {
        width: .3rem;
      }
      &::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, .2);
        border-radius: 1rem;
      }
      &::-webkit-scrollbar-thumb {
        background-color: rgba(0, 0, 0, .6);
        border-radius: 1rem;
      }

      .content-file--item {
        width: calc(100% - 1.6rem);
        padding: 0.8rem;
        margin-bottom: 0.8rem;
        display: flex;
        flex-direction: column;

        border-radius: 1rem;
        background-color: rgba(0, 0, 0, 0.2);

        &.empty {
          font-size: 0.7rem;
          text-align: center;
          border-radius: 0.8rem;
        }

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