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

  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/login'); 
  } else {
    next();
  }
});


function checkAuthentication() {

  const token = localStorage.getItem('token');

  return token !== null && token !== undefined
}


export default router;
