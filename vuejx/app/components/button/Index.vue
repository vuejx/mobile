<template>
  <StackLayout>
    <vn-loading v-if="loading"></vn-loading>
    <Button v-else class="border p-3 m-3 fa" @tap="click">{{icon | fonticon}} {{text}}</Button>
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
      default:'Button'
    },
    icon: {
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