<template>
  <div>
    <a class="icon" @click="logout"><img class="icono" src="../assets/logout.png"></a>
  </div>
</template>

<script>

export default {
  name: 'LogoutVue',
  methods: {
    logout() {
      localStorage.removeItem('token');

      localStorage.removeItem('userId');

      localStorage.removeItem('cart_lrrxhx28ll9ixhvxkf')

      document.cookie = "userData=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";

      this.$router.push('/login');

      // console.log('Cierre de sesión exitoso');
    },
  },
};
</script>

<style scoped>
.icon {
  color: aliceblue;
}

.icono{
  width: 3rem;
  height: 3rem;
  margin-right: 1rem;
}
</style>
