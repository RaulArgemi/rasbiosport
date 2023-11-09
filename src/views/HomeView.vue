<template>
  <div>
    <NavComponent></NavComponent>
    <NavMenu></NavMenu>
    <div class="jumbotron text-center">
      <img src="@/assets/camp-nou-barcelona-c-fcbarcelona.avif" alt="Imagen Grande" class="img-fluid">
    </div>

    <div class="container mt-4">
      <h2 class="text-center">Destacados</h2>
      
      <div class="row">
        <div class="col-md-3">
          <ProductCard
            imageSrc="https://www.futbolemotion.com/imagesarticulos/205699/grandes/camiseta-nike-fc-barcelona-primera-equipacion-stadium-2023-2024-white-royal-blue-university-red-0.jpg"
            title="Camiseta FC Barcelona 2023/24"
            price="99.99€"
            description="Primera equipación FC Barcelona temporada 2023/24."
          ></ProductCard>
        </div>

        <div class="col-md-3">
          <ProductCard
            imageSrc="https://e00-marca.uecdn.es/assets/multimedia/imagenes/2023/06/14/16867313137408.jpg"
            title="Camiseta Real Madrid 2023/24"
            price="104.95€"
            description="Primera equipación Real Madrid temporada 2023/24."
          ></ProductCard>
        </div>

        <div class="col-md-3">
          <ProductCard
            imageSrc="https://images.footballfanatics.com/phoenix-suns/mens-fanatics-branded-kevin-durant-purple-phoenix-suns-fastbreak-jersey-icon-edition_pi5349000_altimages_ff_5349452-06d7fc40c98d8882fbe9alt3_full.jpg?_hv=2&w=900"
            title="Camiseta Phoenix Suns - Kevin Durant"
            price="74.95€"
            description="Camiseta NBA Phoenix Suns. #35 Kevin Durant. Season 2023"
          ></ProductCard>
        </div>

        <div class="col-md-3">
          <ProductCard
            imageSrc="https://www.deportesapalategui.com/media/catalog/product/cache/1/small_image/580x400/9df78eab33525d08d6e5fb8d27136e95/6/1/618809_044_a_b1.jpg"
            title="Camiseta Atlético de Madrid 2015/16"
            price="84.95€"
            description="Primera equipación Atlético de Madrid temporada 2015/16."
          ></ProductCard>
        </div>
      </div>
    </div>

    <FooterVue></FooterVue>
  </div>
</template>

<script>
import NavComponent from '../components/NavComponent.vue'
import FooterVue from '../components/FooterVue.vue'
import ProductCard from '../components/ProductCard.vue'
import NavMenu from '@/components/NavMenu.vue';

export default {
  name: 'HomeView',
  components: {
    NavComponent,
    FooterVue,
    ProductCard,
    NavMenu
}
};
</script>

<style scoped>
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

/* Add any additional styling for ProductCard component */
</style>
