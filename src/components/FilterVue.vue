<template>
    <section class="filter-section">
      <h1>Filtrando</h1>
      <div class="range-container">
        <label for="minPrice">Precio Mínimo:</label>
        <input type="range" id="minPrice" min="0" max="200" step="5" value="0" @input="updatePrice">
        <span id="displayMin">{{ minValue }}</span>
      </div>
  
      <div class="range-container">
        <label for="maxPrice">Precio Máximo:</label>
        <input type="range" id="maxPrice" min="0" max="200" step="5" value="200" @input="updatePrice">
        <span id="displayMax">{{ maxValue }}</span>
      </div>
    </section>
  </template>
  
  <script>
  export default {
    name: 'FilterVue',
    data() {
      return {
        minValue: 0,
        maxValue: 200
      };
    },
    methods: {
      updatePrice() {
        this.minValue = document.getElementById('minPrice').value;
        this.maxValue = document.getElementById('maxPrice').value;
      }
    }
  }
  </script>
  
  <style scoped>
  .filter-section {
    max-width: 400px;
    margin: 20px auto;
    padding: 20px;
    background-color: #f4f4f4;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  
  .range-container {
    margin-bottom: 20px;
  }
  
  label {
    display: block;
    margin-bottom: 8px;
    font-weight: bold;
  }
  
  input[type="range"] {
    width: 100%;
  }
  
  span {
    display: inline-block;
    margin-top: 8px;
    font-weight: bold;
  }
  </style>
  