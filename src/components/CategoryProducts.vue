<template>
  <div class="container d-flex">
    <div v-if="!destacado" class="sidebar">
      <form @submit.prevent="applyFilters" class="filters">
        <h3>Filtros</h3>
        <div class="filter-group">
          <label for="size">Tamaño:</label>
          <select v-model="size" id="size">
            <option value="">Todos</option>
            <option value="XS">XS</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
          </select>
        </div>

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

        <button type="submit" class="apply-button">Aplicar Filtros</button>
      </form>
    </div>

    <div class="product-list">
      <div class="row">
        <ProductCard
          class="mt-3 col-md-4"
          v-for="product in filteredProducts"
          :key="product.product_id"
          :imageSrc="product.product_image"
          :title="product.product_name"
          :description="product.product_description"
          :price="product.product_price"
          :product_id="product.product_id"
          @clickImage="goToProductDetails(product.product_name)"
        />
      </div>
    </div>
  </div>

</template>

<script>
//          @click="goToProductDetails(product.product_name)"

import ProductCard from "@/components/ProductCard.vue";

const url = "http://localhost:3000";

export default {
  name: "CategoryProducts",
  components: {
    ProductCard,
  },
  props: {
    category_prop: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      category_name: "",
      products: [],
      size: "",
      destacado: false,
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
    if (this.$route.params.category_name != undefined) {
      this.category_name = this.$route.params.category_name;
    } else if (this.category_prop == "Destacados") {
      this.category_name = this.category_prop;
      this.destacado = true; 
    }
    this.fetchProducts();
  },
  watch: {
    $route(to) {
      this.category_name = to.params.category_name;
      this.fetchProducts();
    },
  },
  computed: {
    filteredProducts() {
      return this.products.filter((product) => {
        let sizeCondition = true;
        let priceCondition = true;

        if (this.size) {
          sizeCondition = product.product_size === this.size;
        }

        if (Object.values(this.priceRanges).includes(true)) {
          const selectedRanges = Object.keys(this.priceRanges).filter(range => this.priceRanges[range]);
          const prices = selectedRanges.map(range => range.split('-').map(val => parseInt(val)));
          priceCondition = prices.some(priceRange => product.product_price >= priceRange[0] && product.product_price <= priceRange[1]);
        }

        return sizeCondition && priceCondition;
      });
    },
  },
  methods: {
    async fetchProducts() {
      if (this.category_name == "Todos") {
        this.category_name = "";
      }
      try {
        const response = await fetch(
          `${url}/api/products?category_name=${this.category_name}`
        );
        const data = await response.json();
        this.products = data;
      } catch (error) {
        console.error("Error al obtener productos:", error);
      }
    },
    goToProductDetails(product_name) {
      const encodedProductName = encodeURIComponent(product_name);
      this.$router.push({
        name: "ProductDetails",
        params: { product_name: encodedProductName },
      });
    },
    async applyFilters() {
      try {
        const response = await fetch(
          `${url}/api/products?category_name=${this.category_name}&size=${this.size}&min_price=${this.customMinPrice}&max_price=${this.customMaxPrice}`
        );
        const data = await response.json();
        this.products = data;
      } catch (error) {
        console.error("Error al obtener productos con filtros:", error);
      }
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 1200px;
  display: flex;
  justify-content: center;
  margin: 0 auto;
}

.sidebar {
  flex: 0 0 25%;
  max-width: 25%;
  padding: 15px;
  background-color: #f4f4f4;
  height: 30rem;
  margin-top: 2rem; 
  overflow-y: auto; 
  margin-right: 1rem;
}

.filters {
  margin-bottom: 30px;
  height: auto; 
}

.filter-group {
  margin-bottom: 20px;
}

.filter-group label {
  display: block;
  margin-bottom: 5px;
}

.filter-group select,
.filter-group input[type="number"] {
  width: calc(100% - 10px);
  margin-top: 5px;
}

.price-ranges {
  display: flex;
  flex-wrap: wrap;
  margin-bottom: 10px;
}

.price-range {
  margin-right: 10px;
}

.custom-price-range {
  margin-top: 10px;
}

.apply-button {
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

.apply-button:hover {
  background-color: #0056b3;
}

.product-list {
  flex: 1;
  padding: 15px;
  height: auto; 
  margin-bottom: 1rem;
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