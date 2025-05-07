<template>
    <Head>
        <Title>{{ activity.name }} - Soul Sanctuary</Title>
    </Head>
    <main class="main">
        <h1 class="activity-title title">{{ activity.name }}</h1>
        <div class="photo_and_description">
            <div class="photo">
                <img :src="activity.imageUrl" alt="activity image">
            </div>
            <div class="description">
                <p class="text">{{activity.description}}</p>
            </div>
        </div>
    </main>
</template>

<script setup>

    const route = useRoute()
    const id = route.params.id;

    // API call to fetch the right activity
    const { data: activityData } = await useFetch('/api/activities/'+ id);
    const activity = activityData.value[0];
</script>

<style scoped>

.main{
    max-width: 1440px;
}
    
.photo_and_description {
  display: flex;
  flex-direction: row;
  border-radius: 40px;
  background-color: #BCC7C2;
  margin: 0 2.5rem;
  overflow: hidden;
  flex-wrap: wrap;
}

.photo {
  flex: 1;
  min-width: 300px;
}

.photo img {
  width: 100%;
  height: 100%;
  border-radius: 40px 0 0 40px;
  object-fit: cover;
}

.description {
  flex: 1.5;
  padding: 2rem;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}

@media (max-width: 768px) {
  .photo_and_description {
    flex-direction: column;
  }

  .photo img {
    border-radius: 40px 40px 0 0;
  }

  .description {
    border-radius: 0 0 40px 40px;
  }
}

</style>
