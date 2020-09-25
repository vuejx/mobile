<template>
  <StackLayout height="100%" :class="tapPendding ? 'opacity-50': ''">
    <ActivityIndicator v-if="tapPendding" width="100%" height="100%" class="z-50" color="black" busy="true"></ActivityIndicator>
    <FlexboxLayout v-else @tap="click" iosOverflowSafeArea="false" height="100%" width="100%" :flexDirection="flexDirection">
        <vn-image-view :orientation="flexDirection === 'column' ? '' : 'horizontal'" :height="iconSize" :width="iconSize" :src_icon="appendIcon" :tintColor="tintColor" :class="iconClass" v-if="appendIcon" />
        <Label :width="'100%'" textWrap="true" :textAlignment="prependIcon ? 'left' : textAlignment" :text="label" :class="labelCalss" v-if="label" :height="flexDirection === 'column' ? labelheight : ''"/>
        <vn-image-view :height="iconSize" :width="iconSize" :src_icon="prependIcon" :tintColor="tintColor" :class="iconClass" v-if="prependIcon" class="-ml-6" style="padding-top: 3px;"/>
    </FlexboxLayout>
  </StackLayout>
</template>

<script>
    export default {
        props: {
            label: {
                type: String
            },
            tintColor: {
                type: String,
                default: ""
            },
            iconClass: {
                type: String,
                default: "pt-1"
            },
            textAlignment: {
                type: String,
                default: "center"
            },
            iconFill: {
                type: String,
                default: "black"
            },
            iconSize: {
                type: String,
                default: "20"
            },
            appendIcon: {
                type: String,
                default: ""
            },
            prependIcon: {
                type: String,
                default: ""
            },
            icon: {
                type: Boolean,
                default: false
            },
            labelCalss: {
                type: String,
                default: ""
            },
            loading: {
                type: Boolean,
                default: false
            },
            flexDirection: {
                type: String,
                default: ''
            },
            labelheight: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                tapPendding: false
            };
        },
        methods: {
            click() {
                let vm = this;
                vm.tapPendding = true;
                setTimeout(() => {
                    vm.tapPendding = false;
                }, 1000);
                vm.$emit("tap");
            }
        }
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