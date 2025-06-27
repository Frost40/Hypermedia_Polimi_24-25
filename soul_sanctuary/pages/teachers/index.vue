<script setup>
  import TeacherCard from "~/components/TeacherCard.vue";

  // API call to fetch all teachers
  const { data: allTeachers, pending } = await useLazyFetch('/api/teachers')


  // Define SEO meta data
  // This overrides global SEO with page-specific content for better search relevance
  useHead({
    meta: [
      // Page-specific description for better search results
      { name: 'description', content: 'Discover Soul Sanctuary\'s teachers and find out what they specialize into. Find the perfect mentor for your yoga.' },
      // Additional keywords specific to this page
      { name: 'keywords', content: 'teachers, CV , curriculum vitae, experts, yoga teacher, yoga expert, yoga mentor, experienced teacher' },
      // Open Graph tags for better social sharing specific to this page
      { property: 'og:title', content: 'Soul Sanctuary - Popular Wellness Teachers' },
      { property: 'og:description', content: 'Discover our teachers and find the perfect guide for your journey at Soul Sanctuary.' },
      // Twitter card tags for better sharing on Twitter
      { name: 'twitter:title', content: 'Soul Sanctuary - Popular Wellness Teachers' },
      { name: 'twitter:description', content: 'Discover our teachers and find the perfect guide for your journey at Soul Sanctuary.' },]
  })
</script>

<template>
  <Head>
    <Title>Soul Sanctuary - Teachers</Title>
    <!-- Ensure this page is indexed and links are followed -->
    <meta name="robots" content="index, follow">
    <!-- Specify canonical URL to prevent duplicate content issues -->
    <link rel="canonical" href="https://soulsanctuary-ten.vercel.app/teachers">
  </Head>
  <main class="teachers-page">
    <div class="page-header">
      <h1 class="page-title title">All Teachers</h1>
      <p class="page-description text">
        Meet our teachers — each brings a unique approach to guide you on your journey of growth and well-being.
      </p>
    </div>
    <div class="teachers-grid" aria-label="A grid where each card represents a teacher of the Soul Sanctuary">
      <!-- Show loading skeletons -->
      <TeacherCard
        v-if="pending"
        v-for="n in 6"
        :key="`skeleton-${n}`"
        :id="n"
        :name="''"
        :mainAreaOfExpertise="''"
        :imageUrl="''"
        :loading="true"
      />

      <!-- Show real teacher cards once loaded -->
      <TeacherCard
        v-else
        v-for="teacher in allTeachers"
        :key="teacher.id"
        :id="teacher.id"
        :name="teacher.fullname"
        :mainAreaOfExpertise="teacher.area"
        :imageUrl="teacher.photo"
        :loading="false"
        aria-label="`Teacher: ${teacher.fullname}`"
      />

      <!-- No teachers message -->
      <p v-if="!pending && (!allTeachers || allTeachers.length === 0)"
         class="no-results"
         aria-live="polite">
        No teachers are currently employed at the center. Please check back soon.
      </p>
    </div>

  </main>
</template>

<style scoped>

.teachers-page {
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

.teachers-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  padding: 2rem;
  max-width: 1080px;
  margin: 0 auto;
}

@media (max-width: 800px) {
  
  .no-results {
    grid-column: 1 / -1;
    text-align: center;
    padding: 2rem;
    color: #3D5144;
    font-style: italic;
  }
}

</style>