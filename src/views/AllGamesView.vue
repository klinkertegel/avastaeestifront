<template>
  <div class="row mt-4 justify-content-center">
    <div class="col col-10">
      <GamesTable :all-games="allGames"
      @event-create-new-user="createNewUserGame"
      />
    </div>
  </div>
</template>

<script>
import GamesTable from "@/components/game/GamesTable.vue";
import GameService from "@/service/GameService";
import NavigationService from "@/service/NavigationService";

export default {
  name: 'AllGamesView',
  components: {GamesTable},
  data() {
    return {
      userId: sessionStorage.getItem('userId'),
      allGames: [{
        gameId: 0,
        gameName: '',
        gameDescription: '',
        totalTopScore: 0
      }]
    }
  },

  methods: {


    handleCreateNewUserResponse(response) {
      let userGameId = response.data;
      NavigationService.navigateToUserGameView(userGameId)
    },

    createNewUserGame(gameId) {
      GameService.sendPostNewUserGameRequest(gameId, this.userId)

          .then(response => this.handleCreateNewUserResponse(response))
          .catch(error => this.someDataBlockErrorResponseObject = error.response.data)
    },

    getGames() {
      GameService.sendGetGamesRequest()
          .then(response => this.handleGetGamesResponse(response))
          .catch(error => this.someDataBlockErrorResponseObject = error.response.data);
    },

    handleGetGamesResponse(response) {
      this.allGames = response.data;
    },
  },

  beforeMount() {
    this.getGames();
  }
}
</script>
