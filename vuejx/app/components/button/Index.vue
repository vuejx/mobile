<template>
  <StackLayout>
    <vn-loading v-if="loading"></vn-loading>
    <Button v-else class="border p-3 m-3 fa" @tap="click">{{icon_before | fonticon}} {{text}} {{icon_after | fonticon}}</Button>
  </StackLayout>
</template>

<script >
export default {
  data() {
    return {
      
    };
  },
  props:{
    text: {
      type: String,
      default:""
    },
    icon_before: {
      type: String,
      default: ""
    },
    icon_after: {
      type: String,
      default: ""
    },
    loading: {
      type: Boolean,
      default:false
    }
  },
  methods:{
    click(){
      this.$emit('tap')
    },
  }
};
</script>