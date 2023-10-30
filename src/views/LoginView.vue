<template>
    <NavComponent></NavComponent>
    <LoginComponent></LoginComponent>
    <FooterVue></FooterVue>
</template>
<script>
import NavComponent from '../components/NavComponent.vue'
import LoginComponent from '../components/LoginForm.vue'
import FooterVue from '@/components/FooterVue.vue';
export default {
    name: 'LoginView',
    components: {
        LoginComponent,
        NavComponent,
        FooterVue
    }
  };
</script>
<style scoped>

</style>