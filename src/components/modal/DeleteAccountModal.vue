 <template>
    <Modal :modal-is-open="modalIsOpen" :is-delete="isDelete" @event-close-modal="$emit('event-close-modal')">
      <template #body>
        <div v-if="isDelete">
          <p>Kas sa soovid oma konto ära kustutada?</p>
        </div>
      </template>

      <template #footer>
        <button v-if="isDelete" @click="deleteUserInfo" type="button" class="btn btn-danger">Jah, kustuta</button>
      </template>
    </Modal>
  </template>

  <script>
    import Modal from "@/components/modal/Modal.vue";

    export default {
      name: "DeleteAccountModal",
      components: {Modal},
      props: {
        modalIsOpen: Boolean,
        isDelete: Boolean,
      },

      methods: {
        deleteUserInfo() {
          this.$emit('event-account-deleted')
          this.closeModal()
        },

        closeModal() {
          this.$emit('event-close-modal')
        }
      }
    }
  </script>