<template>
  <section id="panel-upload">
    <div class="content panel-upload--content">
      <div class="panel-upload--dropzone" @drop.prevent="onDropHandler" @dragover.prevent>
        <input type="file" multiple ref="file" @change="onFileChangedHandler" />

        <div class="dropzone-label" @click="openSelectFile">
          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#FFFFFF"><path d="M0 0h24v24H0V0z" fill="none"/><path d="M9 16h6v-6h4l-7-7-7 7h4v6zm3-10.17L14.17 8H13v6h-2V8H9.83L12 5.83zM5 18h14v2H5z"/></svg>
          <span>Drop files here or click to select files.</span>

          <div class="dropzone-is-loading" :class="{ active: (fileCount > 0) }">
            <div class="dropzone-loading--bar"></div>
          </div>
          <span v-show="(fileCount > 0)">{{ (fileCount - finished) }} of {{ fileCount }} being processed</span>
        </div>

        <div class="dropzone-details">
          <div class="dropzone-detail">{{ result.count }} files</div>
          <div class="dropzone-detail">{{ fileSize(result.size) }}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import {computed, inject, reactive, ref} from "vue";
import { useStore } from "@src/store";
import { uploadBlob } from "@src/services/nft.js"
import {fileSize} from "@src/services/helpers";

export default {
  name: "PanelUpload",
  setup() {
    const notyf = inject("notyf");
    const file = ref(null);
    const finished = ref(0);

    const store = useStore();

    const onDropHandler = ($event) => {
      file.value.files = $event.dataTransfer.files;

      onFileChangedHandler();
    }
    const openSelectFile = () => {
      file.value.click();
    }

    const uploadFileHandler = (file) => {
      return uploadBlob(file).then(result => {
        finished.value++;
        return result;
      });
    }
    const onFileChangedHandler = async () => {
      store.addFiles(...file.value.files);

      const files = store.files.map(file => uploadFileHandler(file));

      try {
        let results = await Promise.all(files);

        store.addResults(...results.map(([ error, data ]) => data));
        store.resetFiles();

        file.value.value = null;

        notyf.success(`${results.length} files successfully processed.`);
      } catch (error) {
        console.error(error)
        notyf.error(`Opss!, something error while processing your files.`);
      } finally {
        finished.value = 0;
      }
    }

    const fileCount = computed(() => {
      return store.files.length;
    });
    const result = computed(() => {
      return {
        count: store.results.length,
        size: store.results.reduce((sum, result) => {
          return sum + result.file.size;
        }, 0)
      }
    });

    return {
      finished,
      file,
      fileCount,
      result,
      fileSize,
      onDropHandler,
      openSelectFile,
      onFileChangedHandler,
    }
  },
}
</script>

<style lang="scss">
section#panel-upload {
  background-color: rgba(255, 255, 255, .1);
  border-top-left-radius: 1rem;
  border-bottom-left-radius: 1rem;

  .panel-upload--content,
  .panel-upload--content .panel-upload--dropzone {
    width: 100%;
    height: 100%;
  }

  .panel-upload--dropzone {
    position: relative;
    cursor: pointer;
    overflow: hidden;

    display: flex;
    align-content: center;
    align-items: center;
    justify-content: center;

    input {
      display: none;
    }
    .dropzone-label {
      display: flex;
      flex-direction: column;
      align-items: center;

      svg {
        height: 48px;
        width: 48px;
        margin-bottom: 1rem;
      }

      span {
        font-size: .8rem;
      }
    }
    .dropzone-details {
      position: absolute;
      display: flex;

      bottom: 1rem;
      left: 1rem;

      .dropzone-detail {
        background-color: rgba(255, 255, 255, .1);
        border-radius: 1rem;
        padding: .4rem .8rem;
        font-size: .8rem;
        margin-right: .6rem;
      }
    }

    .dropzone-is-loading {
      opacity: 0;

      position: relative;
      height: 4px;
      display: block;
      width: 150px;
      background-color: rgba(0, 0, 0, .25);
      border-radius: 2px;
      margin: 1.5rem 0 1rem 0;
      overflow: hidden;

      &.active {
        opacity: 1;
      }

      .dropzone-loading--bar {
        background-color: var(--primary-color);

        &:before {
          content: '';
          position: absolute;
          background-color: inherit;
          top: 0;
          left: 0;
          bottom: 0;
          will-change: left, right;
          animation: indeterminate 2.1s cubic-bezier(0.65, 0.815, 0.735, 0.395) infinite;
        }
        &:after {
          content: '';
          position: absolute;
          background-color: inherit;
          top: 0;
          left: 0;
          bottom: 0;
          will-change: left, right;
          animation: indeterminate-short 2.1s cubic-bezier(0.165, 0.84, 0.44, 1) infinite;
          animation-delay: 1.15s;
        }
      }
    }
  }
}

@keyframes indeterminate {
  0% {
    left: -35%;
    right: 100%;
  }
  60% {
    left: 100%;
    right: -90%;
  }
  100% {
    left: 100%;
    right: -90%;
  }
}

@keyframes indeterminate-short {
  0% {
    left: -200%;
    right: 100%;
  }
  60% {
    left: 107%;
    right: -8%;
  }
  100% {
    left: 107%;
    right: -8%;
  }
}
</style>