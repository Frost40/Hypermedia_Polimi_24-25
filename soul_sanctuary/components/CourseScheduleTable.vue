<template>
  <!-- Main container for the schedule table -->
  <div class="schedule-table">
    <!-- Desktop version of the table -->
    <div class="desktop">
      <table>
        <thead>
          <tr>
            <!-- Table header displaying the day of the week -->
            <th v-for="(entry, index) in schedule" :key="index" class="text_clear">{{ entry.day }}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <!-- Table data displaying the schedule information -->
            <td v-for="(entry, index) in schedule" :key="index" class="info">
              <div class="text"><strong>Time:</strong> {{ entry.time }}</div>
              <div class="text"><strong>Location:</strong> {{ entry.location }}</div>
              <div class="text"><strong>Instructor:</strong> {{ entry.instructor }}</div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Mobile version of the table -->
    <div class="mobile">
      <table>
        <thead>
          <tr>
            <!-- Table header for the mobile version -->
            <th class="text_clear">Day</th>
            <th class="text_clear">Details</th>
          </tr>
        </thead>
        <tbody>
          <!-- Table rows displaying the schedule information for each day -->
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
  schedule: Array // Prop: schedule - An array containing the schedule data.
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
}

.desktop table {
  border-collapse: separate;
}

.mobile table {
  border-collapse: separate;
}

th,
td {
  border: 1px solid #ccc;
  padding: 8px;
  vertical-align: top;
  text-align: left;
  word-break: break-word;
}

.schedule-table {
  margin: 0 2.5rem;
}

.text {
  color: #3D5144;
}

.text_clear {
  color: #BCC7C2;
  background-color: #3D5144;
}

.info {
  background-color: #BCC7C2;
}
</style>
