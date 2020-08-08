<template>
  <Button class="border p-3 m-3 fa" @tap="click">{{icon | fonticon}} {{text}}</Button>
</template>

<script >
export default {
  data() {
    return {
      
    };
  },
  props:{
    text: {
      type: String
    },
    icon: {
      type: String,
      default: ""
    }
  },
  methods:{
    click(){
      this.$emit('tap')
    },
  }
};
</script>