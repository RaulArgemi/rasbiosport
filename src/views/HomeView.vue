<template>
    <NavComponent></NavComponent>
    <h1>HOLA</h1>
    <FooterVue></FooterVue>
</template>
<style scoped>

</style>
<script>
import NavComponent from '../components/NavComponent.vue'
import FooterVue from '@/components/FooterVue.vue';
 export default {
    name: 'HomeView',
    components: {
        NavComponent,
        FooterVue
    }
  };
</script>