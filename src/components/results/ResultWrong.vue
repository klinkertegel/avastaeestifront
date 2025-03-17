<template>
  <div class="container text-center">
    <div class="row">
      <div class="col">
        <h3>VALE VASTUS :(</h3>
        <h5>See oli {{ locationName }}</h5>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ResultWrong',
  props: {
    locationName: String
  }
}
</script>

<style scoped>

h3 {

  color: #953035; /* Tume roheline tekst */


}

</style>


