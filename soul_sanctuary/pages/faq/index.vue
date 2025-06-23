<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue';
import FaqItem from '~/components/FaqItem.vue';
import arrowDownGreen from 'assets/svg/arrow_down_green.svg'
import arrowUpGreen from 'assets/svg/arrow_up_green.svg'


// Example FAQ data - you'll replace this with your actual questions and answers
const faqItems = ref([
  { question: 'I\'ve never done yoga before. Can I join your classes?', answer: 'Absolutely yes! Many of our classes, such as Hatha Yoga, are perfect for beginners. We teach the basics clearly and safely, allowing you to approach yoga with confidence and find your own rhythm. We are here to guide you step by step on your journey!' },
  { question: 'What should I wear and what should I bring to class?', answer: 'We recommend wearing comfortable clothing that allows you to move freely. Regarding equipment, it\'s usually enough to bring a yoga mat. If other specific materials are needed for a class (like cushions or blocks), we will indicate it in the course description or let you know in advance. Also, bring a water bottle to stay hydrated!' },
  { question: 'What are the benefits of regular yoga and meditation practice?', answer: 'Consistent practice of yoga and meditation offers numerous benefits, both physical and mental. You can expect improved flexibility, strength, and balance, as well as reduced stress and anxiety. Our Guided Meditations for Stress, Anxiety & Depression and Yoga & Mindful Eating sessions are specifically designed to help you find greater inner balance and awareness in your daily life.' },
  { question: 'How can I choose the right type of yoga for me?', answer: 'It depends on your goals and energy levels! Hatha Yoga is ideal for starting out and building a strong foundation. Vinyasa Yoga is more dynamic and fluid. If you are expecting, Prenatal Yoga is specifically designed for you. If you have doubts, feel free to contact us! We can recommend the best course based on your needs or suggest trying different classes to find the one you love most.' },
  { question: 'Do you participate in outdoor activities or in specific locations?', answer: 'Yes! In addition to traditional classes, we offer unique experiences in contact with nature, such as Walking Meditation in Nature and Yoga in the Park. These activities are a great opportunity to combine the benefits of the practice with the regenerating energy of the outdoor environment.' },
  { question: 'Do you offer specific classes or courses, such as those on Chakras or mindful eating?', answer: 'Absolutely yes! We have dedicated courses on specific topics for those who wish to delve deeper. "Awaken Your Chakras" is designed to harmonize energy centers, while "Yoga & Mindful Eating" guides you to develop a more conscious and peaceful relationship with food.' },
  { question: 'How long do classes usually last?', answer: 'The duration of classes may vary slightly depending on the type of activity, but generally, a class lasts between 60 and 90 minutes. You will find the exact duration indicated in the description of each individual course or event on our website.' },
]);

const AlertPopup = defineAsyncComponent(() => import('~/components/AlertPopup.vue'));

// All refs and reactive variables
const name = ref('');
const email = ref('');
const course = ref('');
const question = ref('');
const isSubmitting = ref(false);

const showPopup = ref(false);
const popupType = ref('success');
const popupMessage = ref('');
const popupErrors = ref([]);

const dropdownOpen = ref(false);
const dropdownRef = ref(null);

// List of courses for the dropdown
const courses = [
  { value: 'hata yoga', label: 'Hata Yoga' },
  { value: 'prenatal yoga', label: 'Prenatal Yoga' },
  { value: 'vinyasa yoga', label: 'Vinyasa Yoga' },
  { value: 'awaken your chakras', label: 'Awaken Your Chakras' },
  { value: 'guided meditations', label: 'Guided Meditations for Stress, Anxiety & Depression' },
  { value: 'walking meditation', label: 'Walking Meditation in Nature' },
  { value: 'yoga mindful eating', label: 'Yoga & Mindful Eating' },
  { value: 'yoga in the dark', label: 'Yoga in the Dark' }
];

