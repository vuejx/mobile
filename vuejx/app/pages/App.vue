<template>
  <Page actionBarHidden="true">
    <FlexboxLayout class="page">
      <StackLayout>
        <vn-btn icon="fa-refresh" @tap="reloadPage"  width="70px"></vn-btn>
      </StackLayout>
      <vn-loading v-if="!appData.reloadResourceScreen"></vn-loading>
      <component v-else :is="currentComponent"></component>
    </FlexboxLayout>
  </Page>
</template>
<script>
import { screen } from 'tns-core-modules/platform';
const device = require("tns-core-modules/platform").device;
const DeviceType = require("tns-core-modules/ui/enums").DeviceType;
var viewScreen = {
  template: `
  `,
};
export default {
  components: {
    viewScreen,
  },
  data() {
    return {
      appData: {},
      currentComponent: 'viewScreen'
    };
  },
  async mounted() {
    let vm = this;
    await vm.$store.dispatch("initApp");
    vm.appData = vm.$store.state.appData;
    this.isPhone = device.deviceType == DeviceType.Phone;
    this.isTablet = device.deviceType == DeviceType.Tablet;
     await vm.$store.commit("appData", {
        isPhone: device.deviceType == DeviceType.Phone,
        isTablet: device.deviceType == DeviceType.Tablet
     });
    await vm.$store.commit("currentComponent", vm.$store.state.appData.screen['login']['screenConfig']);
    vm.currentComponent = vm.$store.state.currentComponent;
  },
  methods: {
    // Load lại page trang issues
    async reloadPage() {
      let vm = this;
      const queryBody = {
        size: 100,
        query: {
          match_all: {}
        },
      };
      var query = `query search($token: String, $body: JSON, $db: String, $collection: String) {
          results: search(token: $token, body: $body, db: $db, collection: $collection )
        }`;
      vm.reloadResourceScreen = false;
      await vm.$store
        .dispatch("graphqlQuery", {
          query: query,
          variables: {
            body: queryBody,
            db: "native_application",
            collection: "native_screen",
          },
        })
        .then((data) => {
          global.screen = {};
          for (const el of data["results"]["hits"]["hits"]) {
            global.screen[el["_source"]["shortName"]] = el["_source"];
          }
          vm.currentComponent = eval("( " + global.screen["login"]["screenConfig"] + " )");
          vm.reloadResourceScreen = true;
        })
        .catch((err) => {
          vm.currentComponent = "";
          vm.reloadResourceScreen = true;
        });
    }
  }
};
</script>

<style scoped>
.page {
  align-items: center !important;
  flex-direction: column !important;
  background-image: url("~/assets/images/bg_bgt.png");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

.form {
  margin-left: 30;
  margin-right: 30;
  flex-grow: 2;
  vertical-align: middle;
}
</style>