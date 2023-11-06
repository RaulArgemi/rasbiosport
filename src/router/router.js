import { createRouter, createWebHistory } from 'vue-router';
import Register from '../views/RegisterView.vue'; 
import Login from '../views/LoginView.vue';
import Inicio from '../views/HomeView.vue';
import Privacidad from '../views/PrivacyPolicyView.vue';

const routes = [
  { path: '/privacy', component: Privacidad},
  { path: '/', component: Inicio },
  { path: '/register', component: Register }, 
  { path: '/login', component: Login }, 

];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

