<template>
  <div>
    <input v-model="correo" placeholder="Correo">
    <input v-model="contraseña" placeholder="Contraseña" type="password">
    <button @click="login">Iniciar sesión</button>
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

        // Validación de campos
        if (!formData.correo || !formData.contraseña) {
          console.error('Correo y contraseña son obligatorios');
          return;
        }

        // Realiza la solicitud HTTP
        const response = await fetch('http://localhost:3000/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        // Verifica el estado de la respuesta
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
.login {
  background-image: url(https://www.spain.info/.content/imagenes/cabeceras-grandes/cataluna/camp-nou-barcelona-c-fcbarcelona.jpg);
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
  width: 100%;
  height: 90vh;
}

.background-container {
  width: 100%;
  height: 100%;
}

.gray-bg {
  background-color: #f2f2f2;
  padding: 20px;
}
</style>
