<template>
    <div class="checkout-modal" v-if="isModalVisible">
        <div class="modal-content">
            <span class="close" @click="closeModal">&times;</span>
            <h2>Confirmar Compra</h2>
            <form @submit.prevent="submitForm">
                <!-- Otras secciones del formulario -->

                <!-- Método de envío -->
                <label for="shippingMethod">Método de envío:</label>
                <select v-model="selectedShippingMethod" id="shippingMethod" required>
                    <option value="" disabled>Seleccione un método</option>
                    <option value="visa">Visa</option>
                    <option value="mastercard">Mastercard</option>
                    <option value="paypal">PayPal</option>
                </select>

                <!-- Formulario específico para Visa -->
                <div v-if="selectedShippingMethod === 'visa'">
                    <label for="visaCardNumber">Número de tarjeta Visa:</label>
                    <input type="text" v-model="visaCardNumber" id="visaCardNumber" required>
                    <!-- Agrega otros campos según sea necesario -->
                </div>

                <!-- Formulario específico para Mastercard -->
                <div v-else-if="selectedShippingMethod === 'mastercard'">
                    <label for="mastercardCardNumber">Número de tarjeta Mastercard:</label>
                    <input type="text" v-model="mastercardCardNumber" id="mastercardCardNumber" required>
                    <!-- Agrega otros campos según sea necesario -->
                </div>

                <!-- Formulario específico para PayPal -->
                <div v-else-if="selectedShippingMethod === 'paypal'">
                    <label for="paypalEmail">Correo electrónico de PayPal:</label>
                    <input type="email" v-model="paypalEmail" id="paypalEmail" required>
                    <!-- Agrega otros campos según sea necesario -->
                </div>

                <!-- Botón de confirmar -->
                <button :disabled="!isFormValid" type="submit">Confirmar Compra</button>
            </form>
        </div>
    </div>
</template>
  
<script>
export default {
    props: {
        isModalVisible: Boolean,
        cartItems: Array,
        calculateTotalPrice: Function,
    },
    data() {
        return {
            selectedShippingMethod: '',
            visaCardNumber: '',
            mastercardCardNumber: '',
            paypalEmail: '',
        };
    },
    computed: {
        isFormValid() {
            // Validación del formulario
            switch (this.selectedShippingMethod) {
                case 'visa':
                    return this.visaCardNumber !== '';
                case 'mastercard':
                    return this.mastercardCardNumber !== '';
                case 'paypal':
                    return this.paypalEmail !== '';
                default:
                    return false;
            }
        },
    },
    methods: {
        closeModal() {
            this.$emit('close-modal');
        },
        submitForm() {
            // Lógica para enviar la compra
            // ...
            this.closeModal();
        },
    },
};
</script>

<style scoped>
.checkout-modal {
  display: none; /* Inicialmente oculto */
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* Fondo semitransparente */
}

.modal-content {
  background-color: #fff;
  margin: 10% auto;
  padding: 20px;
  border-radius: 8px;
  max-width: 600px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  position: relative;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  font-size: 20px;
  cursor: pointer;
}

h2 {
  text-align: center;
}

form {
  display: flex;
  flex-direction: column;
}

label {
  margin-top: 10px;
}

select,
input {
  margin-bottom: 10px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button {
  background-color: #4caf50;
  color: #fff;
  padding: 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

/* Estilos específicos para los formularios de Visa, Mastercard y PayPal */
div[v-if],
div[v-else-if] {
  border: 1px solid #ddd;
  padding: 10px;
  margin-top: 10px;
  border-radius: 4px;
}

</style>
