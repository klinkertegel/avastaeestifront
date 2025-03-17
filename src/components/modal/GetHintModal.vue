<template>

    <Modal :hint-modal-is-open="hintModalIsOpen"
           @event-close-modal="$emit('event-close-modal')" >

      <template #title>
        <div id="modal-timer">{{ formattedTime }}</div>
      </template>

      <template #body>
        <p>{{ hint }}</p>
      </template>

      <template #footer>
        <router-link to="/game"
                     @click.native="handleBackToGame" class="link-dark">Tagasi pildile</router-link>
        <button @click="openMapModal" type="submit" class="btn btn-success ms-5">AVA KAARDIL</button>
      </template>

    </Modal>

</template>

<script>
import Modal from "@/components/modal/Modal.vue";

export default {
  name: 'GetHintModal',
  components: {Modal},
  props: {
    hintModalIsOpen: Boolean,
    hint: String,
    minutes: Number,
    seconds: Number

  },
  computed: {
    //meetod Vormindab minutid ja sekundid kahekohaliseks (nt 05:09)
    formattedTime() {
      const formattedMinutes = String(this.minutes).padStart(2, '0');
      const formattedSeconds = String(this.seconds).padStart(2, '0');
      return `${formattedMinutes}:${formattedSeconds}`;
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

    openMapModal() {
      this.$emit('event-open-map-modal-from-hint-modal')
    },
  }
}
</script>

<style scoped>

</style>