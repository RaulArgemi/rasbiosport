<template>
  <div>
    <NavComponent></NavComponent>
    <div class="container mt-4">
      <h2 class="text-center">Perfil</h2>
      <div class="profile-form">
        <!-- Formulario de perfil existente -->
        <div v-for="(value, key) in editableUser" :key="key">
          <div v-if="key !== 'id_user' && key !== 'user_role'" class="mb-3">
            <label :for="key" class="form-label">{{ getLabel(key) }}</label>
            <div class="d-flex align-items-center">
              <input v-if="editMode[key]" v-model="editableUser[key]" :id="key" class="form-control"
                :type="getInputType(key)">
              <span v-else>{{ user[key] }}</span>
              <div class="ml-auto">
                <div class="button-group">
                  <button v-if="editMode[key]" @click="updateField(key)" class="btn btn-success btn-sm">Guardar</button>
                  <button v-if="editMode[key]" @click="cancelEdit(key)" class="btn btn-danger btn-sm">Cancelar</button>
                  <button v-else @click="enableEdit(key)" class="editar edit" :disabled="isDisabled(key)">
                    <img src="../assets/editar.png" alt="Editar" width="20" height="20" class="edit-icon">
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Cambio de contraseña -->
        <div class="mb-3">
          <button @click="toggleChangePassword" class="btn btn-primary btn-sm">Modificar Contraseña</button>
          <div v-if="showChangePassword">
            <div class="mb-3">
              <label for="currentPassword" class="form-label">Contraseña Actual</label>
              <input v-model="currentPassword" id="currentPassword" type="password" class="form-control">
              <span v-if="incorrectCurrentPassword" class="text-danger">La contraseña actual es incorrecta</span>
            </div>
            <div class="mb-3">
              <label for="newPassword" class="form-label">Nueva Contraseña</label>
              <input v-model="newPassword" id="newPassword" type="password" class="form-control">
            </div>
            <div class="mb-3">
              <label for="confirmPassword" class="form-label">Confirmar Contraseña</label>
              <input v-model="confirmPassword" id="confirmPassword" type="password" class="form-control">
              <span v-if="passwordsMismatch" class="text-danger">Las contraseñas no coinciden</span>
              <span v-if="passwordRequirementsError" class="text-danger">La contraseña debe tener al menos 8 caracteres, 1
                mayúscula, 1 minúscula y 1 número</span>
            </div>
            <button @click="changePassword" class="btn btn-primary">Cambiar Contraseña</button>
          </div>
        </div>
        <!-- Sección de pedidos recientes -->
        <p v-if="!showOrders">Todavía no has hecho ningún pedido :</p>
        <div v-if="showOrders" class="recent-orders">
    <h2>Pedidos Recientes</h2>
    <div v-for="order in recentOrders" :key="order.order_id" class="order-card" @click="viewOrderDetails(order)">
      <div class="order-header">
        <h5>Pedido #{{ order.order_id }} | <span class="order-date">{{ formatDate(order.order_date) }}</span></h5>
      </div>
      <div class="order-body">
        <div v-for="product in order.products" :key="product.product_id" class="order-product">
          <!-- Mostrar algunos detalles del producto, si es necesario -->
        </div>
      </div>
      <div class="order-footer">
        <b class="order-total">Total: {{ currency(order.order_total) }}</b>
      </div>
    </div>
  </div>
  <OrderDetails :order="selectedOrder" v-if="selectedOrder !== null" @close="selectedOrder = null" />
      </div>
    </div>
    <!-- Modal/Formulario de Review -->
    <!-- <b-modal v-model="showReviewModal" title="Dejar Review del Producto" hide-footer>
      <div class="d-flex flex-column align-items-center">
        <rating-component v-model="currentReview.rating"></rating-component>
        <b-form-textarea v-model="currentReview.comment" placeholder="Escribe tu comentario aquí..." rows="4" class="mt-3 mb-3"></b-form-textarea>
        <b-button @click="submitReview" variant="primary">Enviar Review</b-button>
      </div>
    </b-modal> -->
  </div>
</template>

<script>
import NavComponent from '../components/NavComponent.vue';
import { useStore } from 'vuex';
import Cookies from 'js-cookie';
import OrderDetails from '@/components/OrderDetails.vue';


const url = "http://localhost:3000";

