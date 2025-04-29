<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
    
    <ul>
      <li v-for="instrument in instruments" :key="instrument.id">
        {{ instrument.name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
  import { ref, onMounted } from 'vue'
  import { createClient } from '@supabase/supabase-js'

  const supabase = createClient('https://xtngkhgsfvziahiizbhx.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inh0bmdraGdzZnZ6aWFoaWl6Ymh4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDU4NTgxNzQsImV4cCI6MjA2MTQzNDE3NH0.iZSKzx1kLBDJdAYTRXHAnkAnUa7FdWebHTeb4cC3ZrA')
  const instruments = ref([])

  async function getInstruments() {
    const { data } = await supabase.from('instruments').select()
    instruments.value = data
  }

  onMounted(() => {
    getInstruments()
  })
</script>
