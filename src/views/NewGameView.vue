<template>
  <div class="container text-center">
    <div class="row justify-content-center mt-5">
      <div class="col col-10">
        <h1>MÄNGU ANDMED</h1>
          <AlertDanger :message="errorMessage"/>
        <div class="input-group flex-nowrap mt-4">
          <span class="input-group-text" id="addon-wrapping">Mängu nimi</span>
          <input v-model="newGame.gameName" type="text" class="form-control">
        </div>

        <div class="input-group mb-3">
          <span class="input-group-text" id="addon-wrapping">Mängu kirjeldus</span>
          <textarea v-model="newGame.description" class="form-control"></textarea>
        </div>

        <div class="input-group flex-nowrap mb-3">
          <span class="input-group-text" id="addon-wrapping">Aega vastamiseks (min)</span>
          <input v-model="newGame.timePerLocation" type="text" class="form-control">
        </div>
        <div class="text-center d-block">
        <button @click="goBack" type="button" class="btn btn-light mx-auto mt-5">Tagasi</button>
        <button @click="createNewGame" type="button" class="btn btn-success ms-5 mx-auto mt-3">LOO MÄNG</button>

      </div></div>
    </div>
  </div>
</template>

<script>
import NavigationService from "@/service/NavigationService";
import GameService from "@/service/GameService";
import AlertDanger from "@/components/alert/AlertDanger.vue";
import AlertSuccess from "@/components/alert/AlertSuccess.vue";

export default {
  name: "NewGameView",
  components: {AlertSuccess, AlertDanger},
  data() {
    return {
      errorMessage: '',
      newGame: {
        userId: sessionStorage.getItem('userId'),
        gameName: '',
        description: '',
        timePerLocation: 0
      }
    }
  },

  methods: {
    createNewGame() {
      if (this.allFieldsCorrect()) {
        this.handleNewGameInfo()
      } else {
        this.alertMissingFields()
      }
    },

    alertMissingFields() {
      this.errorMessage = 'Kõik väljad peavad olema sisestatud'
      setTimeout(this.resetAllMessages, 2000)
    },

    resetAllMessages() {
      this.errorMessage = ''
    },

    allFieldsCorrect() {
      return this.newGame.gameName.length > 0
          && this.newGame.description.length > 0
          && this.newGame.timePerLocation.length > 0
    },

    handleNewGameInfo() {
      GameService.sendCreateNewGameRequest(this.newGame)
          .then(response => this.handleCreateNewGameResponse(response))
          .catch(() => NavigationService.navigateToErrorView())
    },

    handleCreateNewGameResponse(response) {
      let gameId = response.data;
      NavigationService.navigateToGameQuestionView(gameId)
    },

    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>