<template>
    <div class="schedule-table">
        <div class="desktop">
            <table>
                <thead>
                    <tr>
                        <th v-for="(entry, index) in schedule" :key="index" class="text_clear">{{ entry.day }}</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td v-for="(entry, index) in schedule" :key="index" class="info">
                        <div class="text"><strong>Time:</strong> {{ entry.time }}</div>
                        <div class="text"><strong>Location:</strong> {{ entry.location }}</div>
                        <div class="text"><strong>Instructor:</strong> {{ entry.instructor }}</div>
                    </td>
                    </tr>
                </tbody>
            </table>
        </div>
  
        <div class="mobile">
            <table>
                <thead>
                    <tr>
                        <th class="text_clear">Day</th>
                        <th class="text_clear">Details</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(entry, index) in schedule" :key="index">
                        <td class="text_clear">{{ entry.day }}</td>
                        <td class="info">
                            <div class="text"><strong>Time:</strong> {{ entry.time }}</div>
                            <div class="text"><strong>Location:</strong> {{ entry.location }}</div>
                            <div class="text"><strong>Instructor:</strong> {{ entry.instructor }}</div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
  </template>
  
<script setup>
  defineProps({
    schedule: Array
  })
</script>
  
<style scoped>
    .desktop {
    display: block;
    }

    .mobile {
    display: none;
    }

    @media (max-width: 768px) {
    .desktop {
        display: none;
    }
    .mobile {
        display: block;
    }
    }

    table {
    width: 100%;
    border-collapse: collapse;
    margin: 1rem 0;
    }

    .desktop table {
    border-collapse: separate; 
    border-spacing: 16px 0; 
    }

    .mobile table {
    border-collapse: separate;
    border-spacing: 0 16px; 
    }

    th,
    td {
    border: 1px solid #ccc;
    padding: 8px;
    vertical-align: top;
    text-align: left;
    }

    .schedule-table{
        margin: 0 2.5rem;
    }

    .text{
        color: #3D5144;
    }

    .text_clear{
        color: #BCC7C2;
        background-color: #3D5144;
    }

    .info{
        background-color: #BCC7C2;
    }
</style>
  