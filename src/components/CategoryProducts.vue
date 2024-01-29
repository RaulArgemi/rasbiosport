<template>
  <div class="container d-flex">

    <div class="col-9">
      <div class="row">
        <ProductCard class="mt-3" v-for="product in products" :key="product.product_id" :imageSrc="product.product_image"
          :title="product.product_name" :description="product.product_description" :price="product.product_price"
          :product_id="product.product_id" @click="goToProductDetails(product.product_name)"/>
      </div>
    </div>
  </div>
</template>



<script>
import ProductCard from "@/components/ProductCard.vue";


const url = "https://fabioaviador.alwaysdata.net/"

export default {
  name: 'CategoryProducts',
  components: {
    ProductCard
  },
  props:  {
    category_prop: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      category_name: '',
      products: [],
    };
  },
  created() {
    console.log(this.$route.params.category_name)
    console.log(this.category_prop)
    if (this.$route.params.category_name != undefined){
      this.category_name = this.$route.params.category_name;
    } else if (this.category_prop == 'Destacados'){
      this.category_name = this.category_prop;
    }
    console.log(this.category_name)
    this.fetchProducts();
  },
  watch: {
    $route(to) {
      this.category_name = to.params.category_name;
      this.fetchProducts();
    },
  },
  methods: {
    async fetchProducts() {
      if(this.category_name == "Todos"){
        this.category_name=""
      }
      try {
        const response = await fetch(`${url}/api/products?category_name=${this.category_name}`);
        const data = await response.json();
        this.products = data;
      } catch (error) {
        console.error('Error al obtener productos:', error);
      }
    },
    goToProductDetails(product_name) {
      const encodedProductName = encodeURIComponent(product_name);
      this.$router.push({ name: 'ProductDetails', params: { product_name: encodedProductName } });
    },

  },
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
</style>