<script setup>
import { ref } from 'vue'
import ExpandIcon from '~/assets/svgs/Expand.svg'
import ReduceIcon from '~/assets/svgs/Reduce.svg'

// Both question and answer are required props passed by the father
defineProps({
  question: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  }
})

const expanded = ref(false)

const toggle = () => {
  expanded.value = !expanded.value
}
</script>

<template>
  <div class="faq-item">
    <!-- Question section -->
    <div class="faq-question"
         :class="{ open: expanded }"
         @click="toggle">
      <span class="question-text text">{{ question }}</span>
      <span class="icon">
        <img :src="expanded ? ReduceIcon : ExpandIcon" alt="Icon">
      </span>
    </div>
    <!-- Answer section -->
    <div v-if="expanded" class="faq-answer text">
      <p>{{ answer }}</p>
    </div>
  </div>
</template>

<style scoped>
.faq-item {
  margin-bottom: 1rem;
}

.faq-question {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #F7F7F7;
  color: #3D5144;
  padding: 1rem;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

/* Hover: the question section inverts the colors used for background and text */
.faq-question:hover {
  background-color: #3D5144;
  color: #fff;
}

/* New style that overwrites the default one once the dropdown is open */
.faq-question.open {
  background-color: #3D5144;
  color: #F7F7F7;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.question-text {
  flex-grow: 1;
}

.icon img {
  width: 26px;
  height: 26px;
}

.faq-answer {
  background-color: #F7F7F7;
  padding: 1rem;
  border-radius: 0 0 10px 10px;
  color: #3D5144;
}
</style>