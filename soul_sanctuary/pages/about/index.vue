<script setup>
  import ActivitiesSlider from '@/components/ActivitySlideShow.vue'
 
  // API call to fetch all activities for the slideshow
  const { data: allActivities } = await useFetch("/api/activities");

    // Define SEO meta data
    // This overrides global SEO with page-specific content for better search relevance
    useHead({
      meta: [
        // Page-specific description for better search results
        { name: 'description', content: 'Discover Soul Sanctuary\'s history and mission. Find out about where the center is located and how contact it.' },
        // Additional keywords specific to this page
        { name: 'keywords', content: 'yoga center, yoga center history , yoga center past, location, phone number, email, map, wellness' },
        // Open Graph tags for better social sharing specific to this page
        { property: 'og:title', content: 'Soul Sanctuary - Popular Wellness About Us page' },
        { property: 'og:description', content: 'Discover our center and find out why Soul Sanctuary is the perfect fit for you.' },
        // Twitter card tags for better sharing on Twitter
        { name: 'twitter:title', content: 'Soul Sanctuary - Popular Wellness About Us page' },
        { name: 'twitter:description', content: 'Discover our center and find out why Soul Sanctuary is the perfect fit for you.' },]
    })
</script>

<template>

  <Head>
    <Title>Soul Sanctuary - About Us</Title>
     <!-- Ensure this page is indexed and links are followed -->
    <meta name="robots" content="index, follow">
    <!-- Specify canonical URL to prevent duplicate content issues -->
    <link rel="canonical" href="https://soulsanctuary-ten.vercel.app/about">
  </Head>

  <main class="about_container">

    <section class="initial-section">
      <NuxtImg
        src="/assets/jpg/homepage2.jpg"
        alt="Yoga background"
        format="webp,avif,jpg"
        quality="80"
        loading="lazy"
        placeholder
        densities="1x,2x"
        fit="cover"
        decoding="async"
        fetchpriority="low"
        class="background-image"
      />
      <div class="initial-section-overlay">
        <p class="text" style="color: #3C3C3C">
          A <span class="other-font">peaceful and welcoming space</span> where mind, body, and breath come together.  <br /><br />
          Designed <span class="other-font">to inspire calm, connection, and personal growth</span> through the practice of yoga.
        </p>
      </div>
    </section>


    <div class="about-section reverse-for-responsive">

      <NuxtImg
        src="/assets/jpg/about_us1.jpg"
        alt=""
        format="avif,webp,jpg"
        quality="80"
        loading="eager"
        placeholder
        densities="1x,2x,3x"
        fit="cover"
        decoding="async"
        fetchpriority="high"
        class="about-image"
      />

      <div class="about-text">
        <h1 class="subtitle">What We Believe</h1>
        <p class="text">
          We believe yoga is more than a physical practice—it's a path to personal transformation and collective well-being. <br />
          At the core of what we do is the intention to create a welcoming, inclusive space where everyone can feel seen, supported, and empowered. <br />
          Whether you're stepping onto the mat for the first time or deepening an ongoing practice, we invite you to slow down, reconnect with yourself, 
          and find balance through mindful movement, breath, and stillness.<br />
          Our mission is to nurture growth from the inside out, one breath at a time.
        </p>
      </div>
    </div>

    <div class="about-section">
      <div class="about-text">
        <h1 class="subtitle">Our History</h1>
        <p class="text">
          What began as a small group of passionate yoga practitioners has blossomed into a vibrant 
          and welcoming sanctuary for well-being. <br />
          Founded with the intention of creating a peaceful space for growth and connection, 
          our center has steadily evolved over the years. <br />
          We've welcomed hundreds of students and teachers, hosted countless classes, workshops, and retreats, 
          and built a community grounded in mindfulness and compassion. <br />
          From our very first session to today, we continue to honor the tradition of yoga while embracing the needs of modern life.
        </p>
      </div>
      <NuxtImg
        src="/assets/jpg/about_us2.jpg"
        alt=""
        format="avif,webp,jpg"
        quality="80"
        loading="lazy"
        placeholder
        densities="1x,2x,3x"
        fit="cover"
        decoding="async"
        fetchpriority="low"
        class="about-image"
      />

    </div>

    <div class="about-section reverse-for-responsive">
      <NuxtImg
        src="/assets/jpg/about_us3.jpg"
        alt=""
        format="avif,webp,jpg"
        quality="80"
        loading="lazy"
        placeholder
        densities="1x,2x,3x"
        fit="cover"
        decoding="async"
        fetchpriority="low"
        class="about-image"
      />

      <div class="about-text">
        <h1 class="subtitle">Visit Us</h1>
        <p class="text">
          You can find us at Via delle Rose, 3, 20147 Milan (MI), in a quiet corner of the city where calm and clarity meet. 
          Our doors are open Monday to Friday from 9:00 AM to 6:00 PM, and on Saturdays from 9:00 AM to 1:00 PM — we look forward to welcoming you.
        </p>
        <NuxtLink to="/contact_us" class="button">Contact us</NuxtLink>
      </div>
    </div>

    <div class="about-section">
      <div class="about-text-2">
        <h1 class="subtitle">Our Activities</h1>
        <p class="text">
          At Soul Sanctuary, we offer a variety of classes and workshops designed 
          to support your well-being—whether you're a beginner or an experienced practitioner. 
          From dynamic yoga flows to calming meditation sessions, there's something here for everyone.
        </p>
        <NuxtLink to="/activities" class="button">Activities</NuxtLink>
      </div>
      <div class="slider-wrapper" aria-label="A slideshow of our activities">
        <ActivitiesSlider :activities="allActivities" />
      </div>
    </div>

  </main>
</template>

<style scoped>

.initial-section {
  position: relative;
  height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.background-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
}

.initial-section-overlay {
  position: relative;
  z-index: 2;
  background-color: #BCC7C2;
  padding: 2rem;
  border-radius: 40px;
  text-align: center;
  max-width: 700px;
  width: 80%;
}


.other-font {
  font-family: 'Oregano';
  font-size: 21px;
}

.about-section {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 74px;
  padding: 2rem;
  flex-wrap: nowrap;
}

.about-image{
  max-width: 290px;
  max-height: 408px;
  width: 100%;
  border-radius: 40px;
  object-fit: cover;
  min-width: 260px;
  min-height: 320px;
}

.about-text {
  max-width: 700px;
  color: #3C3C3C;
}

.about-text-2 {
  flex: 1 1 0%;
  min-width: 0;
  max-width: 350px;
  color: #3C3C3C;
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
}

.button:hover {
  font-weight: bold;
}

.button.small {
  width: fit-content;
  align-self: center;
}

.slider-wrapper {
  flex: 1 1 0%;
  min-width: 0;
  max-width: 670px;
}

@media (max-width: 768px) {
  .about-section {
    flex-direction: column;
    flex-wrap: wrap;
    text-align: center;
  }

  .reverse-for-responsive {
    flex-direction: column-reverse;
  }

  .about-text, .about-text-2 {
    max-width: 100%;
  }

  .about-image {
  max-width: 260px;
  max-height: 320px;
  width: 100%;
  border-radius: 40px;
  object-fit: cover;

}
}

</style>