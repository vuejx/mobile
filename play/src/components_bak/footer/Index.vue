<template>
    <FlexboxLayout flexDirection="row" justifyContent="space-between" id="footer" class="h-full" backgroundColor="#ffffff">
        <StackLayout class="p-4 pb-3" :class="{ active: (index === active) }"
            v-for="(btn,index) in btns" @tap="goTo(btn.link,index)" v-bind:key="index">
            <Label class="fa text-gray-900" :text="btn.icon | fonticon" iosOverflowSafeArea="false" horizontalAlignment="center" />
            <Label :text="btn.title" horizontalAlignment="center" class="mt-1"/>
        </StackLayout>
    </FlexboxLayout>
</template>

<script>
    export default {
        methods: {
            goTo(link, index) {
                if (link !== "") {
                }
            }
        },

        data() {
            return {
                btns: [{
                        icon: "fa-user",
                        title: "Quan tâm",
                        link: ""
                    },
                    {
                        icon: "fa-home",
                        title: "Home",
                        link: ""
                    },
                    {
                        icon: "fa-search",
                        title: "Tài khoản",
                        link: ''
                    }
                ],
                active: 0
            };
        }
    };
</script>

<style scoped>
    #footer {
        background-color:#ffffff;
    }

    #footer .btn {
        height: 100vh;
        padding: 0;
        margin: 0;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    #footer .btn.active {
        /* background:red; */
    }

</style>