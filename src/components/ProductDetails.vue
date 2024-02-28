<template>
  <NavComponent></NavComponent>
  <NavMenu></NavMenu>
  <div class="product-details-container">
    <!-- Detalles del Producto -->
    <div class="product-details">
      <div class="product-image">
        <img :src="productDetails.product_image" alt="Imagen del producto">
      </div>
      <div class="product-info">
        <h2>{{ productDetails.product_name }}</h2>
        <p class="product-description">{{ productDetails.product_desc }}</p>
        <p><strong>Precio:</strong> {{ productDetails.product_price }} €</p>
        <p><strong>Información adicional:</strong> {{ productDetails.product_info }}</p>
        <p><strong>Etiqueta:</strong> {{ productDetails.product_tag }}</p>
        <button v-if="!optionsVisible" @click="showOptions('abrir')" class="add-to-cart-btn" :disabled="!itsLogged"> {{ itsLogged ? 'Agregar al carrito' : 'Iniciar sesión para comprar' }}</button>
    <button v-if="optionsVisible" @click="showOptions('cerrar')" class="close-options-btn">Cerrar</button>
    <div v-if="optionsVisible" class="options-container">
      <label for="size" class="options-label">Talla:</label>
      <select v-model="selectedSize" id="size" @change="updateQuantityLimit" class="options-select">
  <option v-if="hayStock" :value="null" disabled>Selecciona una talla</option>
  <option v-for="size in sizes" :key="size.size" :value="size.size">{{ size.size }}</option>
  <option v-if="!hayStock" disabled>Este producto está agotado temporalmente :(</option>
</select>

      <label for="quantity" class="options-label">Cantidad:</label>
      <input v-model.number="selectedQuantity" type="number" id="quantity" :max="quantityLimit" min="1" class="options-input">
      <button @click="addToCart(product_id)" :disabled="!selectedSize || !hayStock" class="add-to-cart-btn">Agregar al carrito</button>
    </div> 
      </div>
    </div>

    <!-- Productos Relacionados -->
    <div class="related-products">
      <h3>Productos Relacionados:</h3>
      <div class="related-product-list">
        <div class="product-card-small" v-for="relatedProduct in filteredRelatedProducts" :key="relatedProduct.product_id"
          @click="goToProductDetails(relatedProduct.product_name)">
          <img :src="relatedProduct.product_image" alt="Imagen del producto">
          <div class="product-info2">
            <p class="texto-relacionado">{{ relatedProduct.product_name }}</p>
            <p>Precio: {{ relatedProduct.product_price }} €</p>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Reseñas del Producto -->
  <div>
    <div v-if="productReviews.length > 0" class="product-reviews">
      <h3 class="mb-4">Reseñas:</h3>
      <div v-for="review in productReviews" :key="review.review_id" class="card mb-4">
        <div class="card-body">
          <div class="review-header">
            <h5 class="card-title mb-0"><strong>{{ review.user_name }}</strong></h5>
            <p class="mb-0">{{ formatDate(review.review_date) }}</p>
          </div>
          <div class="review-stars">
            <span v-for="star in parseInt(review.review_rating)" :key="star" class="text-warning">&#9733;</span>
          </div>
          <p class="card-text">{{ review.review_info }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Cookies from 'js-cookie';
import NavComponent from '../components/NavComponent.vue';
import NavMenu from '../components/NavMenu.vue';

const url = "http://localhost:3000"

export default {
  name: 'ProductDetails',
  components: {
    NavComponent,
    NavMenu,
  },
  data() {
    return {
      productDetails: {},
      productReviews: [],
      relatedProducts: [],
      optionsVisible: false,
      selectedSize: '',
      selectedQuantity: 1,
      sizes: [],
      hayStock: true,
      quantityLimit: 0,
      itsLogged: false,

    };
  },
  async created() {
    await this.initializeData();
    this.checkAuthentication()

  },
  methods: {
    checkAuthentication() {
      const cookie = Cookies.get('userData');

      if (cookie) {
        try {
          this.itsLogged=true;
        } catch (error) {
          console.error('Error:', error);
        }
      } else {
        // console.log('No hay cookie');
        this.itsLogged=false
      }
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

    async getSizes() {
      try {
        const response = await fetch(`${url}/api/get/tallas/${this.productDetails.product_id}`, {
          method: 'GET',
          headers: { 'Content-Type': 'application/json' },
        });

        const data = await response.json();
        // console.log('Respuesta recibida:', data);
        this.sizes = data.result.map(item => ({
          size: item.product_size,
          stock: item.product_stock,
        }));
        if (this.sizes.length == 0){
          this.hayStock = false
        }
      } catch (error) {
        console.error('Error al obtener tallas:', error);
      }
    },


    async addToCart() {
      try {
        const userId = JSON.parse(Cookies.get('userData')).id_user;
        // console.log(userId);
        // console.log(this.productDetails.product_id);
        // console.log(this.selectedSize)

        fetch(`${url}/api/cart/add`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId, productId: this.productDetails.product_id, size: this.selectedSize, quantity: this.selectedQuantity}),
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

    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
    async initializeData() {
      await this.fetchProductDetails();
      await this.fetchRelatedProducts();
      await this.fetchProductReviews();
    },
    async fetchProductDetails() {
      try {
        const response = await fetch(`${url}/api/products/${this.$route.params.product_name}`);
        const data = await response.json();
        this.productDetails = data;
      } catch (error) {
        console.error('Error al obtener detalles del producto:', error);
      }
    },
    async fetchRelatedProducts() {
      try {
        const response = await fetch(`${url}/api/products/related/${this.productDetails.category_id}`);
        this.relatedProducts = await response.json();
      } catch (error) {
        console.error('Error al obtener productos relacionados:', error);
      }
    },
    async fetchProductReviews() {
      try {
        const response = await fetch(`${url}/api/products/${this.productDetails.product_id}/reviews`);
        this.productReviews = await response.json();
      } catch (error) {
        console.error('Error al obtener reseñas:', error);
      }
    },
    goToProductDetails(productName) {
      this.$router.push({ name: 'ProductDetails', params: { product_name: productName } });
    },

    computed: {
  filteredRelatedProducts() {
    return this.relatedProducts.filter(relatedProduct => relatedProduct.product_id !== this.productDetails.product_id);
  },
},

  },
  watch: {
  $route() {
    this.initializeData();
  },
},};
</script>

<style scoped>
/* Estilos para el contenedor principal */
.product-details-container {
  display: flex;
  flex-direction: column;
  margin: 20px;
}

/* Estilos para los detalles del producto */
.product-details {
  width: 100%;
  display: flex;
}

.product-image {
  width: 50rem;
  height: 50rem;
}

.product-image img {
  margin-top: 1rem;
  width: 75%;
  height: 80%;
  border-radius: 8px;
  margin-bottom: 20px;
}

.product-info {
  width: 50%;
  margin-top: 2rem;
  text-align: left;
  height: 100%;
}

.product-info h2 {
  margin-top: 0;
  font-size: 2.5em;
  color: #333;
  margin-bottom: 10px;
}

.product-info p {
  font-size: 1.2em;
  line-height: 1.6;
  color: #555;
  margin-bottom: 10px;
}

/* Estilos para la lista de productos relacionados */
.related-products {
  width: 100%;
  margin-top: 20px;
}

.product-info {
  width: 50%;
  margin-top: 2rem;
  text-align: left;
  height: 100%;
}

.related-product-list {
  display: flex;
  flex-wrap: wrap;
}

.product-card-small {
  margin-left: 1rem;
  margin-right: 1rem;
  text-align: center;
  align-items: center;
  width: 16rem;
  height: 20rem;
  margin-bottom: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  transition: transform 0.3s ease;
  cursor: pointer;
}

.texto-relacionado{
  font-weight: bold;
}

.product-card-small:hover {
  transform: scale(1.02);
}

.product-card-small img {
  margin-top: 10px;
  width: 15rem;
  height: 15rem;
  border-radius: 8px 8px 0 0;
}

.product-card-small .product-info {
  padding: 10px;
}

/* Estilos para las reseñas del producto */
.product-reviews {
  width: auto;
  margin-top: 30px;
  margin-left: 2rem;
  margin-right: 2rem;
}

.card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.review-stars {
  display: flex;
}

.review-stars .text-warning {
  color: #FFD700;
  font-size: 1.2em;
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