<script setup>
import { ref } from 'vue';
import FaqItem from '~/components/FaqItem.vue';
import AlertPopup from '~/components/AlertPopup.vue';
import ExpandIcon from '~/assets/svgs/Expand.svg?raw';
import ReduceIcon from '~/assets/svgs/Reduce.svg?raw';

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

// Variables for the form
const name = ref('');
const email = ref('');
const course = ref('');
const question = ref('');

// Form state variables
const isSubmitting = ref(false);
const showPopup = ref(false);
const popupType = ref('success');
const popupMessage = ref('');
const popupErrors = ref([]);

// Function to close the popup
const closePopup = () => {
  showPopup.value = false;
};

// Function to handle form submission
const handleSubmit = async () => {
  // Reset the state
  isSubmitting.value = true;

  try {
    // Send form data to the API
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
      // Form submitted successfully
      popupType.value = 'success';
      popupMessage.value = 'Your question has been submitted successfully! We will get back to you soon.';
      popupErrors.value = [];
      showPopup.value = true;

      // Reset the form
      name.value = '';
      email.value = '';
      course.value = '';
      question.value = '';
    } else {
      // Validation or other errors
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

const dropdownOpen = ref(false);
const courses = [
  { value: '', label: 'Select a course' },
  { value: 'hata yoga', label: 'Hata Yoga' },
  { value: 'prenatal yoga', label: 'Prenatal Yoga' },
  { value: 'vinyasa yoga', label: 'Vinyasa Yoga' },
  { value: 'awaken your chakras', label: 'Awaken Your Chakras' },
  { value: 'guided meditations', label: 'Guided Meditations for Stress, Anxiety & Depression' },
  { value: 'walking meditation', label: 'Walking Meditation in Nature' },
  { value: 'yoga mindful eating', label: 'Yoga & Mindful Eating' },
  { value: 'yoga in the park', label: 'Yoga in the Park' }
];

const dropdownRef = ref(null);

const toggleDropdown = () => {
  dropdownOpen.value = !dropdownOpen.value;
};

const selectCourse = (option) => {
  course.value = option.value;
  dropdownOpen.value = false;
};

// Calcola la posizione del dropdown rispetto al viewport
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
</script>

<template>
  <Head>
    <Title>Soul Sanctuary - FAQ</Title>
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="https://yoursite.example.com/faq">
  </Head>

  <!-- Alert Popup Component -->
  <AlertPopup
      :type="popupType"
      :message="popupMessage"
      :errors="popupErrors"
      :show="showPopup"
      @close="closePopup"
  />

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
            <label for="name" class="text">Name</label>
            <input type="text" id="name" v-model="name" placeholder="Your name" required>
          </div>
          <div class="form-group">
            <label for="email" class="text">Email</label>
            <input type="email" id="email" v-model="email" placeholder="Your email@example.com" required>
          </div>
          <div class="form-group">
            <label class="text">Course Field</label>
            <div ref="dropdownRef" class="dropdown-container" :class="{ open: dropdownOpen }" @click="toggleDropdown">
              <span class="selected-value text">
                {{
                  courses.find((opt) => opt.value === course)
                      ? courses.find((opt) => opt.value === course).label
                      : 'Select a course'
                }}
              </span>
              <span class="dropdown-icon" v-html="dropdownOpen ? ReduceIcon : ExpandIcon"></span>
            </div>
            <Teleport to="body">
              <div
                  v-if="dropdownOpen"
                  :style="dropdownPositionStyle"
                  class="custom-dropdown"
              >
                <div
                    v-for="(option, index) in courses"
                    :key="index"
                    class="dropdown-option"
                    :class="{ selected: option.value === course }"
                    @click.stop="selectCourse(option)"
                >
                  {{ option.label }}
                </div>
              </div>
            </Teleport>
          </div>
          <div class="form-group">
            <label for="question" class="text">Your Question</label>
            <textarea id="question" v-model="question" placeholder="Type your question here ..." rows="4" required></textarea>
          </div>
          <button type="submit" class="submit-button" :disabled="isSubmitting">
            {{ isSubmitting ? 'Submitting...' : 'Submit' }}
          </button>
        </form>
      </div>
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


/* New styles for the FAQ body and sections */
.faq-body {
  display: flex; /* Use flexbox for side-by-side layout */
  gap: 1.5rem; /* Space between the two columns */
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
  border-radius: 10px;
  font-size: 1rem;
  box-sizing: border-box; /* Include padding in the element's total width and height */
  background-color: #F7F7F7;
}

.form-group textarea {
    resize: vertical; /* Allow vertical resizing */
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
  overflow: hidden;
  background-color: #F7F7F7;
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
</style>