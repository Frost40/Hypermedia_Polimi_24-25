<template>
    <div :style="backgroundStyle">
      <NavBar></NavBar>
      <main class="main-content">
        <slot></slot>
      </main>
      <Footer></Footer>
    </div>
</template>
  
<script setup>
  import NavBar from '~/components/NavBar.vue'
  import Footer from '~/components/Footer.vue'
  import wallpaper from "/assets/webp/wallpaper.webp";

  // Define the background style with the wallpaper image
  const backgroundStyle = {
    backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url(${wallpaper})`,
    backgroundSize: 'auto',
    backgroundPosition: 'top center',
    backgroundAttachment: 'fixed',
    backgroundRepeat: 'repeat',
  }
</script>
  
<style scoped>
  .main-content {
    padding: 0;
    margin: 0;
  }
</style>
