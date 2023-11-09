<template>
  <div>
    <input v-model="nombre" placeholder="Nom">
    <input v-model="telefono" placeholder="Número de Telèfon">
    <input v-model="correo" placeholder="Email">
    <input v-model="contraseña" placeholder="Contrasenya" type="password">
    <input v-model="confirmarContraseña" placeholder="Confirmar Contrasenya" type="password">
    <button @click="register">Registrarse</button>
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
