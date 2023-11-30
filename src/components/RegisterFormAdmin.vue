<template>
  <div class="login d-flex justify-content-center align-items-center">
    <div ref="formulario" class="gray-bg p-4 border border-dark rounded col-md-6">
      <div class="d-flex justify-content-center">
        <h3 class="mb-4 ">Añade un nuevo Producto</h3>
      </div>
      <div class="mb-3">
        <label for="nombreProducto" class="form-label"> Producto</label>
        <input v-model="nombreProducto" type="text" class="form-control" id="nombreProducto" placeholder="">
      </div>
      <div class="mb-3">
        <label for="categoria" class="form-label">Categoría: </label>
        <br>
        <select v-model="categoria">
          <option v-for="cat in this.categorias" :key="cat.id" :value="cat">{{ cat }}</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="imgProducto" class="form-label">Información del producto</label>
        <input v-model="imgProducto" type="password" class="form-control" id="imgProducto" placeholder="">
      </div>
      <div class="mb-3">
        <label for="tagProducto" class="form-label">Imagen del producto</label>
        <input v-model="tagProducto" type="text" class="form-control" id="tagProducto" placeholder="">
      </div>
      <div class="mb-3">
        <label for="categoria" class="form-label">Tallas: </label><br>
        <select>
          <option v-for="talla in this.tallas" :key="talla" :value="talla">{{ talla }}</option>
        </select>
      </div>
      <div class="mb-3">
        <label for="tag" class="form-label">Tag</label>
        <input type="text" class="form-control" id="tag" placeholder="">
      </div>
      <button @click="register" class="btn btn-primary colorGreen botonRegister">Registrarse</button>
      <br>
    </div>
  </div>
</template>
  
<script>
export default {
  name: 'AdminRegister',

  data() {
    return {
      nombreProducto: '',
      categoria: '',
      infoProducto: '',
      imgProducto: '',
      tagProducto: '',
      tallaProducto: '',
      categorias: [],
      tallas: ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL']
    };
  },
  mounted() {
    this.loadCategoryData()
  },

  methods: {
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
    async register() {
      try {
        const formData = {
          nombreProducto: this.nombreProducto,
          categoria: this.categoria,
          infoProducto: this.infoProducto,
          imgProducto: this.imgProducto,
          tagProducto: this.tagProducto,
        };

        if (!formData.nombreProducto || !formData.categoria || !formData.infoProducto || !formData.imgProducto || !formData.tagProducto) {
          console.error('Todos los campos son obligatorios');
          this.tallaProducto = 'Todos los campos son obligatorios'
          this.$refs.formulario.classList.add('rebote');
          setTimeout(() => {
            this.$refs.formulario.classList.remove('rebote');
          }, 500);
          this.$refs.formulario.querySelectorAll('input').forEach((input) => {
            input.classList.add('input-fallido');
          });
          return;
        }
        const response = await fetch('http://localhost:3000/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.status === 200) {
          console.log('Registro exitoso');
        }  else {
          console.error('Error al registrarse');
          this.tallaProducto = 'Error al registrarse'
          this.$refs.formulario.classList.add('rebote');
          setTimeout(() => {
            this.$refs.formulario.classList.remove('rebote');
          }, 500);
        }

      } catch (error) {
        console.error('Prueba Error al registrarse:', error);
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
  
  
  