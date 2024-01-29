<template>
  <div>
    <NavComponent></NavComponent>
    <NavMenu></NavMenu>
    <div class="cart-container">
      <h2>Tu Carrito de Compras</h2>
      <div v-for="item in cartItems" :key="item.product_id" class="cart-item">
        <div class="product-info">
          <img :src="item.product_image" alt="Product Image" class="product-image">
          <div class="details">
            <p class="product-name">{{ item.product_name }}</p>
            <p class="quantity">Cantidad: {{ item.quantity }}</p>
            <p class="price">Precio: {{ item.product_price * item.quantity }}</p>
          </div>
        </div>
        <div class="buttons">
          <button @click="addToCart(item.product_id)" class="add-button">Añadir</button>
          <button @click="removeOneFromCart(item.product_id)" class="remove-button">-1</button>
          <button @click="removeFromCart(item.product_id)" class="remove-button">Quitar</button>
        </div>
      </div>
      <div class="total-price">
        <p>Total: {{ calculateTotalPrice().toFixed(2) }}€</p>
      </div>

    </div>
    <FooterVue></FooterVue>
  </div>
</template>

<script>
import NavComponent from '../components/NavComponent.vue';
import FooterVue from '@/components/FooterVue.vue';
import NavMenu from '../components/NavMenu.vue';
import Cookies from 'js-cookie';

const url = "http://localhost:3000"

export default {
  name: 'CategoryView',
  components: {
    NavComponent,
    FooterVue,
    NavMenu,
  },
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
      fetch(`${url}/api/cart/${userId}`)
        .then(response => response.json())
        .then(data => {
          this.cartItems = data;
        })
        .catch(error => console.error('Error al obtener el carrito:', error));
    },
    addToCart(productId) {
      const userId = JSON.parse(Cookies.get('userData')).id_user;
      fetch(`${url}/api/cart/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, productId })
      })
        .then(response => response.json())
        .then(data => {
          console.log(data.message);
          this.fetchCartItems();
        })
        .catch(error => console.error('Error al añadir al carrito:', error));
    },
    removeOneFromCart(productId) {
      const userId = JSON.parse(Cookies.get('userData')).id_user;
      fetch(`${url}/api/cart/remove-one`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, productId })
      })
        .then(response => response.json())
        .then(data => {
          console.log(data.message);
          this.fetchCartItems();
        })
        .catch(error => console.error('Error al quitar del carrito:', error));
    },
    removeFromCart(productId) {
      const userId = JSON.parse(Cookies.get('userData')).id_user;
      fetch(`${url}/api/cart/remove`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ userId, productId })
      })
        .then(response => response.json())
        .then(data => {
          console.log(data.message);
          this.fetchCartItems();
        })
        .catch(error => console.error('Error al quitar del carrito:', error));
    },
    calculateTotalPrice() {
      return this.cartItems.reduce((total, item) => total + item.product_price * item.quantity, 0);
    },
  }
};
</script>

<style scoped>
.cart-container {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: #f5f5f5;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
  padding: 15px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
  transition: all 0.3s ease;
}

.product-info {
  display: flex;
  align-items: center;
}

.product-image {
  width: 50px;
  height: 50px;
  margin-right: 15px;
  border-radius: 8px;
}

.details {
  flex-grow: 1;
}

.product-name {
  font-size: 16px;
  margin-bottom: 5px;
}

.quantity {
  font-size: 14px;
  color: #888;
}

.price {
  font-size: 14px;
  color: #333;
}

.buttons {
  display: flex;
  align-items: center;
}

.add-button,
.remove-button {
  padding: 8px 15px;
  margin-right: 10px;
  font-size: 14px;
  cursor: pointer;
}

.add-button {
  background-color: #4caf50;
  color: #fff;
  border: none;
}

.remove-button {
  background-color: #e74c3c;
  color: #fff;
  border: none;
}

.total-price {
  margin-top: 20px;
  text-align: right;
}
</style>