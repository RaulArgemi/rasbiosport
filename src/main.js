import { createApp } from 'vue';
import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.css';
import router from './router/router'; // Importa el enrutador

createApp(App)
  .use(router) // Usa el enrutador
  .mount('#app');
