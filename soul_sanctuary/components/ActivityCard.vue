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

<template>
  <div class="activity-card">
    <div class="card-bg"
         :style="{ backgroundImage: `url(${imageUrl})` }"
         :class="{ 'default-green': imageUrl === defaultImage }"
    ></div>
      <NuxtLink :to="`/activities/${id}`" class="activity-title subtitle">
        {{ name }}
      </NuxtLink>
  </div>
</template>

<style scoped>
.activity-card {
  position: relative;
  width: 100%;
  height: 300px;
  border-radius: 40px;
  overflow: hidden;

  /* Flex properties to allow centered title*/
  display: flex;
  justify-content: center;
  align-items: center;
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
  opacity: 0.8;
}

/* Default-green applies a green background in blend mode to make the title stand out more */
.default-green {
  background-color: #BCC7C2;
  background-blend-mode: multiply;
  opacity: 1;
  filter: brightness(80%);
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