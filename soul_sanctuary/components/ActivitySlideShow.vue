<script setup>
import 'swiper/css'
import { Swiper, SwiperSlide } from 'swiper/vue'
import { Navigation, Pagination,Autoplay } from 'swiper/modules'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'swiper/css/autoplay';

defineProps({
  activities: {
    type: Array,
    required: true
  }
});

</script>

<template>
  <Swiper
    :modules="[Navigation, Pagination,Autoplay]"
    :autoplay="{ delay: 3000, disableOnInteraction: false }"
    :loop="true"
    :slides-per-view="1"
    navigation
    :pagination="{ clickable: true}"
    class="activities-swiper"
    :spaceBetween="20"
    loop
    >
    <SwiperSlide v-for="activity in activities" :key="activity.id">
      <div class="slide-container">
        <img :src="activity.imageUrl" alt="An image related to the activity" class="slide-image" />
        <div class="slide-overlay">
          <NuxtLink :to="`/activities/${activity.id}`" class="slide-title">
            {{ activity.name }}
          </NuxtLink>
        </div>
      </div>
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
  object-fit: fill; /* Stretches image to fill the container, breaking aspect ratio! Watch out if you need a large slideshow */
  display: block;
  filter: brightness(90%);
}


.slide-overlay {
  font-family: 'Oregano';
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 1.5rem;
  text-align: center;
  padding: 0.5rem 1.5rem;
  border-radius: 1rem;
  max-width: 80%;
  color: #DDECEA;
  text-decoration: underline;
}

.slide-title {
  color: #DDECEA;
  font-size: 2rem;
  text-decoration: none;
  font-weight: bold;
  text-align: center;
  display: block;
}

.slide-title:hover {
  text-decoration: underline;
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


</style>
