<template>
  <Modal :modal-is-open="modalIsOpen"
         @event-close-modal="$emit('event-close-modal')"
         @event-execute-log-out="$emit('event-execute-log-out')"
  >
    <template #title>
      <h3>Soovid välja logida?</h3>
    </template>

    <template #body>

      <img src="../../assets/images/agree.webp" height="350" width="350" alt="" class="mt-4"/>
    </template>


    <template #footer>
      <button @click="executeLogOut" class="btn btn-success">Logi välja</button>
    </template>

  </Modal>
</template>

<script>
import Modal from "@/components/modal/Modal.vue"

export default {
  name: 'LogOutModal',
  components: {Modal},
  props: {
    modalIsOpen: Boolean
  },

  methods: {
    executeLogOut() {
      this.$emit('event-execute-log-out')
    },
  }
}

</script>
