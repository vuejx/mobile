<template>
  <StackLayout>
    <Image :src="'http://119.17.200.66:2480'+src" :horizontalAlignment="alignment" :width="width" :height="height"/>
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