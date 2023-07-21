import { createApp } from 'vue';
import App from './App.vue';

import MomentModal from './components/MomentModal.vue'

var app = createApp(App);
app.component('MomentModal', MomentModal)
app.mount('#app')