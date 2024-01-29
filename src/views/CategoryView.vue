<template>
  <NavComponent></NavComponent>
  <NavMenu></NavMenu>
  <!-- <FilterVue></FilterVue> -->
  <CategoryProduct></CategoryProduct>

  <FooterVue></FooterVue>
</template>

<script>
// import FilterVue from '@/components/FilterVue.vue';
import NavComponent from '../components/NavComponent.vue';
import FooterVue from '@/components/FooterVue.vue';
import NavMenu from '../components/NavMenu.vue';
import CategoryProduct from '@/components/CategoryProducts.vue';


export default {
  name: 'CategoryView',
  components: {
    NavComponent,
    FooterVue,
    NavMenu,
    CategoryProduct,
    // FilterVue
  },
}
</script>