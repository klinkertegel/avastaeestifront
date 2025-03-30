<template>
<div class="taust">
  <InstructionsModal :modal-is-open="modalIsOpen"
                     @event-close-modal="closeModal"
  />
  <div class="container text-center login-container col col-6">
    <div class="row justify-content-center mb-5">
      <div class="col col-12">
        <h1 >AVASTA EESTIMAAD</h1>
        <button @click="openInstructionsModal" class="btn btn-light">Kuidas mängida?</button>
        <h3>Sisene kasutajaga</h3>
        <AlertDanger :message="errorMessage"/>
        <div class="row justify-content-center mb-3">
          <div class="col col-8">
            <div class="input-group mb-3">
              <span class="input-group-text">KASUTAJANIMI</span>
              <input v-model="username" type="text" class="form-control">
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text">PAROOL</span>
              <input v-model="password" :type="showPassword ? 'text' : 'password'" class="form-control">
              <span class="input-group-text" @click="initiateShowPassword" style="cursor: pointer;">
             <font-awesome-icon :icon="['fas', 'eye']"/>
                </span>
            </div>
          </div>
        </div>

        <router-link to="/register" class="register-link">Loo uus kasutaja</router-link>
        <button @click="login" type="submit" class="btn btn-success ms-5">LOGI SISSE</button>

      </div>

    </div>
  </div>
</div>
</template>

<script>
import '@/assets/css/LoginView.css'
import LoginService from "@/service/LoginService";
import NavigationService from "@/service/NavigationService";
import ErrorHandlingService from "@/errors/ErrorHandlingService";
import AlertDanger from "@/components/alert/AlertDanger.vue";
import InstructionsModal from "@/components/modal/InstructionsModal.vue";

export default {
  name: 'LoginView',
  components: {InstructionsModal, AlertDanger},
  
  data() {
    return {
      username: '',
      password: '',
      errorMessage: '',
      showPassword: false,
      modalIsOpen: false
    }
  },

  methods: {

    openInstructionsModal() {
      this.modalIsOpen = true
    },

    initiateShowPassword() {
      this.showPassword = true
      setTimeout(() => this.showPassword = false, 2000)
    },

    async sendLoginRequest() {
      return await LoginService.sendLoginRequest(this.username, this.password)
    },

    async handleLoginResponse(response) {
      const data = response.data;
      sessionStorage.setItem('userId', data.userId)
      sessionStorage.setItem('roleName', data.roleName)
      this.$emit('event-update-nav-menu')
      if (data.roleName === 'admin') {
        NavigationService.navigateToAdminHomeView()
      } else {
        NavigationService.navigateToUserHomeView()
      }
    },

    async handleLoginErrorResponse(error) {
      this.errorMessage = ErrorHandlingService.handleError(error);
    },

    resetAlertMessage() {
      this.errorMessage = '';
    },

    async login() {
      this.resetAllMessages();
      
      if (!this.username || !this.password) {
        this.errorMessage = 'Palun täida kõik väljad';
        return;
      }

      try {
        const response = await this.sendLoginRequest();
        await this.handleLoginResponse(response);
      } catch (error) {
        await this.handleLoginErrorResponse(error);
      }
    },

    resetAllMessages() {
      this.resetAlertMessage();
    },

    closeModal() {
      this.modalIsOpen = false
    }
  }
}
</script>
