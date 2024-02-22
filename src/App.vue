<template>
  <div class="min-vh-100 d-flex justify-content-between flex-column">
    <router-view class="margin"></router-view>
    <footer-vue></footer-vue>
  </div>
</template>

<script>
import FooterVue from "./components/FooterVue.vue";
import "./assets/main.css"

export default {
  name: 'App',
  components: { FooterVue }
};
</script>

<style scoped>
.margin {
  margin-bottom: 100px; 
}
</style>
