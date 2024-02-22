<template>
    <NavComponent></NavComponent>
    <LoginComponent></LoginComponent>
</template>
<script>
import NavComponent from '../components/NavComponent.vue'
import LoginComponent from '../components/LoginForm.vue'
export default {
    name: 'LoginView',
    components: {
        LoginComponent,
        NavComponent,
    }
  };
</script>
<style scoped>



</style>