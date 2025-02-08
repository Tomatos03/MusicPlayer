/*
 * 依赖框架：axios、element-plus、vue-router、vuex、
 */
import { createApp } from "vue";
import App from "./App.vue";

import "./assets/css/main.css";
import "element-plus/dist/index.css";

import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import ElementPlus from "element-plus";

import router from "./router";
import store from "./store";

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component);
}

app.use(router);
app.use(store);
app.use(ElementPlus);
app.mount("#app");
