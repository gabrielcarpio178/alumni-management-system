import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './route/route.js'

const globalVariable = {
    data(){
        return {
            PORT: 'http://localhost:8080',
            isLogin: localStorage.getItem('token')!==null
        }
    }
}

const app = createApp(App);
app.mixin(globalVariable);
app.use(router).mount('#app')
