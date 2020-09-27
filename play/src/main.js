import Vue from 'nativescript-vue'
import App from './pages/App'
import store from './store'
import axios from "axios"
const appSettings = require("@nativescript/core/application-settings")
global.Vue = Vue
global.Vue.$store = store
global.axios = axios
global.appSettings = appSettings
global.API = {
  vuejx: 'http://119.17.200.66:2480/vuejx'
}
import VueJXKit from './components/vuejx-kit'

Vue.use(VueJXKit)

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')

Vue.registerElement(
  'LottieView',
  () => require('nativescript-lottie').LottieView
);

new Vue({
  store,
  render: h => h('frame', [h(App)])
}).$start()
