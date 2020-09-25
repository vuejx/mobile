/* eslint-disable */
import VNTableSimple from './table/Index.vue'
import VnText from './textfield/Index.vue'
import VnBtn from './button/Index.vue'
import VnImageView from './image/Index.vue'
import CardView from './card/Index.vue'

export default {
  install(Vue) {

    Vue.component('vuejx-table-simple', VNTableSimple)
    Vue.component('vn-btn', VnBtn)
    Vue.component('vn-text', VnText)
    Vue.component('vn-image-view', VnImageView)
    Vue.component('vn-card', CardView)
  }
};
