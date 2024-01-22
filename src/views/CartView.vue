<template>
    <div>
      <h2>Tu Carrito de Compras</h2>
      <div v-for="item in cartItems" :key="item.product_id">
        <p>{{ item.product_name }} - Cantidad: {{ item.quantity }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import Cookies from 'js-cookie';
  
  export default {
    data() {
      return {
        cartItems: []
      };
    },
    created() {
      this.fetchCartItems();
    },
    methods: {
      fetchCartItems() {
        const userId = JSON.parse(Cookies.get('userData')).id_user;
        fetch(`http://localhost:3000/api/cart/${userId}`)
        .then(response => response.json())
        .then(data => {
          this.cartItems = data;
        })
        .catch(error => console.error('Error al obtener el carrito:', error));
      }
    }
  };
  </script>