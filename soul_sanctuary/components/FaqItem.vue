<script setup>
import { ref } from 'vue'
import ExpandIconGreen from 'assets/svg/arrow_down_green.svg'
import ExpandIconWhite from 'assets/svg/arrow_down_white.svg'
import ReduceIconGreen from 'assets/svg/arrow_up_green.svg'
import ReduceIconWhite from 'assets/svg/arrow_up_white.svg'


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
const hovered = ref(false)

// Function to toggle the expanded state
const toggle = () => {
  expanded.value = !expanded.value
}

// Computed property to determine the icon source based on the state
const iconSrc = computed(() => {
  if(expanded.value) {
    return ReduceIconWhite
  }
  return hovered.value ? ExpandIconWhite : ExpandIconGreen
})
</script>

<template>
  <div class="faq-item">
    <!-- Question section -->
    <div class="faq-question" :class="{ open: expanded }"
         @click="toggle"
         @mouseenter="hovered = true"
         @mouseleave="hovered = false">
      <span class="question-text text">{{ question }}</span>
      <span class="icon">
        <img :src="iconSrc" :alt="expanded ? 'Reduce' : 'Expand'" role="button">
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

.faq-question:hover {
  background-color: #3D5144;
  color: #F7F7F7;
}

.faq-question.open {
  background-color: #3D5144;
  color: #F7F7F7;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

.question-text {
  flex-grow: 1;
}

.icon {
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon img {
  width: 20px;
  height: 20px;
}

.faq-answer {
  background-color: #F7F7F7;
  padding: 1rem;
  border-radius: 0 0 10px 10px;
  color: #3D5144;
}
</style>