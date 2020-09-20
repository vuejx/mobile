<template>
  <GridLayout :columns="'auto, *, auto'" :rows="'*'" @tap="click" iosOverflowSafeArea="false">
      <GridLayout :col="'0'" iosOverflowSafeArea="false" v-if="appendIcon">
          <vn-image-view :height="iconSize" :width="iconSize" :src_icon="appendIcon" :tintColor="tintColor" :class="iconClass" />
      </GridLayout>
      <GridLayout :col="'1'">
          <Label textWrap="true" :textAlignment="textAlignment" :text="label" :class="labelCalss" />
      </GridLayout>
      <GridLayout :col="'2'" iosOverflowSafeArea="false" v-if="prependIcon">
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
      type: Number,
      default: 20
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
  methods:{
    click(){
      this.$emit('tap')
    },    
  }
};
</script>
