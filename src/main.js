import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import VueAxios from "vue-axios";
import axios from "axios";
import "@/assets/animation.css"
import "@/assets/background.css"
import "@/assets/button.css"
import "@/assets/modal-style.css"
import "@/assets/text.css"
import "@/assets/link.css"
import "@/assets/hamburger-menu.css"
import '@/assets/input-style.css'
import '@/assets/image.css'
import '@/assets/table.css'

const app = createApp(App)

app.use(router)
app.use(VueAxios, axios)
app.mount('#app')