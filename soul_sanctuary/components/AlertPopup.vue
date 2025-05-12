<script setup>
defineProps({
  type: {
    type: String,
    required: true,
    validator: (value) => ['success', 'error'].includes(value)
  },
  message: {
    type: String,
    default: ''
  },
  errors: {
    type: Array,
    default: () => []
  },
  show: {
    type: Boolean,
    required: true
  }
});

const emit = defineEmits(['close']);

const closePopup = () => {
  emit('close');
};
</script>

<template>
  <Teleport to="body">
    <div v-if="show" class="popup-overlay" @click.self="closePopup">
      <div class="popup-container" :class="type">
        <div class="popup-header">
          <h3>{{ type === 'success' ? 'Success' : 'Error' }}</h3>
          <button class="close-button" @click="closePopup">&times;</button>
        </div>
        <div class="popup-content">
          <p v-if="message">{{ message }}</p>
          <template v-if="errors.length > 0">
            <p v-if="type === 'error'">The following errors happened:</p>
            <ul>
              <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
            </ul>
          </template>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.popup-container {
  background-color: #F7F7F7;
  border-radius: 10px;
  width: 90%;
  max-width: 500px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  overflow: hidden;
}

.popup-container.success {
  border-top: 5px solid #3D5144;
}

.popup-container.error {
  border-top: 5px solid #dc3545;
}

.popup-header {
  padding: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #e9ecef;
}

.popup-header h3 {
  margin: 0;
  color: #3D5144;
}

.close-button {
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #BCC7C2;
}

.close-button:hover {
  color: #3D5144;
}

.popup-content {
  padding: 1.5rem;
}

.popup-content p {
  margin-top: 0;
}

.popup-content ul {
  margin-bottom: 0;
  padding-left: 1.5rem;
}

.success .popup-header h3 {
  color: #3D5144;
}

.error .popup-header h3 {
  color: #dc3545;
}
</style>