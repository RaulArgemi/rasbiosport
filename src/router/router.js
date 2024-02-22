import { createRouter, createWebHistory } from 'vue-router';

import Register from '../views/RegisterView.vue';
import Login from '../views/LoginView.vue';
import Inicio from '../views/HomeView.vue';
import Privacidad from '../views/PrivacyPolicyView.vue';
import Perfil from '../views/ProfileView.vue';
import Ayuda from '../views/HelpView.vue';
import CategoryView from '../views/CategoryView.vue'
import AdminManageProductsVue from '@/components/AdminManageProducts.vue';
import ProductDetailsVue from '@/components/ProductDetails.vue';
import CartViewVue from '@/views/CartView.vue';
const routes = [
  { path: '/privacy', component: Privacidad },
  { path: '/', component: Inicio },
  { path: '/register', component: Register },
  { path: '/login', component: Login },
  { path: '/profile', component: Perfil, meta: { requiresAuth: true } },
  { path: '/help', component: Ayuda },
  { path: '/category/:category_name', component: CategoryView },
  { path: '/products/admin', component: AdminManageProductsVue },
  {
    path: '/products/:product_name',
    name: 'ProductDetails',
    component: ProductDetailsVue,
    props: route => ({ product_name: decodeURIComponent(route.params.product_name) }),
  },
  { path: '/cart', component: CartViewVue},
  {
    path: '/search',
    name: 'SearchResults',
    component: () => import('@/components/SearchResults.vue')
  },
  
  { path: '/cart', component: CartViewVue, meta: { requiresAuth: true }}
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = checkAuthentication();

  console.log('isAuthenticated:', isAuthenticated);


  if (to.meta.requiresAuth && !isAuthenticated) {
    console.log('Redirecting to login');
    next('/login');
  } else {
    next();
  }
});

function checkAuthentication() {
  const token = localStorage.getItem('token');
  return token !== null && token !== undefined;
}



export default router;