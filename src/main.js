/*
* 依赖框架：axios、element-plus、vue-router、vuex、
*/
import './assets/css/main.css'

import { createApp } from 'vue'
import App from './App.vue'

import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import ElementPlus from 'element-plus'
import ElMessage from 'element-plus'
import 'element-plus/dist/index.css'

import axios from 'axios'

import router from './router'
import store from './store'


const app = createApp(App)

app.config.globalProperties.$message = ElMessage
app.config.globalProperties.$axios = axios


for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}

app.use(router)
app.use(store)
app.use(ElementPlus)
app.mount('#app')
