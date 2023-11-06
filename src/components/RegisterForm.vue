<template>
  <div class="container-fluid login">
    <div class="row">
      <div class="col-md-6 offset-md-3 gray-bg container-lg mt-5 mb-5">
        <div class="d-flex justify-content-center">
          <h2>Registrarse</h2>
        </div>
        <form @submit.prevent="registerUser">
          <div class="form-group">
            <label for="nombreCompleto">Nombre Completo</label>
            <input type="text" class="form-control" id="nombreCompleto" v-model="nombreCompleto" required>
          </div>
          <div class="form-group">
            <label for="email">Correo Electrónico</label>
            <input type="email" class="form-control" id="email" v-model="correo" required>
          </div>
          <div class="form-group">
            <label for="password">Contraseña</label>
            <input type="password" class="form-control" id="password" v-model="contraseña" required>
          </div>
          <div class="form-group">
            <label for="repeatPassword">Repetir Contraseña</label>
            <input type="password" class="form-control" id="repeatPassword" v-model="repetirContraseña" required>
          </div>
          <div class="form-group">
            <label for="telefono">Número de Teléfono</label>
            <input type="tel" class="form-control" id="telefono" v-model="numeroTelefono" required>
          </div>
          <div class="form-check">
            <input type="checkbox" class="form-check-input" id="aceptarTerminos" required>
            <label class="form-check-label" for="aceptarTerminos">Acepto los términos y condiciones</label>
          </div>
          <div class="form-check">
            <input type="checkbox" class="form-check-input" id="recibirCorreos" v-model="recibirCorreos">
            <label class="form-check-label" for="recibirCorreos">Deseo recibir correos con los productos</label>
          </div>
          <div class="d-flex justify-content-center">
            <button type="submit" class="btn btn-primary">Registrarse</button>
          </div>
          <div class="d-flex justify-content-center">
            <p>¿Ya tienes cuenta? <router-link to="/login">Inicia sesión</router-link></p>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>




<script>
export default {
  data() {
    return {
      nombreCompleto: '',
      correo: '',
      contraseña: '',
      numeroTelefono: '',
      recibirCorreos: false,
    };
  },
  methods: {
registerUser() {
  // Crea un objeto JSON con los datos a enviar
  const requestBody = {
    nombre: this.nombreCompleto,
    correo: this.correo,
    contraseña: this.contraseña,
    numeroTelefono: this.numeroTelefono,
  };

  // Imprime el JSON en la consola antes de enviar la solicitud
  console.log('JSON enviado en la solicitud:', JSON.stringify(requestBody));

  // Realiza una solicitud HTTP POST al servidor para registrarse
  fetch('/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Error en la solicitud al servidor');
      }
      return response.json();
    })
    .then((data) => {
      console.log('Token JWT:', data.token);
      // Redirigir a la página de inicio u otra acción necesaria.
    })
    .catch((error) => {
      console.error('Error en el registro:', error);
    });
},

  },
};
</script>
<style>
  .login {
    background-image: url(https://www.spain.info/.content/imagenes/cabeceras-grandes/cataluna/camp-nou-barcelona-c-fcbarcelona.jpg);
    background-size: cover;
    width: auto;
    height: auto;
  }
  .gray-bg {
    background-color: #f2f2f2; /* Cambia el color de fondo a gris (#f2f2f2) o el que prefieras */
    padding: 20px; /* Agrega relleno para que el fondo gris sea visible alrededor del formulario */
  }
</style>

  