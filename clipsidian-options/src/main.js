import { createApp } from 'vue';
import App from './App.vue';

import LuxonModal from './components/LuxonModal.vue'

var app = createApp(App);
app.component('LuxonModal', LuxonModal)
app.mount('#app')