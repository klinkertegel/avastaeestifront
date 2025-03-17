<template>
  <div>
    <DeleteAccountModal :modal-is-open="modalIsOpen" :is-delete="true"
                        @event-account-deleted="deleteUserInfo"
                        @event-close-modal="closeModal"
    />
    <div class="row justify-content-center mt-5">
      <div class="col">
        <h3 v-if="isUpdate">MUUDA OMA ANDMEID</h3>
        <h3 v-else>MINU ANDMED</h3>
        <div v-if="isUpdate" class="row justify-content-center align-items-start">
          <div class="col col-4 text-start">

            <div class="input-group mb-3">
              <span class="input-group-text">Kasutajanimi</span>
              <input v-model="user.username" type="text" class="form-control">
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text">Parool</span>
              <input v-model="user.password" :type="showPassword ? 'text' : 'password'" class="form-control">
              <span class="input-group-text" @click="initiateShowPassword" style="cursor: pointer;">
             <font-awesome-icon :icon="['fas', 'eye']"/>
            </span>
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text">Korda parooli</span>
              <input v-model="user.passwordRepeat" :type="showPasswordRepeat ? 'text' : 'password'"
                     class="form-control">
              <span class="input-group-text" @click="initiatePasswordRepeat" style="cursor: pointer;">
            <font-awesome-icon :icon="['fas', 'eye']"/>
          </span>
            </div>
            <div class="input-group mb-3">
              <span class="input-group-text">E-mail</span>
              <input v-model="user.email" type="email" class="form-control">
            </div>

          </div>
        </div>
        <div v-else>
          <p>{{ user.username }}</p>
          <p>{{ user.email }}</p>
        </div>
        <button v-if="!isUpdate" @click="setIsUpdateToTrue" class="btn btn-success mb-5 me-3 mb-5">Muuda oma andmeid</button>
        <button v-if="isUpdate" @click="resetUser" type="button" class=" btn btn-light ms-3 allaveel">Tagasi</button>
        <button v-if="isUpdate" @click="updateUser" type="button" class=" btn btn-success ms-3 alla">Salvesta</button>
        <button v-if="isUser && !isUpdate" @click="openDeleteAccountModal" type="button" class="btn btn-secondary mb-5">
          Kustuta konto
        </button>
        <div class="row justify-content-center">
          <div class="col col-4 mb-4">
            <AlertDanger :message="errorMessage"/>
            <AlertSuccess :message="successMessage"/>
          </div>
        </div>
      </div>
    </div>
    <div v-if="isUser">
      <div class="row justify-content-center mb-3">
        <div class="col col-12 mb-2 mt-5">

        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-md-8 col-8">
          <h3 class="alla">Minu loodud mängud</h3>
          <table class="table">
            <thead>
            <tr>
              <th scope="col">Mängu nimi</th>
              <th scope="col">Kirjeldus</th>
              <th scope="col">Kustuta</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(newGame) in allGames" :key="newGame.gameId">
              <td>{{ newGame.gameName }}</td>
              <td>{{ newGame.gameDescription }}</td>
              <td>
                <font-awesome-icon icon="trash" @click="removeUserGame(newGame.gameId)"
                                   class="cursor-pointer"/>
              </td>
            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import NavigationService from "@/service/NavigationService";
import AlertSuccess from "@/components/alert/AlertSuccess.vue";
import AlertDanger from "@/components/alert/AlertDanger.vue";
import GameService from "@/service/GameService";
import UserService from "@/service/UserService";
import BusinessErrors from "@/errors/BusinessErrors";
import ViewLocationModal from "@/components/modal/ViewLocationModal.vue";
import DeleteAccountModal from "@/components/modal/DeleteAccountModal.vue";

