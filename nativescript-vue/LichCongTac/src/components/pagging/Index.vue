<template>
  <GridLayout
    :columns="
      (title ? '20, *' : '*') + ', auto, auto, auto, auto, auto, auto'
    "
    :rows="isIOS ? '40' : '40'"
  >
    <slot
        class="slot"
        name="icon"
    >
      <vn-btn
        row="0"
        col="0"
        :tintColor="tintColorTitle"
        :appendIcon="paggingFirstIcon"
        @tap="paggingTitleAction"
      >
      </vn-btn>
    </slot>
    <slot
        class="slot"
        name="title"
    >
      <vn-btn v-if="title" 
        :class="titleClass"
        @tap="paggingTitleAction"
        :col="!isTablet ? '1': '2'" row="0" :label="title" textAlignment="left">
      </vn-btn>
    </slot>
    <slot
        class="slot"
        name="pagging"
    >
      <vn-btn
        row="0"
        :col="!isTablet ? '2': '3'"
        :label="!isTablet ? '' : 'Trang đầu'"
        :appendIcon="!isTablet ? 'first_page' : 'first_page'"
        :tintColor="tintColorPagging"
        @tap="paggingData('first')"
      >
      </vn-btn>
      <vn-btn
        row="0"
        :col="!isTablet ? '3': '4'"
        :label="!isTablet ? '' : 'Trang trước'"
        :appendIcon="!isTablet ? 'navigate_before' : 'navigate_before'"
        @tap="paggingData('prev')"
        :tintColor="tintColorPagging"
      >
      </vn-btn>
      <vn-btn
        row="0"
        :tapable="false"
        :col="!isTablet ? '4': '5'"
        :label="'Trang ' + currentPageView"
        :tintColor="tintColorPagging"
        :class="titleClass"
      >
      </vn-btn>
      <vn-btn
        row="0"
        :col="!isTablet ? '5': '6'"
        :label="!isTablet ? '' : 'Trang sau'"
        :appendIcon="!isTablet ? 'navigate_next' : 'navigate_next'"
        :tintColor="tintColorPagging"
        @tap="paggingData('next')"
      >
      </vn-btn>
      <vn-btn
        row="0"
        :col="!isTablet ? '6': '7'"
        :label="!isTablet ? '' : 'Trang cuối'"
        :appendIcon="!isTablet ? 'last_page' : 'last_page'"
        :tintColor="tintColorPagging"
        @tap="paggingData('last')"
      >
      </vn-btn>
    </slot>
  </GridLayout>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "",
    },
    titleClass: {
      type: String,
      default: "",
    },
    tintColorTitle: {
      type: String,
      default: "",
    },
    tintColorPagging: {
      type: String,
      default: "",
    },
    pagging: {
      type: Boolean,
      default: false,
    },
    totalData: {
      type: Number,
      default: 0
    },
    page: {
      type: Number,
      default: 1
    },
    pages: {
      type: Number,
      default: 1
    },
    pageSize: {
      type: Number,
      default: 10
    },
    paggingFirstIcon: {
      type: String,
      default: "navigate_before",
    }
  },
  data() {
    return {
      tapPendding: false,
      isIOS: true,
      isAndroid: false,
      isTablet: false,
      currentPage: 1,
      from: 0
    };
  },
  computed: {
    // một computed getter
    currentPageView: function () {
      return this.currentPage;
    },
  },
  mounted() {
    let vm = this;
    vm.$nextTick(function () {
      vm.isIOS = global.API.isIOS;
      if (global.API) {
        vm.isAndroid = global.API.isAndroid;
        vm.isTablet = global.API.deviceType === 'Phone' ? false : true;
      }
      vm.currentPage = 1;
      vm.from = 0;
    });
  },
  methods: {
    paggingTitleAction() {
      let vm = this;
      vm.$emit("paggingTitleAction");
    },
    onLabelLoaded(args) {
      if (args.object.android) {
        args.object.android.setGravity(16);
      }
    },
    paggingData(type) {
      let vm = this;
      if (type === 'first' && vm.currentPage != 1){
        vm.currentPage = 1;
        vm.$emit('pullData', vm.currentPage);
      }
      if (type === 'prev' && vm.currentPage != 1){
        vm.currentPage --;
        vm.$emit('pullData', vm.currentPage);
      }
      if (type === 'next' && vm.currentPage < vm.pages){
        vm.currentPage ++;
        vm.$emit('pullData', vm.currentPage);
      }
      if (type === 'last' && vm.currentPage != vm.pages){
        vm.currentPage = vm.pages;
        vm.$emit('pullData', vm.currentPage);
      }
    }
  },
};
</script>
