<template>
  <StackLayout>
    <Image :src="'https://issues.fds.vn'+src" :horizontalAlignment="alignment" :width="width" :height="height"/>
  </StackLayout>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    src: String,
    width: String,
    height: String,
    alignment: String
  },
};
</script>