<template>
    <section class="home-page">
      <h1>Benvenuto nel mio sito!</h1>
      <NuxtLink to="/contact_us" class="contact-link">Vai alla pagina Contatti</NuxtLink>
    </section>
  </template>
  
  <script setup></script>
  
  <style scoped>
  .home-page {
    padding: 2rem;
    text-align: center;
  }
  
  .contact-link {
    display: inline-block;
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    background-color: #42b883;
    color: white;
    border-radius: 4px;
    text-decoration: none;
  }
  </style>
  