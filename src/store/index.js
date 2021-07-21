import { defineStore } from "pinia";
import Storage from "@src/services/storage";

const db = new Storage("app");

db.read();
db.data ||= { version: "0.0.1", results: [] };

export const useStore = defineStore({
  id: "store",
  state() {
    return {
      files: [],
      results: db.data.results
    }
  },
  actions: {
    resetFiles() {
      this.files = [];
    },
    addFiles(...files) {
      this.files.push(...files);
    },
    addResults(...files) {
      this.results.push(...files);
      this.results = this.results.filter(({ cid }) => !!cid);

      db.data.results = [ ...this.results ];
      db.write();
    },
    /**
     * Update Shorten Link for File
     * @param {String} cid 
     * @param {String} link 
     */
    updateShortenLink(cid, link) {
      this.results = this.results.map(result => {
        if (result.cid === cid) {
          return { ...result, shorten: link }
        }

        return result;
      });

      db.data.results = [ ...this.results ];
      db.write();
    }
  }
});