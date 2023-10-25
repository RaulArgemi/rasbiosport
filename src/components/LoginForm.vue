<template>
  <div class="container-fluid login">
    <div class="row">
      <div class="col-md-6 offset-md-3 gray-bg container-lg mt-5 mb-5 ">
        <h2>Iniciar Sesión</h2>
        <form class="">
          <div class="form-group">
            <label for="email">Correo Electrónico</label>
            <input type="email" class="form-control" id="email" placeholder="Ingresa tu correo electrónico" required>
          </div>
          <div class="form-group">
            <label for="password">Contraseña</label>
            <input type="password" class="form-control" id="password" placeholder="Ingresa tu contraseña" required>
          </div>
          <button type="submit" class="btn btn-primary m-2">Iniciar Sesión</button>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
 export default {
    name: 'LoginComponent',
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
