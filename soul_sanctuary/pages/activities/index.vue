<script setup>
  import ActivityCard from "~/components/ActivityCard.vue";

  // API call to fetch all activities
  const { data: allActivities } = await useFetch("/api/activities");
</script>

<template>
  <Head>
    <Title>Soul Sanctuary - Activities</Title>
  </Head>
  <main class="activities-page">
    <div class="page-header">
      <h1 class="page-title title">All Activities</h1>
      <p class="page-description text">
        Discover our most popular activities below — explore what we offer and find the perfect fit for your journey.
      </p>
    </div>
    <div class="activities-grid">
      <ActivityCard
        v-for="activity in allActivities"
        :key="activity.id"
        :id="activity.id"
        :name="activity.name"
        :imageUrl="activity.imageUrl"
      />
    </div>
  </main>
</template>

<style scoped>
.activities-page {
  max-width: 1440px;
  margin: 0 auto;
}

.page-header {
  text-align: center;
  margin-bottom: 1rem;
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
  max-width: 700px;
  margin: 0 auto;
  color: #3D5144;
  line-height: 1.6;
  padding: 0 2.5rem;
}

/* 2 columns layout for screens between 1440 and 800 */
.activities-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(350px, 1fr));
  row-gap: clamp(0.5rem, 2vw, 3rem);
  column-gap: clamp(0rem, 3vw, 5rem);
  margin: 0 auto;
  padding: 2.5rem;
  box-sizing: border-box;
}

/* 1 column layout for screens below the 750 mark */
@media (max-width: 800px) {
  .activities-grid {
    grid-template-columns: 1fr;
    gap: 2.5rem;
    justify-items: center;
    max-width: 600px;
  }
}
</style>