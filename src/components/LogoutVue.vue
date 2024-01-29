<template>
  <div>
    <a class="icon" @click="logout"><LogOutIcon></LogOutIcon></a>
  </div>
</template>

<script>
import LogOutIcon from './icons/LogOutIcon.vue';
export default {
  name: 'LogoutVue',
  components: {
    LogOutIcon,
  },
  methods: {
    logout() {
      localStorage.removeItem('token');

      localStorage.removeItem('userId');

      localStorage.removeItem('cart_lrrxhx28ll9ixhvxkf')

      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

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
