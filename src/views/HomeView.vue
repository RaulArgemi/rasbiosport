<template>
    <NavComponent></NavComponent>
    <h1>HOLA</h1>
    <mierdonVue></mierdonVue>
    <FooterVue></FooterVue>

</template>
<style scoped>

</style>
<script>
import NavComponent from '../components/NavComponent.vue'
import FooterVue from '@/components/FooterVue.vue';
import mierdonVue from '@/components/mierdonVue.vue';
 export default {
    name: 'HomeView',
    components: {
        NavComponent,
        FooterVue,
        mierdonVue
    }
  };
</script>