import Vue from 'nativescript-vue'
import App from './pages/App'
import store from './store'
import axios from "axios"
const appSettings = require("@nativescript/core/application-settings")
const Device = require("@nativescript/core/platform").Device
const isAndroid1 = require("@nativescript/core/platform").isAndroid
const isIOS = require("@nativescript/core/platform").isIOS
import RadChart from "nativescript-ui-chart/vue";
Vue.use(RadChart);
import { Screen, Application } from '@nativescript/core';

var firebase = require("@nativescript/firebase").firebase;

global.Vue = Vue
global.Vue.$store = store
global.axios = axios
global.appSettings = appSettings
global.API = {
  username: '_',
  site: 'guest',
  vuejx: 'https://issues.fds.vn/vuejx',
  deviceType: Device.deviceType,
  isIOS: isIOS,
  isAndroid: isAndroid1,
  scale: Screen.mainScreen.scale,
  heightDIPs: Screen.mainScreen.heightDIPs,
  firebase: firebase,
  Application: Application
}
import VueJXKit from './components/vuejx-kit'

Vue.use(VueJXKit)

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = true //(TNS_ENV === 'production')

Vue.registerElement(
  'PreviousNextView',
  () => require("nativescript-iqkeyboardmanager").PreviousNextView
);

new Vue({
  store,
  render: h => h('frame', [h(App)])
}).$start()
