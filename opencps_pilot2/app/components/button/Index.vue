<template>
  <FlexboxLayout @tap="click" iosOverflowSafeArea="false" :flexDirection="label ? '': 'column'">
    <vn-image-view :height="iconSize" width="100%" :src_icon="appendIcon" :tintColor="tintColor" :class="iconClass" v-if="appendIcon"/>
    <Label :width="'100%'" textWrap="true" :textAlignment="prependIcon ? 'left' : textAlignment" :text="label" :class="labelCalss" v-if="label"/>
    <vn-image-view :height="iconSize" :width="iconSize" :src_icon="prependIcon" :tintColor="tintColor" :class="iconClass" v-if="prependIcon" class="-ml-8"/>
  </FlexboxLayout>
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
            }
        },
        data() {
            return {
                tapPendding: false
            };
        },
        methods: {
            click() {
                this.$emit("tap");
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