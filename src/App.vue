<template>
  <div class="min-vh-100 d-flex justify-content-between flex-column">
    <router-view class="margin"></router-view>
    <footer-vue></footer-vue>
  </div>
</template>

<script>
import FooterVue from "./components/FooterVue.vue";
import "./assets/main.css"

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
          const response = await fetch(`${url}/api/me`, {
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

<style scoped>
.margin {
  margin-bottom: 100px; 
}
</style>
