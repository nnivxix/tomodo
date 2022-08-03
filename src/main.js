import { createApp } from 'vue'

import './helper/database'
import './style.css'
import './index.css'
import App from './App.vue'
import store from './store'

// getAllTodo();

const app = createApp(App)
app.use(store)
app.mount('#app')
