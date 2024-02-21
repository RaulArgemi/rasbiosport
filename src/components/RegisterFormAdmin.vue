<template>
  <div class="form-container">
    <div class="form-wrapper">
      <h3 class="form-title">Añade un nuevo Producto</h3>
      <div class="form-group">
        <label for="product_name" class="form-label">Producto</label>
        <input v-model="product_name" type="text" class="form-control" id="product_name" placeholder="Nombre del producto">
      </div>
      <div class="form-group">
        <label for="category" class="form-label">Categoría:</label>
        <select v-model="categoria" class="form-control">
          <option v-for="cat in categorias" :key="cat" :value="cat">{{ cat }}</option>
        </select>
      </div>
      <div class="form-group">
        <label for="product_info" class="form-label">Información del producto</label>
        <input v-model="product_info" type="text" class="form-control" id="product_info" placeholder="Información del producto">
      </div>
      <div class="form-group">
        <label for="product_image" class="form-label">Imagen del producto</label>
        <input v-model="product_image" type="text" class="form-control" id="product_image" placeholder="URL de la imagen">
      </div>
      <div class="form-group">
        <label for="product_price" class="form-label">Precio del Producto</label>
        <input v-model="product_price" @input="handleNumericInput" type="text" class="form-control" id="product_price" placeholder="Precio del producto">
      </div>
      <div class="form-group">
        <label class="form-label">Tallas:</label>
        <div v-for="(size, key) in Tallas" :key="key">
          <label>
            {{ key }} Cantidad:
            <input type="number" min="0" v-model="size.cantidad">
          </label><br>
        </div>
      </div>
      <div class="form-group">
        <label for="product_tag" class="form-label">Tag</label>
        <input v-model="product_tag" type="text" class="form-control" id="product_tag" placeholder="Tag">
      </div>
      <div class="button-container">
        <button @click="cancelAdd" class="cancel-btn">Cancelar</button>
        <button @click="addProduct" class="btn btn-primary">Registrar</button>
      </div>
    </div>
  </div>
</template>

<script>
const url = "http://localhost:3000";

export default {
  name: 'RegisterFormAdmin',

  data() {
    return {
      product_name: '',
      product_price: '',
      categoria: '',
      product_info: '',
      product_image: '',
      product_tag: '',
      categorias: [],
      Tallas: {
        'XXS': { cantidad: 0 },
        'XS': { cantidad: 0 },
        'S': { cantidad: 0 },
        'M': { cantidad: 0 },
        'L': { cantidad: 0 },
        'XL': { cantidad: 0 },
        'XXL': { cantidad: 0 },
      },
    };
  },
  mounted() {
    this.loadCategoryData();
  },

  methods: {
    async addProduct() {
      try {
        const formData = {
          product_name: this.product_name,
          category: this.categoria,
          product_info: this.product_info,
          product_image: this.product_image,
          product_price: this.product_price,
          product_tag: this.product_tag,
          Tallas: this.Tallas,
        };

        console.log(formData);

        // Realizar aquí la lógica para enviar los datos al servidor
      } catch (error) {
        console.error('Error al registrar el producto:', error);
      }
    },

    async loadCategoryData() {
      try {
        const response = await fetch(`${url}/api/category`);

        if (response.status === 404) {
          console.error('Recursos no encontrados');
          return;
        }

        if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.status}`);
        }

        const data = await response.json();
        const categoryNames = data.map(category => category.category_name);
        this.categorias = categoryNames;
      } catch (error) {
        console.error('Error al cargar los datos de categorías:', error);
      }
    },

    handleNumericInput(event) {
      event.target.value = event.target.value.replace(/[^0-9.]/g, '');
      this.product_price = event.target.value;
    },

    cancelAdd() {
      this.$emit('cancel');
    }
  },
};
</script>

<style scoped>
.form-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.form-wrapper {
  background-color: #fff;
  padding: 20px;
  border-radius: 10px;
  width: 50%; 
  height: 70%;
  overflow: scroll;
}

.form-title {
  text-align: center;
  margin-bottom: 20px;
  color: #333; 
}

.form-group {
  margin-bottom: 15px;
}

.form-label {
  font-weight: bold;
}

.form-control {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.btn {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #4285f4;
  color: #fff;
}

.btn:hover {
  background-color: #34a853;
}

.cancel-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #ccc;
  color: #000;
  margin-right: 10px;
}

.cancel-btn:hover {
  background-color: #aaa;
}

.button-container {
  display: flex;
  justify-content: flex-end;
}
</style>
