
  <template>
        <div class="form">
            <div class="input-container">
                <input type="search" required v-model="searchTerm" @input="searchProducts" @keyup.enter="submitSearch"
                    placeholder="Buscar productos..." class="search-input">
                <button @click="submitSearch" class="search-button">
                    <img src="../assets/lupa.png" alt="search icon" class="search-icon">
                </button>
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
        submitSearch() {
            if (this.searchTerm) {
                const encodedQuery = encodeURIComponent(this.searchTerm);
                this.$router.push({ path: '/search', query: { query: encodedQuery } });
            }
        },

    },

};
</script>

<style scoped>
.form {
    width: 80%;
    margin: 0 auto;
    padding: 10px;
    background-color:  #2768d1;
}

.form {
    display: flex;
    justify-content: center;
    align-items: center;
}

.input-container {
    position: relative;
    border-radius: 50px;
    overflow: hidden;
    background-color: white;
}

.search-icon {
    width: 20px;
    height: auto;
    margin: 5px;
}

.search-input {
    flex: 1;
    height: 40px;
    border: none;
    outline: none;
    font-size: 16px;
    padding-left: 10px;
}

.search-button {
    margin-right: 0.1rem;
    margin-bottom: 0.1rem;
    border: none;
    background-color: #2768d1;
    color: #fff;
    border-radius: 50% 50% 50% 50%;
    width: 40px;
    height: 40px;
    cursor: pointer;
    transition: background-color 0.3s ease;
}

.search-button:hover {
    background-color: #588dff;
}

ul {
    list-style-type: none;
    padding: 0;
    margin: 0;
}

li {
    cursor: pointer;
    padding: 5px;
}

li:hover {
    background-color: #f2f2f2;
}
</style>