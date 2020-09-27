<template>
  <Page actionBarHidden="true">
    <vn-loading v-if="!readyStateComponent"></vn-loading>
    <StackLayout orientation="horizontal" v-else>
      <component width="100%" v-for="(value, key) in appData.screen" v-bind:key="key" :is="key"
        v-show="key === currentComponent"
      ></component>
    </StackLayout>
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
      readyStateComponent: false,
    };
  },
  computed: {
    // một computed getter
    currentComponent: function () {
      return this.$store.state.currentComponent;
    },
  },
  async mounted() {
    let vm = this;
    await vm.$store.dispatch("initApp");
    vm.appData = vm.$store.state.appData;
    vm.readyStateComponent = false;
    for (let key = 0; key < 1000; key++) {
      await vm.sleep(100);
      let componentExists = "login_mtso" in vm.$options.components;
      if (componentExists) {
        vm.readyStateComponent = true;
        break;
      }
    }
  },
  methods: {
    sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
    async navigateTest222(pag) {
      let vm = this;
      await vm.$store.commit("currentComponentX", pag);
    },
  },
};
</script>