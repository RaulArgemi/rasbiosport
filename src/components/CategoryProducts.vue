<template>
  <div class="container d-flex">
    <div class="col-3">
      <form @submit.prevent="applyFilters">
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

        <label for="priceRange">Rango de Precio:</label>
        <div class="price-range">
          <input
            type="range"
            v-model="minPrice"
            :min="0"
            :max="maxPrice"
            @input="updateMaxPrice"
          />
          <input
            type="range"
            v-model="maxPrice"
            :min="minPrice"
            :max="100"
            @input="updateMinPrice"
          />
          <span>{{ minPrice }} - {{ maxPrice }}</span>
        </div>

        <button type="submit">Aplicar Filtros</button>
      </form>
    </div>

    <div class="col-9">
      <div class="row">
        <ProductCard
          class="mt-3"
          v-for="product in filteredProducts"
          :key="product.product_id"
          :imageSrc="product.product_image"
          :title="product.product_name"
          :description="product.product_description"
          :price="product.product_price"
          :product_id="product.product_id"
          @click="goToProductDetails(product.product_name)"
        />
      </div>
    </div>
  </div>
</template>

<script>
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
      minPrice: 0,
      maxPrice: 100,
    };
  },
  created() {
    if (this.$route.params.category_name != undefined) {
      this.category_name = this.$route.params.category_name;
    } else if (this.category_prop == "Destacados") {
      this.category_name = this.category_prop;
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
        let priceCondition =
          product.product_price >= this.minPrice &&
          product.product_price <= this.maxPrice;

        if (this.size) {
          sizeCondition = product.product_size === this.size;
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
    updateMinPrice() {
      if (this.minPrice > this.maxPrice) {
        this.minPrice = this.maxPrice;
      }
    },
    updateMaxPrice() {
      if (this.maxPrice < this.minPrice) {
        this.maxPrice = this.minPrice;
      }
    },
    async applyFilters() {
      try {
        const response = await fetch(
          `${url}/api/products?category_name=${this.category_name}&size=${this.size}&min_price=${this.minPrice}&max_price=${this.maxPrice}`
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
.price-range {
  display: flex;
  align-items: center;
}

.price-range input {
  width: 100px;
  margin: 0 5px;
}

.price-range span {
  margin-left: 10px;
}

.container {
  max-width: 1200px;
}

.row {
  display: flex;
  flex-wrap: wrap;
  margin: 0 -15px;
}

.col-md-3 {
  flex: 0 0 25%;
  max-width: 25%;
  padding: 0 15px;
  margin-bottom: 30px;
}
</style>
