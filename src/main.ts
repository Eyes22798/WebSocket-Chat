import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import { store } from './store'
import router from "./router"
import App from './App.vue'
import { axiosPlugin } from './plugins/axios'

const app = createApp(App)

app.use(ElementPlus)
app.use(store)
app.use(router)
app.use(axiosPlugin)
app.mount('#app')

