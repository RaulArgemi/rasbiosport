<template>
  <router-view></router-view>
</template>


<script>
export default {
  name: 'App', // o el nombre de tu componente principal
  created() {
    this.checkSessionAndFetchUserData();
  },
  methods: {
    async checkSessionAndFetchUserData() {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await fetch('http://localhost:3000/api/me', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          const userData = await response.json();
          if (response.ok) {
            this.$store.dispatch('setUser', userData);
          } else {
            // Manejar casos como token expirado o usuario no encontrado
          }
        } catch (error) {
          console.error('Error al obtener los datos del usuario:', error);
        }
      }
    }
  }
};
</script>

<style scoped></style>
