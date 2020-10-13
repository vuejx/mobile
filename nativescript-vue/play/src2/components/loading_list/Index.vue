<template>
  <AbsoluteLayout>
    <ActivityIndicator width="100%" height="100%" class="z-50" color="black" busy="true"></ActivityIndicator>
    <Label textWrap="true" textAlignment="center" class="pt-6 mt-3 text-gray-700" :class="classLoading"  width="100%" height="100%" :text="text"/>
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
      default: 'text-xs'
    }
  },
};
</script>
