<template>
    <div>
      <h1>Página de Inicio</h1>
      <router-link to="/login">
        <button class="btn btn-primary">Ir a Login</button>
      </router-link>
      <router-link to="/register">
        <button class="btn btn-success">Ir a Registro</button>
      </router-link>
      <router-link to="/">
        <button class="btn btn-success">HOME</button>
      </router-link>
    </div>
  </template>
  
  <script>
  export default {
    name: 'NavComponent',
  };
  </script>
  
  <style scoped></style>
  