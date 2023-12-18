<template>
    <NavComponent></NavComponent>
    <NavMenu></NavMenu>
  
    <div class="product-details-container">
      <div class="product-details">
        <h2>{{ productDetails.product_name }}</h2>
        <img :src="productDetails.product_image" alt="Imagen del producto">
        <p>{{ productDetails.product_desc }}</p>
        <p>Tallas disponibles: <select v-model="selectedSize">
          <option v-for="size in productDetails.availableSizes" :key="size">{{ size }}</option>
        </select></p>
        <h3>Precio: {{ productDetails.product_price }} €</h3>
      </div>
  
      <div class="related-products">
        <h3>Productos relacionados:</h3>
        <ul>
          <li v-for="relatedProduct in relatedProducts" :key="relatedProduct.product_id" @click="goToProductDetails(relatedProduct.product_name)">
            {{ relatedProduct.product_name }}
          </li>
        </ul>
      </div>
    </div>
  
    <div class="product-reviews">
      <h3>Reseñas:</h3>
      <div v-for="review in productReviews" :key="review.review_id">
        <p><strong>{{ review.user_name }}</strong> ({{ review.review_date }})</p>
        <p>Puntuación: {{ review.review_rating }}</p>
        <p>{{ review.review_info }}</p>
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
    created() {
      this.fetchProductDetails();
    //   this.fetchProductReviews();
    //   this.fetchRelatedProducts();
    },
    methods: {
      async fetchProductDetails() {
        try {
          const response = await fetch(`https://ssh-fabioaviador.alwaysdata.net/api/products/${this.$route.params.product_name}`);
          console.log(response)
          const data = await response.json();
          this.productDetails = data;
          this.selectedSize = data.availableSizes[0];
        } catch (error) {
          console.error('Error al obtener detalles del producto:', error);
        }
      },
      async fetchProductReviews() {
        try {
          const response = await fetch(`https://ssh-fabioaviador.alwaysdata.net/api/products/${this.productDetails.product_id}/reviews`);
          this.productReviews = await response.json();
        } catch (error) {
          console.error('Error al obtener reseñas:', error);
        }
      },
      async fetchRelatedProducts() {
        try {
          const response = await fetch(`https://ssh-fabioaviador.alwaysdata.net/api/products?category_name=${this.productDetails.category_name}`);
          this.relatedProducts = await response.json();
        } catch (error) {
          console.error('Error al obtener productos relacionados:', error);
        }
      },
      goToProductDetails(productName) {
        this.$router.push({ name: 'ProductDetails', params: { product_name: productName } });
      },
    },
  };
  </script>