<template>

  <div class="row">
    <div class="col-sm-6 mt-5 mb-sm-5">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Mängi arvuti genereeritud mängu</h5>
          <p class="card-text">Sinu ülesandeks on ära tunda 5 erinevat paika Eestimaal. Iga koha ära arvamiseks on sul 30 sekundit.</p>
          <a @click="createNewRandomGame" href="#/game" class="btn btn-primary">ALUSTA UUT MÄNGU</a>
        </div>
      </div>
    </div>
    <div class="col-sm-6 mt-5 mb-sm-5">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Sirvi teiste loodud mänge</h5>
          <p class="card-text"> Vaata parimaid tulemusi! Võta vastu väljakutse, ületa teiste skoorid ja tõesta, et oled tõeline Eestimaa asjade tundja.</p>
          <a href="#/games" class="btn btn-primary">VAATA KÕIKI MÄNGE</a>
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-sm-6 mt-5 mb-sm-5">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Loo oma mäng ja kutsu sõbrad võistlema!</h5>
          <p class="card-text">Vali asukohad, määra reeglid ja kutsu sõbrad võistlema. Kes tuleb välja kõige parema Eestimaa tundjana?</p>
          <a href="#/game-new" class="btn btn-primary">LOO UUS MÄNG</a>
        </div>
      </div>
    </div>
    <div class="col-sm-6 mt-5 mb-sm-5">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">Salvesta oma lemmikkohad Eestis</h5>
          <p class="card-text">Sinu isiklik teejuht! Kui aeg seiklema minna on käes, on sul käepärast kõik parimad kohad, mida külastada.</p>
          <a href="#/favourites" class="btn btn-primary">VAATA LEMMIKKOHTI</a>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import GameService from "@/service/GameService"
import NavigationService from "@/service/NavigationService";
import '@/assets/css/UserHomeView.css'


export default {
  name: 'UserHomeView',
  data() {
    return {
      userId: sessionStorage.getItem('userId'),
    }
  },
  methods: {

    createNewRandomGame() {
      GameService.sendPostNewRandomGame(this.userId)
          .then(response => this.handleCreateNewRandomGameResponse(response))
          .catch(error => this.someDataBlockErrorResponseObject = error.response.data)
    },

    handleCreateNewRandomGameResponse(response) {
      let randomGameId = response.data;
      NavigationService.navigateToGameView(randomGameId)
    },
  }
}
</script>



