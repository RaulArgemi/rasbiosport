<template>
  <div class="card">
    <img :src="imageSrc" class="card-img-top" :alt="title" style="height: 300px;">
    <div class="card-body">
      <h5 class="card-title">{{ title }}</h5>
      <p class="card-text">{{ description }}</p>
      <p class="card-price">{{ price }} €</p>
    </div>
    <router-link to="/cart" class="buy" v-on:click="addToCart(product_id)">Añadir al carrito</router-link>

  </div>
</template>

<script>
import Cookies from 'js-cookie';

export default {
  props: {
    product_id: {
      type: Number,
      required: true
    },
    imageSrc: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
  },
  methods: {
    addToCart(productId) {
      const userId = JSON.parse(Cookies.get('userData')).id_user;
      console.log(userId)
      console.log(productId)
      fetch('http://localhost:3000/api/cart/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, productId })
      })
        .then(response => response.json())
        .then(data => console.log(data.message))
        .catch(error => console.error('Error al añadir al carrito:', error));
    },
  }
};
</script>

<style scoped>
.card {
  border: 1px solid #dee2e6;
  border-radius: 8px;
  overflow: hidden;
  width: 100%;
  /* Ancho total del contenedor padre (se adaptará al ancho de la fila) */
  max-width: 300px;
  /* Ancho máximo de la tarjeta */
  margin: 0 auto;
  /* Centrar la tarjeta en la fila */
  box-sizing: border-box;
  /* Incluir bordes y relleno en el ancho total */
}

.card-img-top {
  object-fit: cover;
  width: 100%;
  height: 150px;
  /* Altura fija para la imagen */
}

.card-body {
  padding: 1.25rem;
}

.card-title {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 0.75rem;
}

.card-text {
  color: #6c757d;
  margin-bottom: 1rem;
}

.card-price {
  font-size: 1.25rem;
  color: #e44d26;
  font-weight: bold;
}</style>
