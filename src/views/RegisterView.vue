<template>
    <NavComponent></NavComponent>
    <RegisterForm></RegisterForm>
</template>
<script>
import NavComponent from '../components/NavComponent.vue'
import RegisterForm from '../components/RegisterForm.vue';
export default {
    name: 'LoginView',
    components: {
        RegisterForm,
        NavComponent
    }
  };
</script>
<style scoped>

</style>