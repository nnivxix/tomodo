import { createPinia } from 'pinia'
import './helper/database'
import './style.css'
import './index.css'
import App from './App.vue'
import { createApp } from 'vue'
import store from './store/index_1'

// getAllTodo();

const pinia = createPinia()
const app = createApp(App)
app.use(pinia)
app.mount('#app')
