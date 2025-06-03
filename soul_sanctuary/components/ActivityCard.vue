<script setup>
import { ref } from 'vue';
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

const imageLoaded = ref(false);

function handleImageLoad() {
  imageLoaded.value = true;
}
</script>

<template>
  <NuxtLink :to="{
        path: `/activities/${id}`,
        query: { from: provenance }
      }" class="activity-card">
    <!-- Skeleton visible untill the image is fully loaded -->
    <div v-if="!imageLoaded" class="skeleton-overlay">
      <div class="skeleton-image-container">
        <div class="skeleton-image card-bg"></div>
      </div>
      <div class="activity-title subtitle skeleton-title-text">
      </div>
    </div>

    <!-- Card reale che sarà visibile dopo il caricamento -->
    <div class="card-image-container" :class="{ 'hidden': !imageLoaded }">
      <nuxt-img
        :src="imageUrl || defaultImage"
        :alt="name"
        format="webp"
        quality="80"
        :loading="index < 4 ? 'eager' : 'lazy'"
        sizes="(max-width: 800px) 100vw, 50vw"
        placeholder
        densities="1x,2x"
        width="650"
        height="300"
        fit="cover"
        class="card-bg"
        :class="{ 'default-green': !imageUrl || imageUrl === defaultImage }"
        @load="handleImageLoad"
      />
    </div>
    <div class="activity-title subtitle" :class="{ 'hidden': !imageLoaded }">
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
  display: flex;
  justify-content: center;
  align-items: center;
}

.hidden {
  opacity: 0;
}

.card-image-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transition: opacity 0.3s ease;
}

.card-bg {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  transition: filter 0.3s ease;
  filter: brightness(80%);
}

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
  transition: opacity 0.3s ease;
}

.activity-title:hover {
  text-decoration: underline;
  font-weight: bold;
}

/* Skeleton styles */
.skeleton-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.skeleton-image-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.skeleton-image {
  width: 100%;
  height: 100%;
  background-color: #BCC7C2;
}

.skeleton-title-text {
  position: absolute;
  width: 70%;
  padding: 1rem;
  text-align: center;
  background-color: rgba(61, 81, 68, 0.15);
  border-radius: 8px;
  z-index: 1;
}

/* Effetto shimmer */
.skeleton-overlay::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transform: translateX(-100%);
  background: linear-gradient(90deg,
  rgba(255,255,255,0) 0%,
  rgba(255,255,255,0.2) 20%,
  rgba(255,255,255,0.5) 60%,
  rgba(255,255,255,0)
  );
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}
</style>