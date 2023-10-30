<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <router-link to="/"><img class="logo" src="../assets/rasbiosport.png"></router-link>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse justify-content-end" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item">
          <router-link to="/login" class="nav-link"><img class="header-photo" src="../assets/login.png"></router-link>
        </li>
        <li class="nav-item">
          <router-link to="/register" class="nav-link"><img class="header-photo" src="../assets/register.png"></router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>
