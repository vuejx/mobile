<template>
  <StackLayout class="bg-white pt-6" borderRadius="10"  :width="width">
    <GridLayout columns="*, 40" rows="1" @tap="dkm" :class="{'h-6': !showPanel, 'h-5': showPanel}">
      <Button col="0" class="text-left text-gray-900 text-lg p-2 pl-4 fa" @tap="dkm">{{ title }}</Button>
      <Button col="1" class="-mr-1 text-gray-500 text-xs fa mt-1" @tap="dkm">{{ showPanel ? 'fa-chevron-up': 'fa-chevron-right' | fonticon}}</Button>
    </GridLayout>
    <GridLayout v-show="showPanel" rows="auto" iosOverflowSafeArea="false">
        <slot class="slot" name="content"></slot>
    </GridLayout>
  </StackLayout>
</template>
<script>
export default {
  data() {
    return {
      showPanel: true
    };
  },
  props: {
    title: String,
    width: String,
    height: String,
    alignment: String,
    closeable: Boolean,
    width: String
  },
  methods: {
    dkm() {
      if (this.closeable) {
        this.showPanel = !this.showPanel
      }
    }
  }
};
</script>
<style>
</style>