import { createApp } from 'vue'
import App from './App.vue'
import 'amfe-flexible'
import router from './router'
import store from './store'
import 'vant/lib/index.css'
import Vant from 'vant'
import API from '@/api/index' 
const app=createApp(App)
app.config.globalProperties.$API = API

app.use(store).use(router).use(Vant).mount('#app')
