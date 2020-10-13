<template>
  <DockLayout stretchLastChild="true">
    <GridLayout dock="top" columns="80,*,160" rows="35" class="border-b border-gray-200 pb-1">
      <Button text="" backgroundColor="#EFEFEF" col="0" row="0" class="ml-4 mr-1"/>
      <Button text="" backgroundColor="#EFEFEF" col="1" row="0" class="mx-1"/>
      <Button text="" backgroundColor="#EFEFEF" col="2" row="0" class="ml-1 mr-4"/>
    </GridLayout>
    <GridLayout dock="bottom" columns="*,*,*,*" rows="35" class="border-t border-gray-200 pt-1 pb-2">
      <Button text="" backgroundColor="#EFEFEF" col="0" row="0" class="ml-4 mr-1"/>
      <Button text="" backgroundColor="#EFEFEF" col="1" row="0" class="mx-1"/>
      <Button text="" backgroundColor="#EFEFEF" col="2" row="0" class="mx-1"/>
      <Button text="" backgroundColor="#EFEFEF" col="3" row="0" class="ml-1 mr-4"/>
    </GridLayout>
    <StackLayout height="100%">
      <StackLayout v-show="loadingList">
        <GridLayout columns="*,100" rows="35" class="my-4">
            <Button text="" backgroundColor="#f7f7f7" col="0" row="0" class="ml-4 mr-1"/>
            <Button text="" backgroundColor="#f7f7f7" col="2" row="0" class="ml-1 mr-4"/>
        </GridLayout>
        <lottie-view
          height="180"
          src="~/assets/images/skeleton/grid-lisst-skeleton-loading.json"
          loop="true"
          autoPlay="true"
        ></lottie-view>
        <lottie-view
          height="180"
          src="~/assets/images/skeleton/grid-lisst-skeleton-loading.json"
          loop="true"
          autoPlay="true"
        ></lottie-view>
      </StackLayout>
    </StackLayout>
  </DockLayout>
</template>

<script>
export default {
  props: {},
  data() {
    return {
      loadingList: true,
    };
  },
  methods: {},
};
</script>
<style>
.tapPendding {
  background-color: darkgray;
}
.tapPenddingText {
  color: darkgray;
}
</style>