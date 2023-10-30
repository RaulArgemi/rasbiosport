<template>
  <div class="container-fluid login">
    <div class="background-container">
      <div class="row">
        <div class="col-md-6 offset-md-3 gray-bg container-lg mt-5 mb-5">
          <div class="d-flex justify-content-center">
            <h2>Iniciar Sesión</h2>
          </div>
          <form>
          <div class="form-group">
            <label for="email">Correo Electrónico</label>
            <input type="email" class="form-control" id="email" placeholder="Ingresa tu correo electrónico" required>
          </div>
          <div class="form-group">
            <label for="password">Contraseña</label>
            <input type="password" class="form-control" id="password" placeholder="Ingresa tu contraseña" required>
          </div>
          <br>
          <div class="d-flex justify-content-center">
            <button type="submit" class="btn btn-primary">Iniciar Sesión</button>
          </div>
          <div class="d-flex justify-content-center">
            <p>No tienes cuenta? <a href="/register">Regístrate</a></p>
          </div>
        </form>
        </div>
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
  background-repeat: no-repeat;
  background-attachment: fixed;
  width: 100%;
  height: 90vh;
}

.background-container {
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
}

.gray-bg {
  background-color: #f2f2f2;
  padding: 20px;
}
</style>
