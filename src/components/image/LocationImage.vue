<template>
  <div>
    <img v-if="imageData.length === 0" src="../../assets/images/defaultImage.jpg" class="img-thumbnail" alt="Asukoha pilt">
    <img v-else :src="imageData" class="img-container w-100 d-block mx-auto" alt="Asukoha pilt">
  </div>
</template>



<script>
import '@/assets/css/GameView.css'
export default {
  name: 'LocationImage',
  props: {
    imageData: String
  }
}
</script>