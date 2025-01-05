import { createApp } from 'vue'
import App from './App.vue'
import './assets/styles.scss'
import { router } from './routes'
import { createPinia } from 'pinia'
import ToastPlugin from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-bootstrap.css'
const pinia = createPinia()

const app = createApp(App)
app.use(router)
app.use(pinia)
app.use(ToastPlugin)

app.mount('#app')
