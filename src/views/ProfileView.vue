<template>
  <div>
    <NavComponent></NavComponent>
    <div class="container mt-4">
      <h2 class="text-center">Perfil</h2>
      <div class="profile-form">
        <div v-for="(value, key) in editableUser" :key="key">
          <div v-if="key !== 'id_user' && key !== 'user_role'" class="mb-3">
            <label :for="key" class="form-label">{{ key }}</label>
            <div class="d-flex align-items-center">
              <input v-if="editMode[key]" v-model="editableUser[key]" :id="key" class="form-control"
                :type="getInputType(key)">
              <span v-else>{{ user[key] }}</span>
              <div class="button-group">
                <button v-if="editMode[key]" @click="updateField(key)" class="btn btn-success btn-sm">Guardar</button>
                <button v-if="editMode[key]" @click="cancelEdit(key)" class="btn btn-danger btn-sm">Cancelar</button>
                <button v-else @click="enableEdit(key)" class="btn btn-primary btn-sm" :disabled="isDisabled(key)">
                  Editar
                </button>
              </div>
            </div>
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

const url = "http://localhost:3000";

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
  beforeMount() {
    console.log("Se ha reiniciado")
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
      this.setUserDataCookie();
      console.log("Usuario actualizado")
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

        const response = await fetch(`${url}/api/me`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(updateData)
        });

        const data = await response.json();
        if (!response.ok) {
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
    isDisabled(field) {
      return field === 'user_id' || field === 'user_role';
    },
  },
};
</script>

<style scoped>
/* Estilos específicos para este componente */
.container {
  max-width: 800px;
  margin: 0 auto;
}

h2 {
  color: #333;
}

.profile-form {
  background-color: #f8f8f8;
  padding: 20px;
  border-radius: 8px;
}

.form-label {
  font-weight: bold;
}

.button-group {
  margin-top: 10px;
}

.btn-success {
  background-color: #28a745;
}

.btn-danger {
  background-color: #dc3545;
}

.btn-primary {
  background-color: #007bff;
}

/* Añadir más estilos según sea necesario */
</style>