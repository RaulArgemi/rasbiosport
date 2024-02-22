<template>
  <div class="nav-menu">
    <ul>
      <li v-if="itsAdmin"><router-link to="/products/admin">Administración</router-link></li>
      <li><router-link to="/category/Todos">Productos</router-link></li>
      <li><router-link to="/category/Futbol">Futbol</router-link></li>
      <li><router-link to="/category/Nba">NBA</router-link></li>
      <li><router-link to="/category/ofertas">Ofertas</router-link></li>
      <li><router-link to="/help">Ayuda</router-link></li>
    </ul>
  </div>
</template>
  
<script>
import Cookies from 'js-cookie';

export default {
  name: 'NavMenu',
  data() {
    return {
      itsAdmin: false
    };
  }, 
  mounted() {
    this.checkAuthentication();
  },
  methods: {
    checkAuthentication() {
      const cookie = Cookies.get('userData');

      if (cookie) {
        try {
          const userData = JSON.parse(cookie);
          if (userData.user_role === 'admin') {
            this.itsAdmin = true;
          }
        } catch (error) {
          console.error('Error:', error);
        }
      } else {
        console.log('No hay cookie');
      }
    },
  },
};
</script>
  
<style scoped>
.nav-menu {
  background-color: #FFD600;
  text-align: center;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

li {
  display: inline-block;
}

a {
  display: block;
  color: black; 
  text-align: center;
  padding: 14px 16px;
  text-decoration: none;
}

a:hover {
  background-color: #4285F4;
}
</style>
