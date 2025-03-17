<template>
  <Modal :modal-is-open="modalIsOpen" @event-close-modal="$emit('event-close-modal')" >
    <template #title>
      MÄNGU REEGLID
    </template>

    <template #body>
      Kas oled valmis tõestama, kui hästi sa Eestit tunned? mängime <b>„Avasta Eestit“</b>. <br><br>

      Pärast konto registreerimist on kõige kiirem viis mängida, kui klõpsate „Mängi arvuti genereeritud mängu“. See käivitab 5 vooru kestva mängu.<br><br>

      Sa näed pilti ühest Eesti paigast ja sul on piiratud aeg, et ära arvata, kus see asub. Kas sa tead, kus see asub? Suurepärane! , siis klõpsake nüüd nupule „ava kaart“, asetage asukoha kohale nõel ja klõpsake „Kinnita“. Saad näha, kas vastus oli õige, ja sind suunatakse järgmisele pildile.<br><br>

      Ei ole kindel? Vajutage nupule „Võta vihje“, et saada vihje.<br><br>

      Leidsid meeldiva asukoha ja tahad hiljem rohkem teada saada? Lisa see nupuga „Lisa lemmikute hulka“ <font-awesome-icon :icon="['far', 'star']" /> <br><br>

      Nautige mängu!

    </template>

  </Modal>
</template>
<script>

import Modal from "@/components/modal/Modal.vue";

export default {
  name: 'InstructionsModal',
  components: {Modal},
  props: {
    modalIsOpen: Boolean
  }
}
</script>



