<template>
  <LogOutModal :modal-is-open="modalIsOpen"
               @event-close-modal="closeLogOutModal"
               @event-execute-log-out="executeLogOut"
  />
  <nav v-if="isLoggedIn" class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand ms-4 mt-2"><h6>Avasta Eestimaad</h6></a>
      <div class="collapse navbar-collapse" id="navbarNavAltMarkup">

        <div class="navbar-nav">
          <template v-if="isUser">
            <router-link class="nav-link active ms-4 mt-1" aria-current="page" to="/home">
              <font-awesome-icon :icon="['fas', 'house']"size="2x"/>
            </router-link>
          </template>

          <template v-else-if="isAdmin">
            <router-link class="nav-link active ms-4 mt-1" aria-current="page" to="/home-admin">
              <font-awesome-icon :icon="['fas', 'house']"size="2x"/>
            </router-link>
          </template>


          <template v-if="isUser">
            <router-link class="nav-link ms-4 d-flex" to="/game-new">
              <font-awesome-icon :icon="['fas', 'plus']"size="2x" class=" mt-1"/>
              <span class="mt-2 ms-1"> <h6>UUS MÄNG</h6> </span>
            </router-link>
          </template>

          <template v-if="isAdmin">
            <router-link class="nav-link ms-4 d-flex" to="/location">
              <font-awesome-icon :icon="['fas', 'plus']"size="2x" class=" mt-1"/>
              <span class="mt-2 ms-1"> <h6>UUS KOHT</h6> </span>
            </router-link>
          </template>

          <template v-if="isUser">
            <router-link class="nav-link ms-5 mt-2" to="/games"><h6>KÕIK MÄNGUD</h6></router-link>
          </template>

          <template v-if="isAdmin">
            <router-link class="nav-link ms-4 mt-2" to="/games"><h6>KÕIK MÄNGUD</h6></router-link>
          </template>
        </div>

        <div class="navbar-nav ms-auto">
          <template v-if="isUser">
            <router-link class="nav-link" to="/favourites">
              <font-awesome-icon :icon="['far', 'star']" size="2x"/>
            </router-link>
          </template>

          <template v-if="isUser">
            <router-link class="nav-link ms-3" to="/profile">
              <font-awesome-icon :icon="['far', 'circle-user']"size="2x"/>
            </router-link>
          </template>

          <template v-else-if="isAdmin">
            <router-link class="nav-link ms-3" to="/profile">
              <font-awesome-icon :icon="['far', 'circle-user']"size="2x"/>
            </router-link>
          </template>

          <template v-if="isUser">
            <button @click="openLogOutModal" type="button" class="btn btn-success ms-5 me-4">Logi välja</button>
          </template>
          <template v-else-if="isLoggedIn">
            <button @click="openLogOutModal" type="button" class="btn btn-success ms-5 me-4">Logi välja</button>
          </template>
          <template v-else>
            <router-link to="/"></router-link>
          </template>

        </div>
      </div>
    </div>
  </nav>
  <router-view @event-update-nav-menu="updateNavMenu"/>
</template>
<script>

import LogOutModal from "@/components/modal/LogOutModal.vue";
import NavigationService from "@/service/NavigationService";
import '@/assets/css/global.css';

export default {
  components: {LogOutModal},
  data() {
    return {
      modalIsOpen: false,
      isLoggedIn: false,
      isUser: false,
      isAdmin: false,
    }
  },
  methods: {

    openLogOutModal() {
      this.modalIsOpen = true
    },

    closeLogOutModal() {
      this.modalIsOpen = false
    },

    executeLogOut() {
      this.closeLogOutModal()
      this.isLoggedIn = false
      this.isUser = false
      this.isAdmin = false
      sessionStorage.clear()
      this.updateNavMenu()
      NavigationService.navigateToLoginView()
    },

    updateNavMenu() {
      let userId = sessionStorage.getItem('userId')
      this.isLoggedIn = userId !== null && userId !== ""
      let roleName = sessionStorage.getItem('roleName')
      this.isUser = roleName === 'user'
      this.isAdmin = roleName === 'admin'
    },
  },
  beforeMount() {
    this.updateNavMenu()
  }
}
</script>

<style scoped>
.navbar {
  background-color: #16446a !important; /* Tumesinine taust */
  color: #afd1ec !important; /* Valge tekst */
}

.navbar-brand, .nav-link {
  color: #afd1ec !important; /* Valge tekst */
  font-family: "Jersey 25", sans-serif !important;
}

.nav-link:hover {
  color: #ffffff !important; /* Hele sinine tekst hover korral */
}

.btn-success {
  background-color: #8cd390 !important; /* Hele roheline taust */
  color: #1a426e !important; /* Tumesinine tekst */
  border: none !important; /* Eemalda piirjoon */
}

.btn-success:hover {
  background-color: #47ff70 !important; /* Tumem roheline hover korral */
}

.nav-link .fa-icon {
  color: #afd1ec !important; /* Valge ikoon */
  font-size: 1.5rem !important; /* Suurenda ikooni suurust */
}

.nav-link:hover .fa-icon {
  color: #ffffff !important; /* Hele sinine ikoon hover korral */
}

h6 {
  font-size: 1.5rem !important;
}

</style>