// Set of functions for the entire page
const closePopup = () => {
  showPopup.value = false;
};

const handleSubmit = async () => {
  isSubmitting.value = true;

  try {
    const response = await $fetch('/api/faq/form', {
      method: 'POST',
      body: {
        name: name.value,
        email: email.value,
        course: course.value,
        question: question.value
      }
    });

    if (response.status === 'success') {
      popupType.value = 'success';
      popupMessage.value = 'Your question has been submitted successfully! We will get back to you soon.';
      popupErrors.value = [];
      showPopup.value = true;

      name.value = '';
      email.value = '';
      course.value = '';
      question.value = '';
    } else {
      popupType.value = 'error';
      popupMessage.value = response.message || 'An error occurred while submitting the form';
      popupErrors.value = response.errors || [];
      showPopup.value = true;
    }
  } catch (error) {
    console.error('Error submitting form:', error);
    popupType.value = 'error';
    popupMessage.value = 'A connection error occurred. Please try again later.';
    popupErrors.value = [];
    showPopup.value = true;
  } finally {
    isSubmitting.value = false;
  }
};

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
};

const handleClickOutside = (event) => {
  if (dropdownOpen.value && dropdownRef.value && !dropdownRef.value.contains(event.target)) {
    dropdownOpen.value = false;
  }
};

const handleResize = () => {
  if (dropdownOpen.value) {
    dropdownOpen.value = false;
  }
};

const selectCourse = (option) => {
  course.value = option.value;
  dropdownOpen.value = false;
};

// Close dropdown on outside click and resize
onMounted(() => {
  document.addEventListener('click', handleClickOutside);
  window.addEventListener('resize', handleResize);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
  window.removeEventListener('resize', handleResize);
});

// Computed properties
const dropdownPositionStyle = computed(() => {
  if (!dropdownOpen.value || !dropdownRef.value) return {};
  const rect = dropdownRef.value.getBoundingClientRect();
  return {
    position: 'absolute',
    top: rect.bottom + window.scrollY + 'px',
    left: rect.left + window.scrollX + 'px',
    width: rect.width + 'px',
    zIndex: 1000
  };
});

const dropdownArrow = computed(() => {
  return dropdownOpen.value ? arrowUpGreen : arrowDownGreen;
})

// Create structured data for FAQ
const structuredData = computed(() => {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': faqItems.value.map(item => ({
      '@type': 'Question',
      'name': item.question,
      'acceptedAnswer': {
        '@type': 'Answer',
        'text': item.answer
      }
    }))
  };
});

// Define page-specific meta tags for improved SEO
useHead({
  meta: [
    { name: 'description', content: 'Find answers to common questions about Soul Sanctuary\'s yoga and meditation classes, pricing, policies, and more. Contact us for specific inquiries.' },
    { name: 'keywords', content: 'yoga FAQ, meditation classes questions, Soul Sanctuary help, yoga pricing, yoga beginners, yoga mats, book yoga class' },
    { name: 'robots', content: 'index, follow, max-snippet:-1, max-image-preview:large' },

    // Open Graph
    { property: 'og:title', content: 'Soul Sanctuary - FAQ | Yoga & Wellness Information' },
    { property: 'og:description', content: 'Get answers to common questions about our yoga classes, meditation sessions, pricing and policies at Soul Sanctuary.' },

    // Twitter
    { name: 'twitter:title', content: 'Soul Sanctuary - FAQ | Yoga & Wellness Information' },
    { name: 'twitter:description', content: 'Get answers to common questions about our yoga classes, meditation sessions, pricing and policies at Soul Sanctuary.' },
  ],
  // Additional structured data for FAQ
  script: [
    { type: 'application/ld+json', children: JSON.stringify(structuredData.value) }
  ]
})
</script>

