<template>
  <Head>
    <Title>Soul Sanctuary - Homepage</Title>
  </Head>

  <main class="home_container">
    <!-- Hero section -->
    <section class="hero">

      <nuxt-img
          src="/assets/jpg/homepage_rid1.jpg"
          alt="Hero background"
          format="avif,webp,jpg"
          quality="80"
          sizes="(max-width: 480px) 400px, (max-width: 768px) 600px, 650px"
          placeholder
          densities="1x,2x,3x"
          fit="cover"
          width="auto"
          height="auto"
          decoding="async"
          fetchpriority="high"
          class="hero-bg"
      />

      <div class="hero_overlay">
        <h1 class="title" style="color: #3C3C3C">Awaken Your Energy</h1>
        <nuxt-img
            src="/assets/png/logoNoBackground.png"
            alt="Soul Sanctuary Logo"
            format="avif,webp,png"
            quality="80"
            width="150"
            height="100"
            class="hero_logo"
        />
        <p class="text" style="color: #3C3C3C">
          A space to reconnect with yourself.<br />
          Discover balance, clarity, and a deeper sense of well-being.
        </p>
        <NuxtLink to="/about" class="button">Learn more about Us</NuxtLink>
      </div>

    </section>

    <!-- Stats section -->
    <section class="stats">
      <div class="stat">
        <div class="circle"><p class="subtitle" style="color: #3C3C3C;">500+</p></div>
        <p class="subtitle" style="color: #3C3C3C;">Members annually</p>
      </div>
      <div class="stat">
        <div class="circle"><p class="subtitle" style="color: #3C3C3C;">90%</p></div>
        <p class="subtitle" style="color: #3C3C3C;">Retention rate</p>
      </div>
      <div class="stat">
        <div class="circle"><p class="subtitle" style="color: #3C3C3C;">4</p></div>
        <p class="subtitle" style="color: #3C3C3C;">Time award won</p>
      </div>
    </section>

    <!-- Image cards section -->
    <section class="cards_wrapper">
      <section class="cards">
        <div class="card">
          <nuxt-img
              src="/assets/jpg/homepage_rid2.jpg"
              alt="Background Contact Card"
              format="avif,webp,jpg"
              quality="80"
              fit="cover"
              fill
              class="card-bg"
          />
          <div class="card-content">
            <p class="text text_white">Have questions or need more info?</p>
            <NuxtLink to="/contact_us" class="button small">Contact Us</NuxtLink>
          </div>
        </div>

        <div class="card">
          <nuxt-img
              src="/assets/jpg/homepage_rid.jpg"
              alt="Background Highlights Card"
              format="avif,webp,jpg"
              quality="80"
              fit="cover"
              fill
              class="card-bg"
          />
          <div class="card-content">
            <p class="text text_white">Come discover our most-loved activities.</p>
            <NuxtLink to="/highlights" class="button small">Highlights</NuxtLink>
          </div>
        </div>

      </section>
    </section>

    <!-- Final sentence -->
    <section class="final">
      <p class="text" style="color: #3C3C3C">This is more than a studio.</p>
      <p class="subtitle" style="color: #3C3C3C">It’s a sanctuary.</p>
    </section>
  </main>
</template>

<style scoped>
.home_container {
  width: 100%;
  overflow-x: hidden;
}

.hero {
  position: relative;
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.hero-bg {
  position: absolute;
  inset: 0;
  object-fit: cover;
  width: 100%;
  height: 100%;
  z-index: 0;
}

.hero_overlay {
  position: relative;
  z-index: 1;
  text-align: center;
}


.hero_overlay {
  background-color: rgba(188, 199, 194, 0.7); /* BCC7C2 */
  padding: 2rem;
  border-radius: 80px;
  text-align: center;
  max-width: 700px;
  width: 80%;
}

.hero_logo {
  /*height: 100px;*/
  margin: 1rem auto;
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

.stats {
  background-color: #BCC7C2;
  display: flex;
  justify-content: space-around;
  text-align: center;
  padding: 3rem 1rem;
  flex-wrap: wrap;
}

.stat {
  margin: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.circle {
  background-color: #D9D9D9;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
}

.circle p {
  margin: 0;
  text-align: center;
}

.cards_wrapper {
  background-color: #F7F7F7;
  padding: 2rem 0;
}

.cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
  max-width: 1100px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.card {
  position: relative;
  overflow: hidden;
  aspect-ratio: 5 / 3; /* ~500x300 */
  border-radius: 20px;
  flex: 1 1 calc(50% - 1rem);
  max-width: 500px;
  min-width: 280px;
}

.card-bg {
  position: absolute;
  inset: 0;
  z-index: 0;
  object-fit: cover;
  width: 100%;
  height: 100%;
}

.card-content {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  height: 100%;
}


.card1 {
  /*background-image: url('assets/jpg/homepage2.jpg');*/
}

.card2 {
  /*background-image: url('assets/jpg/homepage3.jpg');*/
}

.text_white {
  color: white;
  margin-bottom: 0.5rem;
}

.final {
  background-color: #DDECEA;
  padding: 3rem 1rem;
  text-align: center;
}
</style>

