<template>
    <NavComponent></NavComponent>
    <NavMenu></NavMenu>
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
            <FooterVue></FooterVue>
</template>

<script>
import NavComponent from '../components/NavComponent.vue';
import FooterVue from '@/components/FooterVue.vue';
import NavMenu from '../components/NavMenu.vue';

export default {
  name: 'CategoryView',
  data() {
    return {
      products: [],
    };
  },
  components: {
    NavComponent,
    FooterVue,
    NavMenu,
  },
  mounted() {
    const category_name = this.$route.params.category_name;
    console.log(category_name);
    this.getProductsByCategory(); // Corrected the function call
  },
  methods: {
    async getProductsByCategory() {
  const categoryInput = this.$route.params.category_name;

  try {
    const response = await fetch(`http://localhost:3000/products?category_name=${categoryInput}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Datos recibidos del servidor:', data); // Agrega esta línea
    this.products = data;
  } catch (error) {
    console.error('Error al obtener productos por categoría:', error);
  }
}

,
  },
};
</script>