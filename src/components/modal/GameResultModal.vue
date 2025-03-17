<template>
  <Modal :gameresult-modal-is-open="gameResultModalisOpen"
         @event-close-modal="$emit('event-close-modal')" >

    <template #title>
      VIHJE
    </template>

    <template #body>
      {{hint}}
    </template>

    <template #footer>
      <router-link to="/game" @click.native="$emit('event-close-modal')">Loobu mängust</router-link>
      <button @click="login" type="submit" class="btn btn-success ms-5">JÄRGMINE</button>
    </template>

  </Modal>
</template>

<script>
import Modal from "@/components/modal/Modal.vue";

export default {
  name: 'GameResultModal',
  components: {Modal},
  props: {
    hintModalIsOpen: Boolean,
  },

  methods: {
    openGameResultModal() {
      this.$emit('event-open-result-modal-from-map-modal')
    },
}


}
</script>



<style scoped>

</style>