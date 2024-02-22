<template>
  <div v-if="isModalVisible" class="checkout-modal">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <h2>Confirmar Compra</h2>
      <p class="total">El total de tu compra es: {{ totalPrice.toFixed(2) }}€</p>
      <div class="payment-methods">
        <div v-for="method in paymentMethods" :key="method.value" @click="selectedPaymentMethod = method.value"
          :class="{ active: selectedPaymentMethod === method.value }" class="payment-method">
          <img :src="require('@/assets/' + method.image)" :alt="method.label" class="payment-method-image">
        </div>
      </div>
      <div v-if="selectedPaymentMethod === 'tarjeta'" class="payment-form">
        <h3>Información de la Tarjeta</h3>
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="cardNumber">Número de Tarjeta</label>
            <input v-model="cardNumber" type="text" id="cardNumber" placeholder="1234 5678 9012 3456" required>
          </div>
          <div class="form-group">
            <label for="cardName">Nombre en la Tarjeta</label>
            <input v-model="cardName" type="text" id="cardName" placeholder="Nombre Apellido" required>
          </div>
          <div class="form-group">
            <label for="expiryDate">Fecha de Caducidad</label>
            <input v-model="expiryDate" type="text" id="expiryDate" placeholder="MM/YY" @input="formatExpiryDate"
              required>
          </div>
          <div class="form-group">
            <label for="cvv">CVV</label>
            <input v-model="cvv" type="text" id="cvv" placeholder="123" required>
          </div>
          <button :disabled="!isFormValid" type="submit">Pagar</button>
        </form>
      </div>
      <div v-if="paymentSuccess" class="payment-success">
        <p v-if="selectedPaymentMethod === 'tarjeta'">¡Se ha efectuado el pago con tarjeta correctamente!</p>
        <p v-else-if="selectedPaymentMethod === 'paypal'">¡Felicidades por comprar en Rasbiosport! Tus datos de compra son:</p>
        <ul v-else>
          <li><strong>Método de pago:</strong> {{ selectedPaymentMethod }}</li>
¡        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isModalVisible: {
      type: Boolean,
      required: true
    },
    cartItems: {
      type: Array,
      required: true
    },
    totalPrice: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      selectedPaymentMethod: '',
      cardNumber: '',
      cardName: '',
      expiryDate: '',
      cvv: '',
      paypalEmail: '',
      bankName: '',
      accountNumber: '',
      accountHolderName: '',
      paymentSuccess: false,
      paymentMethods: [
        {
          label: 'Tarjeta de Crédito/Débito',
          value: 'tarjeta',
          image: 'tarjeta.png'
        },
        {
          label: 'PayPal',
          value: 'paypal',
          image: 'paypal.png'
        },
      ]
    };
  },


  computed: {
    isFormValid() {
      if (this.selectedPaymentMethod === 'tarjeta') {
        const isCVVValid = /^\d{3}$/.test(this.cvv);
        return /^\d{16}$/.test(this.cardNumber) &&
          this.cardName.trim() !== '' &&
          isCVVValid;
      }
      return true;
    },

    isEmailValid() {
      return this.validateEmail(this.paypalEmail);
    }
  },
  methods: {
    formatExpiryDate() {
      let cleanedExpiryDate = this.expiryDate.replace(/\D/g, '');
      cleanedExpiryDate = cleanedExpiryDate.slice(0, 4);

      let formattedExpiryDate = cleanedExpiryDate.replace(/(\d{2})(\d{2})/, '$1/$2');
      this.expiryDate = formattedExpiryDate;
    },
    isFutureDate(dateString) {
      const today = new Date();
      const selectedDate = new Date(dateString);
      return selectedDate > today;
    },
    closeModal() {
      this.$emit('close-modal');
    },
    submitForm() {
      if (this.selectedPaymentMethod !== '' && this.isFormValid) {
        console.log('Pago con tarjeta procesado.');
        this.$emit('pago-con-tarjeta-procesado');

        setTimeout(() => {
          this.closeModal();
        }, 3000);
      }
    },
    submitPayPalForm() {
      if (this.selectedPaymentMethod === 'paypal' && this.isEmailValid) {
        console.log('Pago con PayPal procesado.');
        this.paymentSuccess = true;


        setTimeout(() => {
          this.closeModal();
        }, 3000);
      }
    },
    onApprove(data) {
      console.log('Pago aprobado por PayPal:', data);
      this.paymentSuccess = true;
      setTimeout(() => {
        this.closeModal();
      }, 3000);
    },
    validateEmail(email) {
      const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return regex.test(email);
    }
  }
};
</script>


<style scoped>
.checkout-modal {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  z-index: 1000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
}

.modal-content {
  background-color: #fefefe;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  width: 90%;
}

.close {
  color: #aaa;
  align-self: flex-end;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.payment-methods {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.payment-method {
  cursor: pointer;
  margin: 0 10px;
  transition: border-color 0.3s ease;
}

.payment-method.active {
  border: 2px solid #007bff;
}

.payment-method-image {
  width: 100px;
  height: auto;
}

.payment-form {
  margin-top: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  font-weight: bold;
}

input[type="text"],
input[type="email"] {
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
  width: 100%;
}

button {
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

button:hover {
  background-color: #0056b3;
}
</style>
