<template>
  <div class="login d-flex justify-content-center align-items-center">
    <div class="gray-bg p-4 border border-dark rounded col-md-6">
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
        <div class="form-check">
          <input type="radio" class="form-check-input" id="terminos" required>
          <label class="form-check-label" for="terminos">Acepto los <router-link to="/privacy">Términos y condiciones</router-link></label>
        </div>
      </div>
      <div class="mb-3 form-check">
        <input type="checkbox" class="form-check-input" id="correos">
        <label class="form-check-label" for="correos">Acepto recibir correos promocionales</label>
      </div>
        <button @click="register" class="btn btn-primary">Registrarse</button>
        <br>
      <p class="texto">Ya tienes cuenta? <router-link to="login">Inicia sesión</router-link></p>
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

button{
  float: right;
}

.texto{
  text-align: center;
}

.gray-bg {
  background-color: #f2f2f2;
  padding: 20px;
}
</style>