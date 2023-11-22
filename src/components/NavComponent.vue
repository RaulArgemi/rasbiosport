<template>
  <nav>
    <router-link to="/"><img class="logo" src="../assets/rasbiosport-logo-white.png"></router-link>
    <input type="text" placeholder="Buscar..." class="search-input">
    <router-link to="/profile" class="icon"><userIcon></userIcon></router-link>
    <div>
      <router-link to="/login" class="icon"><logInIcon></logInIcon></router-link>
      <router-link to="/register" class="icon"><img class="header-photo" src="../assets/register.png"></router-link>
      <LogoutVue></LogoutVue>
    </div>
  </nav>
</template>

<script>
import LogoutVue from './LogoutVue.vue';
import userIcon from './icons/userIcon.vue';
import logInIcon from './icons/logInIcon.vue';
export default {
  name:'NavComponent',
  components: {
    LogoutVue, 
    userIcon,
    logInIcon,
  },
};
</script>

<style scoped>
.icon {
  color: aliceblue;
}
nav{
  background-color: #4285F4;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
div{
  display: flex;
  justify-content: end;
  align-items: center;
  margin-right: 40px;
}
.logo{
  margin-left: 50px;
  margin-top: 5px;
  margin-bottom: 5px;
  height: 100px;
  width: 200px;
  display: flex;
  align-items: center;
}
.search-input{
  width: 900px;
  height: 50px;
  border-radius: 15px;
}
.header-photo{
  height: 2.5em;
  width: 2.5em  ;
  margin-left: 10px;
  margin-right: 10px;
}
</style>
