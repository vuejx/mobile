<template>
  <Page actionBarHidden="true">
    <FlexboxLayout class="page">
      <vn-loading></vn-loading>
    </FlexboxLayout>
  </Page>
</template>

<script>
import { screen } from "tns-core-modules/platform";
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
      currentComponent: "viewScreen",
    };
  },
  async mounted() {
    let vm = this;
    await vm.$store.dispatch("initApp");
    vm.$store.commit("load");
    vm.$store.commit("appData", {
      isPhone: device.deviceType == DeviceType.Phone,
      isTablet: device.deviceType == DeviceType.Tablet,
      props: {},
    });
    let inPage = "login_mtso";
    if (vm.$store.state.appData["token"]) {
      inPage = "router_mtso";
    }
    await vm.$store.commit(
        "currentComponent",
        vm.$store.state.appData.screen[inPage][
            "screenConfig"
        ]
    );
    vm.currentComponent = vm.$store.state.currentComponent;
    vm.$navigateTo(vm.currentComponent, {
      transition: { name: "fade", duration: 0 },
      transitioniOS: { name: "fade", duration: 0 },
      transitionAndroid: { name: "fade", duration: 0 },
    });
  },
  methods: {
    sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
  },
};
</script>