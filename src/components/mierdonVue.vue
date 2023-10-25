<template>
  <div>
    <h1>Datos desde el servidor</h1>
    <ul>
      <li v-for="user in datos" :key="user._id">{{ user.id_user }}</li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'mierdonVue',
  data() {
    return {
      datos: [],
    };
  },
  mounted() {
    fetch('http://localhost:3000/api/users')
      .then((response) => response.json())
      .then((data) => {
        this.datos = data;
      })
      .catch((error) => {
        console.error('Error al cargar los datos:', error);
      });
  },
};
</script>