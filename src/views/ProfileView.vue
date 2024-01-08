<template>
  <div>
    <NavComponent></NavComponent>
    <div class="container mt-4">
      <h2 class="text-center">Perfil</h2>
      <div class="profile-form">
        <div class="mb-3" v-for="(value, key) in editableUser" :key="key">
          <label :for="key" class="form-label">{{ key }}</label>
          <div class="d-flex">
            <input v-if="editMode[key]" v-model="editableUser[key]" :id="key" class="form-control"
              :type="getInputType(key)">
            <span v-else>{{ user[key] }}</span>
            <button v-if="editMode[key]" @click="updateField(key)" class="btn btn-success btn-sm">✔️</button>
            <button v-if="editMode[key]" @click="cancelEdit(key)" class="btn btn-danger btn-sm">❌</button>
            <button v-else @click="enableEdit(key)" class="btn btn-primary btn-sm">Editar</button>
          </div>
        </div>
      </div>
    </div>
    <FooterVue></FooterVue>
  </div>
</template>

<script>
import NavComponent from '../components/NavComponent.vue';
import FooterVue from '@/components/FooterVue.vue';
import { useStore } from 'vuex';
import Cookies from 'js-cookie';

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
  data() {
    return {
      editMode: {},
      editableUser: {},
    };
  },
  mounted() {
    this.resetEdit();
    const storedUser = Cookies.get('userData');
    if (storedUser) {
      this.$store.dispatch('setUser', JSON.parse(storedUser));
    }
    this.checkAuthentication();
  },
  methods: {
    enableEdit(field) {
      this.editMode[field] = true;
      this.editableUser[field] = this.user[field];
    },
    cancelEdit(field) {
      this.editMode[field] = false;
    },
    async updateField(field) {
      this.editMode[field] = false;
      await this.updateUserProfile(field, this.editableUser[field]);
      this.$store.dispatch('updateUserField', { field, value: this.editableUser[field] });
    },
    getInputType(field) {
      if (field === 'email') return 'email';
      if (field === 'phone') return 'tel';
      return 'text';
    },
    resetEdit() {
      Object.keys(this.user).forEach(key => {
        this.editMode[key] = false;
      });
      this.editableUser = { ...this.user };
    },
    async updateUserProfile(field, value) {
      try {
        const updateData = {
          id_user: this.user.id_user,
          field: JSON.stringify(field),
          value: JSON.stringify(value)
        };

        const response = await fetch(`http://localhost:3000/api/me`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(updateData)
        });

        const data = await response.json();
        if (response.ok) {
          //.
        } else {
          throw new Error(data.error || 'Error al actualizar el perfil');
        }
      } catch (error) {
        console.error('Error al actualizar el perfil:', error);
      }
    },

    setUserDataCookie() {
      const userData = {
        id_user: this.user.id_user,
        name_user: this.user.name_user,
        user_phone: this.user.user_phone,
        user_email: this.user.user_email,
        user_address: this.user.user_address,
        user_role: this.user.user_role,
      };

      Cookies.set('userData', JSON.stringify(userData), { expires: 7 }); 

      if (localStorage.getItem('userData')) {
        localStorage.removeItem('userData');
      }
    },
    checkAuthentication() {
      const userDataCookie = Cookies.get('userData');

      if (userDataCookie) {
        this.itsLogged = true;
        this.$store.dispatch('setUser', JSON.parse(userDataCookie));
        console.log('Usuario autenticado');
      } else {
        this.itsLogged = false;
        console.log('Usuario no autenticado');
      }
    },
  },
};
</script>