export default {
  name: 'ProfileView',
  components: {
    NavComponent,
    OrderDetails
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
      labels: {
        name_user: 'Nombre',
        user_email: 'Correo electrónico',
        user_address: 'Dirección',
        user_phone: 'Teléfono',
      },
      showChangePassword: false,
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      incorrectCurrentPassword: false,
      passwordsMismatch: false,
      passwordRequirementsError: false,
      showReviewModal: false, // Controla la visibilidad del modal de review
      currentReview: { // Almacena la información de la review actual
        orderId: null,
        productId: null,
        rating: 0,
        comment: ''
      },
      recentOrders: [], // Tu lista de pedidos recientes
      showOrders: false, // Determina si mostrar los pedidos recientes
      selectedOrder: null // El pedido seleccionado para ver detalles
    };
  },
  beforeMount() {
    this.resetEdit();
    const storedUser = Cookies.get('userData');
    if (storedUser) {
      this.$store.dispatch('setUser', JSON.parse(storedUser));
    }
    this.fetchRecentOrders(); // Llamada para obtener los pedidos recientes
    this.checkAuthentication();
  },
  methods: {
    viewOrderDetails(order) {
      this.selectedOrder = order;
    },
    formatDate(value) {
      if (value) {
        return new Date(value).toLocaleDateString();
      }
    },
    currency(value) {
      return parseFloat(value).toFixed(2) + ' €';
    },
    getLabel(key) {
      return this.labels[key] || key;
    },
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
    },
    getInputType(field) {
      if (field === 'user_email') return 'email';
      if (field === 'user_phone') return 'tel';
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
      } else {
        this.itsLogged = false;
      }
    },
    isDisabled(field) {
      return field === 'id_user' || field === 'user_role';
    },
    openReviewModal(orderId, productId) {
      this.currentReview.orderId = orderId;
      this.currentReview.productId = productId;
      this.showReviewModal = true;
    },
    async submitReview() {
      try {
        const response = await fetch(`${url}/api/add-review`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(this.currentReview)
        });
        if (!response.ok) throw new Error('Error al enviar review');
        // Cerrar modal y resetear currentReview
        this.showReviewModal = false;
        this.currentReview = { orderId: null, productId: null, rating: 0, comment: '' };
        // Opcional: actualizar la UI o mostrar mensaje de éxito
      } catch (error) {
        console.error('Error al enviar review:', error);
      }
    },
    toggleChangePassword() {
      this.showChangePassword = !this.showChangePassword;
    },
    async changePassword() {
      this.passwordsMismatch = false;
      this.passwordRequirementsError = false;
      this.incorrectCurrentPassword = false;

      if (this.newPassword !== this.confirmPassword) {
        this.passwordsMismatch = true;
        return;
      }

      const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
      if (!passwordRegex.test(this.newPassword)) {
        this.passwordRequirementsError = true;
        return;
      }

      const isCurrentPasswordCorrect = await this.verifyCurrentPassword();
      // Continuación de changePassword
      if (!isCurrentPasswordCorrect) {
        this.incorrectCurrentPassword = true;
        return;
      }

      try {
        const updateData = {
          id_user: this.user.id_user,
          new_password: this.newPassword
        };

        const response = await fetch(`${url}/api/change-password`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify(updateData)
        });

        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.error || 'Error al actualizar la contraseña');
        }

        // Limpiar los campos y cerrar el formulario de cambio de contraseña
        this.newPassword = '';
        this.confirmPassword = '';
        this.currentPassword = '';
        this.showChangePassword = false;

        // Opcionalmente, mostrar un mensaje de éxito o actualizar el estado para reflejar el cambio
      } catch (error) {
        console.error('Error al actualizar la contraseña:', error);
      }
    },
    async verifyCurrentPassword() {
      // Implementación para verificar si la contraseña actual es correcta
      try {
        const response = await fetch(`${url}/api/verify-password`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          },
          body: JSON.stringify({
            id_user: this.user.id_user,
            current_password: this.currentPassword
          })
        });

        const data = await response.json();
        return data.isPasswordCorrect;
      } catch (error) {
        console.error('Error al verificar la contraseña:', error);
        return false;
      }
    },
    fetchRecentOrders() {
      // Método para buscar los pedidos recientes del usuario
      fetch(`${url}/api/user-orders/${this.user.id_user}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
        .then(response => response.json())
        .then(data => {
          this.recentOrders = data;
          if (this.recentOrders.length) {
            this.showOrders = true;
          }
        })
        .catch(error => console.error('Error al cargar los pedidos:', error));
    },
  },
};
</script>

<style scoped>
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 0 20px;
}

.profile-form {
  background-color: #f9f9f9;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 100px;
}

.profile-form h2 {
  color: #333;
}

.form-label {
  font-weight: bold;
}

.button-group {
  margin-top: 10px;
}
.order-header{
  cursor: pointer;
}

.button-group button {
  margin-right: 10px;
}

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
}

.btn-primary:hover {
  background-color: #0056b3;
  border-color: #0056b3;
}

.btn-success {
  background-color: #007bff;
  border-color: #007bff;
}

.btn-success:hover {
  background-color: #0056b3;
  border-color: #0056b3;
}

.btn-danger {
  background-color: #dc3545;
  border-color: #dc3545;
}

.btn-danger:hover {
  background-color: #c82333;
  border-color: #c82333;
}

.text-danger {
  color: #dc3545;
}

.editar img {
  width: 20px;
  height: 20px;
  background-color: none;
  border: none;
}

.ml-auto {
  margin-left: auto;
}

.editar:hover {
  cursor: pointer;
}

.product-image {
  height: 100px;
  width: 100px;
}

.edit {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: transparent;
    border: none;
    padding: 0;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
}

.edit-icon {
    width: 100%;
    height: auto;
}
</style>
