<template>
  <div class="error-page">
    <div class="error-content">
      <h1>{{ errorTitle || 'Viga' }}</h1>
      <p>{{ errorMessage || 'Midagi läks valesti. Palun proovige uuesti.' }}</p>
      <div class="error-actions">
        <button @click="goBack" class="btn btn-secondary me-2">
          Tagasi
        </button>
        <button v-if="showHomeButton" @click="goHome" class="btn btn-primary">
          Avalehele
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import NavigationService from "@/service/NavigationService";

export default {
  name: 'ErrorView',
  props: {
    errorTitle: {
      type: String,
      required: false
    },
    errorMessage: {
      type: String,
      required: false
    },
    showHomeButton: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.goHome();
    },
    goHome() {
      NavigationService.navigateToLoginView();
    }
  }
}
</script>

<style scoped>
.error-page {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  padding: 2rem;
}

.error-content {
  text-align: center;
  background-color: rgba(255, 255, 255, 0.1);
  padding: 3rem;
  border-radius: 8px;
  max-width: 600px;
}

.error-content h1 {
  margin-bottom: 1rem;
  color: #fff;
}

.error-content p {
  margin-bottom: 2rem;
  color: rgba(255, 255, 255, 0.8);
}

.error-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.error-actions button {
  min-width: 120px;
}
</style>
