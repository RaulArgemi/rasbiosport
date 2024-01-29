<template>
  <div class="min-vh-100 d-flex justify-content-between flex-column">
    <router-view class="margin"></router-view>
    <footer-vue></footer-vue>
  </div>
</template>

<script>
import FooterVue from "./components/FooterVue.vue";
import "./assets/main.css"

const url = "https://fabioaviador.alwaysdata.net/"

export default {
  name: 'App',
  components: { FooterVue },
  created() {
    this.checkSessionAndFetchUserData();
  },
  methods: {
    async checkSessionAndFetchUserData() {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await fetch('https://ssh-fabioaviador.alwaysdata.net/api/me', {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });
          const userData = await response.json();
          if (response.ok) {
            this.$store.dispatch('setUser', userData);
          } 
        } catch (error) {
          console.error('Error al obtener los datos del usuario:', error);
        }
      }
    }
  }
};
</script>

