<template>
  <div>
    <NuxtRouteAnnouncer />
    <NuxtWelcome />
    
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

  const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_KEY)
  const instruments = ref([])

  async function getInstruments() {
    const { data } = await supabase.from('instruments').select()
    instruments.value = data
  }

  onMounted(() => {
    getInstruments()
  })
</script>
