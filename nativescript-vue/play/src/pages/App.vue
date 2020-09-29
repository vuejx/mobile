<template>
  <Page actionBarHidden="true">
  </Page>
</template>

<script>
export default {
  async mounted() {
    let vm = this;
    if (global.appSettings.getString("extData")) {
      vm.$store.commit("extData", JSON.parse(global.appSettings.getString("extData")));
    }
    await global.Vue.$store.dispatch("pullPlayground", vm.$options.components);
    vm.$navigateTo("vuejx_playground", {
      transition: { name: "fade", duration: 0 },
      transitioniOS: { name: "fade", duration: 0 },
      transitionAndroid: { name: "fade", duration: 0 },
    });
  }
};
</script>