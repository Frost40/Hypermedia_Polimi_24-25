<template>
  <div class="faq-item" :class="iconOnRight ? 'icon-right' : 'icon-left'" @click="toggle">
    <div ref="questionRef" class="question" :class="{ 'reverse-icon': iconOnRight }">
      <img :src="isOpen ? reduceIcon : expandIcon" alt="faq toggle" class="icon" />
      <span class="question-text" v-if="isMobile" v-html="formattedQuestion"></span>
      <span class="question-text" v-else>{{ question }}</span>
    </div>
    <div
        v-if="isOpen"
        class="answer"
        :style="answerStyle"
    >
      <p>{{ answer }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, onMounted, nextTick } from 'vue'
import expandIcon from 'assets/svgs/Expand.svg'
import reduceIcon from 'assets/svgs/Reduce.svg'

const props = defineProps({
  question: { type: String, required: true },
  answer: { type: String, required: true },
  iconOnRight: { type: Boolean, default: false }
})

const isOpen = ref(false)
const questionRef = ref(null)
const questionWidth = ref(0)

const toggle = async () => {
  isOpen.value = !isOpen.value
  await nextTick()
  if (questionRef.value) {
    questionWidth.value = questionRef.value.clientWidth
  }
}
// Inizializza isMobile solo se window esiste
const isMobile = ref(false)
if (typeof window !== 'undefined') {
  isMobile.value = window.innerWidth < 600
}

const updateIsMobile = () => {
  if (typeof window !== 'undefined') {
    isMobile.value = window.innerWidth < 600
    if (questionRef.value) {
      questionWidth.value = questionRef.value.clientWidth
    }
  }
}

onMounted(() => {
  if (typeof window !== 'undefined') {
    window.addEventListener('resize', updateIsMobile)
    updateIsMobile() // Assicura che isMobile sia aggiornato al montaggio
  }
  if (questionRef.value) {
    questionWidth.value = questionRef.value.clientWidth
  }
})

const answerStyle = computed(() => {
  return { width: questionWidth.value + 'px' }
})

const formattedQuestion = computed(() => {
  if (isMobile.value && props.question.length > 20) {
    const mid = Math.floor(props.question.length / 2)
    let breakIndex = props.question.lastIndexOf(' ', mid)
    if (breakIndex === -1) {
      breakIndex = props.question.indexOf(' ', mid)
    }
    if (breakIndex === -1) {
      breakIndex = mid
    }
    return (
        props.question.substring(0, breakIndex) +
        '<br/>' +
        props.question.substring(breakIndex + 1)
    )
  }
  return props.question
})
</script>

<style scoped>
.faq-item {
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  background: #F7F7F7;
  border-radius: 6px;
  margin: 0.5rem 0;
  padding: 0.75rem 0rem;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  transition: background 0.3s ease;
  cursor: pointer;
}

.faq-item:hover {
  background: #eef3f1;
}
.faq-item.icon-right {
  padding-right: 1rem;
}
.faq-item.icon-left {
  padding-left: 1rem;
}

.question {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  white-space: nowrap;
}

@media (max-width: 600px) {
  .question {
    white-space: normal;
  }

  .answer {
    white-space: normal;
  }

}

.question.reverse-icon {
  flex-direction: row-reverse;
  justify-content: flex-end;
}

.icon {
  width: 1rem;
  height: 1rem;
}

.answer {
  margin-top: 0.5rem;
  font-size: 0.9rem;
  color: #3D5144;
  background-color: #F7F7F7;
  border-radius: 4px;
  white-space: normal;
  word-break: break-word;
  box-sizing: border-box;
}

/* New rules when the icon is on the right */
.icon-right .question,
.icon-right .answer {
  padding-left: 2.5rem;
}
.icon-right {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

/* New rules when the icon is on the left */
.icon-left .question,
.icon-left .answer {
  padding-right: 2.5rem;
}
.icon-left {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}
</style>