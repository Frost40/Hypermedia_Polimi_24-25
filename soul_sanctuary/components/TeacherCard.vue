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
        alt="Teacher"
        class="teacher-image"
      />
      <h2 class="teacher-name">{{ name }}</h2>
      <p class="teacher-area">{{ mainAreaOfExpertise }}</p>
    </NuxtLink>
  </div>
</template>

<style scoped>
.teacher-card {
  width: 340px;
  height: 503px;
  /*border: 1px solid #3D5144; /* Border for debug */
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
  padding: 1rem;
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

.teacher-name {
  font-family: 'Oregano';
  text-decoration: underline;
  font-weight: normal;
  padding-top: 9px;
  font-size: 45px;
  margin: 0.8rem 0 0.2rem;
  color: #3C3C3C;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.2);
}

.teacher-name:hover {
  font-weight: bold;
}

.teacher-area {
  font-family: 'Inter';
  padding-top: 10px;
  font-size: 25px;
  font-style: normal;
  font-weight: 400;
  line-height: 45px;
  color: #3C3C3C;
  margin: 0;
}
</style>
