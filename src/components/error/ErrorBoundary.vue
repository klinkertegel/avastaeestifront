<template>
  <div>
    <div v-if="error" class="error-boundary">
      <div class="error-content">
        <h2>{{ title }}</h2>
        <p>{{ errorMessage }}</p>
        <div class="error-actions">
          <button @click="retry" class="btn btn-primary">
            Proovi uuesti
          </button>
          <button @click="goHome" class="btn btn-secondary">
            Tagasi avalehele
          </button>
        </div>
      </div>
    </div>
    <slot v-else></slot>
  </div>
</template>

<script>
import { ref, onErrorCaptured } from 'vue';
import ErrorHandlingService from '../../errors/ErrorHandlingService';
import NavigationService from '../../service/NavigationService';

export default {
  name: 'ErrorBoundary',
  
  setup() {
    const error = ref(null);
    const errorMessage = ref('');
    const title = ref('Vabandame!');

    onErrorCaptured((err, vm, info) => {
      console.error('Error captured:', err, info);
      error.value = err;
      errorMessage.value = ErrorHandlingService.handleError(err);
      return false; // prevent error from propagating
    });

    const retry = () => {
      error.value = null;
      errorMessage.value = '';
      window.location.reload();
    };

    const goHome = () => {
      error.value = null;
      errorMessage.value = '';
      NavigationService.navigateToLoginView();
    };

    return {
      error,
      errorMessage,
      title,
      retry,
      goHome
    };
  }
};
</script>

<style scoped>
.error-boundary {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 300px;
  padding: 2rem;
  text-align: center;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  margin: 2rem auto;
  max-width: 600px;
}

.error-content {
  color: #fff;
}

.error-content h2 {
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