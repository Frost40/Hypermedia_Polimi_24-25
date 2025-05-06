<script setup>
import { ref } from "vue";
import ActivityCard from "~/components/ActivityCard.vue";

// API call to fetch activities data
const { data: allActivities } = await useFetch('/api/activities');

// Per debugging
const activitiesString = computed(() => {
  return JSON.stringify(allActivities.value, null, 2);
});
</script>

<template>
  <Head>
    <Title>Soul Sanctuary - Activities</Title>
  </Head>
  <main class="activities-page">
    <div class="page-header">
      <h1 class="page-title title">All Activities</h1>
      <p class="page-description">Discover our most popular activities below — explore what we offer and find the perfect fit for your journey.</p>
    </div>

    <div class="activities-grid">
      <div v-for="(row, rowIndex) in Math.ceil(allActivities.length / 2)" :key="rowIndex" class="activity-row">
        <ActivityCard
            v-if="allActivities[(rowIndex * 2)]"
            :id="allActivities[(rowIndex * 2) + 1].id"
            :name="allActivities[(rowIndex * 2)].name"
        />
        <ActivityCard
            v-if="allActivities[(rowIndex * 2) + 1]"
            :id="allActivities[(rowIndex * 2) + 1].id"
            :name="allActivities[(rowIndex * 2) + 1].name"
        />
      </div>
    </div>
  </main>
</template>

<style scoped>
.activities-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.page-header {
  text-align: center;
  margin-bottom: 3rem;
}

.page-title {
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  padding-left: 2.5rem;
  display: flex;
  align-items: center;
}

.page-title::after {
  content: "";
  flex-grow: 1;
  height: 2px;
  background: #3D5144;
  margin-left: 1rem;
}

.page-description {
  max-width: 800px;
  margin: 0 auto;
  color: #666;
  font-size: 1.1rem;
  line-height: 1.6;
}

.activities-grid {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.activity-row {
  display: flex;
  gap: 2rem;
  justify-content: center;
}

.activity-row > * {
  flex: 1;
  max-width: 500px;
}

@media (max-width: 768px) {
  .activity-row {
    flex-direction: column;
    gap: 1.5rem;
  }

  .activity-row > * {
    max-width: 100%;
  }
}
</style>