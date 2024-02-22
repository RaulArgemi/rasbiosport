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
              <input v-if="editMode[key]" v-model="editableUser[key]" :id="key" class="form-control" :type="getInputType(key)">
              <span v-else>{{ user[key] }}</span>
              <div class="button-group">
                <button v-if="editMode[key]" @click="updateField(key)" class="btn btn-success btn-sm">Guardar</button>
                <button v-if="editMode[key]" @click="cancelEdit(key)" class="btn btn-danger btn-sm">Cancelar</button>
                <button v-else @click="enableEdit(key)" class="btn btn-primary btn-sm" :disabled="isDisabled(key)">Editar</button>
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
              <span v-if="passwordRequirementsError" class="text-danger">La contraseña debe tener al menos 8 caracteres, 1 mayúscula, 1 minúscula y 1 número</span>
            </div>
            <button @click="changePassword" class="btn btn-primary">Cambiar Contraseña</button>
          </div>
        </div>
        <!-- Sección de pedidos recientes -->
        <div class="recent-orders">
          <h3>Pedidos Recientes</h3>
          <div v-for="order in recentOrders" :key="order.order_id" class="order-card">
  <div class="order-header">
    <h4>Pedido #{{ order.order_id }}</h4>
    <span class="order-date">{{ formatDate(order.order_date) }}</span>
  </div>
  <div class="order-body">
    <div v-for="product in order.products" :key="product.product_id" class="order-product">
      <img :src="product.product_image" :alt="product.product_name" class="product-image"/>
      <div class="product-info">
        <span class="product-name">{{ product.product_name }}</span>
        <span class="product-quantity">Cantidad: {{ product.quantity }}</span>
        <span class="product-price">{{ currency(product.product_price) }}</span>
        <button @click="openReviewModal(order.order_id, product.product_id)" class="btn btn-link">Dejar Review</button>
      </div>
    </div>
  </div>
  <div class="order-footer">
    <span class="order-total">Total: {{ currency(order.order_total) }}</span>
  </div>
</div>

        </div>
      </div>
    </div>
     <!-- Modal/Formulario de Review -->
    <b-modal v-model="showReviewModal" title="Dejar Review del Producto" hide-footer>
      <div class="d-flex flex-column align-items-center">
        <rating-component v-model="currentReview.rating"></rating-component>
        <b-form-textarea v-model="currentReview.comment" placeholder="Escribe tu comentario aquí..." rows="4" class="mt-3 mb-3"></b-form-textarea>
        <b-button @click="submitReview" variant="primary">Enviar Review</b-button>
      </div>
    </b-modal>
  </div>
</template>

<script>
import NavComponent from '../components/NavComponent.vue';
import { useStore } from 'vuex';
import Cookies from 'js-cookie';

const url = "http://localhost:3000";

export default {
  name: 'ProfileView',
  components: {
    NavComponent,
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
        // Agrega más etiquetas según sea necesario
      },
      showChangePassword: false,
      currentPassword: '',
      newPassword: '',
      confirmPassword: '',
      incorrectCurrentPassword: false,
      passwordsMismatch: false,
      passwordRequirementsError: false,
      recentOrders: [], // Agregado para almacenar los pedidos recientes
      showReviewModal: false, // Controla la visibilidad del modal de review
      currentReview: { // Almacena la información de la review actual
        orderId: null,
        productId: null,
        rating: 0,
        comment: ''
      }
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
      })
      .catch(error => console.error('Error al cargar los pedidos:', error));
    },
  },
};
</script>