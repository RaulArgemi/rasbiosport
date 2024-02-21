<template>
    <div class="search-bar">
        <input type="text" v-model="searchTerm" @input="searchProducts" @keyup.enter="submitSearch"
            placeholder="Buscar productos..." class="search-input">
        <button @click="submitSearch">Buscar</button>
        <div v-if="showResults">
            <ul>
                <li v-for="(result, index) in searchResults" :key="index" @click="goToSearchResult(result)">
                    {{ result }}
                </li>
            </ul>
        </div>
    </div>
</template>
  
<script>

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
        async searchProducts() {
            if (this.searchTerm.length > 0) {
                try {
                    // Realizar la búsqueda de productos aquí y actualizar this.searchResults
                    // Por ejemplo:
                    // const response = await fetch(`http://localhost:3000/api/search?query=${encodeURIComponent(this.searchTerm)}`);
                    // this.searchResults = await response.json();
                    // this.showResults = true;
                } catch (error) {
                    console.error("Error al buscar productos:", error);
                }
            } else {
                this.searchResults = [];
                this.showResults = false;
            }
        },
        submitSearch() {
            if (this.searchTerm) {
                const encodedQuery = encodeURIComponent(this.searchTerm);
                this.$router.push({ path: '/search', query: { query: encodedQuery } });
            }
        },
        goToSearchResult(result) {
            this.searchTerm = result;
            this.submitSearch();
        }
    }
};
</script>
  
<style scoped>
.search-bar {
    position: relative;
}

.search-input {
    padding-right: 80px;
}

button {
    position: absolute;
    top: 0;
    right: 0;
}
</style>
  