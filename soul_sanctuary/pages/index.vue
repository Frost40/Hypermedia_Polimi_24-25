<template>

  <Head>
    <Title>Soul Sanctuary - Homepage</Title>
  </Head>

  <main class="home_container">

    <!-- Hero section -->
    <section class="hero">
      <div class="hero_overlay">
        <h1 class="title" style="color: #3C3C3C">Awaken Your Energy</h1>
        <img src="/assets/png/logoNoBackground.png" alt="Soul Sanctuary Logo" class="hero_logo" />
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
        <div class="card card1">
          <p class="text text_white">Have questions or need more info?</p>
          <NuxtLink to="/contact_us" class="button small">Contact Us</NuxtLink>
        </div>
        <div class="card card2">
          <p class="text text_white">Come discover our most-loved activities.</p>
          <NuxtLink to="/highlights" class="button small">Highlights</NuxtLink>
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
  background-image: url('assets/jpg/homepage1.jpg');
  background-size: cover;
  background-position: center;
  height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
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
  height: 100px;
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
  gap: 3rem;
  padding: 1rem;
}

.card {
  position: relative;
  width: 300px;
  height: 200px;
  border-radius: 20px;
  overflow: hidden;
  padding: 1.5rem;
  background-size: cover;
  background-position: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}

.card1 {
  background-image: url('assets/jpg/homepage2.jpg');
}

.card2 {
  background-image: url('assets/jpg/homepage3.jpg');
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