<template>
  <router-view></router-view>
</template>


<script>
import "./assets/main.css"
// const url = "http://localhost:3000"

export default {
  name: 'App', 
  created() {
    // this.checkSessionAndFetchUserData();
  },
  methods: {
    // async checkSessionAndFetchUserData() {
    //   const token = localStorage.getItem('token');
    //   if (token) {
    //     try {
    //       const response = await fetch(`${url}/api/me`, {
    //         headers: {
    //           'Authorization': `Bearer ${token}`
    //         }
    //       });
    //       const userData = await response.json();
    //       if (response.ok) {
    //         this.$store.dispatch('setUser', userData);
    //       } 
    //     } catch (error) {
    //       console.error('Error al obtener los datos del usuario:', error);
    //     }
    //   }
    // }
  }
};
</script>

<style scoped></style>
