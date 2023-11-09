<template>
  <div class="login d-flex justify-content-center align-items-center">
    <div class="gray-bg p-4 border border-dark rounded">
      <input v-model="nombre" placeholder="Nombre" class="form-control mb-2">
      <input v-model="telefono" placeholder="Número de Teléfono" class="form-control mb-2">
      <input v-model="correo" placeholder="Email" class="form-control mb-2">
      <input v-model="contraseña" placeholder="Contraseña" type="password" class="form-control mb-2">
      <input v-model="confirmarContraseña" placeholder="Confirmar Contraseña" type="password" class="form-control mb-2">
      <button @click="register" class="btn btn-primary">Registrarse</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nombre: '',
      telefono: '',
      correo: '',
      contraseña: '',
      confirmarContraseña: '',
    };
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
        };

        if (!formData.nombre || !formData.telefono || !formData.correo || !formData.contraseña || !formData.confirmarContraseña) {
          console.error('Todos los campos son obligatorios');
          return;
        }

        if (formData.contraseña !== formData.confirmarContraseña) {
          console.error('Las contraseñas no coinciden');
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
        } else if (response.status === 409) {
          console.error('El correo ya está registrado');
        } else {
          console.error('Error al registrarse');
        }

      } catch (error) {
        console.error('Prueba Error al registrarse:', error);
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
  margin: 0;
  padding: 0;
}

.gray-bg {
  background-color: #f2f2f2;
  padding: 20px;
}
</style>
