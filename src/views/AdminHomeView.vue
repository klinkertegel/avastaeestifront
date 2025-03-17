<template>
  <div>
    <ViewLocationModal :modal-is-open="modalIsOpen" :location="location" :is-delete="true"
                       @event-location-deleted="deleteLocation"
                       @event-close-modal="closeModal"
    />
    <div class="container text-center mt-5">
      <div class="row">
        <div class="col">
          <h1>ASUKOHAD</h1>
        </div>
      </div>

      <div class="container text-center">
        <div class="col-4">
          <AlertDanger :message="errorMessage"/>
          <AlertSuccess :message="successMessage"/>
        </div>

      </div>

      <div class="row mt-4 justify-content-center mt-5">
        <div class="col col-8">
          <LocationsTable :locations="locations"
                          @event-start-delete-location-process="startDeleteLocationProcess"
          />
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import AlertSuccess from "@/components/alert/AlertSuccess.vue";
import AlertDanger from "@/components/alert/AlertDanger.vue";
import LocationsTable from "@/components/location/LocationsTable.vue";
import LocationService from "@/service/LocationService";
import httpStatusCodes from "@/errors/HttpStatusCodes";
import businessErrors from "@/errors/BusinessErrors";
import NavigationService from "@/service/NavigationService";
import ViewLocationModal from "@/components/modal/ViewLocationModal.vue";

export default {
  name: 'AdminHomeView',
  components: {ViewLocationModal, LocationsTable, AlertDanger, AlertSuccess,},
  data() {
    return {
      isAdmin: false,
      modalIsOpen: false,
      isDelete: false,
      errorMessage: '',
      successMessage: '',
      selectedLocationId: '',
      location: {
        locationName: '',
        longitude: null,
        latitude: null,
        clue: '',
        imageData: '',
      },

      locations: [
        {
          locationId: 0,
          locationName: '',
        }
      ],

      errorResponse: {
        message: '',
        errorCode: 0
      }
    }
  },

  methods: {

    closeModal() {
      this.modalIsOpen = false
    },

    startDeleteLocationProcess(locationId) {
      this.selectedLocationId = locationId
      LocationService.sendGetLocationRequest(this.selectedLocationId)
          .then(response => this.handleGetLocationResponse(response))
          .catch(() => NavigationService.navigateToErrorView())
    },

    handleGetLocationResponse(response) {
      this.location = response.data
      this.modalIsOpen = true
    },

    deleteLocation() {
      console.log(this.selectedLocationId)
      LocationService.sendDeleteLocationRequest(this.selectedLocationId)
          .then(() => this.handleDeleteLocationResponse())
          .catch(() => NavigationService.navigateToErrorView())
    },

    handleDeleteLocationResponse() {
      this.getLocations()
      this.successMessage = "Asukoht on edukalt kustutatud"
      setTimeout(this.resetAllMessages, 4000)
    },

    validateIsAdmin() {
      const roleName = sessionStorage.getItem('roleName')
      this.isAdmin = roleName != null && roleName === 'admin'
    },

    getLocations() {
      LocationService.sendGetLocationsRequest()
          .then(response => this.handleGetLocationsResponse(response))
          .catch(error => this.handleGetLocationsErrorResponse(error))
    },

    handleGetLocationsResponse(response) {
      this.locations = response.data;
    },

    handleGetLocationsErrorResponse() {
      this.locations = []
      this.setErrorResponse(error)
      if (this.isLocationNotFoundError(error)) {
        this.setErrorMessage()
        setTimeout(this.resetAllMessages, 4000)
      } else {
        NavigationService.navigateToErrorView()
      }
    },

    setErrorResponse(error) {
      this.errorResponse = error.response.data
    },

    isLocationNotFoundError() {
      return httpStatusCodes.STATUS_NOT_FOUND === error.response.status && businessErrors.CODE_NO_LOCATION_FOUND === this.errorResponse.errorCode;
    },

    setErrorMessage() {
      this.errorMessage = this.errorResponse.message
    },

    resetAllMessages() {
      this.errorMessage = ''
      this.successMessage = ''
    },
  },

  beforeMount() {
    this.validateIsAdmin()
    this.getLocations()
  }
}
</script>
