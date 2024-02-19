<template>
  <div class="nav-menu">
    <ul>
      <li v-if="itsAdmin"><router-link to="/products/admin">PruebaAdmin</router-link></li>
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
  }, mounted() {
    this.itsAdmin=false
    this.checkAuthentication();
  },
  methods: {
    checkAuthentication() {
  try {
    const cookie = Cookies.get('userData');

    // Verificar si la cookie está presente y no es nula
    if (cookie) {
      const parsedCookie = JSON.parse(cookie);

      // Verificar si parsedCookie y user_role están definidos
      if (parsedCookie && parsedCookie.user_role) {
        console.log(parsedCookie.user_role);

        // Verificar el rol y realizar la lógica correspondiente
        if (parsedCookie.user_role === 'admin') {
          this.itsAdmin = true;
        }
      } else {
        console.error('user_role no está definido en la cookie.');
      }
    } else {
      console.error('Cookie de userData no encontrada.');
    }
  } catch (error) {
    console.error('Error al obtener y analizar la cookie de userData:', error);
  }
}

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
  