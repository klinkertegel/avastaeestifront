<template>
  <div class="container text-center full-height-container">
    <div class="row">
      <div class="col">
        <h3>TULEMUSED</h3>
        <p>Õiged vastused: {{this.gameOverResults.correctCount}}</p>
        <p>Valed vastused: {{this.gameOverResults.inCorrectCount}}</p>
        <p>Aega läks: {{formatTime(this.gameOverResults.totalTime)}}</p>
        <a @click="createNewRandomGame" href="#/game" class="btn btn-primary mt-4">ALUSTA UUT MÄNGU</a>
      </div>
    </div>
  </div>
</template>

<script>
import GameService from "@/service/GameService";
import {useRoute} from "vue-router";
import NavigationService from "@/service/NavigationService";
import '@/assets/css/ResultView.css'

export default {
  name: 'GameOverView',
  data() {
    return {
      userId: sessionStorage.getItem('userId'),
      randomGameId: Number(useRoute().query.randomGameId),
      gameOverResults: {
        correctCount: 0,
       inCorrectCount: 0,
       totalTime: 0
      }
    }
  },
  methods: {

    handleGetGameOverResultsResponse(response) {
      return this.gameOverResults = response.data;
    },
    getGameResults() {
      GameService.sendGetGameOverResultsRequest(this.randomGameId)
          .then(response => this.handleGetGameOverResultsResponse(response))
          .catch(error => this.someDataBlockErrorResponseObject = error.response.data)
    },
    formatTime(totalTime) {
      const minutes = Math.floor(totalTime / 60); // Arvuta minutid
      const seconds = totalTime % 60; // Arvuta sekundid
      return `${minutes} min ja ${seconds} sek`;
  },
    createNewRandomGame() {
      GameService.sendPostNewRandomGame(this.userId)
          .then(response => this.handleCreateNewRandomGameResponse(response))
          .catch(error => this.someDataBlockErrorResponseObject = error.response.data)
    },

    handleCreateNewRandomGameResponse(response) {
      let randomGameId = response.data;
      NavigationService.navigateToGameView(randomGameId)
    },

  },
  mounted() {
    this.getGameResults()
  }
}
</script>



