<template>
  <div class="login d-flex justify-content-center align-items-center">
    <div ref="formulario" class="gray-bg p-4 border border-dark rounded col-md-6">
      <div class="d-flex justify-content-center">
        <h3 class="mb-4 ">Añade un nuevo Producto</h3>
      </div>
      <div class="mb-3">
        <label for="product_name" class="form-label"> Producto</label>
        <input v-model="product_name" type="text" class="form-control" id="product_name" placeholder="">
      </div>
      <div class="mb-3">
        <label for="category" class="form-label">Categoría: </label>
        <br>
        <select v-model="categoria">
          <option v-for="cat in categorias" :key="cat" :value="cat">{{ cat }}</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="product_info" class="form-label">Información del producto</label>
        <input v-model="product_info" type="text" class="form-control" id="product_info" placeholder="">
      </div>
      <div class="mb-3">
        <label for="product_image" class="form-label">Imagen del producto</label>
        <input v-model="product_image" type="text" class="form-control" id="product_image" placeholder="">
      </div>
      <div class="mb-3">
        <label for="product_price" class="form-label">Precio del Producto</label>
        <input v-model="product_price" @input="handleNumericInput" type="text" class="form-control" id="product_price"
          placeholder="">
      </div>

      <div class="mb-3">
        <label for="product_size" class="form-label">Tamaño del producto: </label><br>
        <select v-model="product_size">
          <option v-for="size in product_sizes" :key="size" :value="size">{{ size }}</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="product_tag" class="form-label">Tag</label>
        <input v-model="product_tag" type="text" class="form-control" id="product_tag" placeholder="">
      </div>
      <button @click="addProduct" class="btn btn-primary colorGreen botonRegister">Registrar</button>
      <br>
    </div>
  </div>
</template>

<script>
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
      product_size: '',
      categorias: [],
      product_sizes: ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL']
    };
  },
  mounted() {
    this.loadCategoryData()
  },

  methods: {
    handleNumericInput(event) {
      event.target.value = event.target.value.replace(/[^0-9.]/g, '');
      this.product_price = event.target.value;
    },
    async loadCategoryData() {
      try {
        const response = await fetch('http://localhost:3000/api/category');

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
        const response = await fetch('http://localhost:3000/api/products', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.status === 200) {
          console.log('Registro exitoso');
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
  },
};
</script>

<style scoped>
.textoRegister {
  margin-left: 35%;
}

.botonRegister {
  margin-left: 40%;
}

.rebote {
  animation: rebote 0.5s;
}

@keyframes rebote {

  0%,
  100% {
    transform: translateX(0);
  }

  25%,
  75% {
    transform: translateX(-20px);
  }

  50% {
    transform: translateX(20px);
  }
}

.boton {
  display: flex;
  flex-direction: column;
}

.login {

  width: 100%;
  height: 90vh;
  margin: 0;
  padding: 0;
}

.gray-bg {
  background-color: #f2f2f2;
  padding: 20px;
}

.colorGreen {
  background-color: #4285f4;

}

.colorGreen:hover {
  background-color: #34A853;
  transition: background-color 0.3s;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.login {
  animation: slideUp 1s ease-in-out;
}

.input-resaltado {
  animation: resaltarInput 0.5s forwards;
}

.input-fallido {
  animation: resaltarInputFallido 0.5s forwards;
}


@keyframes resaltarInput {
  0% {
    box-shadow: 0 0 0px rgba(66, 133, 244, 0);
    border-color: #4285f4;
  }

  100% {
    box-shadow: 0 0 8px rgba(66, 133, 244, 0.5);
    border-color: #4285f4;
  }
}



@keyframes resaltarInputFallido {
  0% {
    box-shadow: 0 0 0px rgba(66, 133, 244, 0);
    border-color: #f31919;
  }

  100% {
    box-shadow: 0 0 8px rgba(244, 107, 66, 0.5);
    border-color: #f31919;
  }
}
</style>
  
  
  