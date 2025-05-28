<script setup>
import ActivityCard from "~/components/ActivityCard.vue";
import wallpaper from "assets/png/wallpaper.png";

// API call to fetch all highlights
const { data: highlights } = await useFetch("/api/highlights");

const backgroundStyle = {
  backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url(${wallpaper})`,
  backgroundSize: 'auto',
  backgroundPosition: 'top center',
  backgroundAttachment: 'fixed',
  backgroundRepeat: 'repeat',
}

// Define SEO meta data
// This overrides global SEO with page-specific content for better search relevance
useHead({
  meta: [
    // Page-specific description for better search results
    { name: 'description', content: 'Explore Soul Sanctuary\'s most popular wellness activities and programs. Find the perfect activities to enhance your wellbeing journey.' },
    // Additional keywords specific to this page
    { name: 'keywords', content: 'wellness activities, soul sanctuary highlights, popular wellness programs, mindfulness activities' },
    // Open Graph tags for better social sharing specific to this page
    { property: 'og:title', content: 'Soul Sanctuary - Popular Wellness Highlights' },
    { property: 'og:description', content: 'Discover our most popular wellness activities and find the perfect fit for your journey at Soul Sanctuary.' },
    // Twitter card tags for better sharing on Twitter
    { name: 'twitter:title', content: 'Soul Sanctuary - Popular Wellness Highlights' },
    { name: 'twitter:description', content: 'Discover our most popular wellness activities and find the perfect fit for your journey at Soul Sanctuary.' },]
})
</script>

<template>
  <Head>
    <Title>Soul Sanctuary - Highlights</Title>
    <!-- Ensure this page is indexed and links are followed -->
    <meta name="robots" content="index, follow">
    <!-- Specify canonical URL to prevent duplicate content issues -->
    <link rel="canonical" href="https://soulsanctuary-ten.vercel.app/highlights">
  </Head>
  
  <!-- Added role="main" for screen readers to identify main content -->
  <!-- Added aria-labelledby to associate this section with its heading -->
  <div :style="backgroundStyle">
  <main class="activities-page" role="main" aria-labelledby="highlights-title">
    <div class="page-header">
      <!-- Added ID to connect with aria-labelledby -->
      <h1 id="highlights-title" class="page-title title">Highlights</h1>
      <p class="page-description text">
        Discover our most popular activities below — explore what we offer and find the perfect fit for your journey.
      </p>
    </div>
    
    <!-- Changed div to semantic section element for better document structure -->
    <!-- Added aria-label to describe this section for screen readers -->
    <section
      class="activities-grid"
      aria-label="Featured activities"
    >
      <ActivityCard
          v-for="(activity, index) in highlights"
          :key="activity.id"
          :id="activity.id"
          :name="activity.name"
          :imageUrl="activity.imageUrl"
          :provenance="'fromHighlights'"
          :index="index"
          aria-label="`Activity: ${activity.name}`"
      />

      <!-- Added accessible message for when no activities are available -->
      <p v-if="!highlights || highlights.length === 0" class="no-results">
        No highlight activities are currently available. Please check back soon!
      </p>
    </section>
  </main>
  </div>
</template>

<style scoped>
.activities-page {
  max-width: 1440px;
  padding-top: 2.5rem;
  margin: 0 auto;
}

.page-header {
  text-align: center;
  margin-bottom: 1rem;
}

.page-title {
  margin: 0 0 1rem 0;
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

/* 2 columns layout for screens between 1440 and 750 */
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

/* New style for empty state message */
.no-results {
  grid-column: 1 / -1;
  text-align: center;
  padding: 2rem;
  color: #3D5144;
  font-style: italic;
}
</style>