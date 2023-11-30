<template>
  <div class="login d-flex justify-content-center align-items-center">
    <div ref="formulario" class="gray-bg p-4 border border-dark rounded">
      <h3 class="mb-4 text-center">Inicia sesión</h3>
      <div class="mb-3">
        <label for="correo" class="form-label">Correo</label>
        <input v-model="correo" type="text" class="form-control" id="correo" placeholder="Correo" @focus="resaltarCampo">
      </div>
      <div class="mb-3">
        <label for="contraseña" class="form-label">Contraseña</label>
        <input v-model="contraseña" type="password" class="form-control" id="contraseña" placeholder="Contraseña"
          @focus="resaltarCampo">
      </div>
      <div class="boton">
        <p v-if="errorMensaje" class="text-danger text-center m-0">{{ errorMensaje }}</p>
        <button @click="login" class="btn btn-primary mb-3 colorGreen">Iniciar sesión</button>
        <p>No tienes cuenta? <router-link to="/register">Regístrate!</router-link></p>
      </div>
    </div>
  </div>
</template>
<script>
import Usuari from '../classes/userClass';
import Store from '../store/store'

export default {
  data() {
    return {
      correo: '',
      contraseña: '',
      errorMensaje: '',
    };
  },
  methods: {
    async login() {
      try {
        const formData = {
          correo: this.correo,
          contraseña: this.contraseña,
        };

        if (!formData.correo || !formData.contraseña) {
          console.error('Correo y contraseña son obligatorios');
          this.errorMensaje = 'Correo y contraseña son obligatorios';
          this.$refs.formulario.classList.add('rebote');
          setTimeout(() => {
            this.$refs.formulario.classList.remove('rebote');
          }, 500);
          this.$refs.formulario.querySelectorAll('input').forEach((input) => {
            input.classList.add('input-fallido');
          });
          return;
        }

        const response = await fetch('http://localhost:3000/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        const responseData = await response.json();

        if (responseData.token) {

          localStorage.setItem('token', responseData.token);
          console.log('Inicio de sesión exitoso');

          const user = new Usuari(
            responseData.user.id.id_user,
            responseData.user.id.name_user,
            responseData.user.id.user_phone,
            responseData.user.id.user_email,
            responseData.user.id.user_address,
            responseData.user.id.user_role
          );
          console.log(user)
          const store1 = Store
          store1.dispatch('setUser', user)
          console.log(store1)
          this.$router.push('/');
        } else {
          this.errorMensaje = 'Error al iniciar sesión. Verifica tus credenciales.';
          this.$refs.formulario.querySelectorAll('input').forEach((input) => {
            input.classList.add('input-fallido');
          });
          console.error('Token no recibido en la respuesta del servidor');
          console.error('Error al iniciar sesión');
        }
      } catch (error) {
        this.errorMensaje = 'Error inesperado al intentar iniciar sesión. Inténtalo de nuevo más tarde.';
        console.error('Error al iniciar sesión:', error);
      }
    },
    resaltarCampo(e) {
      const campo = e.target;
      campo.classList.add('input-resaltado');
      setTimeout(() => {
        campo.classList.remove('input-resaltado');
      }, 500);
    }
  },
};
</script>


<style scoped>
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

