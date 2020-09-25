<template>
    <GridLayout cols="*,auto,*" rows="*,auto,*">
        <GridLayout row="1" col="1" :columns="gridCols" :rows="isTablet ? heightTablet : heightPhone"
            iosOverflowSafeArea="false">
            <GridLayout :col="getIconPos()" :backgroundColor="iconBackgroundColor" :class="getIconPos() === 0 ? 'rounded-l-lg' : 'rounded-r-lg'"
                iosOverflowSafeArea="false"
                @tap="iconTap"
            >
                <vn-image-view :width="iconsize" :height="iconsize" :src_icon="icon" :tintColor="tintColor" :class="iconClass" v-if="icon.length > 1"/>
            </GridLayout>
            <GridLayout :col="getTextPos()" :backgroundColor="textBackgroundColor" :class="getTextPos() === 0 ? 'rounded-l-lg' : 'rounded-r-lg'"
                iosOverflowSafeArea="false">
                <TextField v-model="current" :hint="hint" verticalAlignment="center" :class="textClass" class="placeholder-gray-700" width="100%"
                    horizontalAlignment="left" :keyboardType="keyboard" autocapitalizationType="none"
                    iosOverflowSafeArea="false" :secure="secure" :height="isTablet ? heightTablet : heightPhone" />
            </GridLayout>
        </GridLayout>
    </GridLayout>
    
</template>

<script>
    export default {
        data() {
            return {
                current: undefined,
                isTablet: false
            };
        },
        mounted() {
            let vm = this;
            vm.$nextTick(function() {
                vm.isTablet = global.API.deviceType === 'Phone' ? false : true;
            })
        },
        watch: {
            current: function(value) {
                this.$emit('input', value)
            }
        },
        computed: {
            gridCols() {
                if (this.icon.length > 1) {
                    return this.position === "left" ? "40, " + this.maxWidth : this.maxWidth + ", 40";
                } else {
                    return this.position === "left" ? "12, " + this.maxWidth : this.maxWidth + ", 12";
                }
            }
        },
        props: {
            maxWidth: {
                type: String,
                default: '600'
            },
            tintColor: {
                type: String,
                default: ''
            },
            heightTablet: {
                type: String,
                default: '40'
            },
            heightPhone: {
                type: String,
                default: '28'
            },
            iconsize: {
                type: String,
                default: "24"
            },
            iconClass: {
                type: String,
                default: ""
            },
            icon: {
                type: String,
                default: ""
            },
            iconBackgroundColor: {
                type: String,
                default: "#ffffff"
            },
            textClass: {
                type: String,
                default: "text-sm"
            },
            textBackgroundColor: {
                type: String,
                default: "white"
            },
            position: {
                type: String,
                default: "right",
                validator: val => ["left", "right"].includes(val)
            },
            border: {
                type: Boolean,
                default: false
            },
            hint: {
                type: String,
                default: ""
            },
            keyboard: {
                type: String,
                default: ""
            },
            secure: {
                type: Boolean,
                default: false
            },
            value: {
                type: String,
                default: ""
            }
        },
        name: "TextFieldI",
        methods: {
            getIconPos() {
                return this.position === "left" ? 0 : 1;
            },
            getTextPos() {
                return this.position === "left" ? 1 : 0;
            },
            updateSel(val) {
                this.current = val;
                this.$emit("input", val);
            },
            iconTap() {
                this.$emit('tap')
            }
        }
    };
</script>
<style>
    TextField {
        border-bottom-width: 1;
        border-bottom-color: transparent;
    }
</style>