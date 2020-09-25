<template>
  <Page backgroundColor="blue"  actionBarHidden="true">
    <StackLayout>
        <Button text="home2" @tap="tapMeTap2" />
    </StackLayout>
  </Page>
</template>

<script>
import P2P from './P2P'
export default {
  components: {
    P2P
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
        "abc"
    );
      vm.$navigateTo(P2P, { frame: 'home-page' })
    },
  },
};
</script>