export default {
  name: "ProfileInfoView",
  components: {DeleteAccountModal, ViewLocationModal, AlertSuccess, AlertDanger},
  data() {
    return {
      modalIsOpen: false,
      isDelete: false,
      isUser: false,
      isAdmin: false,
      isUpdate: false,
      user: {
        username: '',
        password: '',
        passwordRepeat: '',
        email: '',
      },
      userId: Number(sessionStorage.getItem("userId")),
      showPassword: false,
      showPasswordRepeat: false,
      successMessage: '',
      errorMessage: '',
      errorResponse: {
        message: '',
        errorCode: 0
      },
      allGames: [{
        gameId: 0,
        gameName: '',
        gameDescription: '',
        totalTopScore: 0
      }]
    }
  },
  methods: {

    deleteUserInfo() {
      UserService.sendDeleteUserInfoRequest(this.userId)
          .then(response => this.handleDeleteUserInfoRequest(response))
          .catch(() => NavigationService.navigateToErrorView())
    },

    handleDeleteUserInfoRequest(response) {
      this.successMessage = "Konto on edukalt kustutatud"
      setTimeout(() => {
        this.resetAllMessages()
        NavigationService.navigateToLoginView()
      }, 2000)
    },

    closeModal() {
      this.modalIsOpen = false
    },

    initiateShowPassword() {
      this.showPassword = true
      setTimeout(() => this.showPassword = false, 2000)
    },

    initiatePasswordRepeat() {
      this.showPasswordRepeat = true
      setTimeout(() => this.showPasswordRepeat = false, 2000)
    },

    setIsUpdateToTrue() {
      this.isUpdate = true
    },

    updateUser() {
      if (this.allFieldsCorrect()) {
        UserService.sendPutUserUpdateRequest(this.user, this.userId)
            .then(response => this.handleUserInfoUpdateRequest(response))
            .catch(error => this.handleUserInfoErrorResponse(error))
      } else {
        this.alertMissingFields()
      }
    },

    allFieldsCorrect() {
      return this.user.username.length > 0
          && this.user.password.length > 0 && this.user.passwordRepeat === this.user.password
          && this.user.email.length > 0
          && this.isValidEmail(this.user.email)
    },

    isValidEmail(email) {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
    },

    handleUserInfoUpdateRequest(response) {
      this.successMessage = 'Sinu andmed on edukalt muudetud'
      setTimeout(() => {
        this.resetAllMessages()
        NavigationService.navigateToProfileInfoView()
      }, 2000)
    },

    handleUserInfoErrorResponse(error) {
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

    resetUser() {
      this.isUpdate = false
      this.getUser()
    },

    getUser() {
      UserService.sendGetUserInfoRequest(this.userId)
          .then(response => this.handleGetUserRequest(response))
          .catch(() => NavigationService.navigateToErrorView())
    },

    handleGetUserRequest(response) {
      this.user = response.data
    },

    openDeleteAccountModal() {
      this.modalIsOpen = true
    },

    removeUserGame(gameId) {
      GameService.sendUserGameDeleteRequest(gameId)
          .then(response => this.handleUserGameRemovalResponse(response))
          .catch(() => NavigationService.navigateToErrorView())
    },

    handleUserGameRemovalResponse(response) {
      this.getGames()
      this.successMessage = "Mäng on edukalt kustutatud"
      setTimeout(this.resetAllMessages, 2000)
    },

    resetAllMessages() {
      this.errorMessage = ''
      this.successMessage = ''
    },

    alertMissingFields() {
      this.errorMessage = 'Kontrolli andmeid'
      setTimeout(() => this.resetAllMessages(), 2000)
    },

    getGames() {
      GameService.sendGetUserGames(this.userId)
          .then(response => this.handleGetGamesResponse(response))
          .catch(() => NavigationService.navigateToErrorView())
    },

    handleGetGamesResponse(response) {
      this.allGames = response.data;
    },

    decideRoles() {
      this.isAdmin = sessionStorage.getItem('roleName') === 'admin'
      this.isUser = !this.isAdmin
    }
  },

  beforeMount() {
    this.decideRoles()
    this.getUser()
    if (this.isUser) {
      this.getGames()
    }
  }
}

</script>

<style scoped>



.btn-secondary {
  border-color: darkred !important;
  color: darkred !important;
}

.alla {
  margin-top: 50px !important;
}

.allaveel {
  margin-top: 70px !important;
}

.table {
  background-color: rgba(255, 255, 255, 0.1) !important;
  /*margin-top: 79px !important;*/

}

.table th, .table td {
  background-color: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3)
}
</style>