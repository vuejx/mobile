<template>
  <StackLayout height="100%" backgroundColor="#F9FCFE">
    <lottie-view
      v-show="loadingList"
      class="m-4 mb-0 bg-white rounded border border-gray-400"
      height="160"
      src="~/assets/images/skeleton/grid-lisst-skeleton-loading.json"
      loop="true"
      autoPlay="true"
    ></lottie-view>
    <lottie-view
      v-show="loadingList"
      class="m-4 mb-0 bg-white rounded border border-gray-400"
      height="160"
      src="~/assets/images/skeleton/grid-lisst-skeleton-loading.json"
      loop="true"
      autoPlay="true"
    ></lottie-view>
    <GridLayout
      :columns="'auto, auto, auto'"
      :rows="'*'"
      class="m-4 bg-white rounded bg-white rounded border border-gray-400"
    >
      <slot class="slot" name="content"></slot>
    </GridLayout>
  </StackLayout>
</template>

<script>
export default {
  props: {
    db: {
      type: String,
      default: () => {
        return "";
      },
    },
    collection: {
      type: String,
      default: () => {
        return "";
      },
    },
    includes: {
      type: Array,
      default: () => {
        return [];
      },
    },
    sort: {
      type: Array,
      default: () => {
        return [];
      },
    },
    pagesize: {
      type: Number,
      default: () => {
        return 15;
      },
    },
    paging: {
      type: Boolean,
      default: () => {
        return true;
      },
    },
    condition: {
      type: Array,
      default: () => {
        return [];
      },
    },
    queryFilter: {
      type: Array,
      default: () => {
        return [];
      },
    },
    keywords: {
      type: Array,
      default: () => {
        return [];
      },
    },
    queryParam: {
      type: Boolean,
      default: () => {
        return true;
      },
    },
    empty: {
      type: Boolean,
      default: () => {
        return false;
      },
    },
  },
  data() {
    return {
      loadingList: true,
      isPhone: true,
    };
  },
  methods: {},
};
</script>
