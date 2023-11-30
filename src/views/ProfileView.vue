<template>
  <div>
    <NavComponent></NavComponent>
    <div class="container mt-4">
      <h2 class="text-center">Perfil</h2>

      <form class="profile-form">
        <div class="mb-3">
          <label for="name" class="form-label">Nombre:</label>
          <input type="text" class="form-control" id="name" v-model="user.name" disabled>
        </div>

        <div class="mb-3">
          <label for="phone" class="form-label">Teléfono:</label>
          <input type="text" class="form-control" id="phone" v-model="user.phone" disabled>
        </div>

        <div class="mb-3">
          <label for="email" class="form-label">Correo electrónico:</label>
          <input type="email" class="form-control" id="email" v-model="user.email" disabled>
        </div>

        <div class="mb-3">
          <label for="address" class="form-label">Dirección:</label>
          <input type="text" class="form-control" id="address" v-model="user.address" disabled>
        </div>
      </form>
    </div>
    <FooterVue></FooterVue>
  </div>
</template>

<script>
import NavComponent from '../components/NavComponent.vue';
import FooterVue from '@/components/FooterVue.vue';
import { useStore } from 'vuex';

export default {
  name: 'ProfileView',
  components: {
    NavComponent,
    FooterVue,
  },
  computed: {
    user() {
      const store = useStore();
      return store.state.user;
    }
  },
};
</script>

<style scoped>
.profile-form {
  max-width: 400px;
  margin: 0 auto;
}
</style>
