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
/*
import { SocketIO, connect } from 'nativescript-socketio';


const server = 'http://localhost:3000';

connect(server)
var socketIO = new SocketIO(server, {});

socketIO.on('my-channel', function (data) {
  console.log('my-channel', data);
});

socketIO.on('error', function (error) {
  console.log('error', error);
});

socketIO.connect();

// App went to background...
Application.on(Application.suspendEvent, function (args) {
  console.log('chat is in background mode');
  socketIO.connect();

});

// App was reopened...
Application.on(Application.resumeEvent, function (args) {
  console.log('chat is not longer in background mode');
});


*/
global.Vue = Vue
global.Vue.$store = store
global.axios = axios
global.appSettings = appSettings
global.API = {
  vuejx: 'http://119.17.200.66:2480/vuejx',
  deviceType: Device.deviceType,
  isIOS: isIOS,
  isAndroid: isAndroid1,
  scale: Screen.mainScreen.scale,
  heightDIPs: Screen.mainScreen.heightDIPs
}
import VueJXKit from './components/vuejx-kit'

Vue.use(VueJXKit)

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = true //(TNS_ENV === 'production')

Vue.registerElement(
  'LottieView',
  () => require('nativescript-lottie').LottieView
);
Vue.registerElement(
  'PreviousNextView',
  () => require("nativescript-iqkeyboardmanager").PreviousNextView
);

new Vue({
  store,
  render: h => h('frame', [h(App)])
}).$start()
