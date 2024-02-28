<template>
    <div>
      <h3>Dejar una reseña</h3>
      <form @submit.prevent="submitReview">
        <div class="form-group">
          <label for="rating">Rating:</label>
          <div class="rating-stars">
            <span v-for="n in 5" :key="n" @click="setRating(n)" :class="{ 'filled': n <= selectedRating }">&#9733;</span>
          </div>
          <input type="hidden" name="rating" v-model="selectedRating">
        </div>
        <div class="form-group">
          <label for="review">Reseña:</label>
          <textarea class="form-control" name="review" v-model="review"></textarea>
        </div>
        <button type="submit" class="btn btn-primary">Enviar reseña</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        selectedRating: 0,
        review: ''
      };
    },
    methods: {
      setRating(rating) {
        this.selectedRating = rating;
      },
      submitReview() {
        // console.log('Rating:', this.selectedRating);
        // console.log('Reseña:', this.review);

      }
    }
  };
  </script>
  
  <style scoped>
  .rating-stars {
    color: #ffd700; /* Color amarillo */
  }
  
  .rating-stars span {
    font-size: 24px; /* Tamaño de la estrella */
    cursor: pointer; /* Cambiar el cursor al pasar por encima */
  }
  
  .rating-stars span.filled {
    color: #ffbb00; /* Cambiar color a dorado cuando se llena */
  }
  </style>
  