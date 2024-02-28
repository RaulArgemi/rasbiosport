<template>
  <div>
    <NavComponent />
    <NavMenu></NavMenu>
    <div class="container">
      <h2 v-if="found">Resultados de búsqueda para  <b>"{{this.$route.query.query }}"</b></h2>
      <div class="row">
        <ProductCard class="mt-3 col-md-4" v-for="product in products" :key="product.product_id"
          :imageSrc="product.product_image" :title="product.product_name" :description="product.product_description"
          :price="product.product_price" :product_id="product.product_id"
          @click="goToProductDetails(product.product_name)" />
          <p v-if="!found">No se encontraron productos para el término <b>"{{this.$route.query.query }}"</b></p>
      </div>
    </div>
  </div>
</template>
  

<script>
import NavComponent from './NavComponent.vue';
import NavMenu from './NavMenu.vue';
import ProductCard from './ProductCard.vue'; // Asegúrate de que la ruta al componente sea correcta
import Cookies from 'js-cookie';
const url = "http://localhost:3000"

export default {
  components: {
    NavComponent,
    ProductCard,
    NavMenu
},
  data() {
    return {
      products: [],
      found: false
    };
  },
  created() {
    this.fetchSearchResults();
  },
  methods: {
    async fetchSearchResults() {
      const query = this.$route.query.query;
      const apiUrl = `http://localhost:3000/api/search?query=${query}`;
      console.log('URL de la solicitud:', apiUrl);
      try {
        const response = await fetch(apiUrl);
        if (response.ok) {
          const data = await response.json();
          this.products = data.products;
          console.log('Productos cargados:', JSON.stringify(this.products, null, 2));
          this.found = true;
        } else {
          console.error('Error en la respuesta del servidor:', response.statusText);
        }
      } catch (error) {
        console.error('Error al buscar productos:', error);
      }
    },

    addToCart(productId) {
      const userId = JSON.parse(Cookies.get('userData')).id_user;
      console.log(userId);
      console.log(productId);
      fetch(`${url}/api/cart/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, productId })
      })
        .then(response => response.json())
        .then(data => console.log(data.message))
        .catch(error => console.error('Error al añadir al carrito:', error));
    },
    goToProductDetails(product_name) {
      const encodedProductName = encodeURIComponent(product_name);
      this.$router.push({
        name: "ProductDetails",
        params: { product_name: encodedProductName },
      });
    },
  },
  watch: {
  '$route.query.query'() {
    this.fetchSearchResults();
  }
},
};
</script>