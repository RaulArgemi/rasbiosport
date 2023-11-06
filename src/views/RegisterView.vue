<template>
    <NavComponent></NavComponent>
    <RegisterForm></RegisterForm>
    <FooterVue></FooterVue>
</template>
<script>
import NavComponent from '../components/NavComponent.vue'
import RegisterForm from '../components/RegisterForm.vue';
import FooterVue from '@/components/FooterVue.vue';
export default {
    name: 'LoginView',
    components: {
        RegisterForm,
        NavComponent,
        FooterVue
    }
  };
</script>
<style scoped>

</style>