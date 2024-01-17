<template>
    <div>
      <a class="icon" @click="logout"><LogOutIcon></LogOutIcon></a>
    </div>
  </template>
  
  <script>
  import LogOutIcon from './icons/LogOutIcon.vue';
  export default {
    name:'LogoutVue',
    components: {
      LogOutIcon,
    },
    methods: {
      logout() {
        localStorage.removeItem('token');
  
        this.$router.push('/login');
  
        console.log('Cierre de sesión exitoso');
      },
    },
  };
  </script>
  <style scoped>
  .icon {
    color: aliceblue;
  }
</style>
  
