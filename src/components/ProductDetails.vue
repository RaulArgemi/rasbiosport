<template>
      <NavComponent></NavComponent>
    <NavMenu></NavMenu>
  <div class="product-details-container">
    <!-- Productos Relacionados -->
    <div class="related-products">
      <h3>Productos Relacionados:</h3>
      <div class="related-product-list">
        <div class="product-card-tiny" v-for="relatedProduct in filteredRelatedProducts" :key="relatedProduct.product_id"
          @click="goToProductDetails(relatedProduct.product_name)">
          <img :src="relatedProduct.product_image" alt="Imagen del producto">
          <div class="product-info">
            <p>{{ relatedProduct.product_name }}</p>
            <p>Precio: {{ relatedProduct.product_price }} €</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Detalles del Producto -->
    <div class="product-details">
      <div class="product-image">
        <img :src="productDetails.product_image" alt="Imagen del producto">
      </div>
      <div class="product-info">
        <h2>{{ productDetails.product_name }}</h2>
        <p class="product-description">{{ productDetails.product_desc }}</p>
        <p><strong>Tallas disponibles:</strong> {{ productDetails.product_size }}</p>
        <p><strong>Precio:</strong> {{ productDetails.product_price }} €</p>
        <!-- Agregar más detalles del producto si es necesario -->
        <p><strong>Información adicional:</strong> {{ productDetails.product_info }}</p>
        <p><strong>Etiqueta:</strong> {{ productDetails.product_tag }}</p>
      </div>
    </div>
  </div>

  <!-- Reseñas del Producto -->
  <div class="container mt-4">
    <div v-if="productReviews.length > 0" class="product-reviews">
      <h3 class="mb-4">Reseñas:</h3>
      <div v-for="review in productReviews" :key="review.review_id" class="card mb-4">
        <div class="card-body">
          <div class="review-header">
            <h5 class="card-title mb-0"><strong>{{ review.user_name }}</strong></h5>
            <p class="mb-0">{{ formatDate(review.review_date) }}</p>
          </div>
          <div class="review-stars">
            <span v-for="star in parseInt(review.review_rating)" :key="star" class="text-warning">&#9733;</span>
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

const url = "http://localhost:3000"

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
        const response = await fetch(`${url}/api/products/${this.$route.params.product_name}`);
        const data = await response.json();
        this.productDetails = data;
      } catch (error) {
        console.error('Error al obtener detalles del producto:', error);
      }
    },

    async fetchRelatedProducts() {
      try {
        const response = await fetch(`${url}/api/products/related/${this.productDetails.category_id}`);
        this.relatedProducts = await response.json();
      } catch (error) {
        console.error('Error al obtener productos relacionados:', error);
      }
    },
    async fetchProductReviews() {
      try {
        const response = await fetch(`${url}/api/products/${this.productDetails.product_id}/reviews`);
        this.productReviews = await response.json();
      } catch (error) {
        console.error('Error al obtener reseñas:', error);
      }
    },
    goToProductDetails(productName) {
      this.$router.push({ name: 'ProductDetails', params: { product_name: productName } });
    },
  },
  computed: {
    filteredRelatedProducts() {
      return this.relatedProducts.filter(product => product.product_id !== this.productDetails.product_id);
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
/* Estilos para el contenedor principal */
.product-details-container {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin: 20px;
}

/* Estilos para los detalles del producto */
.product-details {
  max-width: 60%;
  width: 100%;
}

.product-image img {
  width: 100%;
  max-width: 400px;
  height: auto;
  border-radius: 8px;
  margin-bottom: 20px;
}

.product-info h2 {
  font-size: 2.5em;
  color: #333;
  margin-bottom: 10px;
}

.product-info p {
  font-size: 1.2em;
  line-height: 1.6;
  color: #555;
  margin-bottom: 10px;
}

/* Estilos para la lista de productos relacionados */
.related-products {
  max-width: 30%;
  width: 100%;
  margin-right: 20px;
}

.related-product-list {
  display: flex;
  flex-direction: column;
}

.product-card-tiny {
  width: 100%;
  margin-bottom: 10px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease;
  cursor: pointer;
}

.product-card-tiny:hover {
  transform: scale(1.02);
}

.product-card-tiny img {
  width: 100%;
  height: auto;
  border-radius: 8px 8px 0 0;
}

.product-card-tiny .product-info {
  padding: 10px;
}

/* Estilos para las reseñas del producto */
.product-reviews {
  margin-top: 30px;
}

.card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.review-stars {
  display: flex;
}

.review-stars .text-warning {
  color: #FFD700;
  font-size: 1.2em;
}
</style>
