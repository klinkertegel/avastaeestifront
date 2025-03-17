<template>
  <div class="table-container">
    <table class="table">
      <thead>
      <tr>
        <th scope="col">Järjekorranumber</th>
        <th scope="col">Asukoha nimi</th>
        <th scope="col">Muuda või kustuta</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(location, index) in locations" :key="location.locationId">
        <td>{{ index + 1 }}</td>
        <td>{{ location.locationName }}</td>
        <td>
          <font-awesome-icon icon="pen-to-square" @click="navigateToLocationView(location.locationId)"
                             class="cursor-pointer me-3"/>
          <font-awesome-icon icon="trash" @click="startDeleteLocationProcess(location.locationId)"
                             class="cursor-pointer"/>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>

import NavigationService from "@/service/NavigationService";
import ViewLocationModal from "@/components/modal/ViewLocationModal.vue";

export default {
  name: 'LocationsTable',
  components: {ViewLocationModal},
  props: {
    locations: [{}]
  },

  data() {
    return {
      modalIsOpen: false
    }
  },
  methods: {

    navigateToLocationView(locationId) {
      NavigationService.navigateToLocationView(locationId)
    },

    startDeleteLocationProcess(locationId) {
      this.$emit('event-start-delete-location-process', locationId)
    },
  }
}
</script>

<style scoped>

.table-container{
  max-height: 500px;
  overflow-y: auto;
  border: 1px solid #ccc;
}

table {
  width: 100%;
  border-collapse: collapse;
  background-color: rgba(255, 255, 255, 0.1)
}

.table th, .table td {
  background-color: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3);
}
</style>