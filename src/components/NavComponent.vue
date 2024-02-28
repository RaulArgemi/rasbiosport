<template>
  <nav>
    <router-link to="/"><img class="logo" src="../assets/rasbiosport-logo-white.png"></router-link>
    <div class="search-container">
      <SearchBar class="barra"></SearchBar>
      <div class="nav-icons">
        <router-link to="/cart" v-if="itsLogged"><img class="icono" src="../assets/carrito.png"></router-link>
        <router-link v-if="itsLogged" to="/profile" class="icon perfil"><img class="icono" src="../assets/perfil.png"></router-link>
        <router-link v-if="!itsLogged" to="/login" class="icon"><img class="icono" src="../assets/login.png"></router-link>
        <router-link v-if="!itsLogged" to="/register" class="icon"><img class="icono" src="../assets/register.png"></router-link>
        <LogoutVue v-if="itsLogged"></LogoutVue>
      </div>
    </div>
  </nav>
</template>

<script>
import LogoutVue from './LogoutVue.vue';
import SearchBar from './SearchBar.vue';

export default {
  name: 'NavComponent',
  components: {
    LogoutVue,
    SearchBar
  },
  data() {
    return {
      itsLogged: false,
    };
  },
  mounted() {
    this.checkAuthentication();
  },
  methods: {
    checkAuthentication() {
      const token = localStorage.getItem('token');
      if (token !== null && token !== undefined) {
        this.itsLogged = true
        // console.log('Usuario autenticado');
      } else {
        this.itsLogged = false
        // console.log('Usuario no autenticado');
      }
    },
  },
};
</script>

<style scoped>
nav {
  background-color: #2768d1;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  margin-left: 50px;
  margin-right: auto; 
  height: 100px;
  width: auto; 
}

.search-container {
  display: flex;
  align-items: center;
  width: 100%;
}

.nav-icons {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.cart {
  height: 2.5rem;
  width: 2.5rem;
  margin-right: 2.5rem;
}

.icon {
  color: #fff;
  margin-right: 2.5rem;
  height: 1rem;
  margin-bottom: 1.5rem;
}

.icono{
  width: 3rem;
  height: 3rem;
}

.barra{
  margin-right: 17rem;
}

.perfil{
  margin-bottom: 2rem;
  margin-left: 2.3rem;
}
</style>
