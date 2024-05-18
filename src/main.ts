import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as Components from 'vuetify/components'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(createVuetify({
    components: {...Components}
}))

app.mount('#app')
