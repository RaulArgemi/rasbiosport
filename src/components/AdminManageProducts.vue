<template>
    <div>
        <NavComponent></NavComponent>
        <NavMenu></NavMenu>
        <section class="product-section">
            <h1>Lista de Productos</h1>
            <table>
                <thead>
                    <tr>
                        <th>Imagen</th>
                        <th>Nombre</th>
                        <th>Precio</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="product in products" :key="product.product_id">
                        <td><img :src="product.product_image" alt="Imagen del Producto" class="product-image" /></td>
                        <td>{{ product.product_name }}</td>
                        <td>{{ product.product_price }} €</td>
                        <td>
                            <button class="edit" @click="editProduct(product)">Editar</button>
                            <button class="delete" @click="deleteProduct(product.product_id)">Eliminar</button>
                        </td>
                    </tr>
                </tbody>
            </table>
 
            <div v-if="editingProduct">
                <h2>Editar Producto</h2>
                <form @submit.prevent="updateProduct">
    <div class="form-group">
      <label for="productId">Id del Producto:</label>
      <input v-model="editingProduct.product_id" id="productId" placeholder="Id del Producto">
    </div>

    <div class="form-group">
      <label for="productName">Nombre del Producto:</label>
      <input v-model="editingProduct.product_name" id="productName" placeholder="Nombre del producto">
    </div>

    <div class="form-group">
      <label for="categoryId">Id de la Categoría:</label>
      <input v-model="editingProduct.category_id" id="categoryId" placeholder="Id de la categoría">
    </div>

    <div class="form-group">
      <label for="productDesc">Descuento:</label>
      <input v-model="editingProduct.product_desc" id="productDesc" placeholder="Descuento">
    </div>

    <div class="form-group">
      <label for="productInfo">Información del Producto:</label>
      <input v-model="editingProduct.product_info" id="productInfo" placeholder="Información del producto">
    </div>

    <div class="form-group">
      <label for="productImage">Imagen del Producto:</label>
      <input v-model="editingProduct.product_image" id="productImage" placeholder="Imagen del producto">
    </div>

    <div class="form-group">
      <label for="productSize">Talla del Producto:</label>
      <select v-model="editingProduct.product_size" id="productSize">
        <option v-for="size in productSizes" :key="size" :value="size">{{ size }}</option>
      </select>
    </div>

    <div class="form-group">
      <label for="productPrice">Precio del Producto:</label>
      <input v-model="editingProduct.product_price" id="productPrice" placeholder="Precio del producto">
    </div>

    <div class="form-group">
      <label for="productTag">Información del Producto:</label>
      <input v-model="editingProduct.product_tag" id="productTag" placeholder="Información del producto">
    </div>

    <div class="form-actions">
      <button type="submit" :disabled="!isValidProductSize">Guardar Cambios</button>
      <button @click="cancelEdit">Cancelar</button>
    </div>
  </form>
            </div>
        </section>
        <section class="d-flex justify-content-center flex-column">
    <button v-if="!showRegister" class="btn success" @click="displayRegisterForm">Añadir Producto</button>
    <div class="d-flex flex-column justify-content-center">
        <button v-if="showRegister" class="btn success" @click="displayRegisterForm">Eliminar</button>
        <RegisterForm v-if="showRegister"></RegisterForm>
    </div>
</section>
 
        <FooterVue></FooterVue>
    </div>
 </template>
 
 <script>
 import NavComponent from '../components/NavComponent.vue';
 import FooterVue from '@/components/FooterVue.vue';
 import NavMenu from '../components/NavMenu.vue';
 import RegisterForm from './RegisterFormAdmin.vue';

 const url = "http://localhost:3000"
 
 export default {
    name: 'AdminManageProducts',
    components: {
        NavComponent,
        FooterVue,
        NavMenu,
        RegisterForm,
    },
    data() {
        return {
            products: [],
            showRegister: false,
            editingProduct: null,
            productSizes: ['XXS', 'XS', 'S', 'M', 'L', 'XL', 'XXL']
        };
    },
    computed: {
    isValidProductSize() {
      return this.productSizes.includes(this.editingProduct.product_size);
    }
  },
    async created() {
        await this.fetchProducts();
    },
    methods: {
        async fetchProducts() {
            try {
                const response = await fetch(`${url}/api/products`);
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                this.products = await response.json();
            } catch (error) {
                console.error('Error al cargar los productos:', error);
            }
        },
   
        editProduct(product) {
            this.editingProduct = { ...product };
        },
        async updateProduct() {
            try {
                console.log(this.editingProduct.product_id)
                const response = await fetch(`${url}/api/products/${this.editingProduct.product_id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(this.editingProduct),
                });
                console.log(response)
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                await this.fetchProducts();
                this.editingProduct = null;
            } catch (error) {
                console.error('Error al actualizar el producto:', error);
            }
        },
        displayRegisterForm() {
    this.showRegister = !this.showRegister
},
        async deleteProduct(productId) {
            try {
                const response = await fetch(`${url}api/products/${productId}`, {
                    method: 'DELETE'
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                this.products = this.products.filter(p => p.product_id !== productId);
            } catch (error) {
                console.error('Error al eliminar el producto:', error);
            }
        },
        cancelEdit() {
            this.editingProduct = null;
        },
    },
 }
 </script>
 
 
  
      


      
<style scoped>
button {
    --c: #4285F4;
    /* the color*/

    box-shadow: 0 0 0 .1em inset var(--c);
    --_g: linear-gradient(var(--c) 0 0) no-repeat;
    background:
        var(--_g) calc(var(--_p, 0%) - 100%) 0%,
        var(--_g) calc(200% - var(--_p, 0%)) 0%,
        var(--_g) calc(var(--_p, 0%) - 100%) 100%,
        var(--_g) calc(200% - var(--_p, 0%)) 100%;
    background-size: 50.5% calc(var(--_p, 0%)/2 + .5%);
    outline-offset: .1em;
    transition: background-size .4s, background-position 0s .4s;
}

button:hover {
    --_p: 100%;
    transition: background-position .4s, background-size 0s;
}

button:active {
    box-shadow: 0 0 9e9q inset #0009;
    background-color: var(--c);
    color: #fff;
}



body {
    height: 100vh;
    margin: 0;
    display: grid;
    place-content: center;
    grid-auto-flow: column;
    gap: 40px;
    background: #F2DCA2;
}

button {
    margin: 1rem;
    margin-left: 22rem;
    font-family: system-ui, sans-serif;
    font-size: 2rem;
    cursor: pointer;
    padding: .1em .6em;
    font-weight: bold;
    border: none;
    max-width: 60%;
}

.product-section {
    max-width: 800px;
    margin: 20px auto;
}

table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 20px;
}

th,
td {
    padding: 12px;
    text-align: left;
    border-bottom: 1px solid #ddd;
}

.product-image {
    max-width: 100px;
    max-height: 100px;
}

.buy {
    margin: 1rem;
    font-family: system-ui, sans-serif;
    font-size: 1rem;
    cursor: pointer;
    padding: .1em .6em;
    font-weight: bold;
    border: none;
}
.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  margin-bottom: 10px;
}

.form-actions {
  margin-top: 20px;
}

button {
  margin-right: 10px;
  padding: 8px 15px;
  cursor: pointer;
}
</style>

