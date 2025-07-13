<template>

  <!-- Head section for setting title, meta tags, and canonical link -->
  <Head>
    <Title>{{ teacher?.fullname || 'Loading teacher' }} - Soul Sanctuary</Title>
    <meta name="robots" content="index, follow" />
    <link rel="canonical" :href="`https://soulsanctuary-ten.vercel.app/teachers/${id}`" />
  </Head>

  <!-- Main container -->
  <main class="main">
    <div v-if="isLoading" class="teacher-page-skeleton">
      <div class="skeleton-navigation">
        <div class="skeleton-arrow"></div>
        <div class="skeleton-arrow"></div>
      </div>

      <div class="teacher-wrapper skeleton-section">
        <div class="teacher-box skeleton-teacher-box">
          <div class="photo-section skeleton-photo-section">
            <div class="skeleton-image-placeholder circle"></div>
          </div>
          <div class="info-section skeleton-info-section">
            <div class="skeleton-line full-width title-line"></div>
            <div class="skeleton-line short-width"></div>
            <div class="skeleton-line medium-width"></div>
            <div class="skeleton-line short-width"></div>
            <div class="skeleton-button"></div>
          </div>
        </div>
      </div>

      <section class="description-section skeleton-section">
        <div class="description-box skeleton-description-box">
          <div class="skeleton-line full-width"></div>
          <div class="skeleton-line medium-width"></div>
          <div class="skeleton-line short-width"></div>
          <div class="skeleton-line full-width"></div>
        </div>
      </section>

      <div class="activity-section skeleton-section">
        <div class="skeleton-subtitle centered"></div>
        <div class="slider-wrapper skeleton-slider-wrapper">
          <div class="skeleton-activity-card"></div>
          <div class="skeleton-activity-card"></div>
        </div>

        <div class="skeleton-subtitle centered" v-if="showManagedActivitiesSkeleton"></div>
        <div class="slider-wrapper skeleton-slider-wrapper" v-if="showManagedActivitiesSkeleton">
          <div class="skeleton-activity-card"></div>
          <div class="skeleton-activity-card"></div>
        </div>
      </div>
    </div>

    <div v-else-if="teacherError || allTeachersError">
      <p>There is an error in the loading of the teacher data. Please, come later.</p>
    </div>
    <div v-else>

      <!-- Navigation arrows for previous and next activities -->
      <div class="navigation">
        <NuxtLink v-if="prevId" :to="{ path: `/teachers/${prevId}`, query: { from } }" class="arrow-link left" aria-label="Go to the previous activity">
          <img src="../../assets/svg/previous.svg" class="arrows" alt="" aria-hidden="true"/>
        </NuxtLink>
        <NuxtLink v-if="nextId" :to="{ path: `/teachers/${nextId}`, query: { from } }" class="arrow-link right" aria-label="Go to the next activity">
          <img src="../../assets/svg/next.svg" class="arrows" alt="" aria-hidden="true"/>
        </NuxtLink>
      </div>

      <!-- Wrapper -->
      <div class="teacher-wrapper">
        <div class="teacher-box">
          <div class="photo-section">
            <nuxt-img
                :src="teacher.photo"
                alt="Teacher's Photo"
                format="avif,webp,jpg"
                quality="80"
                loading="lazy"
                fetchpriority="high"
                width="300"
                height="300"
                class="teacher-photo"
            />
          </div>

          <div class="info-section">
            <h2 class="title contacts">{{ teacher.fullname }}</h2>
            <p class="text"><strong>Phone:</strong> <a class="color-link" :href="'tel:' + teacher.phone">{{ teacher.phone }}</a></p>
            <p class="text"><strong>Email:</strong> <a class="color-link" :href="'mailto:' + teacher.email">{{ teacher.email }}</a></p>
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

      <!-- Activity slider section -->
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
    </div>
  </main>
</template>

<script setup>
// Importing
import { useRoute, useHead } from '#imports'
import { computed, ref } from 'vue'
import ActivitiesSlider from '~/components/ActivityCarousel.vue'
const route = useRoute()
const id = route.params.id
const from = route.query.from

// Teacher data
const { data: teacherData, pending: teacherPending, error: teacherError } = await useLazyFetch(`/api/teachers/${id}`)
const teacher = computed(() => teacherData.value);

// All teachers for navigation
const { data: allTeachersData, pending: allTeachersPending, error: allTeachersError } = await useLazyFetch('/api/teachers')
const allTeachers = computed(() => allTeachersData.value || []);

const isLoading = computed(() => teacherPending.value || allTeachersPending.value);

// Prev/Next navigation logic
const currentIndex = computed(() => allTeachers.value.findIndex(t => String(t.id) === String(id)));
const prevId = computed(() => currentIndex.value > 0 ? allTeachers.value[currentIndex.value - 1].id : null);
const nextId = computed(() => currentIndex.value < allTeachers.value.length - 1 ? allTeachers.value[currentIndex.value + 1].id : null);

// Formatted description
const formattedDescription = computed(() =>
    teacher.value?.description?.replace(/\n/g, '<br>') || ''
);

// ManagedActivities skeleton
const showManagedActivitiesSkeleton = computed(() => {
  return isLoading.value || (teacher.value && teacher.value.managedActivities && teacher.value.managedActivities.length > 0);
});

