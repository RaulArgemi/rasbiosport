import jwt_decode from 'jwt-decode';
import { createRouter, createWebHistory } from 'vue-router';

import Register from '../views/RegisterView.vue';
import Login from '../views/LoginView.vue';
import Inicio from '../views/HomeView.vue';
import Privacidad from '../views/PrivacyPolicyView.vue';
import Perfil from '../views/ProfileView.vue';
import Ayuda from '../views/HelpView.vue';

const routes = [
  { path: '/privacy', component: Privacidad },
  { path: '/', component: Inicio },
  { path: '/register', component: Register },
  { path: '/login', component: Login },
  { path: '/profile', component: Perfil, meta: { requiresAuth: true } },
  { path: '/help', component: Ayuda }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = checkAuthentication();

  const token = localStorage.getItem('token');

  if (to.meta.requiresAuth && !isAuthenticated && !isTokenExpired(token)) {
    next('/login');
  } else {
    next();
  }
});

function checkAuthentication() {
  const token = localStorage.getItem('token');
  return token !== null && token !== undefined;
}

function isTokenExpired(token) {
  try {
    const decodedToken = jwt_decode(token);
    return decodedToken.exp < Date.now() / 1000;
  } catch (error) {
    console.error('Error decoding token:', error);
    return true;
  }
}

export default router;
