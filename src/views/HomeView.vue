<template>
  <div>
    <NavComponent></NavComponent>
    <NavMenu></NavMenu>
    <CustomSection></CustomSection>
    <div class="container mt-4">
      <h2 class="text-center">Destacados</h2>
      <CategoryProducts :category_prop="'Destacados'"></CategoryProducts>
    </div>
  </div>
</template>

<script>
import NavComponent from '../components/NavComponent.vue'
import NavMenu from '@/components/NavMenu.vue';
import CustomSection from '@/components/CustomSection.vue';
import CategoryProducts from '@/components/CategoryProducts.vue';

export default {
  name: 'HomeView',
  components: {
    NavComponent,
    NavMenu,
    CustomSection,
    CategoryProducts
  }
};
</script>

<style scoped>
/* Tus estilos CSS existentes */
.jumbotron {
  background-color: #f8f9fa;
  padding: 2rem;
}

.container {
  max-width: 1200px;
}

.text-center {
  text-align: center;
}

.mt-4 {
  margin-top: 4rem;
}

.row {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -15px;
}

.col-md-3 {
  flex: 0 0 25%;
  max-width: 25%;
  padding: 0 15px;
  margin-bottom: 30px;
}

.img-fluid {
  max-width: 100%;
  height: auto;
}
</style>
