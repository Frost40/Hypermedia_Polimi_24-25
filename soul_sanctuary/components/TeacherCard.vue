<script setup>
import { ref } from 'vue';
import defaultImage from 'assets/png/No-Image-Found-400x264.png';

defineProps({
  id: {
    type: [String, Number],
    required: true
  },
  name: {
    type: String,
    required: true
  },
  mainAreaOfExpertise: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  },
  loading: {
    type: Boolean,
    default: false
  }
});

const imageLoaded = ref(false);

function handleImageLoad() {
  imageLoaded.value = true;
}
</script>

<template>
  <!-- Full card skeleton if loading -->
  <div v-if="loading" class="teacher-card">
    <div class="skeleton-overlay">
      <div class="skeleton-image-container">
        <div class="skeleton-image card-bg"></div>
      </div>
    </div>
  </div>

  <!-- Real card -->
  <div v-else class="teacher-card">
    <NuxtLink :to="`/teachers/${id}`" class="card-link">

      <!-- Show skeleton until image loads -->
      <div v-if="!imageLoaded" class="skeleton-overlay">
        <div class="skeleton-image-container">
          <div class="skeleton-image card-bg"></div>
        </div>
      </div>

      <!-- Show actual image -->
      <div :class="{ 'hidden': !imageLoaded }">
        <nuxt-img
          :src="imageUrl || defaultImage"
          alt="Picture of the teacher"
          format="avif,webp,jpg"
          quality="80"
          :loading="id < 4 ? 'eager' : 'lazy'"
          sizes="(max-width: 480px) 100vw, (max-width: 768px) 85vw, (max-width: 1024px) 50vw, 650px"
          placeholder
          densities="1x,2x,3x"
          fit="cover"
          decoding="async"
          :fetchpriority="id < 4 ? 'high' : 'low'"
          class="teacher-image"
          :class="{ 'default-green': !imageUrl || imageUrl === defaultImage }"
          @load="handleImageLoad"
        />
      </div>

      <h2 class="subtitle">{{ name }}</h2>
      <p class="text">{{ mainAreaOfExpertise }}</p>
    </NuxtLink>
  </div>
</template>

<style scoped>
.teacher-card {
  width: 340px;
  height: 480px;
  border-radius: 16px;
  overflow: hidden;
  text-align: center;
  background: white;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.07);
  position: relative;
}

.card-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-decoration: none;
  color: inherit;
  height: 100%;
}

.teacher-image {
  width: 340px;
  height: 340px;
  border-radius: 20px;
  object-fit: cover;
  transition: filter 0.3s ease;
}

.teacher-image:hover {
  filter: brightness(80%);
}

.subtitle {
  margin-top: 0.5rem;
  transition: opacity 0.3s ease;
}
.subtitle:hover {
  font-weight: bold;
  text-decoration: underline;
}

.text {
  color: #555;
  transition: opacity 0.3s ease;
}

/* Hidden state for fade-in */
.hidden {
  opacity: 0;
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
  z-index: 2;
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

/* Shimmer effect */
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

/* Optional fallback for iOS */
@supports (-webkit-touch-callout: none) {
  .card-bg {
    object-fit: cover;
    transform: translateZ(0);
  }
}

/* Optional background fallback */
.default-green {
  background-color: #BCC7C2;
  background-blend-mode: multiply;
}
</style>
