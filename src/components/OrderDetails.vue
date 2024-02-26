<template>
    <div class="order-details">
      <h3>Detalles del Pedido #{{ order.order_id }}</h3>
      <p><strong>Fecha del Pedido:</strong> {{ formatDate(order.order_date) }}</p>
      <p><strong>Total:</strong> {{ currency(order.order_total) }}</p>
      <div class="order-products">
        <h4>Productos:</h4>
        <div v-for="product in order.products" :key="product.product_id" class="product-item">
          <img :src="product.product_image" :alt="product.product_name" class="product-image"/>
          <div class="product-info">
            <p><strong>Producto:</strong> {{ product.product_name }}</p>
            <p><strong>Cantidad:</strong> {{ product.quantity }}</p>
            <p><strong>Precio Unitario:</strong> {{ currency(product.product_price) }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      order: {
        type: Object,
        required: true
      }
    },
    methods: {
      formatDate(value) {
        if (value) {
          return new Date(value).toLocaleDateString();
        }
      },
      currency(value) {
        return parseFloat(value).toFixed(2) + ' €';
      }
    }
  }
  </script>
  
  <style scoped>
  /* Estilos para el componente */
  .order-details {
    border: 1px solid #ccc;
    padding: 10px;
    margin-bottom: 20px;
  }
  
  .order-products {
    margin-top: 10px;
  }
  
  .product-item {
    display: flex;
    margin-bottom: 10px;
  }
  
  .product-image {
    width: 100px;
    height: 100px;
    margin-right: 10px;
  }
  </style>
  