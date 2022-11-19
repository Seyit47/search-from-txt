import type { Plugin } from "vue";
import IconFileUpload from "@/components/icons/IconFileUpload.vue";

declare module "@vue/runtime-core" {
  export interface GlobalComponents {
    IconFileUpload: typeof IconFileUpload;
  }
}

const plugin: Plugin = {
  install(app) {
    app.component("IconFileUpload", IconFileUpload);
  },
};

export default plugin;
