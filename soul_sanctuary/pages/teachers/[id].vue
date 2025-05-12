<template>
  <Head>
    <Title>{{ teacher.fullname }} - Soul Sanctuary</Title>
  </Head>
  <main class="main">
    <!-- Navigazione frecce -->
    <div class="navigation">
      <NuxtLink v-if="prevId" :to="{ path: `/teachers/${prevId}`, query: { from } }" class="arrow-link left">
        <img src="../../assets/svgs/previous.svg" class="arrows" />
      </NuxtLink>
      <NuxtLink v-if="nextId" :to="{ path: `/teachers/${nextId}`, query: { from } }" class="arrow-link right">
        <img src="../../assets/svgs/next.svg" class="arrows" />
      </NuxtLink>
    </div>

    <!-- Sezione foto + info -->
    <div class="teacher-box">
      <div class="photo-section">
        <img :src="teacher.photo" alt="Teacher's Photo" class="teacher-photo" />
      </div>
      <div class="info-section">
        <h2 class="title">{{ teacher.fullname }}</h2>
        <p class="text"><strong>Phone:</strong> {{ teacher.phone }}</p>
        <p class="text"><strong>Email:</strong> <a :href="'mailto:' + teacher.email">{{ teacher.email }}</a></p>
        <p class="text"><strong>Area:</strong> {{ teacher.area }}</p>
        <a :href="teacher.cv" target="_blank" class="button">Curriculum</a>
      </div>
    </div>

    <!-- Sezione descrizione -->
    <section class="description-section">
      <div class="description-box">
        <p class="text" v-html="formattedDescription"></p>
      </div>
    </section>
  </main>
</template>

<script setup>
const route = useRoute()
const id = route.params.id
const from = route.query.from || 'all'

const { data: teacherData } = await useFetch('/api/teachers/' + id)
const teacher = teacherData.value[0]

const { data: allTeachersData } = await useFetch('/api/teachers')
const allTeachers = allTeachersData.value

const currentIndex = allTeachers.findIndex(t => String(t.id) === String(id))
const prevId = currentIndex > 0 ? allTeachers[currentIndex - 1].id : null
const nextId = currentIndex < allTeachers.length - 1 ? allTeachers[currentIndex + 1].id : null

const formattedDescription = computed(() =>
    teacher.description.replace(/\n/g, '<br>')
)
</script>

<style scoped>
.main {
  max-width: 1440px;
  margin: 0 auto;
  padding: 2rem;
}

/* Navigazione frecce */
.navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 1rem auto;
  padding: 0 2rem;
  position: relative;
  max-width: 1440px;
}

.arrow-link {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.arrow-link.left {
  left: 1rem;
}

.arrow-link.right {
  right: 1rem;
}

.arrows {
  width: 30px;
  height: 30px;
  transition: transform 0.2s ease;
}

.arrow-link:hover .arrows {
  transform: scale(1.15);
}

.teacher-box {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 3rem;
  margin: 3rem auto;
  max-width: 700px;
  flex-wrap: wrap;
}

.photo-section {
  flex: 1;
  max-width: 200px;
}

.teacher-photo {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 20px;
}

.info-section {
  flex: 1;
  max-width: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.info-section .text {
  margin-bottom: 0.3rem;
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
  width: fit-content;
}

.button:hover {
  font-weight: bold;
}

.description-section {
  display: flex;
  justify-content: center;
  margin: 0 auto;
  margin-top: 2rem;
}

.description-box {
  background-color: #BCC7C2;
  padding: 2rem;
  border-radius: 20px;
  width: 700px;
  text-align: left;
}

@media (max-width: 768px) {
  .teacher-box {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .info-section {
    align-items: center;
    max-width: 100%;
  }

  .description-box {
    width: 90%;
    text-align: center;
  }

  .photo-section {
    max-width: none;
  }
}
</style>