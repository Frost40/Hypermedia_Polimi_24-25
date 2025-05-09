<script setup>
  import ActivityCard from "~/components/ActivityCard.vue";

  // API call to fetch all activities
  const { data: allActivities } = await useFetch("/api/activities");

  // Define page-specific meta tags for improved SEO
  useHead({
    meta: [
      // Page-specific description for better SEO
      { name: 'description', content: 'Explore our yoga classes, meditation sessions, and wellness activities at Soul Sanctuary. Find activities suited for all experience levels.' },
      // Additional keywords specific to this page
      { name: 'keywords', content: 'yoga classes, meditation sessions, wellness activities, spiritual classes, mindfulness workshops, group activities, Soul Sanctuary activities' },
      
      // Open Graph specific to this page for better social sharing
      { property: 'og:title', content: 'Activities & Classes - Soul Sanctuary' },
      { property: 'og:description', content: 'Discover yoga, meditation, and wellness activities at Soul Sanctuary. Classes for all experience levels.' },
      
      // Twitter Card specific to this page
      { name: 'twitter:title', content: 'Activities & Classes - Soul Sanctuary' },
      { name: 'twitter:description', content: 'Discover yoga, meditation, and wellness activities at Soul Sanctuary. Classes for all experience levels.' },
    ]
  })
</script>

<template>
  <Head>
    <Title>Soul Sanctuary - All Activities</Title>
    <!-- Ensure this page is indexed and links are followed -->
    <meta name="robots" content="index, follow">
    <!-- Specify canonical URL to prevent duplicate content issues -->
    <link rel="canonical" href="https://soulsanctuary.example.com/activities">
  </Head>
  <!-- Added role="main" for screen readers and aria-labelledby for accessibility -->
  <main class="activities-page" role="main" aria-labelledby="page-title">
    <!-- Added section with aria-labelledby for proper document structure -->
    <section class="page-header" aria-labelledby="page-title">
      <!-- Added id to connect with aria-labelledby -->
      <h1 id="page-title" class="page-title title">All Activities</h1>
      <p class="page-description text">
        Discover our most popular activities below — explore what we offer and find the perfect fit for your journey.
      </p>
    </section>
    
    <!-- Added aria-label to describe this section to screen readers -->
    <section class="activities-grid" aria-label="Activities list">
      <!-- Fixed placement of aria-label by moving it to a properly supported attribute -->
      <ActivityCard
        v-for="activity in allActivities"
        :key="activity.id"
        :id="activity.id"
        :name="activity.name"
        :imageUrl="activity.imageUrl"
        aria-label="`Activity: ${activity.name}`"
      />
      
      <!-- Added for screen readers when no activities are available -->
      <p v-if="!allActivities || allActivities.length === 0" aria-live="polite">
        No activities are currently available. Please check back soon.
      </p>
    </section>
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

/* Added to ensure text remains visible during webfont load */
.activities-page {
  font-display: swap;
}
</style>