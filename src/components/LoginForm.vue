<template>
  <div class="login d-flex justify-content-center align-items-center">
    <div class="gray-bg p-4 border border-dark rounded">
      <h3 class="mb-4">Inicia sesión</h3>
      <div class="mb-3">
        <label for="correo" class="form-label">Correo</label>
        <input v-model="correo" type="text" class="form-control" id="correo" placeholder="Correo">
      </div>
      <div class="mb-3">
        <label for="contraseña" class="form-label">Contraseña</label>
        <input v-model="contraseña" type="password" class="form-control" id="contraseña" placeholder="Contraseña">
      </div>
      <button @click="login" class="btn btn-primary mb-3">Iniciar sesión</button>
      <!-- Nuevo contenedor para alinear elementos -->
      <p class="text-center">No tienes cuenta? <router-link to="/register">Regístrate!</router-link></p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      correo: '',
      contraseña: '',
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
          return;
        }

        const response = await fetch('http://localhost:3000/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        if (response.status === 200) {
          console.log('Inicio de sesión exitoso');
        } else {
          console.error('Error al iniciar sesión');
        }
      } catch (error) {
        console.error('Error al iniciar sesión:', error);
      }
    },
  },
};
</script>

<style>
/* Resto de estilos... */
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
</style>

