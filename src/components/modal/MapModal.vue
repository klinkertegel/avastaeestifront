<template>
  <Modal :modal-is-open="modalIsOpen" @event-close-modal="$emit('event-close-modal')">
    <template #title>
      <div id="modal-timer">{{ formattedTime }}</div>

    </template>
    <template #body>
      <h3>VALI ASUKOHT KAARDIL</h3>

      <div
          ref="mapContainer"
          class="map-container"
          :style="{ width: width || '100%', height: height || '400px' }"
      ></div>
    </template>
    <template #footer>
      <router-link to="/game"
                   @click.native="handleBackToGame" class="link-dark">Tagasi pildile</router-link>
      <button @click="executeAnswering" type="submit" class="btn btn-success ms-5">KINNITA</button>
    </template>
  </Modal>
</template>

<script>
import Modal from "@/components/modal/Modal.vue";
import L from 'leaflet'
import '@/assets/css/GameView.css'

//marker fixed
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});


export default {
  name: 'MapModal2',
  components: {Modal},
  props: {
    minutes: Number,
    seconds: Number,
    modalIsOpen: Boolean,
    center: {type: Array, default: () => [58.909184655697715, 25.455322265625004]},
    zoom: {type: Number, default: 7},

  },
  computed: {
    // Vorminda minutid ja sekundid kahekohaliseks (nt 05:09)
    formattedTime() {
      const formattedMinutes = String(this.minutes).padStart(2, '0');
      const formattedSeconds = String(this.seconds).padStart(2, '0');
      return `${formattedMinutes}:${formattedSeconds}`;
    },
  },
  data() {
    return {
      endTimeMilliseconds: 0,
      map: null,
      marker: null, // Store reference to the marker
      clickedLocation: {
        lat: 0,
        long: 0
      }
    }
  },
  watch: {
    modalIsOpen(newValue) {
      if (newValue) {
        this.$nextTick(() => {
          this.initializeMap();
        });
      }
    },
  },
  methods: {
    handleBackToGame(event) {
      // Takista vaikimisi navigeerimine
      event.preventDefault();

      // Saada sündmus, et modaal sulguks
      this.$emit('event-close-modal');

      // Kontrolli, kas kasutada userGameId või randomGameId
      const userGameId = this.$route.query.userGameId;
      const randomGameId = this.$route.query.randomGameId;

      // Käsitsi navigeeri tagasi mängu lehele, kasutades õiget ID-d
      if (userGameId) {
        this.$router.push({ path: '/game', query: { userGameId } });
      } else if (randomGameId) {
        this.$router.push({ path: '/game', query: { randomGameId } });
      } else {
        // Kui mõlemad ID-d puuduvad, navigeeri lihtsalt mängu lehele ilma päringuparameetriteta
        this.$router.push({ path: '/game' });
      }
    },

    initializeMap() {
      if (this.map) {
        this.map.remove(); // Remove previous map instance if it exists
      }

      this.map = L.map(this.$refs.mapContainer).setView(this.center, this.zoom);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19
      }).addTo(this.map);


      this.addMapClickListener(); // Attach click event listener
    },

    addMapClickListener() {
      if (!this.map) return;

      this.map.on('click', (event) => {
        const {lat, lng} = event.latlng;
        this.clickedLocation = {lat, lng};


        // Remove previous marker if it exists
        if (this.marker) {
          this.map.removeLayer(this.marker);
        }

        // Add new marker
        this.marker = L.marker([lat, lng]).addTo(this.map);

      });
    },

    executeAnswering() {
      if (this.clickedLocation) {
        this.endTimeMilliseconds = Date.now()
        console.log(this.clickedLocation)
        this.$emit('event-execute-answering', this.clickedLocation, this.endTimeMilliseconds); // Saadab koordinaadid tagasi
      } else {
        alert("Palun valige koht kaardil!");
      }

    },
  },



}
</script>

<style scoped>
.map-container {
  position: relative;
  width: 100%;
  height: 500px;
}

</style>
