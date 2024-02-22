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
            <p>Tallas: {{ item.size }}</p>
          </div>
        </div>
        <div class="buttons">
          <button @click="addToCart(item.product_id)" class="add-button">+</button>
          <button @click="removeOneFromCart(item.product_id)" class="remove-button">-</button>
          <button @click="removeFromCart(item.product_id)" class="remove-button">X</button>
        </div>
      </div>
      <div class="total-price">
        <p>Total: {{ calculateTotalPrice().toFixed(2) }}€</p>
        <button @click="openCheckoutModal" class="buy-button">Comprar</button>
      </div>
      <CheckoutModal :isModalVisible="checkoutModalVisible" :cartItems="cartItems"
        :totalPrice="parseFloat(calculateTotalPrice())" @close-modal="closeCheckoutModal"
        @confirm-purchase="confirmPurchase" @pago-con-tarjeta-procesado="addOrder" />

    </div>
  </div>
  <FooterVue></FooterVue>
</template>

<script>
import NavComponent from '../components/NavComponent.vue';
import FooterVue from '@/components/FooterVue.vue';
import NavMenu from '../components/NavMenu.vue';
import CheckoutModal from '../components/CheckoutModal.vue';
import Cookies from 'js-cookie';

const url = "http://localhost:3000"

export default {
  name: 'CategoryView',
  components: {
    NavComponent,
    FooterVue,
    NavMenu,
    CheckoutModal,
  },
  data() {
    return {
      cartItems: [],
      checkoutModalVisible: false,
    };
  },
  created() {
    this.fetchCartItems();
  },
  methods: {

    addOrder() {
  try {
    const userData = JSON.parse(Cookies.get('userData'));
    const userId = userData.id_user;
    const orderAddress = userData.user_address; 
    const orderTotal = this.calculateTotalPrice().toFixed(2);
   const productos = this.cartItems.map(item => ({ product_id: item.product_id, quantity: item.quantity, size: item.size }));
   console.log("productos: " + JSON.stringify(this.cartItems.map(item => ({ product_id: item.product_id, quantity: item.quantity, size: item.size })), null, 2));


    fetch(`${url}/api/order/add`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId, orderAddress, orderTotal, productos}),
    })
    .then(response =>{response.json(); console.log(response.json)})
    .then(data => {
      console.log(data.message);
    })
    .catch(error => console.error('Error adding the order:', error));
  } catch (error) {
    console.error('Error parsing user data:', error);
  }
},

    fetchCartItems() {
      const userId = JSON.parse(Cookies.get('userData')).id_user;
      fetch(`${url}/api/cart/${userId}`)
        .then(response => response.json())
        .then(data => {
          console.log(data)
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
    openCheckoutModal() {
      console.log('Abriendo modal de compra');
      this.checkoutModalVisible = true;
    },

    closeCheckoutModal() {
      this.checkoutModalVisible = false;
    },
    confirmPurchase(paymentMethod) {
      console.log('Procesando compra con método de pago:', paymentMethod);
      this.closeCheckoutModal();
      this.clearCart();
    },
    clearCart() {
      const userId = JSON.parse(Cookies.get('userData')).id_user;
      fetch(`${url}/api/cart/clear/${userId}`, {
        method: 'DELETE'
      })
        .then(response => response.json())
        .then(data => {
          console.log(data.message);
          this.cartItems = [];
        })
        .catch(error => console.error('Error al limpiar el carrito:', error));
    }
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
.remove-button,
.buy-button {
  border-radius: 5%;
  padding: 8px 15px;
  margin-right: 10px;
  font-size: 14px;
  cursor: pointer;
}

.add-button {
  background-color: #4285F4;
  color: #fff;
  border: none;
  transition: background-color 0.3s ease;
}

.add-button:hover {
  background-color: #3367D6;
}

.remove-button {
  background-color: #e74c3c;
  color: #fff;
  border: none;
  transition: background-color 0.3s ease;
}

.remove-button:hover {
  background-color: #c0392b;
}

.buy-button {
  background-color: #0F9D58;
  color: #fff;
  border: none;
  transition: background-color 0.3s ease;
}

.buy-button:hover {
  background-color: #0a7d41;
}

.total-price {
  margin-top: 20px;
  text-align: right;
}
</style>
