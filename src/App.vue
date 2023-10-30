<template>
  <router-view></router-view>
  <mierdonVue></mierdonVue>
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
