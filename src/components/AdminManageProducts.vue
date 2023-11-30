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
                        <td><button class="buy" @click="deleteProduct(product.product_id)">Eliminar</button></td>
                    </tr>
                </tbody>
            </table>
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

export default {
    name: 'CategoryProduct',
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
        };
    },
    async created() {
        try {
            const response = await fetch('http://localhost:3000/api/products');
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            this.products = data;
        } catch (error) {
            console.error('Error al cargar los productos:', error);
        }
    },
    methods: {
        displayRegisterForm() {
            this.showRegister = !this.showRegister
        }
    }
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
</style>
      