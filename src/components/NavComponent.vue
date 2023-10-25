<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <a class="navbar-brand" href="#">Página de Inicio</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link to="/login" class="nav-link">Iniciar sesión</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/register" class="nav-link">Registrarse</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/" class="nav-link">HOME</router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>
