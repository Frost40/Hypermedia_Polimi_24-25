<template>
  <Head>
    <Title>{{ teacher.fullname }} - Soul Sanctuary</Title>
    <meta name="robots" content="index, follow" />
    <link rel="canonical" href="https://soulsanctuary.example.com/teachers/[id]">
  </Head>
  <div :style="backgroundStyle" class="background">
    <main class="main">
      <!-- Navigation arrow -->
      <div class="navigation">
        <NuxtLink v-if="prevId" :to="{ path: `/teachers/${prevId}`, query: { from } }" class="arrow-link left">
          <img src="../../assets/svgs/previous.svg" class="arrows" />
        </NuxtLink>
        <NuxtLink v-if="nextId" :to="{ path: `/teachers/${nextId}`, query: { from } }" class="arrow-link right">
          <img src="../../assets/svgs/next.svg" class="arrows" />
        </NuxtLink>
      </div>

      <!-- Wrapper -->
      <div class="teacher-wrapper">
        <div class="teacher-box">
          <div class="photo-section">
            <img :src="teacher.photo" alt="Teacher's Photo" class="teacher-photo" />
          </div>
          <div class="info-section">
            <h2 class="title">{{ teacher.fullname }}</h2>
            <p class="text"><strong>Phone:</strong> <a :href="'tel:' + teacher.phone">{{ teacher.phone }}</a></p>
            <p class="text"><strong>Email:</strong> <a :href="'mailto:' + teacher.email">{{ teacher.email }}</a></p>
            <p class="text"><strong>Area:</strong> {{ teacher.area }}</p>
            <a :href="teacher.cv" target="_blank" class="button">Curriculum</a>
          </div>
        </div>
      </div>

      <!-- Description section -->
      <section class="description-section">
        <div class="description-box">
          <p class="text" v-html="formattedDescription"></p>
        </div>
      </section>

      <!-- Activity section -->
      <div class="activity-section">
        <h2 class="subtitle" style="text-align: center;">{{ teacher.fullname }}'s Classes</h2>
        <div class="slider-wrapper">
          <ActivitiesSlider :activities="teacher.activities" />
        </div>

        <div v-if="teacher.managedActivities && teacher.managedActivities.length">
          <h2 class="subtitle" style="text-align: center;">{{ teacher.fullname }}'s Responsibilities</h2>
          <div class="slider-wrapper">
            <ActivitiesSlider :activities="teacher.managedActivities" />
          </div>
        </div>
      </div>
    </main>
  </div>
</template>


<script setup>
import ActivitiesSlider from '@/components/ActivitySlideShow.vue'
const route = useRoute()
const id = route.params.id
const from = route.query.from

const { data: teacherData } = await useFetch('/api/teachers/' + id)
const teacher= teacherData.value

const { data: allTeachersData } = await useFetch('/api/teachers')
const allTeachers = allTeachersData.value

const currentIndex = allTeachers.findIndex(t => String(t.id) === String(id))
const prevId = currentIndex > 0 ? allTeachers[currentIndex - 1].id : null
const nextId = currentIndex < allTeachers.length - 1 ? allTeachers[currentIndex + 1].id : null

const formattedDescription = computed(() =>
    teacher.description.replace(/\n/g, '<br>')
)

import wallpaper from '@/assets/png/wallpaper.png'

const backgroundStyle = {
  backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url(${wallpaper})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundAttachment: 'fixed',
  backgroundRepeat: 'no-repeat',
  minHeight: '100vh',
}

// Search Engine Optimization variables
const page_description = ref('This page contains all the details about ' + teacher.fullname)
const keywords = ref('Teacher, Yoga, Instructor, ' + teacher.fullname)
const og_title = ref('Soul Sanctuary - Teachers - ' + teacher.fullname)
const og_description = ref('Meet our instructor: learn more about their experience, contacts, and the activities they lead.')
const twitter_title = ref('Soul Sanctuary - Teachers - ' + teacher.fullname)
const twitter_description = ref('Meet our instructor: learn more about their experience, contacts, and the activities they lead.')

// Setting head meta tags for SEO
useHead({
  meta: [
    { name: 'description', content: page_description },
    { name: 'keywords', content: keywords },
    { property: 'og:title', content: og_title },
    { property: 'og:description', content: og_description },
    { name: 'twitter:title', content: twitter_title },
    { name: 'twitter:description', content: twitter_description }
  ]
})
</script>

<style scoped>
.main {
  max-width: 1440px;
  margin: 0 auto;
  padding: 2rem;
}

.navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem auto;
  padding: 0 2rem;
  position: relative;
  max-width: 1440px;
}

.arrow-link {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
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

.teacher-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 1rem;
  margin: 2rem 0;
}

.teacher-box {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  max-width: 900px;
  flex-wrap: nowrap;
}

.photo-section {
  flex: 1;
  min-width: 250px;
  max-width: 350px;
}

.teacher-photo {
  width: 100%;
  height: auto;
  aspect-ratio: 1/1;
  object-fit: cover;
  border-radius: 20px;
}

.info-section {
  flex: 1;
  min-width: 250px;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.info-section .title {
  margin-bottom: 0.5rem;
}

.info-section .text {
  margin-bottom: 0.3rem;
}

.button {
  display: inline-block;
  background-color: #3D5144;
  color: #BCC7C2;
  padding: 0.6rem 1.2rem;
  margin-top: 1rem;
  border-radius: 10px;
  font-size: 1rem;
  text-decoration: none;
  transition: font-weight 0.3s ease;
  width: fit-content;
}

.button:hover {
  font-weight: bold;
}

.description-section {
  display: flex;
  justify-content: center;
  margin: 0 auto;
  margin-top: 2rem;
}

.description-box {
  background-color: #BCC7C2;
  padding: 2rem;
  border-radius: 20px;
  width: 1000px;
  text-align: left;
}

.activity-section {
  margin-top: 3rem;
  margin-bottom: 2rem;
}

.slider-wrapper {
  max-width: 700px;
  margin: 0 auto 3rem auto;
}

.activity-title {
  padding-bottom: 0.5rem;
  display: flex;
  align-items: center;
  padding-left: 0;
  width: 100%;
  max-width: 700px;
  margin: 0 auto;
}

@media (max-width: 768px) {
  .teacher-box {
    flex-direction: column;
    align-items: center;
    text-align: center;
    flex-wrap: wrap;
  }

  .info-section {
    align-items: center;
    max-width: 100%;
  }

  .description-box {
    width: 90%;
    text-align: center;
  }

  .photo-section {
    max-width: none;
  }

  .slider-wrapper {
    width: 90%;
  }

  .teacher-wrapper {
    min-height: auto;
  }
}
</style>

