<template>
  <footer>
      <router-link to="/" class="text">
        <p>RASBIOSPORT®</p>
      </router-link>
      <router-link  to="/privacy" class="text">
        <p>Política de Privacidad</p>
      </router-link>
      <div class="rrss">
        <a href="https://www.instagram.com" target="_blank"><img src="../assets/instagram.png"></a>
        <a href="https://www.facebook.com" target="_blank"><img src="../assets/facebook.png"></a>
        <a href="https://www.twitter.com" target="_blank"><img src="../assets/twitter.png"></a>
        <a href="https://www.tiktok.com" target="_blank"><img src="../assets/tik-tok.png"></a>
      </div>
  </footer>
</template>
<style scoped>
footer{
  width: 100%;
  background-color: black;
  display: flex;
  justify-content: space-between;
  height: 100px;
  align-items: center;
}
.text{
  color: white;
  text-decoration: none;
}
p{
  margin-left: 50px;
}
img {
  width: 50px;
  height: 50px;
}
.rrss{
  margin-right: 50px;
}
</style>
  