<template>
  <mierdonVue></mierdonVue>
  <router-view></router-view>
</template>


<script>
import mierdonVue from './components/mierdonVue.vue';
export default {
  name: 'App',
  components :  {
    mierdonVue
  }
}
</script>

<style scoped></style>
