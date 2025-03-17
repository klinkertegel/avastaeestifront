<template>

  <MapModal   :modal-is-open="mapModalIsOpen"
              :location-id="randomLocation.locationId"
              :random-game-id="randomGameId"
              :minutes="minutes"
              :seconds="seconds"
              @event-close-modal="closeMapModal"
              @event-execute-answering="checkWhichGameIsPlaying"
  />

  <GetHintModal :hint-modal-is-open="hintModalIsOpen"
                :hint="randomLocation.clue"
                :randomGameId="randomGameId"
                @event-close-modal="closeHintModal"
                :minutes="minutes"
                :seconds="seconds"
                @event-open-map-modal-from-hint-modal="openMapModalFromHintModal"

  />

  <div class="container text-center">
    <div class="row justify-content-center">
      <!-- Buttons for the rounds -->
      <div class="col-auto">

      </div>
    </div>

    <div id="timer">00:00</div>

    <div class="row mt-3 justify-content-center">
      <div class="col-auto img-container">
        <img :src="randomLocation.imageData" class="img-fluid w-100 d-block mx-auto" alt="image">
      </div>
    </div>

    <div class="row mt-3 justify-content-center">
    <div class="text-center  button-container">
      <button @click="openHintModal" type="submit" class="btn btn-secondary mx-2">VÕTA VIHJE</button>
      <button @click="openMapModal" type="submit" class="btn btn-success mx-2">AVA KAARDIL</button>
    </div></div>
  </div>
</template>

<script>

import MapModal from "@/components/modal/MapModal.vue";
import GetHintModal from "@/components/modal/GetHintModal.vue";
import GameResultModal from "@/components/modal/GameResultModal.vue";
import {useRoute} from "vue-router";
import GameService from "@/service/GameService";
import NavigationService from "@/service/NavigationService";
import '@/assets/css/GameView.css'


