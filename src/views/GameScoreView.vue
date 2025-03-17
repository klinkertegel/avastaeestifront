<template>
  <div class="container text-center">
    <div class="row">
      <div class="col">

        <TopScores
        :top-scores="topScores"
        />
        <h3>SINU SKOOR: {{score.score}}</h3>

        <h3>TULEMUSED</h3>
        <p>Õiged vastused: {{this.gameOverResults.correctCount}}</p>
        <p>Valed vastused: {{this.gameOverResults.inCorrectCount}}</p>
        <p>Aega läks: {{formatTime(this.gameOverResults.totalTime)}}</p>
        <a  href="#/games" class="btn btn-primary">VAATA KÕIKI MÄNGE</a>
      </div>
    </div>
  </div>
</template>

<script>
import {useRoute} from "vue-router";
import GameService from "@/service/GameService";
import TopScores from "@/components/game/TopScores.vue";

export default {
  name: 'GameScoreView',
  components: {TopScores},
  data() {
    return {
      topScores: [{
          userName: '',
          totalScore: 0,
          timestamp: 0
        }],
      userId: sessionStorage.getItem('userId'),
      userGameId: Number(useRoute().query.userGameId),
      gameOverResults: {
        correctCount: 0,
        inCorrectCount: 0,
        totalTime: 0
      },
      score: 0
    }},
  methods: {


    handleGetTopScoresResponse(response) {
      return this.topScores = response.data;
    },

    getTopScores() {
      GameService.sendGetTopScoresRequest(this.userGameId)
          .then(response => this.handleGetTopScoresResponse(response))
          .catch(error => this.someDataBlockErrorResponseObject = error.response.data)
    },

    handleGetGameOverScoreResponse(response) {
      this.score = response.data;
      sessionStorage.setItem('gameScore', JSON.stringify(this.score)); // Salvesta skoor sessionStorage-sse
      this.getTopScores()

    },

    getGameScore() {
      const savedScore = sessionStorage.getItem('gameScore');
      if (savedScore) {
        this.score = JSON.parse(savedScore); // Kasuta salvestatud skoori, kui see on olemas
      } else {
        GameService.sendGetUserGameOverScoreRequest(this.userGameId)
            .then(response => this.handleGetGameOverScoreResponse(response))
            .catch(error => this.someDataBlockErrorResponseObject = error.response.data)
      }
    },

    handleGetGameOverResultsResponse(response) {
      return this.gameOverResults = response.data;
    },
    getGameResults() {
      GameService.sendGetUserGameOverResultsRequest(this.userGameId)
          .then(response => this.handleGetGameOverResultsResponse(response))
          .catch(error => this.someDataBlockErrorResponseObject = error.response.data)
    },

    formatTime(totalTime) {
      const minutes = Math.floor(totalTime / 60); // Arvuta minutid
      const seconds = totalTime % 60; // Arvuta sekundid
      return `${minutes} min ja ${seconds} sek`;
    },
  },
  mounted() {
    this.getGameResults()
    this.getGameScore()
    this.getTopScores()
  },
  beforeRouteLeave(to, from, next) {
    // Kustuta andmed enne lehelt lahkumist
    sessionStorage.removeItem('gameScore');
    next(); // Jätka navigeerimist
  }
}
</script>