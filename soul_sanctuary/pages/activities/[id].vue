<template>
    <Head>
        <Title>{{ activity?.name || 'Caricamento Attività' }} - Soul Sanctuary</Title>
        <meta nrel="robots" content="index, follow">
        <link rel="canonical" :href="`https://soulsanctuary-ten.vercel.app/activities/${id}`">
    </Head>
    <main class="main" role="main" aria-labelledby="activity-title">
        <div v-if="isLoading" class="activity-page-skeleton">
            <div class="skeleton-title"></div>
            <div class="skeleton-navigation">
                <div class="skeleton-arrow"></div>
                <div class="skeleton-arrow"></div>
            </div>
            <div class="photo_and_description skeleton-section">
                <div class="skeleton-image-placeholder"></div>
                <div class="description skeleton-description-text">
                    <div class="skeleton-line full-width"></div>
                    <div class="skeleton-line medium-width"></div>
                    <div class="skeleton-line short-width"></div>
                </div>
            </div>
            <div class="schedule-section skeleton-section">
                <div class="skeleton-subtitle"></div>
                <div class="skeleton-table">
                    <div class="skeleton-table-row"></div>
                    <div class="skeleton-table-row"></div>
                    <div class="skeleton-table-row"></div>
                </div>
            </div>
            <div class="teachers-manager-row skeleton-section">
                <div class="teachers-column skeleton-teachers-column">
                    <div class="skeleton-subtitle"></div>
                    <div class="skeleton-cards-container">
                        <div class="skeleton-teacher-card"></div>
                        <div class="skeleton-teacher-card"></div>
                        <div class="skeleton-teacher-card"></div>
                    </div>
                </div>
                <div class="manager-column skeleton-manager-column">
                    <div class="skeleton-subtitle"></div>
                    <div class="skeleton-teacher-card"></div>
                </div>
            </div>
        </div>

        <div v-else-if="activityError || allActivitiesError || teachersError">
            <p>Errore nel caricamento dell'attività. Per favore riprova più tardi.</p>
            </div>
        <div v-else>
            <h1 id="activity-title" class="activity-title title no-line-below-768">{{ activity.name }}</h1>
            <div class="navigation">
                <NuxtLink v-if="prevId" :to="{ path: `/activities/${prevId}`, query: { from } }" class="arrow-link left" aria-label="Go to the previous activity">
                    <img src="../../assets/svg/previous.svg" class="arrows" alt="" aria-hidden="true">
                </NuxtLink>
                <NuxtLink v-if="nextId" :to="{ path: `/activities/${nextId}`, query: { from } }" class="arrow-link right" aria-label="Go to the next activity">
                    <img src="../../assets/svg/next.svg" class="arrows" alt="" aria-hidden="true">
                </NuxtLink>
            </div>
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
            <div class="schedule-section">
                <h1 class="subtitle"> Schedule </h1>
                <CourseScheduleTable :schedule="activity.schedule" />
            </div>
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
                            :loading="false" />
                    </div>
                </div>
                <div class="manager-column">
                    <h1 class="subtitle" style="margin: 0;">Manager:</h1>
                    <div class="responsible-card">
                        <TeacherCard
                            :id="allTeachers?.manager?.id"
                            :name="allTeachers?.manager?.fullname"
                            :mainAreaOfExpertise="allTeachers?.manager?.area"
                            :imageUrl="allTeachers?.manager?.photo"
                            :loading="false" />
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup>
import { useRoute, useHead } from '#imports'
import { computed, ref } from 'vue'

import CourseScheduleTable from '@/components/CourseScheduleTable.vue'
import TeacherCard from '~/components/TeacherCard.vue' // Assicurati che il percorso sia corretto

// Route
const route = useRoute()
const id = route.params.id
const from = route.query.from || 'all'

// Fetch activity data
const { data: activityData, pending: activityPending, error: activityError } = await useLazyFetch(`/api/activities/${id}`);
const activity = computed(() => activityData.value?.[0]);

// Fetch all activities for navigation logic
const { data: allActivitiesData, pending: allActivitiesPending, error: allActivitiesError } = await useLazyFetch('/api/activities/guidedTour');
const allActivities = computed(() => allActivitiesData.value || []);

// Determine current, prev, next IDs
const filteredActivities = computed(() => {
  return from === 'fromHighlights'
    ? allActivities.value.filter(a => a.highlighted)
    : allActivities.value;
});

const currentIndex = computed(() => filteredActivities.value.findIndex(a => String(a.id) === String(id)));
const prevId = computed(() => currentIndex.value > 0 ? filteredActivities.value[currentIndex.value - 1].id : null);
const nextId = computed(() => currentIndex.value < filteredActivities.value.length - 1 ? filteredActivities.value[currentIndex.value + 1].id : null);

// Fetch teachers
const { data: teachersData, pending: teachersPending, error: teachersError } = await useLazyFetch(`/api/activities/getTeachers/${id}`);
const allTeachers = computed(() => teachersData.value);
const teachers = computed(() => allTeachers.value?.teachers || []);

// Determina se la pagina è in fase di caricamento
const isLoading = computed(() => activityPending.value || allActivitiesPending.value || teachersPending.value);

// Format description
const formattedDescription = computed(() =>
  activity.value?.description?.replace(/\n/g, '<br>') || ''
);

