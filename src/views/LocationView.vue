<template>
  <div>
    <div class="container text-center mt-4">
      <div class="row justify-content-center">
        <div class="col col-7">
          <h1 v-if="isEdit">Muuda asukoha andmeid</h1>
          <h1 v-else>Lisa asukoha andmed</h1>
          <AlertDanger :message="errorMessage"/>
          <AlertSuccess :message="successMessage"/>
          <div class="input-group flex-nowrap mb-3">
            <span class="input-group-text" id="addon-wrapping">Asukoha nimi</span>
            <input v-model="location.locationName" type="text" class="form-control">
          </div>
          <div class="d-flex gap-4 mb-3">
            <div class="input-group flex-nowrap">
              <span class="input-group-text" id="addon-wrapping">Pikkuskraad</span>
              <input v-model="location.longitude" type="number" class="form-control">
            </div>
            <div class="input-group flex-nowrap">
              <span class="input-group-text" id="addon-wrapping">Laiuskraad</span>
              <input v-model="location.latitude" type="number" class="form-control">
            </div>
          </div>
          <div class="input-group mb-3">
            <span class="input-group-text" id="addon-wrapping">Asukoha vihje</span>
            <textarea v-model="location.clue" class="form-control"></textarea>
          </div>
          <div class="input-group mb-4">
            <label class="input-group-text" for="imageInput">Lisa pilt</label>
            <ImageInput @event-new-image-selected="setNewLocationImageData"/>
          </div>
          <div class="d-flex justify-content-center">
            <LocationImage :image-data="location.imageData" style="width: 300px; height: 300px;"/>
          </div>
          <div class="mb-5">
          <button @click="goBack" type="button" class="btn btn-light">Nimekirja juurde</button>
          <button v-if="isEdit" @click="saveLocation" type="submit" class="btn btn-success ms-5">SALVESTA</button>
          <button v-else @click="addNewLocation" type="submit" class="btn btn-success ms-5">LISA ASUKOHT</button>
        </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import AlertDanger from "@/components/alert/AlertDanger.vue"
import NavigationService from "@/service/NavigationService"
import ImageInput from "@/components/image/ImageInput.vue";
import LocationImage from "@/components/image/LocationImage.vue";
import LocationService from "@/service/LocationService";
import locationService from "@/service/LocationService";
import BusinessErrors from "@/errors/BusinessErrors";
import AlertSuccess from "@/components/alert/AlertSuccess.vue";
import HttpStatusCodes from "@/errors/HttpStatusCodes";
import {useRoute} from "vue-router";

export default {
  name: 'LocationView',
  components: {LocationImage, ImageInput, AlertDanger, AlertSuccess},
  data() {
    return {
      isEdit: false,
      locationId: Number(useRoute().params.locationId),
      successMessage: '',
      errorMessage: '',
      location: {
        locationName: '',
        longitude: null,
        latitude: null,
        clue: '',
        imageData: '',
      },
      errorResponse: {
        message: '',
        errorCode: 0
      }
    }
  },

  methods: {

    setNewLocationImageData(imageData) {
      this.location.imageData = imageData
    },

    getLocation(locationId) {
      locationService.sendGetLocationRequest(locationId)
          .then(response => this.handleGetLocationRequest(response))
          .catch(() => NavigationService.navigateToErrorView())
    },

    handleGetLocationRequest(response) {
      this.location = response.data
    },

    addNewLocation() {
      if (this.allFieldsCorrect()) {
        this.sendCreateNewLocationRequest()
      } else {
        this.alertMissingFields()
      }
    },

    allFieldsCorrect() {
      return this.location.locationName.length > 0
          && typeof this.location.longitude === "number" && !isNaN(this.location.longitude)
          && typeof this.location.latitude === "number" && !isNaN(this.location.latitude)
          && this.location.clue.length > 0
          && this.location.imageData.length > 0
    },

    sendCreateNewLocationRequest() {
      LocationService.sendNewLocationPostRequest(this.location)
          .then((response) => this.handleNewLocationResponse(response))
          .catch(error => this.handleNewErrorResponse(error))
    },

    handleNewLocationResponse() {
      this.successMessage = 'Asukoht lisatud'
      setTimeout(() => NavigationService.navigateToAdminHomeView(), 2000)
    },

    handleNewErrorResponse(error) {
      this.errorResponse = error.response.data
      if (this.locationAlreadyExists(error)) {
        this.errorMessage = this.errorResponse.message
        setTimeout(this.resetAllMessages, 4000)
      }
    },

    locationAlreadyExists(error) {
      return HttpStatusCodes.STATUS_FORBIDDEN === error.response.status
          && BusinessErrors.CODE_LOCATION_EXISTS === this.errorResponse.errorCode;
    },

    saveLocation() {
      if (this.allFieldsCorrect()) {
        this.updateLocation()
      } else {
        this.alertMissingFields()
      }
    },

    updateLocation() {
      LocationService.sendPutLocationRequest(this.location, this.locationId)
          .then(response => this.handleUpdateLocationResponse(response))
          .catch(() => NavigationService.navigateToErrorView())
    },

    handleUpdateLocationResponse(response) {
      this.successMessage = 'Asukoha info on edukalt muudetud'
      setTimeout(() => NavigationService.navigateToAdminHomeView(), 2000)
    },

    alertMissingFields() {
      this.errorMessage = 'Kontrolli andmeid'
      setTimeout(this.resetAllMessages, 2000)
    },

    resetAllMessages() {
      this.errorMessage = ''
      this.successMessage = ''
    },

    handleIsEdit() {
      let locationId = Number(this.$route.query.locationId)
      this.isEdit = !isNaN(locationId)
      if (this.isEdit) {
        this.locationId = locationId
        this.getLocation(locationId)
      }
    },

    goBack() {
      this.$router.go(-1)
    }
  },

  beforeMount() {
    this.handleIsEdit()
  }
}
</script>