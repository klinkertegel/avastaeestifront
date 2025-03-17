<template>
  <div class="container text-center correct-answer-container">
    <div class="row justify-content-center">
      <div class="col">
        <h3>ÕIGE VASTUS!</h3>
        <h5>See oli {{ locationName }}</h5>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  name: 'ResultCorrect',
  props: {
    locationName: String
  }

}
</script>

<style scoped>

h3 {

  color: #2a752e; /* Tume roheline tekst */


}

</style>