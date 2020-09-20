<template>
  <StackLayout>
    <Image
      :src="'~/assets/images/skeleton/' + skeleton + '.gif'"
      :tintColor="tintColor"
    />
  </StackLayout>
</template>
<script>
export default {
  props: {
    skeleton: {
      type: String,
      default: "card",
    },
    tintColor: {
      type: String,
      default: "",
    },
  },
};
</script>
