<template>
    <div>
        <NavComponent></NavComponent>
        <NavMenu></NavMenu>
        <section class="product-section">
            <div class="añadir">
                <h1>Lista de Productos</h1>
                <button v-if="!showRegister" class="btn success" @click="displayRegisterForm">
                    <p>+</p>
                </button>
            </div>
        <div class="popup-container" v-if="showRegister">
            <div class="popup-content">
                <RegisterForm @cancel="cancelAdd"></RegisterForm>
            </div>
        </div>
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
                            <button class="edit"><a href="#1" class="edit" @click="editProduct(product)"><img
                                        src="../assets/editar.png"></a></button>
                            <button class="edit" @click="deleteProduct(product.product_id)"><img
                                        src="../assets/borrar.png"></button>
                        </td>
                    </tr>
                </tbody>
            </table>

            <div id="1" v-if="editingProduct">
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
                        <input v-model="editingProduct.product_info" id="productInfo"
                            placeholder="Información del producto">
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
                        <button class="boton1" type="submit" :disabled="!isValidProductSize">Guardar Cambios</button>
                        <button class="boton2" @click="cancelEdit">Cancelar</button>
                    </div>
                </form>
            </div>
        </section>
    </div>
</template>
 
<script>
import NavComponent from '../components/NavComponent.vue';
import NavMenu from '../components/NavMenu.vue';
import RegisterForm from './RegisterFormAdmin.vue';

 const url = "https://fabioaviador.alwaysdata.net/"
 
 export default {
    name: 'AdminManageProducts',
    components: {
        NavComponent,
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
        cancelAdd() {
            this.showRegister = false;
        },
        async fetchProducts() {
            try {
                const response = await fetch('https://ssh-fabioaviador.alwaysdata.net/api/products');
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
                const response = await fetch(`https://ssh-fabioaviador.alwaysdata.net/api/products/${this.editingProduct.product_id}`, {
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
                const response = await fetch(`https://ssh-fabioaviador.alwaysdata.net/api/products/${productId}`, {
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
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

/* Estilos generales */
body {
    font-family: Arial, sans-serif;
    line-height: 1.6;
    background: #F2DCA2;
    height: 100vh;
    margin: 0;
    display: grid;
    place-content: center;
    grid-auto-flow: column;
    gap: 40px;
}

.añadir {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
}

.añadir button {
    background-color: rgb(0, 177, 24);
    height: 80%;
}

.añadir button p {
    font-weight: bold;
}

.añadir button:hover {
    background-color: rgb(0, 148, 20);
    color: white;
}

button {
    font-family: Arial, sans-serif;
    font-size: 1rem;
    cursor: pointer;
    padding: .5em 1em;
    font-weight: bold;
    border: none;
    color: #ffffff;
    border-radius: 5px;
}

.product-section {
    max-width: 1000px;
    margin: 20px auto;
}

.popup-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999; 
    background-color: rgba(0, 0, 0, 0.5); 
}

.popup-content {
    padding: 20px;
    width: 100%;
    height: 100%;
    position: relative;
    margin: auto;
}

.close-btn-container {
    position: absolute;
    top: 10px;
    right: 10px;
}

.close-btn {
    font-size: 1rem;
    cursor: pointer;
    padding: .5em 1em;
    font-weight: bold;
    border: none;
    color: #ffffff;
    background-color: #dc3545;
    border-radius: 5px;
}

.close-btn:hover {
    background-color: #c82333;
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

.edit {
    background-color: transparent; 
    color: rgb(255, 255, 255);
    text-decoration: none;
    border: none; 
    padding: 0; 
}

.edit img {
    width: 2rem;
    height: 2rem;
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

button[type="submit"] {
    margin-right: 10px;
    padding: 8px 15px;
    cursor: pointer;
}

.delete {
    margin-right: 10px;
    padding: 8px 15px;
    cursor: pointer;
    background-color: #dc3545;
    color: #fff;
    border: none;
    border-radius: 5px;
}

.delete:hover {
    background-color: #c82333;
}

.boton1{
    background-color: #4285f4;
}

.boton2{
    background-color: rgb(221, 0, 0);
}

.boton1:hover{
    cursor: pointer;
    background-color: #3a77d8;
}
.boton2:hover{
    cursor: pointer;
    background-color: #c82333;
}
</style>

