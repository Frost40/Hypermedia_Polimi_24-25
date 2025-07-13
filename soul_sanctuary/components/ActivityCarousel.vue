<script setup>
import 'swiper/css'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination, Autoplay } from 'swiper/modules'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'

import { ref, watch } from 'vue'

// Props
const props = defineProps({
  activities: {
    type: Array,
    required: true
  }
})

// Image loading tracker
const imageLoaded = ref([])

// Initialize imageLoaded when activities are set
watch(
  () => props.activities,
  (newVal) => {
    if (Array.isArray(newVal)) {
      imageLoaded.value = new Array(newVal.length).fill(false)
    }
  },
  { immediate: true }
)

function handleImageLoad(index) {
  imageLoaded.value[index] = true
}
</script>

<template>
  <Swiper
    :modules="[Navigation, Pagination, Autoplay]"
    :autoplay="{ delay: 3000, disableOnInteraction: false }"
    :loop="true"
    :slides-per-view="1"
    navigation
    :pagination="{ clickable: true }"
    class="activities-swiper"
    :spaceBetween="20"
  >
    <SwiperSlide v-for="(activity, index) in activities" :key="activity.id">
      <NuxtLink :to="`/activities/${activity.id}`" class="slide-link">
        <div class="slide-container">

          <!-- Skeleton overlay while image is loading -->
          <div v-if="!imageLoaded[index]" class="skeleton-overlay">
            <div class="skeleton-image-container">
              <div class="skeleton-image card-bg"></div>
            </div>
            <div class="slide-title skeleton-title-text"></div>
          </div>

          <!-- Actual image -->
          <nuxt-img
            :src="activity.imageUrl"
            alt="An image related to the activity"
            class="slide-image"
            format="avif,webp,jpg"
            quality="80"
            sizes="(max-width: 480px) 100vw, (max-width: 768px) 85vw, 650px"
            densities="1x,2x,3x"
            loading= "eager"
            :fetchpriority="activity.id < 3 ? 'high' : 'low'"
            decoding="async"
            fit="cover"
            :class="{ hidden: !imageLoaded[index] }"
            @load="handleImageLoad(index)"
          />

          <!-- Overlay title -->
          <div class="slide-overlay" :class="{ hidden: !imageLoaded[index] }">
            <div class="slide-title">{{ activity.name }}</div>
          </div>
        </div>
      </NuxtLink>
    </SwiperSlide>
  </Swiper>
</template>

<style scoped>
.activities-swiper {
  width: 100%;
  height: 250px;
  border-radius: 1rem;
}

.slide-container {
  position: relative;
  height: 300px;
  border-radius: 20px;
  overflow: hidden;
}

.slide-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  filter: brightness(90%);
}

.slide-overlay {
  font-family: 'Oregano';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -70%);
  color: #DDECEA;
  font-size: 1.5rem;
  text-align: center;
  padding: 0.5rem 1.5rem;
  border-radius: 1rem;
  max-width: 80%;
  text-decoration: underline;
}

.slide-title {
  color: #DDECEA;
  font-size: 2rem;
  text-decoration: none;
  text-align: center;
  display: block;
}

.slide-title:hover {
  text-decoration: underline;
  font-weight: bold;
}

/* For the buttons on the sides of the slider */
:deep(.swiper-button-next),
:deep(.swiper-button-prev) {
  color: #DDECEA;
  fill: #DDECEA;
}

/* For the pagination buttons below the slider */
:deep(.swiper-pagination-bullet) {
  background-color: #DDECEA;
  opacity: 0.5;
  transition: all 0.3s ease;
}

:deep(.swiper-pagination-bullet:hover) {
  opacity: 1;
  transform: scale(1.2);
}

:deep(.swiper-pagination-bullet-active) {
  background-color: #DDECEA;
  opacity: 1;
}

.slide-link {
  display: block;
  height: 100%;
  text-decoration: none;
  color: inherit;
}

.hidden {
  opacity: 0;
  pointer-events: none;
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

.skeleton-title-text {
  position: absolute;
  width: 70%;
  padding: 1rem;
  text-align: center;
  background-color: rgba(61, 81, 68, 0.15);
  border-radius: 8px;
  z-index: 3;
}

.skeleton-overlay::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transform: translateX(-100%);
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.2) 20%,
    rgba(255, 255, 255, 0.5) 60%,
    rgba(255, 255, 255, 0)
  );
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}
</style>
