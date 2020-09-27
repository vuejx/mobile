import Vue from 'nativescript-vue'
import App from './pages/App'
import store from './store'
import axios from "axios";

global.axios = axios;

import RadChart from "nativescript-ui-chart/vue";
Vue.use(RadChart);

// Uncommment the following to see NativeScript-Vue output logs
Vue.config.silent = false;

import VnBtn from './components/button/Index'
import VnText from './components/textfield/Index'
import VnImageView from './components/image/Index'
import LoadingScreen from './components/loading/Index'
import LoadingSkeleton from './components/loading_list/Index'
import VnFooter from './components/footer/Index'
import CardView from './components/card/Index'
import VnPdf from './components/pdf/Index'

Vue.component('vn-btn', VnBtn)
Vue.component('vn-text', VnText)
Vue.component('vn-image-view', VnImageView)
Vue.component('vn-loading', LoadingScreen)
Vue.component('vn-skeleton', LoadingSkeleton)
Vue.component('vn-footer', VnFooter)
Vue.component('vn-card', CardView)
Vue.component('vn-pdf', VnPdf)


Vue.registerElement('PDFView', () => require('nativescript-pdf-view').PDFView)

new Vue({
  store,
  render: h => h('frame', [h(App)])
}).$start()
