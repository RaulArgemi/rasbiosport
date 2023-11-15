<template>
    <div>
      <button @click="logout">Cerrar Sesión</button>
    </div>
  </template>
  
  <script>
  export default {
    name:'LogoutVue',
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