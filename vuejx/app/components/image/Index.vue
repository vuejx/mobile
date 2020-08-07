<template>
  <Image :src="'http://119.17.200.66:2480'+src" stretch="fill" col="1" :width="width" :height="height"/>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    src: String,
    width: String,
    height: String
  },
};
</script>