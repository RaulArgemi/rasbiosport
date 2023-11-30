<template>
    <NavComponent></NavComponent>
  <NavMenu></NavMenu>

  <div class="container d-flex">
      <FilterVue></FilterVue>
    
    <div class="col-9">
      <div class="row">
        <div class="card m-2" v-for="product in products" :key="product.product_id">
          <div class="imgBox">
            <img :src="product.product_image" class="mouse" alt="Imagen del Producto" />
          </div>
          <div class="contentBox">
            <h3>{{ product.product_name }}</h3>
            <h2 class="price">{{ product.product_price }} €</h2>
            <a href="#" class="buy">Buy Now</a>
          </div>
        </div>
      </div>
    </div>

  </div>
  <FooterVue></FooterVue>
</template>


<script>
import NavComponent from '../components/NavComponent.vue';
import FooterVue from '@/components/FooterVue.vue';
import NavMenu from '../components/NavMenu.vue';
import FilterVue from '@/components/FilterVue.vue';
export default {
  name: 'CategoryView',
  components: {
    NavComponent,
    FooterVue,
    NavMenu,
    FilterVue,
  },
  data() {
    return {
      category_name: '',
      products: [],
    };
  },
  created() {
    // Obtener el category_name de route.params
    this.category_name = this.$route.params.category_name;

    // Llamar a la API para obtener productos según el category_name
    this.fetchProducts();
  },
  watch: {
    $route(to, from) {
      console.log('Ruta anterior:', from);
      this.category_name = to.params.category_name;
      this.fetchProducts();
    },
  },
  methods: {
    async fetchProducts() {
  console.log('Llamando a fetchProducts con category_name:', this.category_name);
  try {
    const response = await fetch(`http://localhost:3000/api/products?category_name=${this.category_name}`);
    const data = await response.json();
    this.products = data;
  } catch (error) {
    console.error('Error al obtener productos:', error);
  }
},
  },
};
</script>
      
      
<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Istok+Web:wght@400;700&display=swap");

* {
    margin: 0;
    padding: 0;
    font-family: "Istok Web", sans-serif;
}

body {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    background: #212121;
}

.card {
    position: relative;
    width: 320px;
    height: 480px;
    background: #000000;
    border-radius: 20px;
    overflow: hidden;
}

.card::before {
    content: "";
    position: absolute;
    top: -20%;
    width: 100%;
    height: 100%;
    background: #4285F4;
    transform: skewY(345deg);
    transition: 0.5s;
}

.card:hover::before {
    top: -70%;
    transform: skewY(390deg);
}

.card::after {
    position: absolute;
    bottom: 0;
    left: 0;
    font-weight: 600;
    font-size: 6em;
    color: rgba(0, 0, 0, 0.1);
}

.card .imgBox {
    position: relative;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 20px;
    z-index: 1;
}


.card .contentBox {
    position: relative;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    z-index: 2;
}

.card .contentBox h3 {
    font-size: 18px;
    color: white;
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 1px;
}

.card .contentBox .price {
    font-size: 24px;
    color: white;
    font-weight: 700;
    letter-spacing: 1px;
}

.card .contentBox .buy {
    position: relative;
    top: 100px;
    opacity: 0;
    padding: 10px 30px;
    margin-top: 15px;
    color: #000000;
    text-decoration: none;
    background: #4285F4;
    border-radius: 30px;
    text-transform: uppercase;
    letter-spacing: 1px;
    transition: 0.5s;
}

.card:hover .contentBox .buy {
    top: 15px;
    opacity: 1;
}

.mouse {
    height: 17rem;
    width: auto;
}
</style>