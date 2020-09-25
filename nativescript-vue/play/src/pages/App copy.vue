<template>
  <Page actionBarHidden="true">
    <GridLayout>

        <Frame id="home-page">
            <Home2></Home2>
        </Frame>

        <Frame @loaded="actionFrameLoaded">
            
            <Home1></Home1>
        </Frame>

        
    </GridLayout>
  </Page>
</template>

<script>
import { Screen } from '@nativescript/core';
import Home1 from './Home1';
import Home2 from './Home2';
var viewScreen = {
  template: `
  `,
};
export default {
  components: {
    viewScreen,
    Home1,
    Home2
  },
  data() {
    return {
      appData: {},
      currentComponent: "viewScreen",
    };
  },
  async mounted() {
    let vm = this;
  },
  methods: {
    sleep(ms) {
      return new Promise((resolve) => setTimeout(resolve, ms));
    },
    actionFrameLoaded(args) {
      const frame = args.object;
      frame.translateY = Screen.mainScreen.heightDIPs - 280;
      console.log('screenscreen', Screen.mainScreen.heightDIPs);
    }
  },
};
</script>