<template>
  <AbsoluteLayout>
    <ActivityIndicator :width="width" :height="height" class="z-50" color="black" busy="true"></ActivityIndicator>
    <Label textWrap="true" textAlignment="center" :class="classLoading" :width="widthTxt" :height="heightTxt" :text="text"/>
  </AbsoluteLayout>
</template>
<script>
export default {
  props: {
    text: {
      type: String,
      default: 'Chờ trong giây lát'
    },
    classLoading: {
      type: String,
      default: 'text-xs text-gray-700 pt-6 mt-3'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '34'
    },
    widthTxt: {
      type: String,
      default: '100%'
    },
    heightTxt: {
      type: String,
      default: '100%'
    }
  },
};
</script>
