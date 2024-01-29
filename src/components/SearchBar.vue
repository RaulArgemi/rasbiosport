<template>
    <div class="search-bar">
        <input type="text" v-model="searchTerm" @input="searchProducts" placeholder="Buscar productos..."
            class="search-input" >
        <ul v-if="showResults && searchResults.length" class="search-results">
            <li v-for="product in searchResults" :key="product.product_id" @click="selectProduct(product)">
                {{ product.product_name }}
            </li>
        </ul>
    </div>
</template>
  
<script>
import debounce from "lodash/debounce";

const url = "https://fabioaviador.alwaysdata.net"

export default {
    name: "SearchBar",
    data() {
        return {
            searchTerm: "",
            searchResults: [],
            showResults: false
        };
    },
    methods: {
        searchProducts: debounce(async function () {
            this.showResults = true;
            if (!this.searchTerm) {
                this.searchResults = [];
                console.log("Busqueda vacía")
                return;
            }
            try {
                console.log(this.searchTerm)
                const response = await fetch(`${url}/api/products/search?query=${this.searchTerm}`);
                const data = await response.json();
                console.log(data)
                this.searchResults = data;
            } catch (error) {
                console.error('Error al buscar productos:', error);
            }
        }, 500),
        selectProduct(product) {
            this.searchTerm = '';
            this.showResults = false;
            this.$router.push({ name: 'ProductDetails', params: { product_name: product.product_name } });
        },
    }
};
</script>