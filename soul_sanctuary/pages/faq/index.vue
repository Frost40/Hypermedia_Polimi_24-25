<script setup>
  import { ref } from 'vue';
  import FaqItem from '~/components/FaqItem.vue';

  // Example FAQ data - you'll replace this with your actual questions and answers
  const faqItems = ref([
    { question: 'What classes do you offer?', answer: 'We offer a variety of yoga, meditation, and wellness classes...' },
    { question: 'How much do classes cost?', answer: 'You can find our pricing details on the Pricing page...' },
    { question: 'What is your cancellation policy?', answer: 'Please refer to our Policies page for detailed cancellation information...' },
    { question: 'Do I need to bring my own mat?', answer: 'While we have mats available, we recommend bringing your own for comfort and hygiene...' },
    { question: 'How do I book a class?', answer: 'You can book classes directly through our website calendar...' },
    { question: 'Are classes suitable for beginners?', answer: 'Yes, we have classes suitable for all levels, including complete beginners...' },
    { question: 'What should I wear?', answer: 'Wear comfortable clothing that allows for easy movement...' },
  ]);

  // You can add variables here to store form data if needed for handling submission
  // const name = ref('');
  // const email = ref('');
  // const selectedCourse = ref('');
  // const question = ref('');

  // Function to handle form submission (currently just an alert)
  // const handleSubmit = () => {
  //   alert('Form submitted! (Handling submission requires backend logic)');
  //   // Here you would typically send the form data to your backend
  // };

</script>

<template>
  <Head>
    <Title>Soul Sanctuary - FAQ</Title>
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="https://yoursite.example.com/faq">
  </Head>
  <main class="faq-page" role="main" aria-labelledby="page-title">
    <div class="page-header" aria-labelledby="page-title">
      <h1 id="page-title" class="page-title title_clear">FAQ</h1>
      <p class="page-description text_clear">
        Find answers to common questions about our classes, pricing, and policies. If you have a specific question about a course, please use the form below.
      </p>
    </div>
    <div class="faq-body">
      <div class="faq-section">
        <h2 class="section-title subtitle">Frequently Asked Questions</h2>
        <div class="faq-list">
          <FaqItem
            v-for="(item, index) in faqItems"
            :key="index"
            :question="item.question"
            :answer="item.answer"
          />
        </div>
      </div>
      <div class="faq-form">
        <h2 class="form-title subtitle">Ask About a Course</h2>
        <p class="form-description text">
          Have a specific question about one of our courses? We're here to help!
        </p>
        <form @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="name">Name</label>
            <input type="text" id="name" name="name" placeholder="Your name" required>
          </div>
          <div class="form-group">
            <label for="email">Email</label>
            <input type="email" id="email" name="email" placeholder="Your email@example.com" required>
          </div>
          <div class="form-group">
            <label for="course">Course Field</label>
            <select id="course" name="course" required>
              <option value="">Select a course</option>
              <option value="hata yoga">Hata Yoga</option>
              <option value="renatal yoga">Prenatal Yoga</option>
              <option value="vinyasa yoga">Vinyasa Yoga</option>
              <option value="awaken your chakras">Awaken Your Chakras</option>
              <option value="guided meditations">Guided Meditations for Stress, Anxiety & Depression</option>
              <option value="walking weditation in nature">Walking Meditation in Nature</option>
              <option value="yoga mindful eating">Yoga & Mindful Eating</option>
              <option value="yoga in the ark">Yoga & Mindful Eating</option>
            </select>
          </div>
          <div class="form-group">
            <label for="question">Your Question</label>
            <textarea id="question" name="question" placeholder="Type your question here ..." rows="4" required></textarea>
          </div>
          <button type="submit" class="submit-button">Submit</button>
        </form>
      </div>
    </div>
  </main>
</template>

<style scoped>
.faq-page {
  max-width: 1440px;
  padding: 1rem 2rem;
  margin: 0 auto;
}

.page-header {
  text-align: center;
  margin-bottom: 2rem; /* Adjusted margin */
  border-radius: 50px;
  background-color: #3D5144; /* Dark green background */
  padding: 2.5rem 18rem; /* Adjusted padding to be less wide */
}

.page-title {
    font-size: 2.5rem; /* Make title larger */
    margin-bottom: 0.5rem;
}

.page-description {
    font-size: 1.1rem;
}


/* New styles for the FAQ body and sections */
.faq-body {
  display: flex; /* Use flexbox for side-by-side layout */
  gap: 2rem; /* Space between the two columns */
}

.faq-section {
  flex-basis: 60%; /* FAQ section takes up 60% of the space */
  background-color: #BCC7C2;
  padding: 2rem;
  border-radius: 15px; /* Rounded corners */
  box-shadow: 0 2px 5px rgba(0,0,0,0.1); /* Optional: Add a subtle shadow */
}

.faq-form {
  flex-basis: 40%; /* Form section takes up 40% of the space */
  background-color: #BCC7C2;
  padding: 2rem;
  border-radius: 15px; /* Rounded corners */
  box-shadow: 0 2px 5px rgba(0,0,0,0.1); /* Optional: Add a subtle shadow */
}

.section-title {
  margin-bottom: 1.5rem;
}

/* Styling for the form elements */
.form-title {
  text-align: center;
  margin-bottom: 1rem;
}

.form-description {
  text-align: center;
  margin-bottom: 1.5rem;
  color: #3D5144;
}

.form-group {
  margin-bottom: 1rem;
}

.form-group label {
  display: block; /* Label on its own line */
  margin-bottom: 0.5rem;
  font-weight: bold;
  color: #3D5144; /* Dark green label color */
}

.form-group input[type="text"],
.form-group input[type="email"],
.form-group select,
.form-group textarea {
  width: 100%; /* Make inputs fill the container */
  padding: 0.8rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 1rem;
  box-sizing: border-box; /* Include padding in the element's total width and height */
}

.form-group textarea {
    resize: vertical; /* Allow vertical resizing */
}

.submit-button {
  display: block; /* Button on its own line */
  width: 100%; /* Make button fill the container */
  padding: 1rem;
  background-color: #3D5144; /* Dark green button */
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 1.2rem;
  cursor: pointer; /* Indicate it's clickable */
  transition: background-color 0.3s ease; /* Smooth hover effect */
}

.submit-button:hover {
  background-color: #2c3e33; /* Slightly darker green on hover */
}

/* You might need to add styles for the FaqItem component itself if it doesn't already match the image */
/* For example, styles for the question line, the dropdown arrow, and the answer area when expanded */
</style>