<template>
  <Page actionBarHidden="true" backgroundColor="red" v-show="currentComponent === 'viewScreen'">
    <StackLayout height="260" verticalAlignment="top">

        <Button text="home1" @tap="tapMeTap" />

        <Button :text="item" v-for="(item, index) in items" v-bind:key="index"/>

    </StackLayout>
  </Page>
</template>

<script>
export default {
  data() {
    return {
      items: ['1', '2']
    };
  },
  computed: {
    // một computed getter
    currentComponent: function () {
      if (this.$store.state.currentComponent === 'abc') {
        this.items = ['1', '2', '2', '2', '2', '2', '2', '2', '2', '2', '2', '2', '2', '2', '2', '2', '2', '2']
      } else {
        this.items = ['1', '2']
      }
      return this.$store.state.currentComponent;
    },
  },
  methods: {
    tapMeTap() {
      alert('tapMeTap')
    },
  },
};
</script>