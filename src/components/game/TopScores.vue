
<template>
  <div>

    <h3><font-awesome-icon :icon="['fas', 'trophy']"/> TOP SKOORID <font-awesome-icon :icon="['fas', 'trophy']"/></h3>

    <table class="table">
      <thead>
      <tr>
        <th scope="col">Koht</th>
        <th scope="col">Kasutaja</th>
        <th scope="col">Skoor</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(topScores, index) in topScores" :key="index">
        <td>{{ index + 1 }}</td>
        <td>{{ topScores.userName }}</td>
        <td>{{ topScores.totalScore }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>


<script>
export default {
  name: 'TopScores',
  props: {
    topScores: Array
  },
}
</script>


