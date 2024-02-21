<template>
    <div>
      <h2>Resultados de búsqueda</h2>
      <div v-for="product in products" :key="product.product_id">
        <!-- Mostrar la información del producto aquí -->
        <p>{{ product.product_name }}</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        products: [],
      };
    },
    async created() {
      await this.fetchSearchResults();
    },
    methods: {
      async fetchSearchResults() {
        const query = this.$route.query.query;
        try {
          const response = await fetch(`http://localhost:3000/api/products/search?query=${query}`);
          const data = await response.json();
          this.products = data;
        } catch (error) {
          console.error('Error al buscar productos:', error);
        }
      },
    },
  };
  </script>