import { createApp } from 'vue';
import App from './App.vue';
import 'bootstrap/dist/css/bootstrap.css';
import store from './store/store'; // Ajusta la ruta según tu estructura de carpetas
import router from './router/router'; // Ajusta la ruta según tu estructura de carpetas

createApp(App)
  .use(router)
  .use(store)
  .mount('#app');