<template>
  <Head>
    <Title>Soul Sanctuary - FAQ</Title>
    <!-- Ensure this page is indexed and links are followed -->
    <meta name="robots" content="index, follow">
    <!-- Specify canonical URL to prevent duplicate content issues -->
    <link rel="canonical" href="https://soulsanctuary-ten.vercel.app/faq">
  </Head>

  <!-- Alert Popup Component -->
  <AlertPopup
      :type="popupType"
      :message="popupMessage"
      :errors="popupErrors"
      :show="showPopup"
      :aria-live="'assertive'"
      @close="closePopup"
  />
  <main class="faq-page" role="main" aria-labelledby="page-title">
    <div class="page-header" aria-labelledby="page-title" fetchpriority="high" v-once>
      <h1 id="page-title" class="page-title title_clear">FAQ</h1>
      <p class="page-description text_clear">
        Find answers to common questions about our yoga classes, pricing, and policies. If you have a specific question about a course, please use the form below.
      </p>
    </div>
    <div class="faq-body">
      <section class="faq-section" aria-labelledby="faq-section-title">
        <h2 id="faq-section-title" class="section-title subtitle">Frequently Asked Questions</h2>
        <div class="faq-list" role="list">
          <FaqItem
              v-for="(item, index) in faqItems"
              :key="index"
              :question="item.question"
              :answer="item.answer"
              role="listitem"
          />
        </div>
      </section>
      <section class="faq-form" aria-labelledby="form-title">
        <h2 id="form-title" class="form-title subtitle">Ask About a Course</h2>
        <p class="form-description text">
          Have a specific question about one of our courses? We're here to help!
        </p>
        <form @submit.prevent="handleSubmit" aria-label="Course question form">
          <div class="form-group">
            <label for="name" class="text">Name</label>
            <input type="text" id="name" v-model="name" placeholder="Your name" required
                   aria-required="true" aria-describedby="name-desc">
            <span id="name-desc" class="sr-only">Please enter your full name</span>
          </div>
          <div class="form-group">
            <label for="email" class="text">Email</label>
            <input type="email" id="email" v-model="email" placeholder="Your email@example.com" required
                   aria-required="true" aria-describedby="email-desc">
            <span id="email-desc" class="sr-only">Enter a valid email address to receive our response</span>
          </div>
          <div class="form-group">
            <label for="course-input" id="course-label" class="text">Course Field</label>
            <div ref="dropdownRef" class="dropdown-container" :class="{ open: dropdownOpen }"
                 @click="toggleDropdown"
                 role="combobox"
                 :aria-expanded="dropdownOpen"
                 aria-haspopup="listbox"
                 aria-controls="course-options">

              <span class="selected-value text">
                {{ courses.find((opt) => opt.value === course) ? courses.find((opt) => opt.value === course).label : 'Select a course' }}
              </span>
              <span class="dropdown-icon">
                <img :src="dropdownArrow" alt="Dropdown Arrow">
              </span>
            </div>
            <Teleport to="body">
              <div
                  v-if="dropdownOpen"
                  :style="dropdownPositionStyle"
                  class="custom-dropdown"
                  role="listbox"
                  aria-labelledby="course-label"
              >
                <div
                    v-for="(option, index) in courses"
                    :key="index"
                    class="dropdown-option"
                    :class="{ selected: option.value === course }"
                    @click.stop="selectCourse(option)"
                    role="option"
                    :aria-selected="option.value === course"
                    :id="`course-option-${index}`"
                >
                  {{ option.label }}
                </div>
              </div>
            </Teleport>
          </div>
          <div class="form-group">
            <label for="question" class="text">Your Question</label>
            <textarea id="question" v-model="question" placeholder="Type your question here ..."
                      rows="4" required aria-required="true"></textarea>
          </div>
          <button type="submit" class="submit-button" :disabled="isSubmitting"
                  aria-busy="isSubmitting">
            {{ isSubmitting ? 'Submitting...' : 'Submit' }}
          </button>
        </form>
      </section>
    </div>
  </main>
