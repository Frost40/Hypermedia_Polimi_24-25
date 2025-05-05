<template>
    <div>
      <NavBar />
      <main class="main-content">
        <slot></slot>
      </main>
      <Footer></Footer>
    </div>
</template>
  
<script setup>
  import NavBar from '~/components/NavBar.vue'
  import Footer from '~/components/Footer.vue'
</script>
  
<style scoped>
  .main-content {
    padding: 0px;
    margin: 0px;
    margin-bottom: 0px;
  }
</style>
