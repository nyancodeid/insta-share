import { createApp } from 'vue'
import { createPinia } from "pinia";
import { isRunningOnPWA } from "@src/services/helpers";

import App from '@src/App.vue'
import router from "@src/router";

import "@src/styles/styles.scss";
import "notyf/notyf.min.css";

const app = createApp(App);
const pinia = createPinia();

app.use(pinia).use(router);

if (isRunningOnPWA) window.resizeTo(890, 640);

app.mount('#app');
