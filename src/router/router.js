import { createRouter, createWebHistory } from 'vue-router';
import Register from '../views/RegisterView.vue'; // Importa los componentes correctos
import Login from '../views/LoginView.vue';
import Inicio from '../views/HomeView.vue';

const routes = [
  { path: '/', component: Inicio },
  { path: '/register', component: Register }, // Utiliza el componente Register
  { path: '/login', component: Login }, // Utiliza el componente Login
  // Agrega más rutas según tus necesidades
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