</template>

<style scoped>
.faq-page {
  max-width: 1440px;
  padding: 1rem 1.5rem;
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

.faq-body {
  display: flex;
  gap: 1.5rem;
  align-items: stretch;
  position: relative;
}

.faq-section {
  flex: 1;
  flex-basis: 60%; /* FAQ section takes up 60% of the space */
  background-color: #BCC7C2;
  padding: 2rem;
  border-radius: 15px; /* Rounded corners */
  box-shadow: 0 2px 5px rgba(0,0,0,0.1); /* Optional: Add a subtle shadow */
}

.faq-form {
  position: sticky;
  top: 2rem; /* Stick from the top, instead of 50% center trick */
  align-self: flex-start;
  flex-basis: 40%;
  background-color: #BCC7C2;
  padding: 2rem;
  border-radius: 15px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  height: fit-content;
  max-height: calc(100vh - 4rem);
  overflow-y: auto;
  margin-bottom: auto; /* Ensures it doesn't stretch the container */
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
  border-radius: 10px;
  font-size: 1rem;
  box-sizing: border-box; /* Include padding in the element's total width and height */
  background-color: #F7F7F7;
}

.form-group textarea {
  resize: vertical; /* Allow vertical resizing */
}

/* Personalized scrollbar for WebKit */
.form-group textarea::-webkit-scrollbar {
  width: 8px;
}

.form-group textarea::-webkit-scrollbar-track {
  border-radius: 10px;
  background: #F7F7F7;
}

.form-group textarea::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #3D5144;
  border: 2px solid #F7F7F7;
}

.submit-button {
  display: block; /* Button on its own line */
  width: 100%; /* Make button fill the container */
  padding: 1rem;
  background-color: #3D5144; /* Dark green button */
  color: #F7F7F7;
  border: none;
  border-radius: 5px;
  font-size: 1.2rem;
  cursor: pointer; /* Indicate it's clickable */
  transition: background-color 0.3s ease; /* Smooth hover effect */
}

.submit-button:hover {
  background-color: #2c3e33; /* Slightly darker green on hover */
}

.dropdown-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.8rem;
  border: 1px solid transparent;
  border-radius: 10px;
  background-color: #F7F7F7;
  cursor: pointer;
}

.dropdown-container.open {
  border: 1px solid #3D5144;
}

.selected-value {
  flex-grow: 1;
  color: #3D5144;
}

.dropdown-icon {
  width: 26px;
  height: 26px;
}

.custom-dropdown {
  border: 1px solid #ccc;
  border-top: none;
  border-radius: 0 0 10px 10px;
  overflow-y: auto;
  max-height: 180px;
  background-color: #F7F7F7;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
}

/* Personalized scrollbar for WebKit */
.custom-dropdown::-webkit-scrollbar {
  width: 8px;
}

.custom-dropdown::-webkit-scrollbar-track {
  border-radius: 10px;
  background: #F7F7F7;
}

.custom-dropdown::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #3D5144;
  border: 2px solid #F7F7F7;
}

.dropdown-option {
  padding: 0.8rem;
  background-color: #F7F7F7;
  cursor: pointer;
  color: #3D5144;
}

.dropdown-option:hover {
  background-color: #BCC7C2;
}

.dropdown-option.selected {
  border-left: 4px solid #3D5144;
}

.dropdown-icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.dropdown-icon img {
  width: 20px;
  height: 20px;
}

@media (max-width: 1300px) {
  .page-header {
    /* Use a percentage based padding for dynamic reduction */
    padding-left: 10%;
    padding-right: 10%;
  }
}

@media (max-width: 800px) {
  .faq-body {
    display: block;
    align-items: center;
  }
  .faq-section,
  .faq-form {
    width: auto;
    max-width: 500px;
    margin: 1rem auto;
    position: static;
    transform: none;
    max-height: none;
  }
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border-width: 0;
}
</style>