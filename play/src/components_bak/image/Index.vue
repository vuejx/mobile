<template>
  <StackLayout :orientation="orientation">
    <Image :src="src_raw" :horizontalAlignment="alignment" :width="width" :height="height" v-if="src_raw.length > 10" />
    <Image :src="'~/assets/images/icons/' + src_icon + '/icon.png'" :horizontalAlignment="alignment" :width="width" :height="height" v-if="src_icon.length > 1" :tintColor="tintColor"/>
    <Image :src="'https://issues.fds.vn'+src" :horizontalAlignment="alignment" :width="width" :height="height" v-else/>
  </StackLayout>
</template>
<script>
export default {
  props: {
    src: String,
    src_raw: {
      type: String,
      default: ''
    },
    src_icon: {
      type: String,
      default: ''
    },
    tintColor: {
      type: String,
      default: ''
    },
    width: {
      type: String,
      default: '24'
    },
    height: {
      type: String,
      default: 'inherit'
    },
    orientation: {
      type: String,
      default: ''
    },
    alignment: String
  },
};
</script>