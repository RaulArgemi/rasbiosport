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
  name: 'AdminRegister',

  data() {
    return {
      product_name: '',
      product_price: '',
      categoria: '',
      product_info: '',
      product_image: '',
      product_tag: '',
      product_size:'L',
      categorias: [],
      Tallas: {
        'XXS': { name: 'XXS', cantidad: 0 },
        'XS': { name: 'XS', cantidad: 0 },
        'S': { name: 'S', cantidad: 0 },
        'M': { name: 'M', cantidad: 0 },
        'L': { name: 'L', cantidad: 0 },
        'XL': { name: 'XL', cantidad: 0 },
        'XXL': { name: 'XXL', cantidad: 0 },
      },
    };
  },
  mounted() {
    this.loadCategoryData();
  },

  methods: {
    async addSizes() {
      const tallasConCantidad = Object.fromEntries(
      Object.entries(this.Tallas).filter(([, info]) => info.cantidad > 0))
      console.log("MIERDA" + JSON.stringify(tallasConCantidad))
      try {
        const responseTalla = await fetch(`${url}/api/add/talla`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            Tallas: tallasConCantidad,
          }),
        });

        if (responseTalla.status === 200) {
          console.log('Tallas añadidas exitosamente.');
        } else {
          console.error('Error al añadir tallas:', responseTalla.status, await responseTalla.text());
        }

      } catch (error) {
        console.error('Error en la solicitud al agregar tallas:', error);
      }
    },

    handleNumericInput(event) {
      event.target.value = event.target.value.replace(/[^0-9.]/g, '');
      this.product_price = event.target.value;
    },

    async loadCategoryData() {
      try {
        const response = await fetch('https://ssh-fabioaviador.alwaysdata.net/api/category');

        if (response.status === 404) {
          console.error('Recursos no encontrados');
          return;
        }

        if (!response.ok) {
          throw new Error(`Error en la solicitud: ${response.status}`);
        }

        const data = await response.json();
        console.log(data);
        const categoryNames = data.map(category => category.category_name);
        this.categorias = categoryNames
        console.log(this.categorias)
      } catch (error) {
        console.error('Error al cargar los datos de categorías:', error);
      }
    },
    async addProduct() {
      try {
        const formData = {
          product_name: JSON.stringify(this.product_name),
          category: JSON.stringify(this.categoria),
          product_info: JSON.stringify(this.product_info),
          product_size: JSON.stringify(this.product_size),
          product_image: JSON.stringify(this.product_image),
          product_price: this.product_price,
          product_tag: JSON.stringify(this.product_tag),
        };

        console.log(formData)
        console.log(JSON.stringify(formData))
        if (!formData.product_name || !formData.category || !formData.product_info || !formData.product_image || !formData.product_tag || !formData.product_price || !formData.product_size) {

          console.error('Todos los campos son obligatorios');
          this.$refs.formulario.classList.add('rebote');
          setTimeout(() => {
            this.$refs.formulario.classList.remove('rebote');
          }, 500);
          this.$refs.formulario.querySelectorAll('input').forEach((input) => {
            input.classList.add('input-fallido');
          });
          return;
        }
        const response = await fetch('https://ssh-fabioaviador.alwaysdata.net/api/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.status === 200) {
          console.log('Registro exitoso');
          this.addSizes()

        } else {
          console.error('Error al registrarse:', response.status, await response.text());
          console.error('Error al registrarse');
          this.$refs.formulario.classList.add('rebote');
          setTimeout(() => {
            this.$refs.formulario.classList.remove('rebote');
          }, 500);
        }
        
      } catch (error) {
        console.error('Error al registrarse:', error);
      }
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
