import Vue from 'nativescript-vue'
import App from './pages/App'
import store from './store'
import axios from "axios"
global.axios = axios
global.screen = {}

import VueDevtools from 'nativescript-vue-devtools'
Vue.use(VueDevtools)

import { TNSFontIcon, fonticon } from './nativescript-fonticon';
TNSFontIcon.debug = false;
TNSFontIcon.paths = {
    'fa': './fonts/font-awesome.css',
    'ion': './fonts/ionicons.css'
};
TNSFontIcon.loadCss();
Vue.filter('fonticon', fonticon);

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')
// register component
import VnBtn from './components/button/Index.vue'
import VnText from './components/textfield/Index.vue'

Vue.component('vn-btn', VnBtn)
Vue.component('vn-text', VnText)

new Vue({
  store,
  render: h => h('frame', [h(App)]),
  mounted() {
    global.store = this.$store
  },
}).$start()