export default {
  name: 'GameView',
  components: {GameResultModal, MapModal, GetHintModal},
  data() {
    return {
      userGameId: Number(useRoute().query.userGameId),
      randomGameId: Number(useRoute().query.randomGameId),
      mapModalIsOpen: false,
      hintModalIsOpen: false,
      randomLocation: {
        locationId: 0,
        locationName: '',
        longitude: 0,
        latitude: 0,
        clue: '',
        imageData: '',
        isGameComplete: '',
        timeStart: ''
      },
      minutes: 0, // Minutid
      seconds: 0, // Sekundid
      timerInterval: null, // Timer'i interval
      timeoutId: null,
      startTimeMilliseconds: 0, // Stores the timestamp when the timer starts
      endTimeMilliseconds: 0,

    };
  },

  beforeRouteUpdate(to, from, next) {
    this.userGameId = Number(to.query.userGameId); // Uuenda userGameId
    this.randomGameId = Number(to.query.randomGameId); // Uuenda randomGameId

    if (this.userGameId) {
      this.getUserGameLocations(); // Laadi kasutaja mängu asukohad
    } else if (this.randomGameId) {
      this.getRandomGameLocations(); // Laadi juhusliku mängu asukohad
    }

    next(); // Jätka navigeerimist
  },

  methods: {

    checkWhichGameIsPlaying(clickedLocation, endTimeMilliseconds) {
      if (this.randomGameId) {
        this.handleUserAnswer(clickedLocation, endTimeMilliseconds);
      } else {
        this.handleUserGameAnswer(clickedLocation, endTimeMilliseconds);
      }
    },

    handleUserGameAnswer(clickedLocation, endTimeMilliseconds) {
      const userAnswer = {
        randomGameId: this.userGameId,
        locationId: this.randomLocation.locationId,
        clickedLocation: clickedLocation,
        startTimeMilliseconds: this.startTimeMilliseconds,
        endTimeMilliseconds: endTimeMilliseconds
      };

      console.log(userAnswer)

      // Tühista timeout, kui kasutaja esitab vastuse enne ühe minuti möödumist
      if (this.timeoutId) {
        clearTimeout(this.timeoutId);
        this.timeoutId = null;
      }


      this.sendUserGameUserAnswer(userAnswer)

      // Peata timer
      this.stopTimer();

    },

    handleUserAnswer(clickedLocation, endTimeMilliseconds) {

      const userAnswer = {
        randomGameId: this.randomGameId,
        locationId: this.randomLocation.locationId,
        clickedLocation: clickedLocation,
        startTimeMilliseconds: this.startTimeMilliseconds,
        endTimeMilliseconds: endTimeMilliseconds
      };

      console.log(userAnswer)

        // Tühista timeout, kui kasutaja esitab vastuse enne ühe minuti möödumist
        if (this.timeoutId) {
          clearTimeout(this.timeoutId);
          this.timeoutId = null;
        }

        this.sendUserAnswer(userAnswer);

        // Peata timer
        this.stopTimer();

    },

    handleUserAnswerResponse(response) {
      const userAnswerResult = response.data;
      NavigationService.navigateToResultView(userAnswerResult, this.randomGameId)

    },

    handleUserGameAnswerResponse(response) {
      const userAnswerResult = response.data;
      NavigationService.navigateToUserGameResultView(userAnswerResult, this.userGameId)

    },

    sendUserAnswer(userAnswer) {
      GameService.sendPostUserAnswerRequest(userAnswer)
          .then(response => this.handleUserAnswerResponse(response))
          .catch(error => this.someDataBlockErrorResponseObject = error.response.data)
    },

    sendUserGameUserAnswer(userAnswer) {
      GameService.sendPostUserGameUserAnswerRequest(userAnswer)
          .then(response => this.handleUserGameAnswerResponse(response))
          .catch(error => this.someDataBlockErrorResponseObject = error.response.data)
    },

    handleGetRandomGameLocationsResponse(response) {
      this.randomLocation = response.data;
      this.startTimer()
    },

    getRandomGameLocations() {
      GameService.sendGetRandomGameLocationsRequest(this.randomGameId)
          .then(response => this.handleGetRandomGameLocationsResponse(response))
          .catch(error => this.someDataBlockErrorResponseObject = error.response.data)
    },

    handleGetUserGameLocationResponse(response) {
      this.randomLocation = response.data;
      this.startTimer()
    },

    getUserGameLocations() {
      GameService.sendGetUserGameLocationsRequest(this.userGameId)

          .then(response => this.handleGetUserGameLocationResponse(response))
          .catch(error => this.someDataBlockErrorResponseObject = error.response.data)
    },

    openMapModalFromHintModal() {
      this.closeHintModal()
      this.openMapModal()
    },

    openMapModal() {
      this.mapModalIsOpen = true;
    },

    closeMapModal() {
      this.mapModalIsOpen = false;
    },

    openHintModal() {
      this.hintModalIsOpen = true;
    },
    closeHintModal() {
      this.hintModalIsOpen = false;
    },

    startTimer() {
      // Peata eelmine timer, kui see on käimas
      if (this.timerInterval) {
        clearInterval(this.timerInterval);
      }


      //Laadi startTime sessionStorage-st, kui see on olemas (nt refresh korral)
      const savedStartTime = sessionStorage.getItem(
          `startTime_${this.randomGameId}_${this.randomLocation.locationId}`
      );

      if (savedStartTime) {
        // Kui startTime on olemas, kasuta seda
        this.startTimeMilliseconds = JSON.parse(savedStartTime);
      } else {
        // Kui startTime pole olemas, salvesta uus startTime
        this.startTimeMilliseconds = Date.now();
        sessionStorage.setItem(
            `startTime_${this.randomGameId}_${this.randomLocation.locationId}`,
            JSON.stringify(this.startTimeMilliseconds)
        );
      }

      // Laadi salvestatud aeg localStorage-ist
      const savedTime = sessionStorage.getItem(`timer_${this.randomGameId}_${this.randomLocation.locationId}`);
      if (savedTime) {
        const time = JSON.parse(savedTime);
        this.minutes = time.minutes;
        this.seconds = time.seconds;
      } else {
        // Lähtesta aeg
        this.minutes = 0;
        this.seconds = 0;
      }

      this.updateTimerDisplay();

      // Käivita uus timer
      this.timerInterval = setInterval(() => {
        this.seconds += 1;

        // Kui sekundid jõuavad 60-ni, lisa minut ja nulli sekundid
        if (this.seconds === 60) {
          this.minutes += 1;
          this.seconds = 0;
        }

        // Salvesta aeg sessionStorage-i
        sessionStorage.setItem(`timer_${this.randomGameId}_${this.randomLocation.locationId}`, JSON.stringify({
          minutes: this.minutes,
          seconds: this.seconds
        }));

        // Uuenda timerit kasutajale nähtaval kujul
        this.updateTimerDisplay();
      }, 1000); // 1000 ms = 1 sekund

      // Käivita ühe minuti pärast suunamine ResultView-i
      this.timeoutId = setTimeout(() => {
        this.checkWhichGame();
      }, 30000); // 60000 ms = 1 minut; 10000 ms = 10 sek
    },

    checkWhichGame() {
      if (this.randomGameId) {
        this.handleTimeout();
      } else {
        this.handleUserGameTimeout();
      }
    },

    handleUserGameTimeout() {
      this.clickedLocation = { lat: 0, lng: 0 }
      this.endTimeMilliseconds = Date.now();
      console.log(this.clickedLocation, this.endTimeMilliseconds)
      // Loo vale vastus
      const userAnswer = {
        randomGameId: this.userGameId,
        locationId: this.randomLocation.locationId,
        clickedLocation: this.clickedLocation,
        startTimeMilliseconds: this.startTimeMilliseconds,
        endTimeMilliseconds: this.endTimeMilliseconds
      };
      console.log(userAnswer)

      // Saada vastus serverisse
      this.sendUserGameUserAnswer(userAnswer);

      // Peata timer
      this.stopTimer();
    },

    handleTimeout() {
      this.clickedLocation = { lat: 0, lng: 0 }
      this.endTimeMilliseconds = Date.now();
      console.log(this.clickedLocation, this.endTimeMilliseconds)
      // Loo vale vastus
      const userAnswer = {
        randomGameId: this.randomGameId,
        locationId: this.randomLocation.locationId,
        clickedLocation: this.clickedLocation,
        startTimeMilliseconds: this.startTimeMilliseconds,
        endTimeMilliseconds: this.endTimeMilliseconds
      };
      console.log(userAnswer)

      // Saada vastus serverisse
      this.sendUserAnswer(userAnswer);

      // Peata timer
      this.stopTimer();
    },

    stopTimer() {
      // Peata timer
      if (this.timerInterval) {
        clearInterval(this.timerInterval);
        this.timerInterval = null;
      }
    },

    updateTimerDisplay() {
      // Vorminda minutid ja sekundid kahekohaliseks (nt 05:09)
      const formattedMinutes = String(this.minutes).padStart(2, '0');
      const formattedSeconds = String(this.seconds).padStart(2, '0');

      // Uuenda timerit HTML-is
      document.getElementById('timer').textContent = `${formattedMinutes}:${formattedSeconds}`;
    }

  },
  mounted() {
    if (this.randomGameId) {
      this.getRandomGameLocations();
    } else {
      this.getUserGameLocations();
    }


  },
  beforeUnmount() {
    // Peata timer, kui komponent eemaldatakse
    this.stopTimer();

    // Tühista timeout, kui see on aktiivne
    if (this.timeoutId) {
      clearTimeout(this.timeoutId);
      this.timeoutId = null; // Tühjenda timeoutId
    }

    // Kustuta startTime sessionStorage-ist
    sessionStorage.removeItem(`startTime_${this.randomGameId}_${this.randomLocation.locationId}`);

    // Kustuta ka timer sessionStorage-ist, kui soovite
    sessionStorage.removeItem(`timer_${this.randomGameId}_${this.randomLocation.locationId}`);
  }
}

</script>

