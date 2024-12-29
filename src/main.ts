import { createApp } from 'vue'
import App from './App.vue'
import './assets/styles.scss'
import { router } from './routes'
import { createPinia } from 'pinia'

const pinia = createPinia()

const app = createApp(App)
app.use(router)
app.use(pinia)

app.mount('#app')
