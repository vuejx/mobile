<template>
  <Button class="border p-3 m-3 fa" @tap="click">{{'' | fonticon}}  {{label}} {{'fa-check' | fonticon}}</Button>
</template>

<script >
export default {
  data() {
    return {
      
    };
  },
  props:{
  	label: {
      type: String
    }
  },
  methods:{
    click(){
      this.$emit('tap')
    },    
  }
};
</script>
