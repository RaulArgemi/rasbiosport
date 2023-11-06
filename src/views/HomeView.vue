<template>
  <div>
    <NavComponent></NavComponent>

    <div class="separator"></div>

    <div class="jumbotron big-image text-center">
      <img src="@/assets/camp-nou-barcelona-c-fcbarcelona.avif" alt="Imagen Grande" class="img-fluid">
    </div>
    <div class="separator"></div>

    <div class="container mt-4">
      <h2 class="text-center">Destacados</h2>
      <div class="row">

        <div class="col-md-4">
          <div class="card">
            <img src="imagen_destacada_1.jpg" class="card-img-top" alt="Destacado 1">
            <div class="card-body">
              <h5 class="card-title">Título Destacado 1</h5>
              <p class="card-text">Descripción del Destacado 1.</p>
            </div>
          </div>
        </div>

        <div class="col-md-4">
          <div class="card">
            <img src="imagen_destacada_2.jpg" class="card-img-top" alt="Destacado 2">
            <div class="card-body">
              <h5 class="card-title">Título Destacado 2</h5>
              <p class="card-text">Descripción del Destacado 2.</p>
            </div>
          </div>
        </div>

        <div class="col-md-4">
          <div class="card">
            <img src="imagen_destacada_3.jpg" class="card-img-top" alt="Destacado 3">
            <div class="card-body">
              <h5 class="card-title">Título Destacado 3</h5>
              <p class="card-text">Descripción del Destacado 3.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="separator"></div>

    <FooterVue></FooterVue>
  </div>
</template>

<script>
import NavComponent from '../components/NavComponent.vue'
import FooterVue from '../components/FooterVue.vue'

export default {
  name: 'HomeView',
  components: {
    NavComponent,
    FooterVue
  }
};
</script>

<style scoped>
.separator {
  height: 30px;
}

.big-image {
  width: 10%;
  height: 5rem;
  margin: 0 auto;
}

</style>
