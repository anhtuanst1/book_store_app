import './bootstrap';

import { createApp } from 'vue';
import router from './router';

import HomeComponent from './components/HomeComponent'

createApp({
    components: {
        HomeComponent
    }
}).use(router).mount('#app')