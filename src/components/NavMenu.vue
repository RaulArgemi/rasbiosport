<template>
  <div class="nav-menu">
    <ul>
      <li v-if="itsAdmin"><router-link to="/products/admin">PruebaAdmin</router-link></li>
      <li><router-link to="/category">Productos</router-link></li>
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
  }, mounted() {
    this.checkAuthentication();
  },
  methods: {
    checkAuthentication() {
      const cookie = Cookies.get('userData');
      let cooked = JSON.parse(cookie)
      if (cooked.user_role == 'admin') {
        console.log(cookie.user_role)
        this.itsAdmin = true
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
  color: white;
}
</style>
  