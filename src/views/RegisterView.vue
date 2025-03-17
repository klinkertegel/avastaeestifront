<template>
  <div>
    <div class="d-flex justify-content-center">
      <div class="container text-center mt-5">
        <div class="row justify-content-center">
          <div class="col col-6">
            <h1>Loo uus kasutaja</h1>
            <AlertDanger :message="errorMessage"/>
            <AlertSuccess :message="successMessage"/>
            <div class="input-group mb-3 mt-5">
              <span class="input-group-text">E-MAIL</span>
              <input v-model="newUser.email" type="text" class="form-control">
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text">KASUTAJANIMI</span>
              <input v-model="newUser.username" type="text" class="form-control">
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text">PAROOL</span>
              <input v-model="newUser.password" :type="showPassword ? 'text' : 'password'" class="form-control">
              <span class="input-group-text" @click="initiateShowPassword" style="cursor: pointer;">
              <font-awesome-icon :icon="['fas', 'eye']"/>
            </span>
            </div>

            <div class="input-group mb-3">
              <span class="input-group-text">KORDA PAROOLI</span>
              <input v-model="newUser.passwordRepeat" :type="showPasswordRepeat ? 'text' : 'password'"
                     class="form-control">
              <span class="input-group-text" @click="initiatePasswordRepeate" style="cursor: pointer;">
          <font-awesome-icon :icon="['fas', 'eye']"/>
              </span>
            </div>
            <div class="text-center d-block">
              <button @click="goBack" class="btn btn-light  mx-auto mt-5">Tagasi</button>
              <button @click="createNewUser" type="submit" class="btn btn-success ms-5 mx-auto mt-3">Loo kasutaja</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import '@/assets/css/global.css'
import UserService from "@/service/UserService";
import NavigationService from "@/service/NavigationService";
import BusinessErrors from "@/errors/BusinessErrors";
import AlertDanger from "@/components/alert/AlertDanger.vue";
import AlertSuccess from "@/components/alert/AlertSuccess.vue";

export default {
  name: 'RegisterView',
  components: {AlertSuccess, AlertDanger},
  data() {
    return {
      errorMessage: '',
      successMessage: '',
      showPassword: '',
      showPasswordRepeat: '',
      message: '',
      newUser: {
        email: "",
        username: "",
        password: "",
        passwordRepeat: ""
      },
      errorResponse: {
        message: '',
        errorCode: 0
      }
    }
  },
  methods: {

    initiateShowPassword() {
      this.showPassword = true
      setTimeout(() => this.showPassword = false, 2000)
    },

    initiatePasswordRepeate() {
      this.showPasswordRepeat = true
      setTimeout(() => this.showPasswordRepeat = false, 2000)
    },

    createNewUser() {
      if (this.allFieldsCorrect()) {
        this.sendCreateNewUserRequest();
      } else {
        this.alertMissingFields()
      }
    },

    allFieldsCorrect() {
      return this.newUser.username.length > 0
          && this.newUser.password.length > 0 && this.newUser.passwordRepeat === this.newUser.password
          && this.newUser.email.length > 0
          && this.isValidEmail(this.newUser.email)
    },

    isValidEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    },

    sendCreateNewUserRequest() {
        UserService.sendPostRegisterRequest(this.newUser)
            .then(() => this.handleRegistrationResponse())
            .catch(error => this.handleRegistrationErrorResponse(error))
    },

    handleRegistrationResponse() {
      this.successMessage = 'Sinu andmed salvestati, saad sisse logida'
      setTimeout( () => {
        this.$emit('event-update-nav-menu')
        NavigationService.navigateToLoginView()
        this.resetAllMessages()
      }, 2000)
    },

    handleRegistrationErrorResponse(error) {
      this.errorResponse = error.response.data
      if (this.isIncorrectUsername() || this.isIncorrectEmail()) {
        this.handleIncorrectCredentials();
      } else {
        NavigationService.navigateToErrorView()
      }
    },

    isIncorrectUsername() {
      return BusinessErrors.CODE_USERNAME_EXISTS === this.errorResponse.errorCode;
    },

    isIncorrectEmail() {
      return BusinessErrors.CODE_EMAIL_EXISTS === this.errorResponse.errorCode;
    },

    handleIncorrectCredentials() {
      this.errorMessage = 'Sellise e-maili või kasutajanimega on juba registreeritud'
      setTimeout(this.resetAllMessages, 2000);
    },

    alertMissingFields() {
      this.errorMessage = 'Kontrolli andmeid'
      setTimeout(this.resetAllMessages, 2000)
    },

    resetAllMessages() {
      this.errorMessage = ''
      this.successMessage = ''
    },

    goBack() {
      this.$router.go(-1)
    },
  }
}
</script>



