<template>
  <GridLayout :columns="'auto, *, auto'" :rows="'*'" @tap="click" iosOverflowSafeArea="false">
      <GridLayout :col="'0'" iosOverflowSafeArea="false" v-if="appendIcon">
          <SVGImage :src="'~/assets/svg/' + appendIcon + '/' + iconFill + '.svg'" :height="iconSize" :width="iconSize" />
      </GridLayout>
      <GridLayout :col="'1'">
          <Label textWrap="true" :textAlignment="textAlignment" :text="label" :class="labelCalss" />
      </GridLayout>
      <GridLayout :col="'2'" iosOverflowSafeArea="false" v-if="prependIcon">
          <SVGImage :src="'~/assets/svg/' + prependIcon + '/' + iconFill + '.svg'" :height="iconSize" :width="iconSize" />
      </GridLayout>
  </GridLayout>
</template>

<script >
export default {
  props:{
  	label: {
      type: String
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
