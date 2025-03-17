<template>
  <div>
    <div v-if="modalIsOpen || hintModalIsOpen" class="modal-overlay">
      <div class="modal-container">
        <div class="modal-content">
          <div class="modal-header">
            <h1 class="modal-title fs-5">
              <slot name="title"></slot>
            </h1>
            <button type="button" class="btn-close" @click="$emit('event-close-modal')" aria-label="Close"/>
          </div>
          <div class="modal-body">
            <slot name="body"></slot>
          </div>
          <div class="modal-footer mt-3">
            <slot name="footer"></slot>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  props:{
    modalIsOpen: Boolean,
    hintModalIsOpen: Boolean
  }
};
</script>

<style scoped>
/*.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-container {
  background-color: rgb(90, 146, 172);
  border-radius: 8px;
  width: 80%; !* Laius 80% vaateaknast *!
  max-width: 800px; !* Maksimaalne laius *!
  height: 80%; !* Kõrgus 80% vaateaknast *!
  max-height: 600px; !* Maksimaalne kõrgus *!
  overflow-y: hidden; !* Luba kerimine, kui sisu on liiga pikk *!
}

.modal-content {
  padding: 10px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
 !* border-bottom: 1px solid #386c83;*!
  padding-bottom: 2px;
}

.modal-title {
  !*font-size: 24px; !* Suurem pealkirja font *!*!
  margin: 0;
}

.modal-body {
  padding: 1px 0;
}

.modal-footer {
!*  border-top: 1px solid #27304c;*!
  padding-top: 1px;
  display: flex;
  justify-content: flex-end;
}*/

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-container {
  background-color: rgb(90, 146, 172);
  border-radius: 8px;
  width: 80%; /* Laius 80% vaateaknast */
  max-width: 800px; /* Maksimaalne laius */
  height: 80%; /* Kõrgus 80% vaateaknast */
  max-height: 600px; /* Maksimaalne kõrgus */
  display: flex;
  flex-direction: column;
}

.modal-content {
  padding: 10px;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 2px;
}

.modal-title {
  margin: 0;
}

.modal-body {
  padding: 1px 0;
  flex-grow: 1;
}

.modal-footer {
  padding-top: 1px;
  display: flex;
  justify-content: flex-end;
}
</style>