// Font Awesome imports
import {createApp} from 'vue'
import App from './App.vue'
import router from './router'
import VueAxios from "vue-axios";
import axios from "axios";
import {FontAwesomeIcon} from '@fortawesome/vue-fontawesome';
import {library} from '@fortawesome/fontawesome-svg-core';
import {faR, fas, faUserSecret} from '@fortawesome/free-solid-svg-icons';
import '@/assets/css/global.css'

// leaflet css
import 'leaflet/dist/leaflet.css'

import '@/assets/css/style.css' // kui on oma style.css fail
// bootstrap
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.js"
import {far} from '@fortawesome/free-regular-svg-icons'

// Add the imported icons to the library
library.add(faUserSecret, fas, faR, far)
// library.add(faEye, faEyeSlash)

const app = createApp(App)

// Register the FontAwesomeIcon component globally
app.component('font-awesome-icon', FontAwesomeIcon)

app.use(router)
app.use(VueAxios, axios)
app.mount('#app')
