
<template>
  <select
      :value="selectedLocationId"
      @change="addLocationToGame"
      class="form-select dropdown-custom"

  >
    <option disabled selected value=0>Kõik kohad</option>
    <option
        v-for="location in locations"
        :key="location.locationId"
        :value="location.locationId"
        :class="{ 'highlighted': selectedLocationId === location.locationId  }"
    >
      {{ location.locationName }}
    </option>
  </select>

</template>

<script>
export default {
  name: 'LocationsDropdown',
  props: {
    locations: {
      type: Array,
      required: true
    },
    selectedLocationId: {
      type: Number,
      default: 0
    }
  },
  methods: {
    addLocationToGame(event) {
      this.$emit('event-new-location-selected', Number(event.target.value));
    }
  }
}
</script>
<style scoped>
.dropdown-custom {
  font-family: "Jersey 25", sans-serif !important; /* Kasuta sama fonti nagu lehel */
  font-size: 1.2rem !important; /* Sama fondi suurus nagu lehel */
  color: #1a426e !important; /* Sama tekstivärv nagu lehel */
  background-color: #ffffff !important; /* Valge taust */
  border: 2px solid #1a426e !important; /* Sinine piir */
  border-radius: 8px !important; /* Ümardatud nurgad */
  padding: 10px 10px !important; /* Polster */
  cursor: pointer !important; /* Näpukese kursor */
  width: 100%; /* Laius vastavalt ümbritsevale elemendile */
  margin-bottom: 15px !important; /* Tühik järgmise elemendi vahel */
}

.dropdown-custom:focus {
  outline: none !important; /* Eemalda vaikekontuur */
  border-color: #8cd390 !important; /* Roheline piir fookuse korral */
  box-shadow: 0 0 5px rgba(140, 211, 144, 0.5) !important; /* Kerge varjund fookuse korral */
}

.highlighted {
  background-color: lightskyblue !important; /* Hele sinine taust valitud valikule */
  font-weight: bold !important; /* Rasvane tekst valitud valikule */
  color: #1a426e !important; /* Teksti värv valitud valikule */
}

/* Dropdowni valikute stiil */
.dropdown-custom option {
  font-family: "Jersey 25", sans-serif !important; /* Kasuta sama fonti nagu lehel */
  font-size: 1.5rem !important; /* Sama fondi suurus nagu lehel */
  color: #1a426e !important; /* Sama tekstivärv nagu lehel */
  background-color: #ffffff !important; /* Valge taust */
}

/* Dropdowni noole stiil */
.dropdown-custom::-ms-expand {
  display: none; /* Peida nool IE jaoks */
}

.dropdown-custom::after {
  content: '\25BC'; /* Unicode noole sümbol */
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  pointer-events: none; /* Vältige klikkide blokeerimist */
}
</style>