// SEO
const page_description = computed(() => 'Questa pagina contiene tutti i dettagli di ' + (activity.value?.name || 'questa attività'));
const keywords = computed(() => 'Attività, Orario, Descrizione, ' + (activity.value?.name || 'Attività'));
const og_title = computed(() => 'Soul Sanctuary - Attività - ' + (activity.value?.name || 'Attività'));
const og_description = ref('Scopri la nostra attività, trova una breve descrizione del corso, tutti gli insegnanti, i responsabili e anche l\'orario');
const twitter_title = computed(() => 'Soul Sanctuary - Attività - ' + (activity.value?.name || 'Attività'));
const twitter_description = ref('Scopri la nostra attività, trova una breve descrizione del corso, all the teachers, managers and also the schedule');

// Setting head meta tags for SEO
useHead({
  title: computed(() => activity.value?.name ? `Soul Sanctuary - ${activity.value.name}` : 'Soul Sanctuary'),
  meta: [
    { name: 'description', content: page_description },
    { name: 'keywords', content: keywords },
    { property: 'og:title', content: og_title },
    { property: 'og:description', content: og_description },
    { name: 'twitter:title', content: twitter_title },
    { name: 'twitter:description', content: twitter_description },
  ],
  link: [
    { rel: 'canonical', href: `https://soulsanctuary-ten.vercel.app/activities/${id}` }
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

  .photo {
    width: 100%;
    min-width: 100%;
  }

  .photo_and_description {
    flex-direction: column;
  }

  .photo img {
    border-radius: 40px 40px 0 0;
  }

  .description {
    border-radius: 0 0 40px 40px;
    width: 100%;
    min-width: 100%;
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

.activity-page-skeleton {
    max-width: 1440px;
    margin: 0 auto;
    padding-top: 2rem;
}

.skeleton-title {
    height: 3rem; /* Altezza simile a un h1 */
    width: 60%;
    margin: 0 auto 1.5rem 2.5rem; /* Margini per allinearsi al titolo reale */
    background-color: #e0e0e0;
    border-radius: 8px;
    animation: pulse-bg 1.5s infinite ease-in-out;
}

.skeleton-navigation {
    display: flex;
    justify-content: space-between;
    margin: 1rem auto;
    max-width: 1440px;
    padding: 0 2rem;
}

.skeleton-arrow {
    width: 30px;
    height: 30px;
    background-color: #e0e0e0;
    border-radius: 50%; /* Per simulare una freccia rotonda */
    animation: pulse-bg 1.5s infinite ease-in-out;
}

.skeleton-section {
    background-color: #BCC7C2; /* Stesso colore del blocco reale */
    border-radius: 40px;
    margin: 0 2.5rem 2rem; /* Margini per allinearsi ai blocchi reali */
    overflow: hidden;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center; /* Per centrare il contenuto in caso di flex-wrap */
    padding: 1.5rem; /* Padding interno per simulare lo spazio del contenuto */
    animation: pulse-bg 1.5s infinite ease-in-out;
}

.skeleton-image-placeholder {
    flex: 1;
    min-width: 300px;
    aspect-ratio: 1 / 1; /* O altezza fissa */
    background-color: #e0e0e0; /* Colore più scuro per il placeholder dell'immagine */
    border-radius: 40px 0 0 40px; /* Bordi arrotondati come l'immagine reale */
    animation: pulse-bg 1.5s infinite ease-in-out;
}

.skeleton-description-text {
    flex: 1.5;
    padding: 2rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    box-sizing: border-box;
    gap: 10px; /* Spazio tra le linee di testo */
}

.skeleton-line {
    height: 1em; /* Altezza di una riga di testo */
    background-color: #e0e0e0;
    border-radius: 4px;
    animation: pulse-bg 1.5s infinite ease-in-out;
}

.skeleton-line.full-width {
    width: 95%;
}

.skeleton-line.medium-width {
    width: 80%;
}

.skeleton-line.short-width {
    width: 50%;
}

.skeleton-subtitle {
    height: 2rem;
    width: 150px;
    margin: 0 auto 1rem; /* Per centrare il sottotitolo nello scheletro */
    background-color: #e0e0e0;
    border-radius: 6px;
    animation: pulse-bg 1.5s infinite ease-in-out;
}

.skeleton-table {
    width: 100%;
    padding: 1rem;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.skeleton-table-row {
    height: 2rem;
    width: 90%;
    background-color: #e0e0e0;
    border-radius: 4px;
    animation: pulse-bg 1.5s infinite ease-in-out;
}

.skeleton-teachers-column,
.skeleton-manager-column {
    flex: 0 1 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    width: 100%; /* Permette di occupare la larghezza per i card */
}

.skeleton-cards-container {
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
}

.skeleton-teacher-card {
  width: 150px; /* Larghezza approssimativa di una card insegnante */
  height: 220px; /* Altezza approssimativa di una card insegnante */
  background-color: #e0e0e0;
  border-radius: 16px;
  animation: pulse-bg 1.5s infinite ease-in-out;
}

/* Animazione di pulsazione per i placeholder */
@keyframes pulse-bg {
    0% {
        background-color: #e0e0e0;
    }
    50% {
        background-color: #f0f0f0;
    }
    100% {
        background-color: #e0e0e0;
    }
}

/* Media queries per lo scheletro per riflettere il layout responsivo */
@media (max-width: 768px) {
  .skeleton-image-placeholder {
    border-radius: 40px 40px 0 0;
  }

  .skeleton-description-text {
    border-radius: 0 0 40px 40px;
  }
}

</style>