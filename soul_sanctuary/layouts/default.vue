<template>
    <div>
      <NavBar />
      <main class="main-content">
        <slot />
      </main>
      <Footer />
    </div>
  </template>
  
  <script setup>
  import NavBar from '~/components/NavBar.vue'
  import Footer from '~/components/Footer.vue'
  </script>
  
  <style scoped>
  .main-content {
    padding: 2rem;
  }
  </style>
  