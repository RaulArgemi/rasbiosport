<template>
  <NavComponent></NavComponent>
  <NavMenu></NavMenu>

  <div class="product-details-container">
    <div class="product-details">
      <h2>{{ productDetails.product_name }}</h2>
      <img :src="productDetails.product_image" alt="Imagen del producto">
      <p>{{ productDetails.product_desc }}</p>
      <p>Tallas disponibles:
        <!-- <select v-model="selectedSize">
          <option v-for="size in productDetails.availableSizes" :key="size">{{ size }}</option>
        </select> -->
        {{ this.productDetails.product_size }}
      </p>
      <h3>Precio: {{ productDetails.product_price }} €</h3>
    </div>

    <div>
    <h3>Productos Relacionados:</h3>
    <div class="related-products">
      <div class="product-card" v-for="relatedProduct in relatedProducts" :key="relatedProduct.product_id" @click="goToProductDetails(relatedProduct.product_name)">
        <img :src="relatedProduct.product_image" alt="Imagen del producto">
        <div class="product-info">
          <p>{{ relatedProduct.product_name }}</p>
          <p>Precio: {{ relatedProduct.product_price }} €</p>
        </div>
      </div>
    </div>
  </div>
  </div>
  <div class="container mt-4">
  <div class="product-reviews">
    <h3 class="mb-4">Reseñas:</h3>
    <div v-for="review in productReviews" :key="review.review_id" class="card mb-4">
      <div class="card-body">
        <div class="d-grid gap-2 d-md-flex justify-content-md-between align-items-center mb-2">
          <div>
            <h5 class="card-title mb-0"><strong>{{ review.user_name }}</strong></h5>
            <p class="mb-0">{{ formatDate(review.review_date) }}</p>
          </div>
          <span class="mb-0">
            <span v-for="star in parseInt(review.review_rating)" :key="star" class="text-warning">&#9733;</span>
          </span>
        </div>
        <p class="card-text">{{ review.review_info }}</p>
      </div>
    </div>
  </div>
</div>

  <FooterVue></FooterVue>
</template>
  
<script>
import NavComponent from '../components/NavComponent.vue';
import FooterVue from '@/components/FooterVue.vue';
import NavMenu from '../components/NavMenu.vue';

export default {
  name: 'ProductDetails',
  components: {
    NavComponent,
    FooterVue,
    NavMenu,
  },
  data() {
    return {
      productDetails: {},
      productReviews: [],
      relatedProducts: [],
      selectedSize: '',
    };
  },
  async created() {
    await this.initializeData();
  },
  methods: {
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
    async initializeData() {
      await this.fetchProductDetails();
      await this.fetchRelatedProducts();
      await this.fetchProductReviews();

    },

    async fetchProductDetails() {
      try {
        const response = await fetch(`http://localhost:3000/api/products/${this.$route.params.product_name}`);
        const data = await response.json();
        this.productDetails = data;
        console.log(this.productDetails);
      } catch (error) {
        console.error('Error al obtener detalles del producto:', error);
      }
    },

    async fetchRelatedProducts() {
      try {
        const response = await fetch(`http://localhost:3000/api/products/related/${this.productDetails.category_id}`);
        console.log(response);
        this.relatedProducts = await response.json();
        console.log(this.relatedProducts);
      } catch (error) {
        console.error('Error al obtener productos relacionados:', error);
      }
    },
    async fetchProductReviews() {
        try {
          const response = await fetch(`http://localhost:3000/api/products/${this.productDetails.product_id}/reviews`);
          this.productReviews = await response.json();
          console.log(this.productReviews)
        } catch (error) {
          console.error('Error al obtener reseñas:', error);
        }
      },
    goToProductDetails(productName) {
      this.$router.push({ name: 'ProductDetails', params: { product_name: productName } });
    },
  },

  watch: {
    $route() {
      this.initializeData();
    },
  },
};
</script>
<style scoped>

.related-products {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start; 
  margin-top: 20px;
}

.product-card {
  width: 250px; 
  margin: 10px 1rem; 
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  transition: transform 0.3s ease;
}

.product-card:hover {
  transform: scale(1.05);
}

.product-card img {
  width: 100%; 
  height: auto; 
  border-radius: 8px;
}

.product-info {
  text-align: center;
}
</style>