<template>
  <div class="login d-flex justify-content-center align-items-center">
    <div ref="formulario" class="gray-bg p-4 border border-dark rounded col-md-6">
      <h3 class="mb-4">Regístrate</h3>
      <div class="mb-3">
        <label for="nombre" class="form-label">Nombre completo</label>
        <input v-model="nombre" type="text" class="form-control" id="nombre" placeholder="Ej: Leo Messi">
      </div>
      <div class="mb-3">
        <label for="correo" class="form-label">Correo electrónico</label>
        <input v-model="correo" type="email" class="form-control" id="correo" placeholder="Ej: leomessi@gmail.com">
      </div>
      <div class="mb-3">
        <label for="contraseña" class="form-label">Contraseña</label>
        <input v-model="contraseña" type="password" class="form-control" id="contraseña" placeholder="·······">
        <small v-if="contraseña && !cumpleRequisitosContraseña" class="text-danger">La contraseña debe tener al menos 8 caracteres, 1 mayúscula, 1 minúscula y 1 número.</small>
      </div>
      <div class="mb-3">
        <label for="confirmarContraseña" class="form-label">Confirmar contraseña</label>
        <input v-model="confirmarContraseña" type="password" class="form-control" id="confirmarContraseña" placeholder="········">
      </div>
      <div class="mb-3">
        <label for="telefono" class="form-label">Número de teléfono</label>
        <input v-model="telefono" type="tel" class="form-control" id="telefono" placeholder="Ej: +34 675239884">
      </div>
      <div class="mb-3">
        <label for="direccion" class="form-label">Dirección</label>
        <input v-model="direccion" type="text" class="form-control" id="direccion" placeholder="Ej: Calle Principal, 123">
      </div>
      <div class="mb-3">
        <div class="form-check">
          <input type="radio" class="form-check-input" id="terminos" required>
          <label class="form-check-label" for="terminos">Acepto los <router-link to="/privacy">Términos y condiciones</router-link></label>
        </div>
      </div>
      <div class="mb-3 form-check">
        <input type="checkbox" class="form-check-input" id="correos">
        <label class="form-check-label" for="correos">Acepto recibir correos promocionales</label>
      </div>
      <p v-if="errorMensaje" class="text-danger text-center m-0 botonRegister">{{ errorMensaje }}</p>
      <button @click="register" class="btn btn-primary colorGreen botonRegister">Registrarse</button>
        <br>
      <p class="texto textoRegister">Ya tienes cuenta? <router-link to="login">Inicia sesión</router-link></p>
    </div>
  </div>
</template>

<script>
const url = "http://localhost:3000"

export default {
  data() {
    return {
      nombre: '',
      telefono: '',
      correo: '',
      contraseña: '',
      confirmarContraseña: '',
      direccion: '',
      errorMensaje:'',
    };
  },
  computed: {
    cumpleRequisitosContraseña() {
      const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
      return passwordRegex.test(this.contraseña);
    }
  },
  methods: {
    async register() {
      try {
        const formData = {
          nombre: this.nombre,
          telefono: this.telefono,
          correo: this.correo,
          contraseña: this.contraseña,
          confirmarContraseña: this.confirmarContraseña,
          direccion: this.direccion,
        };

        // Validación de campos obligatorios
        if (!formData.nombre || !formData.telefono || !formData.correo || !formData.contraseña || !formData.confirmarContraseña || !formData.direccion) {
          console.error('Todos los campos son obligatorios');
          this.errorMensaje='Todos los campos son obligatorios'
          return;
        }

        // Validación de contraseña
        if (!this.cumpleRequisitosContraseña) {
          console.error('La contraseña no cumple con los requisitos mínimos');
          this.errorMensaje='La contraseña no cumple con los requisitos mínimos'
          return;
        }

        // Validación de coincidencia de contraseñas
        if (formData.contraseña !== formData.confirmarContraseña) {
          console.error('Las contraseñas no coinciden');
          this.errorMensaje='Las contraseñas no coinciden'
          return;
        }

        const response = await fetch('https://ssh-fabioaviador.alwaysdata.net/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.status === 200) {
          console.log('Registro exitoso');
          this.$router.push('/login')
        } else if (response.status === 409) {
          console.error('El correo ya está registrado');
          this.errorMensaje='El correo ya está registrado'
        } else {
          console.error('Error al registrarse');
          this.errorMensaje='Error al registrarse'
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
  background-image: url(https://www.spain.info/.content/imagenes/cabeceras-grandes/cataluna/camp-nou-barcelona-c-fcbarcelona.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
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


