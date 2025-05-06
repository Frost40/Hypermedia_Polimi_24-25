<template>
    <div class="activity-card">
      <div class="card-bg" :style="{ backgroundImage: `url(${imageUrl})` }"></div>
      <div class="activity-overlay">
        <NuxtLink :to="`/activities/${id}`" class="activity-title subtitle">
          {{ name }}
        </NuxtLink>
      </div>
    </div>
  </template>

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
      required: false,
      default: () => defaultImage
    }
  });
  </script>

<style scoped>
.activity-card {
  position: relative;
  width: 100%;
  height: 200px;
  border-radius: 40px;
  overflow: hidden;
}

.card-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center;
  transition: filter 0.3s ease;
}

.activity-card:hover .card-bg {
  filter: brightness(60%);
}

.activity-overlay {
  position: relative;
  z-index: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  text-align: center;
  padding: 1rem;
}

.activity-title {
  margin-bottom: 0;
  color: #DDECEA;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.7);
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  text-align: center;
}

.activity-title:hover {
  text-decoration: underline;
  font-weight: bold;
}

@media (max-width: 768px) {
  .activity-card {
    height: 180px;
  }

  .activity-title {
    font-size: 1.3rem;
  }
}
</style>