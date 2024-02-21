<template>
    <div class="search-bar">
        <input type="text" v-model="searchTerm" @input="searchProducts" placeholder="Buscar productos..."
            class="search-input"><button @click="submitSearch">Buscar</button>
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
        submitSearch() {
            if (this.searchTerm) {
                // Codificar el término de búsqueda antes de enviarlo como parámetro de la URL
                const encodedQuery = encodeURIComponent(this.searchTerm);
                this.$router.push({ path: '/search', query: { query: encodedQuery } });
            }
        },

    },

};
</script>