// Search Engine Optimization variables
const page_description = computed(() => 'This page contains all the details about ' + (teacher.value?.fullname || 'this teacher'));
const keywords = computed(() => 'Teacher, Yoga, Instructor, ' + (teacher.value?.fullname || 'Teacher'));
const og_title = computed(() => 'Soul Sanctuary - Teacher - ' + (teacher.value?.fullname || 'Teacher'));
const og_description = ref('Meet our instructor: learn more about their experience, contacts, and the activities they lead.');
const twitter_title = computed(() => 'Soul Sanctuary - Insegnanti - ' + (teacher.value?.fullname || 'Teacher'));
const twitter_description = ref('Meet our instructor: learn more about their experience, contacts, and the activities they lead.');

// Setting head meta tags for SEO
useHead({
  title: computed(() => teacher.value?.fullname ? `${teacher.value.fullname} - Soul Sanctuary` : 'Soul Sanctuary - Teacher'),
  meta: [
    { name: 'description', content: page_description },
    { name: 'keywords', content: keywords },
    { property: 'og:title', content: og_title },
    { property: 'og:description', content: og_description },
    { name: 'twitter:title', content: twitter_title },
    { name: 'twitter:description', content: twitter_description }
  ],
  link: [
    { rel: 'canonical', href: `https://soulsanctuary-ten.vercel.app/teachers/${id}` }
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
  max-width: none;
  display: flex;
  justify-content: center;
}

.teacher-photo {
  width: 300px;
  height: 300px;
  object-fit: cover;
  object-position: center;
  border-radius: 20px;
  display: block;
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

a.color-link {
  color: blue;
  text-decoration: none;
}

a.color-link:hover {
  color: blue;
  font-weight: bold;
  text-decoration: underline;
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

  @media (max-width: 768px) {
    .teacher-photo {
      width: 200px;
      height: 200px;
    }
  }
}

.teacher-page-skeleton {
  max-width: 1440px;
  margin: 0 auto;
  padding: 2rem;
}

.skeleton-line,
.skeleton-image-placeholder,
.skeleton-button,
.skeleton-title,
.skeleton-subtitle,
.skeleton-arrow,
.skeleton-activity-card {
  background-color: #e0e0e0;
  border-radius: 4px;
  animation: pulse-bg 1.5s infinite ease-in-out;
}

@keyframes pulse-bg {
  0% { background-color: #e0e0e0; }
  50% { background-color: #f0f0f0; }
  100% { background-color: #e0e0e0; }
}

/* Skeleton Navigation */
.skeleton-navigation {
  display: flex;
  justify-content: space-between;
  margin: 1rem auto;
  padding: 0 2rem;
  position: relative;
  max-width: 1440px;
}

.skeleton-arrow {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}

/* Skeleton Teacher Wrapper/Box */
.teacher-wrapper.skeleton-section {
  padding: 2rem 1rem;
  margin: 2rem 0;
  border-radius: 0;
  background-color: transparent;
  animation: none;
}

.skeleton-teacher-box {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  max-width: 900px;
  flex-wrap: nowrap;
  background-color: #BCC7C2;
  border-radius: 20px;
  padding: 2rem;
  width: 100%;
  box-sizing: border-box;
  animation: pulse-bg 1.5s infinite ease-in-out;
}

.skeleton-photo-section {
  max-width: none;
  display: flex;
  justify-content: center;
}

.skeleton-image-placeholder {
  width: 300px;
  height: 300px;
  border-radius: 20px;
}
.skeleton-image-placeholder.circle {
  border-radius: 50%;
}

.skeleton-info-section {
  flex: 1;
  min-width: 250px;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.5rem;
}

.skeleton-line.title-line {
  height: 2.5rem;
  width: 80%;
  margin-bottom: 0.5rem;
}

.skeleton-line.full-width { width: 95%; height: 1em;}
.skeleton-line.medium-width { width: 70%; height: 1em;}
.skeleton-line.short-width { width: 40%; height: 1em;}

.skeleton-button {
  height: 2.5rem;
  width: 120px;
  margin-top: 1rem;
  border-radius: 10px;
}

/* Skeleton Description Section */
.description-section.skeleton-section {
  margin: 2rem auto;
  background-color: #BCC7C2;
  padding: 2rem;
  border-radius: 20px;
  width: calc(100% - 4rem);
  max-width: 1000px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  gap: 10px;
  animation: pulse-bg 1.5s infinite ease-in-out;
}

.skeleton-description-box {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

/* Skeleton Activity Section */
.activity-section.skeleton-section {
  margin-top: 3rem;
  margin-bottom: 2rem;
  background-color: transparent;
  animation: none;
  padding: 0;
}

.skeleton-subtitle {
  height: 2rem;
  width: 250px;
  margin: 0 auto 1.5rem;
  border-radius: 6px;
}

.skeleton-slider-wrapper {
  max-width: 700px;
  margin: 0 auto 3rem auto;
  display: flex;
  gap: 1rem;
  overflow: hidden;
  justify-content: center;
}

.skeleton-activity-card {
  min-width: 250px;
  height: 350px;
  border-radius: 16px;
  flex-shrink: 0;
}

@media (max-width: 768px) {
  .skeleton-teacher-box {
    flex-direction: column;
    text-align: center;
    gap: 1.5rem;
  }

  .skeleton-info-section {
    align-items: center;
    max-width: 100%;
  }

  .skeleton-image-placeholder {
    width: 200px;
    height: 200px;
  }

  .description-section.skeleton-section,
  .skeleton-description-box {
    width: 90%;
    text-align: center;
    padding: 1.5rem;
  }
  .skeleton-line {
    margin: 0 auto;
  }

  .skeleton-slider-wrapper {
    width: 90%;
    justify-content: flex-start;
  }

  .skeleton-activity-card {
    min-width: 80%;
  }
}
</style>