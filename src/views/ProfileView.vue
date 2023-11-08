<template>
    <NavComponent></NavComponent>
    <div>
        <ul>
            <li v-for="user in users" :key="user.id_user">
                <div>ID: {{ user.id_user }}</div>
                <div>Nombre: {{ user.name_user }}</div>
                <div>Correo: {{ user.user_email }}</div>
                <div>Dirección: {{ user.user_address }}</div>
            </li>
        </ul>
    </div>
    <FooterVue></FooterVue>
</template>
  
<script>
import NavComponent from '../components/NavComponent.vue'
import FooterVue from '@/components/FooterVue.vue';
export default {
    name: 'LoginView',
    components: {
        NavComponent,
        FooterVue
    },
    data() {
        return {
            users: [],
        };
    },
    mounted() {
        fetch('http://localhost:3000/api/users')
            .then((response) => response.json())
            .then((data) => {
                this.users = data;
            })
            .catch((error) => {
                console.error('Error al cargar los datos de usuarios:', error);
            });
    },
};
</script>
  