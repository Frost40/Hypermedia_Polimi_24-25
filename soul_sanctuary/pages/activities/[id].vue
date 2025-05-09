<template>
    <Head>
        <Title>{{ activity.name }} - Soul Sanctuary</Title>
    </Head>
    <main class="main">
        <h1 class="activity-title title">{{ activity.name }}</h1>
        <div class="navigation">
          <NuxtLink v-if="prevId" :to="{ path: `/activities/${prevId}`, query: { from } }" class="arrow-link left">
            <img src="../../assets/svgs/previous.svg" class="arrows">
          </NuxtLink>
          <NuxtLink v-if="nextId" :to="{ path: `/activities/${nextId}`, query: { from } }" class="arrow-link right">
            <img src="../../assets/svgs/next.svg" class="arrows">
          </NuxtLink>
        </div>
        <div class="photo_and_description">
            <div class="photo">
                <img :src="activity.imageUrl" alt="activity image">
            </div>
            <div class="description">
              <p class="text" v-html="formattedDescription"></p>
            </div>
        </div>
        <div class="schedule-section">
          <h1 class="subtitle"> Schedule </h1>
          <CourseScheduleTable :schedule="activity.schedule" />
        </div>
    </main>
</template>

<script setup>

  import CourseScheduleTable from '@/components/CourseScheduleTable.vue'

  const route = useRoute()
  const id = route.params.id;
  const from = route.query.from || 'all';

  const { data: activityData } = await useFetch('/api/activities/' + id)
  const activity = activityData.value[0]

  const { data: allActivitiesData } = await useFetch('/api/activities/guidedTour')
  const allActivities = allActivitiesData.value

  const filteredActivities = from === 'fromHighlights'
    ? allActivities.filter(a => a.highlighted)
    : allActivities

  const currentIndex = filteredActivities.findIndex(a => String(a.id) === String(id))
  const prevId = currentIndex > 0 ? filteredActivities[currentIndex - 1].id : null
  const nextId = currentIndex < filteredActivities.length - 1 ? filteredActivities[currentIndex + 1].id : null

  const formattedDescription = computed(() =>
  activity.description.replace(/\n/g, '<br>')
);

</script>

<style scoped>

.main{
    max-width: 1440px;
    margin: 0 auto;
}
    
.photo_and_description {
  display: flex;
  flex-direction: row;
  border-radius: 40px;
  background-color: #BCC7C2;
  margin: 0 2.5rem;
  overflow: hidden;
  flex-wrap: wrap;
}

.photo {
  flex: 1;
  min-width: 300px;
}

.photo img {
  width: 100%;
  height: 100%;
  border-radius: 40px 0 0 40px;
  object-fit: cover;
}

.description {
  flex: 1.5;
  padding: 2rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}
.subtitle{
  margin: 0 2.5rem;
}

.navigation {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem auto;
  max-width: 1440px;
  padding: 0 2rem;
}

.arrow-link {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1;
  transition: transform 0.2s ease;
}

.arrow-link.left {
  left: 1rem;
}

.arrow-link.right {
  right: 1rem;
}

.arrows {
  width: 30px;
  height: 30px;
  transition: transform 0.2s ease;
}

.arrow-link:hover .arrows {
  transform: scale(1.15);
}

@media (max-width: 768px) {
  .photo_and_description {
    flex-direction: column;
  }

  .photo img {
    border-radius: 40px 40px 0 0;
  }

  .description {
    border-radius: 0 0 40px 40px;
  }
}

</style>
