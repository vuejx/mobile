<template>
    <GridLayout cols="*,auto,*" rows="*,auto,*">
        <GridLayout row="1" col="1" :columns="gridCols" :rows="isTablet ? heightTablet : heightPhone" class="rounded"
            iosOverflowSafeArea="false">
            <GridLayout :col="getIconPos()" :backgroundColor="iconBackgroundColor"
                :class="'lpi-icon ' + position" iosOverflowSafeArea="false">
                <vn-image-view :width="iconsize" :height="iconsize" :src_icon="icon" :tintColor="tintColor" :class="iconClass" v-if="icon.length > 1"/>
            </GridLayout>
            <GridLayout :col="getTextPos()" :backgroundColor="textBackgroundColor"
                :class="'lpi-text ' + position"
                iosOverflowSafeArea="false">
                <TextField v-model="current" :hint="hint" verticalAlignment="center" :class="textClass" class="placeholder-gray-700"
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
                isPhone: true,
                isTablet: false
            };
        },
        mounted() {
            let vm = this;
            vm.$nextTick(function() {
                vm.isPhone = vm.$store.state.appData['isPhone'];
                vm.isTablet = vm.$store.state.appData['isTablet'];
                vm.current = vm.value;
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
                default: "pt-2"
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
            }
        }
    };
</script>

<style scoped>
    .lpi-main {
        border-radius: 4;
    }
    .lpi-text {
        font-size: 13px;
    }
    TextField {
        margin: 0;
        padding: 0;
        width: 100%;
        border: none;
        border-width: 0;
        background-color: transparent;
    }
</style>