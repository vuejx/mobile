<template>
  <Page actionBarHidden="true">
  </Page>
</template>

<script>
export default {
  async mounted() {
    let vm = this;
    await global.Vue.$store.dispatch("pullPlayground", vm.$options.components);
    vm.$navigateTo("vuejx_playground", {
      transition: { name: "fade", duration: 0 },
      transitioniOS: { name: "fade", duration: 0 },
      transitionAndroid: { name: "fade", duration: 0 },
    });
  }
};
</script>