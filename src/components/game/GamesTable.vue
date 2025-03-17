<template>
  <div>

  <table class="table">
    <thead>
    <tr>
      <th scope="col">Järjekorranumber</th>
      <th scope="col">Mängu nimi</th>
      <th scope="col">Mängu kirjeldus</th>
      <th scope="col">Parim mängija</th>
      <th scope="col">Top skoor</th>
      <th scope="col">Mängima</th>

    </tr>
    </thead>
    <tbody>
    <tr v-for="(allGames, index) in allGames" :key="allGames.gameId">
      <td>{{ index + 1 }}</td>
      <td>{{ allGames.gameName }}</td>
      <td>{{ allGames.gameDescription }}</td>
      <td>{{ allGames.username }}</td>
      <td>{{ allGames.totalTopScore }}</td>

      <td>
        <font-awesome-icon
            @click="createNewUserGame(allGames.gameId)"
            :icon="['fas', 'play']"
            class="cursor-pointer me-3"/>
      </td>
    </tr>
    </tbody>
  </table>
  </div>
</template>

<script>
import NavigationService from "@/service/NavigationService";
import '@/assets/css/table.css'

export default {
  name: 'GamesTable',
  computed: {
    NavigationService() {
      return NavigationService
    }
  },
  props: {
    allGames: Array
  },
  methods: {
    createNewUserGame(gameId) {
      this.$emit('event-create-new-user', gameId)
    },
  }

}
</script>
<style scoped>
.table {
  background-color: rgba(255, 255, 255, 0.1) !important

}
.table th, .table td {
  background-color: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.3)
}
</style>