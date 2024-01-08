<template>
  <div class="login d-flex justify-content-center align-items-center">
    <div ref="formulario" class="gray-bg p-4 border border-dark rounded">
      <h3 class="mb-4 text-center">Inicia sesión</h3>
      <div class="mb-3">
        <label for="correo" class="form-label">Correo</label>
        <input @keyup.enter="login" v-model="correo" type="text" class="form-control" id="correo" placeholder="Correo" @focus="resaltarCampo">
      </div>
      <div class="mb-3">
        <label for="contraseña" class="form-label">Contraseña</label>
        <input @keyup.enter="login" v-model="contraseña" type="password" class="form-control" id="contraseña" placeholder="Contraseña" @focus="resaltarCampo">
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
import Store from '../store/store';
import Cookies from 'js-cookie';

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
        const response = await fetch('http://localhost:3000/api/login', {
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