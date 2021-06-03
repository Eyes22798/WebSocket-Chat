import { createApp } from 'vue'
import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'
import { store } from './store'
import router from "./router"
import App from './App.vue'
import VueSocketIO from 'vue-socket.io'
import SocketIO from 'socket.io-client'
import { axiosPlugin } from './plugins/axios'

import 'normalize.css/normalize.css'
import '#/css/base.scss'
import '#/css/var.scss'

const app = createApp(App)

// socket连接
app.config.globalProperties.$socket = new VueSocketIO({
  // debug: true,
  connection: SocketIO(import.meta.env.VITE_SOCKET_URL as any),
  // vuex: {
  //   store,
  //   actionPrefix: "SOCKET_",
  //   mutationPrefix: "SOCKET_"
  // }
})

app.use(ElementPlus)
app.use(store)
app.use(router)
app.use(axiosPlugin)

app.mount('#app')

