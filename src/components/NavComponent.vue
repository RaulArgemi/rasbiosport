<template>
  <nav>
    <router-link to="/"><img class="logo" src="../assets/rasbiosport-logo-white.png"></router-link>
    <SearchBar></SearchBar>
    <div>
      <router-link to="/cart" v-if="itsLogged"><img class="cart" src="../assets/carrito.png"></router-link>
      <router-link v-if="itsLogged" to="/profile" class="icon">
        <userIcon></userIcon>
      </router-link>
      <router-link v-if="!itsLogged" to="/login" class="icon">
        <logInIcon></logInIcon>
      </router-link>
      <router-link v-if="!itsLogged" to="/register" class="icon"><img class="header-photo"
          src="../assets/register.png"></router-link>
      <LogoutVue v-if="itsLogged"></LogoutVue>
    </div>
  </nav>
</template>

<script>
import LogoutVue from './LogoutVue.vue';
import userIcon from './icons/userIcon.vue';
import logInIcon from './icons/logInIcon.vue';
import SearchBar from './SearchBar.vue';

export default {
  name: 'NavComponent',
  components: {
    LogoutVue,
    userIcon,
    logInIcon,
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
        console.log('Usuario autenticado');
      } else {
        this.itsLogged = false
        console.log('Usuario no autenticado');
      }
    },
  },
};
</script>

<style scoped>
.icon {
  color: #fff;
  margin-right: 2.5rem;
}

nav {
  background-color: #4285F4;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

div {
  display: flex;
  justify-content: end;
  align-items: center;
  margin-right: 40px;
}

.logo {
  margin-left: 50px;
  margin-top: 5px;
  margin-bottom: 5px;
  height: 100px;
  width: 200px;
  display: flex;
  align-items: center;
}

.cart{
  height: 2.5rem;
  width: 2.5rem;
  margin: 2.5rem;
}

.search-input {
  width: 300px;
  height: 30px;
  border: none;
  border-radius: 15px;
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.5); /* Color de fondo transparente */
  color: #333; /* Color del texto */
  outline: none; /* Quita el contorno al enfocar */
}

button.search-button {
  background-color: #4285F4;
  color: #fff;
  border: none;
  border-radius: 15px;
  padding: 10px 20px;
  margin-left: -50px; /* Ajuste para superponerse ligeramente al input */
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button.search-button:hover {
  background-color: #3367D6;
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

li {
  cursor: pointer;
  padding: 5px;
}

li:hover {
  background-color: #f2f2f2;
}
</style>
