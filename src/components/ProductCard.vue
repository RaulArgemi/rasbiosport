<template>
  <div class="card">
    <img :src="imageSrc" class="card-img-top" :alt="title" style="height: 300px;">
    <div class="card-body">
      <h5 class="card-title">{{ title }}</h5>
      <p class="card-text">{{ description }}</p>
      <p class="card-price">{{ price }} €</p>
    </div>
    <button class="buy" @click="addToCart(product_id)">Añadir al carrito</button>
  </div>
</template>

<script>
import Cookies from 'js-cookie';
const url = "http://localhost:3000";

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
  async getSizes(productId) {
    try {
      const response = await fetch(`${url}/api/get/tallas/${productId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      const data = await response.json();
      console.log('Respuesta recibida:', data);
    } catch (error) {
      console.error('Error al obtener tallas:', error);
    }
  },

  async addToCart(productId) {
    try {
      const userId = JSON.parse(Cookies.get('userData')).id_user;
      console.log(userId);
      console.log(productId);

      await this.getSizes(productId);

      fetch(`${url}/api/cart/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId, productId }),
      })
        .then(response => response.json())
        .then(data => {
          console.log(data.message);
        })
        .catch(error => console.error('Error al añadir al carrito:', error));
    } catch (error) {
      console.error('Error al ejecutar addToCart:', error);
    }
  },

  showSelectable(sizes) {
    // Aquí puedes implementar la lógica para mostrar un seleccionable con las tallas
    console.log('Mostrar seleccionable:', sizes);
  },
},

};
</script>

<style scoped>
.card {
  border: 1px solid #dee2e6;
  border-radius: 8px;
  overflow: hidden;
  width: 100%;
  max-width: 300px;
  margin: 0 auto;
  box-sizing: border-box;
}

.card-img-top {
  object-fit: cover;
  width: 100%;
  height: 150px;
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
