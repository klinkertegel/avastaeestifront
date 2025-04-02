
<template>
  <div class = "lemmikkohad">
    <div v-if="userHasAtLeastOneFavourite">
      <br><br>
      <h3>MINU LEMMIK KOHAD</h3>
      <h5>Koha nimi: {{location.locationName}}</h5>
      <p>Koha info: {{location.clue}}</p>

      <div class="container text-center">
        <div class="row">
          <div class="col d-flex align-items-center justify-content-center">
            <font-awesome-icon v-if="displayLeftArrow" @click="handlePreviousLocation" :icon="['fas', 'angle-left']" size="3x"/>
          </div>

          <div class="col-8 image-container position-relative">
            <LocationImage :image-data="location.imageData"/>
            <div class="remove-button" @click="removeFavorite" title="Eemalda lemmikutest">
              <font-awesome-icon :icon="['fas', 'circle-xmark']" size="lg" />
              <span class="tooltip-text">Eemalda lemmikutest</span>
            </div>
          </div>
          <div class="col d-flex align-items-center justify-content-center">
            <font-awesome-icon v-if="displayRightArrow" @click="handleNextLocation" :icon="['fas', 'angle-right']" size="3x"/>
          </div>
        </div>
        <br><br><br>
        <div class="row justify-content-center">
          <div style="display: flex; gap: 1rem; justify-content: center;">
            <div v-for="userFavourite in userFavourites" :key="userFavourite.index">
              <font-awesome-icon
                  @click="updateLocation(userFavourite.index, userFavourite.locationId)"
                  :icon="['fas', 'circle']"
              />
            </div>
          </div>
        </div>
      </div>


    </div>
    <div v-else>
      <br>
      <br>
      <h1>MINU LEMMIK KOHAD</h1>
      <h2>Sa ei ole veel lisanud lemmikkohti</h2>
    </div>

  </div>

</template>

<script>

import FavouriteService from "@/service/FavouriteService";
import LocationService from "@/service/LocationService";
import LocationImage from "@/components/image/LocationImage.vue";
import '@/assets/css/favourite.css'
import '@/assets/css/GameView.css'


export default {
  name: 'FavouritesView',
  components: {LocationImage},

  data() {
    return {
      displayLeftArrow: true,
      displayRightArrow: true,
      userHasAtLeastOneFavourite: true,
      userId: Number(sessionStorage.getItem('userId')),

      selectedIndex: 1,
      userFavourites: [
        {
          index: 0,
          locationId: 0
        }
      ],
      location: {
        locationId: 0,
        locationName: '',
        longitude: 0,
        latitude: 0,
        clue: '',
        imageData: '',
      },
    }
  },


  methods: {

    handlePreviousLocation() {
      let selectedLocationId = this.userFavourites[this.selectedIndex - 2].locationId
      this.selectedIndex--
      this.getLocation(selectedLocationId)
    },

    handleNextLocation() {
      let selectedLocationId = this.userFavourites[this.selectedIndex].locationId
      this.selectedIndex++
      this.getLocation(selectedLocationId)
    },

    updateDisplayArrows() {
      this.displayLeftArrow = this.selectedIndex > 1;
      this.displayRightArrow = this.selectedIndex < this.userFavourites.length;
    },

    getUserFavourites() {
      FavouriteService.sendGetUserFavouritesRequest(this.userId)
          .then(this.handleGetUserFavouritesResponse)
    },

    updateLocation(index, locationId) {
      this.selectedIndex = index + 1
      this.getLocation(locationId)
    },

    getLocation(locationId) {
      LocationService.sendGetLocationRequest(locationId)
          .then(this.handleGetLocationResponse)
    },

    handleGetLocationResponse(response) {
      this.location = response.data
      this.updateDisplayArrows()
    },

    handleGetUserFavouritesResponse(response) {
      if (response.data.length === 0) {
        this.userHasAtLeastOneFavourite = false
      } else {
        this.userFavourites = response.data
        this.getLocation(this.userFavourites[0].locationId)
      }
    },

    removeFavorite() {
      const currentLocationId = this.location.locationId;
      FavouriteService.sendDeleteUserFavoriteRequest(currentLocationId)
          .then(() => {
            // Remove the location from userFavourites array
            this.userFavourites = this.userFavourites.filter(fav => fav.locationId !== currentLocationId);
            
            if (this.userFavourites.length === 0) {
              this.userHasAtLeastOneFavourite = false;
            } else {
              // If we're removing the last item in the list, go to previous
              if (this.selectedIndex > this.userFavourites.length) {
                this.selectedIndex--;
              }
              // Update the display with the next/previous location
              const newLocationId = this.userFavourites[Math.min(this.selectedIndex - 1, this.userFavourites.length - 1)].locationId;
              this.getLocation(newLocationId);
            }
          })
          .catch(error => {
            console.error('Error removing favorite:', error);
          });
    }
  },

  beforeMount() {
    this.getUserFavourites()
  }
}

</script>
