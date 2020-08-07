import Vue from 'nativescript-vue'
import App from './pages/App'
import store from './store'
import axios from "axios"
global.axios = axios
global.Buffer = global.Buffer || require('buffer').Buffer;
global.screen = {}
var viewScreen = null;
global.viewScreen = viewScreen;

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
Vue.registerElement('PDFView', () => require('nativescript-pdf-view').PDFView)

// Prints Vue logs when --env.production is *NOT* set while building
Vue.config.silent = (TNS_ENV === 'production')
// register component
import VnBtn from './components/button/Index.vue'
import VnText from './components/textfield/Index.vue'
import VnImageView from './components/image/Index.vue'
import VnPdf from './components/pdf/Index.vue'

Vue.component('vn-btn', VnBtn)
Vue.component('vn-text', VnText)
Vue.component('vn-image-view', VnImageView)
Vue.component('vn-pdf', VnPdf)

new Vue({
  store,
  render: h => h('frame', [h(App)]),
  mounted() {
    global.store = this.$store
  },
}).$start()
