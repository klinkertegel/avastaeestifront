<template>
  <div>
    <div class="container text-center col-4">
      <h1>MÄNGU ANDMED</h1>
      <AlertSuccess :message="successMessage"/>
    </div>
    <div class="row justify-content-center">
      <div class="col col-8">
        <table class="table">
          <thead>
          <tr>
            <th scope="col">PILT</th>
            <th scope="col">KOHANIMI</th>
            <th scope="col">Kustuta</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(gameLocation) in gameLocations" :key="gameLocation.gameLocationId">
            <td><img :src="gameLocation.locationImage" :alt="gameLocation.locationName + ' pilt'"
                     :style="{width: '250px'}"></td>
            <td>{{ gameLocation.locationName }}</td>
            <td>
              <font-awesome-icon icon="trash" @click="removeGameLocation(gameLocation.gameLocationId)"
                                 class=" cursor-pointer"/>
            </td>
          </tr>
          </tbody>
        </table>
        <div class="col-6">

        </div>
      </div>
    </div>

    <div class="row justify-content-center">
      <div class="col col-6 mb-3 mt-6">
        <LocationsDropdown :locations="locations"
                           :selected-location-id="selectedLocationId"
                           @event-new-location-selected="setGameLocationLocationId"
        />
      </div>
      <div class="col col-2 mb-3">
        <button @click="addNewLocationToUserGame" type="submit" class="btn btn-secondary ms-5">Lisa see mängu</button>
      </div>
      <div>
        <button @click="gameCreated" type="button" class="btn btn-success mb-4">KINNITA VALITUD ASUKOHAD</button>
      </div>
    </div>
  </div>
</template>
<script>
import LocationsDropdown from "@/components/location/LocationsDropdown.vue";
import LocationService from "@/service/LocationService";
import NavigationService from "@/service/NavigationService";
import GameService from "@/service/GameService";
import {useRoute} from "vue-router";
import AlertSuccess from "@/components/alert/AlertSuccess.vue";
import '@/assets/css/GameQuestionView.css'

export default {
  name: 'gameLocationsView',
  components: {LocationsDropdown, AlertSuccess},
  data() {
    return {
      gameId: Number(useRoute().query.gameId),
      successMessage: '',
      gameLocations:
          [
            {
              gameLocationId: 0,
              locationImage: '',
              locationName: ''
            }
          ],
      selectedLocationId: 0,
      locations: [
        {
          locationId: 0,
          locationName: ''
        }
      ],
    }
  },
  methods: {

    removeGameLocation(gameLocationId) {
      console.log(gameLocationId)
      GameService.sendDeleteGameLocationRequest(gameLocationId)
          .then(response => this.handleGameLocationDeleteResponse(response))
          .catch(() => NavigationService.navigateToErrorView())
    },

    handleGameLocationDeleteResponse() {
      this.getGameLocations()
      this.successMessage = "Asukoht on edukalt kustutatud"
      setTimeout(this.resetAllMessages, 1000)
    },

    resetAllMessages() {
      this.successMessage = ''
    },

    getGameLocations() {
      LocationService.sendGetGameLocationsRequest(this.gameId)
          .then(response => this.handleGameLocationResponse(response))
          .catch(() => NavigationService.navigateToErrorView())
    },

    handleGameLocationResponse(response) {
      this.gameLocations = response.data;
    },

    addNewLocationToUserGame() {
      GameService.sendPostNewLocationToUserGame(this.gameId, this.selectedLocationId)
          .then(() => this.handleAddedGameLocationResponse())
          .catch(() => NavigationService.navigateToErrorView())
    },

    handleAddedGameLocationResponse() {
      this.getGameLocations()
    },

    getLocations() {
      LocationService.sendGetLocationsRequest()
          .then(response => this.handleGetLocationsResponse(response))
          .catch(() => NavigationService.navigateToErrorView());
    },

    handleGetLocationsResponse(response) {
      this.locations = response.data;
    },

    setGameLocationLocationId(selectedLocationId) {
      this.selectedLocationId = selectedLocationId
    },

    gameCreated() {
      NavigationService.navigateToProfileInfoView()
    }
  },

  beforeMount() {
    this.getLocations()
    this.getGameLocations()
  }
}
</script>
<style scoped>
.table {
  background-color: rgba(255, 255, 255, 0.1) !important

}
.table th, .table td {
  background-color: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3)
}
</style>