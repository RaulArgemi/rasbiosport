<template>
  <div>
    <NavComponent />
    <NavMenu></NavMenu>
    <div class="container">
      <div class="row">
        <div class="col-md-3">
          <div class="sidebar">
            <div class="filters">
              <h3>Filtros</h3>
              <div class="filter-group">
                <label for="priceRange">Rango de Precio:</label>
                <div class="price-ranges">
                  <label v-for="(range, label) in priceRanges" :key="label" class="price-range">
                    <input type="checkbox" v-model="priceRanges[label]">
                    {{ label }}
                  </label>
                </div>
                <div class="custom-price-range">
                  <label for="customMinPrice">Min:</label>
                  <input type="number" v-model.number="customMinPrice" id="customMinPrice" min="0">
                  <label for="customMaxPrice">Max:</label>
                  <input type="number" v-model.number="customMaxPrice" id="customMaxPrice" min="0">
                </div>
              </div>
              <button @click="applyFilters" class="apply-button">Aplicar Filtros</button>
            </div>
          </div>
        </div>
        <div class="col-md-9">
          <h2>Resultados de búsqueda</h2>
          <div class="row">
            <ProductCard class="mt-3 col-md-4" v-for="product in filteredProducts" :key="product.product_id"
              :imageSrc="product.product_image" :title="product.product_name" :description="product.product_description"
              :price="product.product_price" :product_id="product.product_id"
              @click="goToProductDetails(product.product_name)" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavComponent from './NavComponent.vue';
import ProductCard from './ProductCard.vue';
import NavMenu from './NavMenu.vue';

const url = "http://localhost:3000";

export default {
  components: {
    NavComponent,
    ProductCard,
    NavMenu
},
  data() {
    return {
      products: [],
      priceRanges: {
        '0-20€': false,
        '20-50€': false,
        '50-100€': false,
        '100-200€': false,
      },
      customMinPrice: 0,
      customMaxPrice: 200,
    };
  },
  created() {
    this.fetchSearchResults();
  },
  methods: {
    async fetchSearchResults() {
      const query = this.$route.query.query;
      const apiUrl = `http://localhost:3000/api/search?query=${query}`;
      console.log('URL de la solicitud:', apiUrl);
      try {
        const response = await fetch(apiUrl);
        if (response.ok) {
          const data = await response.json();
          this.products = data.products;
          console.log('Productos cargados:', JSON.stringify(this.products, null, 2));
        } else {
          console.error('Error en la respuesta del servidor:', response.statusText);
        }
      } catch (error) {
        console.error('Error al buscar productos:', error);
      }
    },

    async applyFilters() {
      try {
        const response = await fetch(
          `${url}/api/products?query=${this.$route.query.query}&min_price=${this.customMinPrice}&max_price=${this.customMaxPrice}`
        );
        const data = await response.json();
        this.products = data;
      } catch (error) {
        console.error("Error al obtener productos con filtros:", error);
      }
    },

    goToProductDetails(product_name) {
      const encodedProductName = encodeURIComponent(product_name);
      this.$router.push({
        name: "ProductDetails",
        params: { product_name: encodedProductName },
      });
    },
  },
  computed: {
    filteredProducts() {
      return this.products.filter((product) => {
        let priceCondition = true;

        if (Object.values(this.priceRanges).includes(true)) {
          const selectedRanges = Object.keys(this.priceRanges).filter(range => this.priceRanges[range]);
          const prices = selectedRanges.map(range => range.split('-').map(val => parseInt(val)));
          priceCondition = prices.some(priceRange => product.product_price >= priceRange[0] && product.product_price <= priceRange[1]);
        }

        return priceCondition;
      });
    },
  },
  watch: {
    '$route.query.query'() {
      this.fetchSearchResults();
    }
  },
};
</script>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 15px;
}

h2 {
  margin-top: 20px;
}

.sidebar {
  background-color: #f4f4f4;
  padding: 15px;
}

.filters {
  margin-bottom: 30px;
}

.filter-group {
  margin-bottom: 15px;
}

.price-ranges {
  display: flex;
  flex-wrap: wrap;
}

.price-range {
  margin-right: 10px;
}

.custom-price-range {
  margin-top: 10px;
}

.apply-button {
  display: inline-block;
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.row {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -15px;
}

.col-md-4 {
  flex: 0 0 33.333333%;
  max-width: 33.333333%;
  padding: 15px;
}

</style>
