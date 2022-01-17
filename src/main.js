import { createApp } from 'vue'
import App from './App.vue'
import 'amfe-flexible'
import router from './router'
import store from './store'
import 'vant/lib/index.css'
import Vant from 'vant'


createApp(App).use(store).use(router).use(Vant).mount('#app')
