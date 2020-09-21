<template>
  <GridLayout :columns="'auto, *, auto'" rows="*,auto,*" @tap="click" iosOverflowSafeArea="false" :class="{'tapPendding': label && tapPendding, 'tapPenddingText': label === '' && tapPendding}">
      <GridLayout col="0" row="1" iosOverflowSafeArea="false" v-if="appendIcon">
          <vn-image-view :height="iconSize" :width="iconSize" :src_icon="appendIcon" :tintColor="tintColor" :class="iconClass" />
      </GridLayout>
      <GridLayout col="1" row="1" cols="*" rows="*,auto,*">
          <Label col="0" row="1" textWrap="true" :textAlignment="textAlignment" :text="label" :class="labelCalss" />
      </GridLayout>
      <GridLayout col="2" row="1" iosOverflowSafeArea="false" v-if="prependIcon">
          <vn-image-view :height="iconSize" :width="iconSize" :src_icon="prependIcon" :tintColor="tintColor" :class="iconClass" />
      </GridLayout>
  </GridLayout>
</template>

<script >
export default {
  props:{
  	label: {
      type: String
    },
    tintColor: {
      type: String,
      default: ''
    },
  	iconClass: {
      type: String,
      default: ''
    },
  	textAlignment: {
      type: String,
      default: 'left'
    },
  	iconFill: {
      type: String,
      default: 'black'
    },
  	iconSize: {
      type: String,
      default: '20'
    },
  	appendIcon: {
      type: String,
      default: ''
    },
  	prependIcon: {
      type: String,
      default: ''
    },
    icon: {
      type: Boolean,
      default: false
    },
  	labelCalss: {
      type: String,
      default: ''
    },
  },
  data() {
    return {
      tapPendding: false
    };
  },
  methods:{
    click(){
      if (!this.tapPendding) {
        this.$emit('tap')
      }
      this.tapPendding = true;
      setTimeout(() => {
        this.tapPendding = false;
      }, 200);
    },    
  }
};
</script>
<style>
  .tapPendding {
    background-color: darkgray;
  }
  .tapPenddingText {
    color: darkgray;
  }
</style>