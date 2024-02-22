<template>
  <div class="card">
    <img :src="imageSrc" class="card-img-top" :alt="title"  style="height: 300px;" @click="clickImageHandler">
    <div class="card-body">
      <h5 class="card-title">{{ title }}</h5>
      <p class="card-text">{{ description }}</p>
      <p class="card-price">{{ price }} €</p>
    </div>
    <button v-if="!optionsVisible" @click="showOptions('abrir')" class="add-to-cart-btn">Añadir al carrito</button>
    <button v-if="optionsVisible" @click="showOptions('cerrar')" class="close-options-btn">Cerrar</button>
    <div v-if="optionsVisible" class="options-container">
      <label for="size" class="options-label">Talla:</label>
      <select v-model="selectedSize" id="size" @change="updateQuantityLimit" class="options-select">
        <option v-for="size in sizes" :key="size.size" :value="size.size">{{ size.size }}</option>
      </select>
      <label for="quantity" class="options-label">Cantidad:</label>
      <input v-model.number="selectedQuantity" type="number" id="quantity" :max="quantityLimit" min="1" class="options-input">
      <button @click="addToCart(product_id)" :disabled="!selectedSize" class="add-to-cart-btn">Agregar al carrito</button>
    </div>  
  </div>
</template>

<script>
import Cookies from 'js-cookie';
const url = "http://localhost:3000";

export default {
  data() {
    return {
      optionsVisible: false,
      selectedSize: '',
      selectedQuantity: 1,
      sizes: [],
      quantityLimit: 0,
    };
  },
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
    clickImageHandler() {
      this.$emit("clickImage");
    },
    updateQuantityLimit() {
      const selectedSizeObject = this.sizes.find(item => item.size === this.selectedSize);
      if (selectedSizeObject) {
        this.quantityLimit = selectedSizeObject.stock;
        if (this.selectedQuantity > this.quantityLimit) {
          this.selectedQuantity = this.quantityLimit;
        }
      }
    },
    showOptions(order) {
      if (order == 'abrir') {
        this.optionsVisible = !this.optionsVisible;
        this.getSizes(this.product_id)
      } else {
        this.optionsVisible = !this.optionsVisible;

      }
    },
    async getSizes(productId) {
      try {
        const response = await fetch(`${url}/api/get/tallas/${productId}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        const data = await response.json();
        console.log('Respuesta recibida:', data);
        this.sizes = data.result.map(item => ({
          size: item.product_size,
          stock: item.product_stock,
        }));
      } catch (error) {
        console.error('Error al obtener tallas:', error);
      }
    },

    async addToCart(productId) {
      try {
        const userId = JSON.parse(Cookies.get('userData')).id_user;
        console.log(userId);
        console.log(productId);
        console.log(this.selectedSize)

        fetch(`${url}/api/cart/add`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, productId, size: this.selectedSize, quantity: this.selectedQuantity}),
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
  transition: transform 0.3s ease;
  margin-bottom: 55px;
}

.card:hover {
  transform: translateY(-5px);
}

.card-img-top {
  object-fit: cover;
  width: 100%;
  height: 150px;
  border-bottom: 1px solid #dee2e6;
}

.card-body {
  align-items: center;
  text-align: center;
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
}
.add-to-cart-btn,
.close-options-btn {
  background-color: #007bff;
  color: #fff;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 12px;
}

.close-options-btn {
  background-color: #dc3545;
}

.options-container {
  margin-top: 16px;
}

.options-label {
  display: block;
  margin-bottom: 4px;
  font-size: 14px;
}

.options-select,
.options-input {
  width: 100%;
  padding: 8px;
  margin-bottom: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.add-to-cart-btn:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.add-to-cart-btn:hover {
  background-color: #0056b3;
}
<<<<<<< HEAD
.buy {
  display: block;
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.buy:hover {
  background-color: #0056b3;
}
</style>
=======
</style>
>>>>>>> refs/remotes/origin/main
