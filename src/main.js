import { createApp } from 'vue'
import App from './App.vue'
import store from './store/store'
import PrimeVue from 'primevue/config';
import Aura from '@primevue/themes/aura';
import './assets/styles/main.css'

const app = createApp(App)
app.use(store)
app.use(PrimeVue, {
    theme: {
        preset: Aura,
        options: {
            cssLayer: {
                name: 'primevue',
                order: 'tailwind-base, primevue, tailwind-utilities'
            }
        }
    }
});
app.mount('#app')
