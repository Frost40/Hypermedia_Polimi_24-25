<template>
    <!-- Head section for setting title, meta tags, and canonical link -->
    <Head>
        <Title>{{ activity.name }} - Soul Sanctuary</Title>
        <meta nrel="robots" content="index, follow">
        <link rel="canonical" :href="'https://soulsanctuary-ten.vercel.app/${id}'">
    </Head>
    <!-- Main container -->
    <main class="main" role="main" aria-labelledby="activity-title">
      <!-- Activity title -->
      <h1 id="activity-title" class="activity-title title no-line-below-768">{{ activity.name }}</h1>
      <!-- Navigation arrows for previous and next activities -->
      <div class="navigation">
        <NuxtLink v-if="prevId" :to="{ path: `/activities/${prevId}`, query: { from } }" class="arrow-link left" aria-label="Go to the previous activity">
          <img src="../../assets/svg/previous.svg" class="arrows" alt="" aria-hidden="true">
        </NuxtLink>
        <NuxtLink v-if="nextId" :to="{ path: `/activities/${nextId}`, query: { from } }" class="arrow-link right" aria-label="Go to the next activity">
          <img src="../../assets/svg/next.svg" class="arrows" alt="" aria-hidden="true">
        </NuxtLink>
      </div>
      <!-- Photo and description section -->
      <div class="photo_and_description">
          <div class="photo">
              <nuxt-img
                :src="activity.imageUrl"
                alt="activity image"
                format="avif,webp,jpg"
                quality="80"
                loading="lazy"
                fetchpriority="high"
                class="photo_initial"
              />
          </div>
          <div class="description">
            <p class="text" v-html="formattedDescription"></p>
          </div>
      </div>
      <!-- Schedule section -->
      <div class="schedule-section">
        <h1 class="subtitle"> Schedule </h1>
        <CourseScheduleTable :schedule="activity.schedule" />
      </div>
      <!-- Teachers and manager section -->
      <div class="teachers-manager-row">
        <div class="teachers-column">
          <h1 class="subtitle" style="margin: 0;">Teachers:</h1>
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
          <h1 class="subtitle" style="margin: 0;">Manager:</h1>
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
    </main>
</template>

<script setup>

  // Importing necessary components
  import CourseScheduleTable from '@/components/CourseScheduleTable.vue'
  import TeacherCard from "~/components/TeacherCard.vue";

  const route = useRoute()
  const id = route.params.id
  const from = route.query.from || 'all'

  // Activity data
  const { data: activityData } = await useAsyncData(
    `activity-${id}`,
    () => $fetch(`/api/activities/${id}`),
    {
      transform: (data) => data[0]
    }
  )
  const activity = activityData.value

  // All activities
  const { data: allActivitiesData } = await useAsyncData(
    'all-activities',
    () => $fetch('/api/activities/guidedTour')
  )
  const allActivities = allActivitiesData.value

  // Prev/Next navigation logic
  const filteredActivities = computed(() => {
    return from === 'fromHighlights'
      ? allActivities.filter(a => a.highlighted)
      : allActivities
  })

  const currentIndex = computed(() =>
    filteredActivities.value.findIndex(a => String(a.id) === String(id))
  )

  const prevId = computed(() =>
    currentIndex.value > 0 ? filteredActivities.value[currentIndex.value - 1].id : null
  )

  const nextId = computed(() =>
    currentIndex.value < filteredActivities.value.length - 1
      ? filteredActivities.value[currentIndex.value + 1].id
      : null
  )

  // Teachers
  const { data: teachersData } = await useAsyncData(
    `teachers-${id}`,
    () => $fetch(`/api/activities/getTeachers/${id}`)
  )
  const allTeachers = teachersData.value
  const teachers = allTeachers.teachers

  // Format description with <br>
  const formattedDescription = computed(() =>
    activity.description.replace(/\n/g, '<br>')
  )

  // Search Engine Optimization variables
  const page_description = ref('This page contains all the details of ' + activity.name)
  const keywords = ref('Activity, Schedule, Description, ' + activity.name)
  const og_title = ref('Soul Sanctuary - Activities - ' + activity.name)
  const og_description = ref('Discover our activity, find a brief description of the course, all the teachers, managers and also the schedule' )
  const twitter_title = ref('Soul Sanctuary - Activities - ' + activity.name)
  const twitter_description = ref('Discover our activity, find a brief description of the course, all the teachers, managers and also the schedule')

  // Setting head meta tags for SEO
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
    padding-top: 2rem;
}

.main > h1 {
  margin-top: 0;
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

.photo_initial {
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
  margin-top: 3rem;      
  padding-bottom: 2rem;
}

.teachers-manager-row {
  display: flex;
  justify-content: center;
  gap: 5rem;
  margin: 2rem 2.5rem;
  flex-wrap: wrap;
}

.teachers-column,
.manager-column {
  flex: 0 1 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}



.teachers-cards,
.responsible-card {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: center;
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
    flex-wrap: wrap;     
    justify-content: center;
    overflow-x: visible; 
  }

  .responsible-card {
    justify-content: center;
  }
}

</style>
