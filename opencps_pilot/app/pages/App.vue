<template>
  <Page actionBarHidden="true">
    <FlexboxLayout class="page">
      <vn-loading v-if="!appData.reloadResourceScreen"></vn-loading>
      <component v-else :is="currentComponent" ></component>
    </FlexboxLayout>
  </Page>
</template>

<script>
import { screen } from 'tns-core-modules/platform';
const device = require("tns-core-modules/platform").device;
const DeviceType = require("tns-core-modules/ui/enums").DeviceType;
var viewScreen = {
  template: `
  `,
};
export default {
  components: {
    viewScreen,
  },
  data() {
    return {
      appData: {},
      currentComponent: 'viewScreen'
    };
  },
  async mounted() {
    let vm = this;
    await vm.$store.dispatch("initApp");
    vm.appData = vm.$store.state.appData;
    await vm.$store.commit("appData", {
      isPhone: device.deviceType == DeviceType.Phone,
      isTablet: device.deviceType == DeviceType.Tablet
    });
    await vm.$store.commit("currentComponent", vm.$store.state.appData.screen['opencps_landing']['screenConfig']);
    vm.currentComponent = vm.$store.state.currentComponent;
  },
};
</script>
<style>
  .svg-white svg {
    fill: white !important;
  }
</style>