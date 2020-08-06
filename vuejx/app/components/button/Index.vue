<template>
  <GridLayout columns="*, auto, *" rows="auto">
      <Button class="border p-3 m-3 fa" col="1">{{'' | fonticon}}  Close {{'fa-check' | fonticon}}</Button>
      <Button class="border p-3 m-3 fa" col="2">{{'' | fonticon}}  Close {{'fa-check' | fonticon}}</Button>
      <Button class="border p-3 m-3 fa" col="0">{{'' | fonticon}}  Close {{'fa-check' | fonticon}}</Button>
  </GridLayout>
</template>

<script >
export default {
  data() {
    return {
      msg: "Hello World!",
    };
  },
};
</script>
