<template>

  <Head>
    <Title>Soul Sanctuary - About Us</Title>
  </Head>

  <main class="about_container">

    <!-- Hero section -->
    <section class="hero">
      <div class="hero_overlay">
        <p class="text" style="color: #3C3C3C">
            A <span class="other-font">peaceful and welcoming space</span> where mind, body, and breath come together.  <br /><br />
            Designed <span class="other-font">to inspire calm, connection, and personal growth</span> through the practice of yoga.
        </p>
      </div>
    </section>

    <div class="about-section">
      <div class="about-image">
        <img src="/assets/jpg/about_us1.jpg" alt="What We Believe Image" />
      </div>
      <div class="about-text">
        <h1 class="subtitle">What We Believe</h1>
        <p class="text">
          We believe yoga is more than a physical practice—it’s a path to personal transformation and collective well-being. <br />
          At the core of what we do is the intention to create a welcoming, inclusive space where everyone can feel seen, supported, and empowered. <br />
          Whether you’re stepping onto the mat for the first time or deepening an ongoing practice, we invite you to slow down, reconnect with yourself, 
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
      <div class="about-image">
        <img src="/assets/jpg/about_us2.jpg" alt=" Our History Image" />
      </div>
    </div>

    <div class="about-section">
      <div class="about-image">
        <img src="/assets/jpg/about_us3.jpg" alt="Visit Us Image" />
      </div>
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
        <h1 class="subtitle">Our Activites</h1>
        <p class="text">
          At Soul Sanctuary, we offer a variety of classes and workshops designed 
          to support your well-being—whether you're a beginner or an experienced practitioner. 
          From dynamic yoga flows to calming meditation sessions, there's something here for everyone.
        </p>
        <NuxtLink to="/activities" class="button">Activities</NuxtLink>
      </div>
      /* TODO: replace next div with slider */
      <div class="about-image">
        <img src="/assets/jpg/about_us2.jpg" alt=" Our History Image" />
      </div>
    </div>

  </main>
</template>

<style scoped>
.home_container {
  width: 100%;
  overflow-x: hidden;
}

.hero {
  background-image: url('assets/jpg/homepage2.jpg');
  background-size: cover;
  background-position: center;
  height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.hero_overlay {
  background-color: rgba(188, 199, 194, 0.7); /* BCC7C2 */
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
  flex-wrap: wrap;
}

.about-image img {
  max-width: 290px;
  max-height: 408px;
  width: 100%;
  border-radius: 40px;
  object-fit: cover;
}

.about-text {
  max-width: 700px;
  color: #3C3C3C;
}

.about-text-2 {
  max-width: 350px;
  color: #3C3C3C;
}


@media (max-width: 768px) {
  .about-section {
    flex-direction: column;
    text-align: center;
  }

  .about-text {
    max-width: 100%;
  }
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

</style>