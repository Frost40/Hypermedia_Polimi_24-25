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
  mainAreaOfExpertise: {
    type: String,
    required: true
  },
  imageUrl: {
    type: String,
    required: true
  }
});
</script>

<template>
  <div class="teacher-card">
    <NuxtLink :to="`/teachers/${id}`" class="card-link">
      <img
        :src="imageUrl || defaultImage"
        alt="Picture of the teacher"
        class="teacher-image"
      />
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
}

.teacher-image:hover {
  filter: brightness(80%);
}

.subtitle:hover {
  font-weight: bold;
  text-decoration: underline;
}
</style>
