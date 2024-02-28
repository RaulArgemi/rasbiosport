<template>
    <NavComponent></NavComponent>
    <div class="rasbiosport-container">
      <div class="rasbiosport-info">
        <h2>Descubre RASBIOSPORT</h2>
        <p>
          En RASBIOSPORT, unimos la pasión por el deporte con la moda sostenible y valores éticos.
          Somos más que una tienda en línea; somos una comunidad comprometida con un mundo mejor.
        </p>
        <p>
          Nuestra misión es ofrecerte una experiencia única donde encuentres más que ropa deportiva;
          encuentres una declaración de tu compromiso con el medio ambiente y la inclusión.
        </p>
        <p>
          En RASBIOSPORT, creemos en la igualdad de oportunidades para todos. Nuestra gama de tallas abarca todas las edades y géneros,
          fomentando la diversidad y la inclusión. Queremos que cada persona, sin importar quién sea, encuentre el equipo deportivo que necesita
          y se sienta bienvenido en nuestra comunidad.
        </p>
        <p>
          Destacamos por permitirte personalizar tus propias camisetas sostenibles. A través de nuestras herramientas de personalización,
          puedes expresar tu estilo de manera única y llevar contigo un mensaje que va más allá de la moda.
        </p>
        <p>
          Si buscas más que ropa deportiva y deseas ser parte de una comunidad comprometida con la moda sostenible,
          ¡has llegado al lugar correcto! En RASBIOSPORT, celebramos la fusión de la pasión por el deporte con la responsabilidad
          ambiental y la inclusión. ¡Descubre la diferencia con RASBIOSPORT!
        </p>
      </div>
      <div class="contact-form">
        <h3>Contacto</h3>
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="name">Nombre:</label>
            <input type="text" id="name" v-model="formData.name" required>
          </div>
          <div class="form-group">
            <label for="email">Email:</label>
            <input type="email" id="email" v-model="formData.email" required>
          </div>
          <div class="form-group">
            <label for="message">Mensaje:</label>
            <textarea id="message" v-model="formData.message" required></textarea>
          </div>
          <button type="submit">Enviar</button>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import NavComponent from '@/components/NavComponent.vue';
  export default {
    data() {
        return {
            formData: {
                name: '',
                email: '',
                message: ''
            }
        };
    },
    methods: {
        submitForm() {
            // console.log('Formulario enviado:', this.formData);
            this.formData = {
                name: '',
                email: '',
                message: ''
            };
        }
    },
    components: { NavComponent }
};
  </script>
  
  <style scoped>
  .rasbiosport-container {
    max-width: 800px;
    margin: auto;
    padding: 20px;
  }
  
  .rasbiosport-info p {
    margin-bottom: 20px;
  }
  
  .contact-form {
    background-color: #f4f4f4;
    padding: 20px;
  }
  
  .form-group {
    margin-bottom: 10px;
  }
  
  label {
    display: block;
  }
  
  input[type="text"],
  input[type="email"],
  textarea {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  button {
    background-color: #007bff;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>
  