<script setup>
  import ActivityCard from "~/components/ActivityCard.vue";
  import wallpaper from "assets/png/wallpaper.png";

  // API call to fetch all activities
  const { data: allActivities, pending } = await useLazyFetch("/api/activities");

  const backgroundStyle = {
    backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url(${wallpaper})`,
    backgroundSize: 'auto',
    backgroundPosition: 'top center',
    backgroundAttachment: 'fixed',
    backgroundRepeat: 'repeat',
  }

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
    <link rel="canonical" href="https://soulsanctuary-ten.vercel.app/activities">
  </Head>
  <!-- Added role="main" for screen readers and aria-labelledby for accessibility -->
  <div :style="backgroundStyle">
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
      <template v-if="pending">
        <!-- Skeleton loader cards -->
        <div v-for="i in 4" :key="`skeleton-${i}`" class="skeleton">
          <div class="skeleton-image"></div>
          <div class="skeleton-title"></div>
        </div>
      </template>
      <!-- Fixed placement of aria-label by moving it to a properly supported attribute -->
      <ActivityCard
        v-for="(activity, index) in allActivities"
        :key="activity.id"
        :id="activity.id"
        :name="activity.name"
        :imageUrl="activity.imageUrl"
        :provenance="'all'"
        :index="index"
        aria-label="`Activity: ${activity.name}`"
      />
      
      <!-- Added for screen readers when no activities are available -->
      <p v-if="!allActivities || allActivities.length === 0" aria-live="polite">
        No activities are currently available. Please check back soon.
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

.skeleton {
  background: #3D5144;
  border-radius: 40px;
  overflow: hidden;
  position: relative;
}

.skeleton::after {
  content: '';
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  transform: translateX(-100%);
  background: linear-gradient(90deg,
  rgba(255,255,255,0) 0%,
  rgba(255,255,255,0.2) 20%,
  rgba(255,255,255,0.5) 60%,
  rgba(255,255,255,0)
  );
  animation: shimmer 1.5s infinite;
}

@keyframes shimmer {
  100% {
    transform: translateX(100%);
  }
}

.skeleton-image {
  width: 100%;
  height: 80%;
  background: #BCC7C2;
}

.skeleton-title {
  width: 70%;
  height: 24px;
  margin: 12px auto;
  background: #DDECEA;
  border-radius: 4px;
}
</style>