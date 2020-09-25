<template>
  <GridLayout>
    <PDFView :src="linkSrcPDF"></PDFView>
  </GridLayout>
</template>

<script >
export default {
  props: {
    linkSrcPDF: {
      type: String,
      required: true
    }
  }
};
</script>
<style scoped>

</style>