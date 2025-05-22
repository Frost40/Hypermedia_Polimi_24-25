<script setup>
import defaultImage from '@/assets/pngs/No-Image-Found-400x264.png';

defineProps({
  id: {
    type: [String, Number],
    required: true
  },
  name: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true,
  },
  provenance:{
    type: String,
    required: true,
  },
  index: {
    type: Number,
    default: 0
  }
});
</script>

<template>
  <NuxtLink :to="{
        path: `/activities/${id}`,
        query: { from: provenance }
      }" class="activity-card">
    <div class="card-image-container">
      <nuxt-img
          :src="imageUrl || defaultImage"
          :alt="name"
          format="webp"
          quality="80"
          :loading="index < 4 ? 'eager' : 'lazy'"
          sizes="(max-width: 800px) 100vw, 50vw"
          placeholder
          class="card-bg"
          :class="{ 'default-green': !imageUrl || imageUrl === defaultImage }"
      />
    </div>
    <div class="activity-title subtitle">
      {{ name }}
    </div>
  </NuxtLink>
</template>

<style scoped>
.activity-card {
  position: relative;
  width: 100%;
  height: 300px;
  border-radius: 40px;
  overflow: hidden;
  text-decoration: none;

  /* Flex properties to allow centered title*/
  display: flex;
  justify-content: center;
  align-items: center;
}

.card-image-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.card-bg {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center; /* Centra il soggetto nell'immagine */
  transition: filter 0.3s ease;
  filter: brightness(80%);
}

/* Default-green applies a green background in blend mode to make the title stand out more */
.default-green {
  background-color: #BCC7C2;
  background-blend-mode: multiply;
}

.activity-card:hover .card-bg {
  filter: brightness(60%);
}

.activity-title {
  position: relative;
  z-index: 1;
  margin-bottom: 0;
  padding: 1rem;
  color: #DDECEA;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  text-align: center;
}

.activity-title:hover {
  text-decoration: underline;
  font-weight: bold;
}

</style>