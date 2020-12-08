/* eslint-disable */
import VNTableSimple from './table/Index.vue'
import VNTableSimplePagging from './pagging/Index.vue'
import VNDataReport from './data/report/Index.vue'
import VnText from './textfield/Index.vue'
import VnBtn from './button/Index.vue'
import VnImageView from './image/Index.vue'
import CardView from './card/Index.vue'
import LoadingSkeleton from './loading_list/Index.vue'

export default {
  install(Vue) {

    Vue.component('vuejx-table-simple', VNTableSimple)
    Vue.component('vuejx-data-report', VNDataReport)
    Vue.component('vn-btn', VnBtn)
    Vue.component('vn-text', VnText)
    Vue.component('vn-image-view', VnImageView)
    Vue.component('vn-card', CardView)
    Vue.component('vuejx-data-pagging', VNTableSimplePagging)
    Vue.component('vn-skeleton', LoadingSkeleton)
    
  }
};
