<script setup>
  import TeacherCard from "~/components/TeacherCard.vue";

  // API call to fetch all teachers
  const { data: allTeachers } = await useFetch("/api/teachers");

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
      <TeacherCard
        v-for="teacher in allTeachers"
        :key="teacher.id"
        :id="teacher.id"
        :name="teacher.fullname"
        :mainAreaOfExpertise="teacher.area"
        :imageUrl="teacher.photo"
        aria-label="`Teacher: ${teacher.fullname}`"
      />
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
  text-align: left;
}

.teachers-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  padding: 2rem;
}

</style>