<template>
  <Page backgroundColor="green" actionBarHidden="true">
    <StackLayout>

        <Button text="home2 p2" @tap="tapMeTap2" />
    </StackLayout>
  </Page>
</template>

<script>
import Home2 from './Home2'
export default {
  components: {
    Home2
  },
  data() {
    return {
    };
  },
  watch: {
    $route: function() {
      console.log('$route$route$route$route')
    }
  },
  methods: {
    async tapMeTap2() {
      let vm = this;
      await vm.$store.commit(
        "currentComponent",
        "viewScreen"
    );
      vm.$navigateTo(Home2, { frame: 'home-page' })
    },
  },
};
</script>