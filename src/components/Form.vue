<template>
<div class="container">
  <div class="row">
    <div class="col-md-6 offset-md-3">
      <h2>Iniciar Sesión</h2>
      <form>
        <div class="form-group">
          <label for="email">Correo Electrónico</label>
          <input type="email" class="form-control" id="email" placeholder="Ingresa tu correo electrónico" required>
        </div>
        <div class="form-group m-5">
          <label for="password">Contraseña</label>
          <input type="password" class="form-control" id="password" placeholder="Ingresa tu contraseña" required>
        </div>
        <button type="submit" class="btn btn-primary">Iniciar Sesión</button>
      </form>
    </div>
  </div>
</div>
</template>