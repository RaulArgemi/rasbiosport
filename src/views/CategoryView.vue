<template>
  <NavComponent></NavComponent>
  <NavMenu></NavMenu>
  <CategoryProduct></CategoryProduct>

  <FooterVue></FooterVue>
</template>

<script>
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
  },
}
</script>