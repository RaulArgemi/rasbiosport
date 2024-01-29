<template>
  <div class="login d-flex justify-content-center align-items-center">
    <div ref="formulario" class="gray-bg p-4 border border-dark rounded col-md-6">
      <h3 class="mb-4 text-center">Inicia sesión</h3>
      <div class="mb-3">
        <label for="correo" class="form-label">Correo</label>
        <input v-model="correo" type="text" class="form-control" id="correo" placeholder="Correo">
      </div>
      <div class="mb-3">
        <label for="contraseña" class="form-label">Contraseña</label>
        <input v-model="contraseña" type="password" class="form-control" id="contraseña" placeholder="·······" @keyup.enter="login">
      </div>
      <p v-if="errorMensaje" class="text-danger mb-3">{{ errorMensaje }}</p>
      <button @click="login" class="btn btn-primary colorGreen mb-3 boton">Iniciar sesión</button>
      <p class="mb-0 boton2 text-center">No tienes cuenta? <router-link to="/register">Regístrate!</router-link></p>
    </div>
  </div>
</template>

<script>
import Usuari from '../classes/userClass';
import Store from '../store/store';
import Cookies from 'js-cookie';

const url = "https://fabioaviador.alwaysdata.net"

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
          this.errorMensaje = 'Correo y contraseña son obligatorios';
          return;
        }
        const response = await fetch('https://ssh-fabioaviador.alwaysdata.net/api/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
        const responseData = await response.json();
        if (responseData.token) {
          localStorage.setItem('token', responseData.token);

          const user = new Usuari(
            responseData.user.id.id_user,
            responseData.user.id.name_user,
            responseData.user.id.user_phone,
            responseData.user.id.user_email,
            responseData.user.id.user_address,
            responseData.user.id.user_role
          );

          localStorage.setItem('user', JSON.stringify(user));

          this.setUserDataCookie(user);

          Store.dispatch('setUser', user);

          localStorage.removeItem('user');

          this.$router.push('/');
        } else {
          this.errorMensaje = 'Error al iniciar sesión. Verifica tus credenciales.';
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
    },
    setUserDataCookie(user) {
      const userData = {
        id_user: user.id_user,
        name_user: user.name_user,
        user_phone: user.user_phone,
        user_email: user.user_email,
        user_address: user.user_address,
        user_role: user.user_role,
      };

      Cookies.set('userData', JSON.stringify(userData), { expires: 7 });
    },
  },
};
</script>

<style scoped>
.login {
  background-image: url(https://www.spain.info/.content/imagenes/cabeceras-grandes/cataluna/camp-nou-barcelona-c-fcbarcelona.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  width: 100%;
  min-height: 90vh;
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
  background-color: #34a853;
  transition: background-color 0.3s;
}

.boton{
  margin-left: auto;
  margin-right: auto;
  display: block;
}

.boton2{
  margin-left: auto;
  margin-right: auto;
  display: block;
}
</style>
