<template>
  <Page actionBarHidden="true">
    <GridLayout v-if="!dkmsss">
      <WebView src="https://drive.google.com/viewerng/viewer?embedded=true&url=http://119.17.200.66:8099/file/export_lich/vea/48/2020" @loadStarted="loadStarted" @loadFinished="loadFinished"/>
    </GridLayout>
    <GridLayout v-else>
      <WebView src="https://drive.google.com/viewerng/viewer?embedded=true&url=http://119.17.200.66:8099/file/export_lich/vea/48/2020"/>
    </GridLayout>
  </Page>
</template>

<script>
export default {

  data: () => ({
    dkmsss: false,
    inject: false
  }),
  async mounted() {
    let vm = this;
    if (global.appSettings.getString("extData")) {
      vm.$store.commit("extData", JSON.parse(global.appSettings.getString("extData")));
    }
    await global.Vue.$store.dispatch("pullPlayground", vm.$options.components);
    /*
    vm.$navigateTo("tcmt", {
      transition: { name: "fade", duration: 0 },
      transitioniOS: { name: "fade", duration: 0 },
      transitionAndroid: { name: "fade", duration: 0 },
    });
    */
  },
  methods: {
    loadFinished() {
      let vm = this;
      vm.dkmsss = true;
    },
    loadStarted() {
    }
  }
};
</script>