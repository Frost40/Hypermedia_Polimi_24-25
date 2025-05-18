<template>
    <Head>
        <Title>{{ activity.name }} - Soul Sanctuary</Title>
        <meta nrel="robots" content="index, follow">
        <link rel="canonical" href="https://soulsanctuary.example.com/activities/[id]">
    </Head>
    <div :style="backgroundStyle">
      <main class="main" role="main" aria-labelledby="activity-title">
        <h1 id="activity-title" class="activity-title title">{{ activity.name }}</h1>
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
        <div class="teachers-manager-row">
          <div class="teachers-column">
            <p class="subtitle" style="margin: 0;">Teachers:</p>
            <div class="teachers-cards">
              <TeacherCard
                v-for="teacher in teachers"
                :key="teacher.id"
                :id="teacher.id"
                :name="teacher.fullname"
                :mainAreaOfExpertise="teacher.area"
                :imageUrl="teacher.photo"
              />
            </div>
          </div>
          <div class="manager-column">
            <p class="subtitle" style="margin: 0;">Manager:</p>
            <div class="responsible-card">
              <TeacherCard
                :id="allTeachers.manager.id"
                :name="allTeachers.manager.fullname"
                :mainAreaOfExpertise="allTeachers.manager.area"
                :imageUrl="allTeachers.manager.photo"
              />
            </div>
          </div>
        </div>
        <div class="schedule-section">
          <h1 class="subtitle"> Schedule </h1>
          <CourseScheduleTable :schedule="activity.schedule" />
        </div>
      </main>
    </div>
</template>

<script setup>

  import CourseScheduleTable from '@/components/CourseScheduleTable.vue'
  import TeacherCard from "~/components/TeacherCard.vue";

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

  const { data: teachersData } = await useFetch('/api/activities/getTeachers/' + id)
  const allTeachers = teachersData.value
  const teachers = allTeachers.teachers;

  const formattedDescription = computed(() =>
  activity.description.replace(/\n/g, '<br>')
  );

  import wallpaper from '@/assets/png/wallpaper.png'

  const backgroundStyle = {
    backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url(${wallpaper})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundAttachment: 'fixed',
    backgroundRepeat: 'no-repeat',
    minHeight: '100vh',
  }

  //Search Engine Optimization
  const page_description = ref('This page contains all the details of ' + activity.name)
  const keywords = ref('Activity, Schedule, Description, ' + activity.name)
  const og_title = ref('Soul Sanctuary - Activities - ' + activity.name)
  const og_description = ref('Discover our activity, find a brief description of the course, all the teachers, managers and also the schedule' )
  const twitter_title = ref('Soul Sanctuary - Activities - ' + activity.name)
  const twitter_description = ref('Discover our activity, find a brief description of the course, all the teachers, managers and also the schedule')

  useHead({
    meta: [
      { name: 'description', content: page_description },
      { name: 'keywords', content: keywords },
      // Open Graph tags for better social sharing specific to this page
      { property: 'og:title', content:  og_title},
      { property: 'og:description', content: og_description},
      // Twitter card tags for better sharing on Twitter
      { name: 'twitter:title', content: twitter_title},
      { name: 'twitter:description', content: twitter_description},
    ]
  })

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

.schedule-section {
  padding-bottom: 5rem; 
}

.teachers-manager-row {
  display: flex;
  justify-content: space-between;
  gap: 5rem;
  margin: 2rem 2.5rem;
  flex-wrap: wrap;
}

.teachers-column,
.manager-column {
  flex: 1;
}

.teachers-cards {
  display: flex;
  gap: 1rem;     
  padding-bottom: 0.5rem;
  box-sizing: border-box;
}

.responsible-card {
  display: flex;
  justify-content: flex-start;
  gap: 1rem;
  box-sizing: border-box;
}

@media (max-width: 768px) {
  .teachers-manager-row {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .teachers-column,
  .manager-column {
    width: 100%;
  }

  .teachers-cards {
    flex-wrap: wrap;     /* wrap per andare a capo */
    justify-content: center;
    overflow-x: visible; /* niente scroll orizzontale */
  }

  .responsible-card {
    justify-content: center;
  }
}

@media (max-width: 1200px) and (min-width: 769px) {
  .teachers-manager-row {
    flex-direction: column;
    align-items: center;
    gap: 2rem;
  }

  .teachers-column,
  .manager-column {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
    width: 100%;
  }

  .teachers-cards,
  .responsible-card {
    justify-content: center;
    flex-wrap: wrap;
  }
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
