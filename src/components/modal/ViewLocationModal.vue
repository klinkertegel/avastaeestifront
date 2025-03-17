<template>
  <Modal :modal-is-open="modalIsOpen" :is-delete="isDelete" @event-close-modal="$emit('event-close-modal')">
    <template #title>
      <div v-if="isDelete">
        Kas sa soovid kustuta asukohta: {{ location.locationName }}?
      </div>
      <div v-else>
        {{ location.locationName }}
      </div>
    </template>

    <template #body>
      <div class="row justify-content-center">
        <div class="col">
          <LocationImage :image-data="location.imageData"/>
        </div>
      </div>
    </template>

    <template #footer>
      <button v-if="isDelete" @click="deleteLocation" type="button" class="btn btn btn-danger">KUSTUTA</button>
    </template>

  </Modal>
</template>

<script>
import Modal from "@/components/modal/Modal.vue";
import LocationImage from "@/components/image/LocationImage.vue";

export default {
  name: "ViewLocationModal",
  components: {LocationImage, Modal},
  props: {
    modalIsOpen: Boolean,
    isDelete: Boolean,
    location: {}
  },

  methods: {

    deleteLocation() {
      this.$emit('event-location-deleted')
      this.closeModal()
    },

    closeModal() {
      this.$emit('event-close-modal')
    }
  }
}
</script>