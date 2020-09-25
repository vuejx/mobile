<template>
  <StackLayout :height="isAndroid ? androidheight : '100%'" :class="tapPendding ? 'opacity-50': ''" >
    <ActivityIndicator v-if="tapPendding" width="100%" height="100%" class="z-50" color="black" busy="true"></ActivityIndicator>
    <GridLayout v-else :columns="(appendIcon? '30,' : '') + '*' + (prependIcon? ',30' : '')" rows="*">
        <vn-image-view row="0" col="0" :orientation="flexDirection === 'column' ? '' : 'horizontal'" :src_icon="appendIcon" :tintColor="tintColor" :class="iconClass" v-if="appendIcon"/>
        <Label row="0" :col="appendIcon && prependIcon ? '1': prependIcon ? '0': '1'" @loaded="onLabelLoaded" textWrap="true" :textAlignment="prependIcon ? 'left' : textAlignment" :text="label" :class="labelCalss" :height="flexDirection === 'column' ? labelheight : '100%'"/>
        <vn-image-view row="0" col="2" :src_icon="prependIcon" :tintColor="tintColor" :class="iconClass" v-if="prependIcon"/>
    </GridLayout>
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
                default: ""
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
            },
            androidheight: {
                type: String,
                default: '40'
            }
        },
        data() {
            return {
                tapPendding: false,
                isIOS: true,
                isAndroid: false
            };
        },
        mounted() {
            let vm = this;
            vm.$nextTick(function() {
                vm.isIOS = global.API.isIOS
                vm.isAndroid = global.API.isAndroid
            })
        },
        methods: {
            click() {
                let vm = this;
                vm.tapPendding = true;
                setTimeout(() => {
                    vm.tapPendding = false;
                }, 200);
                vm.$emit("tap");
            },
            onLabelLoaded(args) {
                if (args.object.android) {
                    args.object.android.setGravity(16)
                }
            }
        }
    };
</script>
<style>
    .tapPendding {
        background-color: darkgray;
    }
</style>