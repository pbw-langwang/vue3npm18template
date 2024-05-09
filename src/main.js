import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

// 引入 normalize.css
import 'normalize.css'

// 引入国际化
// import i18n from "./i18n/i18n";

// 引入阿里巴巴矢量图标文件
// import "@/assets/icon/iconfont.css";

// 引入事件总线
import '@/utils/eventBus.js'

// 引入 animation.css
// import "animate.css";

let app = createApp(App)
let pinia = createPinia()
app.use(router)
app.use(pinia)
// app.use(i18n)
app.mount('#app')
