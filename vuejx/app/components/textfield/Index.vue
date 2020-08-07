<template>
    <GridLayout :columns="gridCols" rows="40" class="lpi-main"
        iosOverflowSafeArea="false">
        <GridLayout :col="getIconPos()" :backgroundColor="iconBackgroundColor"
            :class="'lpi-icon ' + position" iosOverflowSafeArea="false">
            <Label :class="iconset" :text="icon | fonticon" verticalAlignment="center"
                horizontalAlignment="center" iosOverflowSafeArea="false" />
        </GridLayout>
        <GridLayout :col="getTextPos()" :backgroundColor="textBackgroundColor"
            :class="'lpi-text ' + position + (border ? ' border':'')"
            iosOverflowSafeArea="false">
            <TextField v-model="current" :hint="hint" verticalAlignment="center"
                horizontalAlignment="left" :keyboardType="keyboard"
                iosOverflowSafeArea="false"/>
        </GridLayout>
    </GridLayout>
</template>

<script>
    export default {
        data() {
            return {
                current: undefined
            };
        },
        watch:{
            current: function(value) {
                this.$emit('input', value)
            }
        },
        created() {
            this.current = this.value;
        },
        computed: {
            gridCols() {
                return this.position === "left" ? "40, *" : "*, 40";
            }
        },
        props: {
            value: String,
            iconset: {
                type: String,
                default: "fa"
            },
            icon: {
                type: String,
                default: "fa-user"
            },
            iconBackgroundColor: {
                type: String,
                default: "#003c5a"
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
        border-radius: 5;
    }

    .lpi-icon {
        color: white;
        border-top-left-radius: 5;
        border-bottom-left-radius: 5;
        font-size: 20;
    }

    .lpi-icon.right {
        border-top-right-radius: 5;
        border-bottom-right-radius: 5;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
    }

    .lpi-text {
        color: #003c5a;
        padding: 10;
        border-top-right-radius: 5;
        border-bottom-right-radius: 5;
        font-size: 14;
    }

    .lpi-text.right {
        border-top-left-radius: 5;
        border-bottom-left-radius: 5;
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
    }

    .lpi-text.border {
        border-width: 1;
        border-color: #eee;
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