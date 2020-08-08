<template>
  <Page actionBarHidden="true">
    <FlexboxLayout flexDirection="column" class="page">
      <ScrollView>
        <component :is="currentComponent"></component>
      </ScrollView>
      <StackLayout>
        <vn-btn icon="fa-refresh" @tap="reloadPage" width="70px" class="border-white text-white font-semibold rounded"></vn-btn>
      </StackLayout>
    </FlexboxLayout>
  </Page>
</template>
<script src="http://localhost:8098"></script>
<script>
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
      msg: "Hello World!",
      reloadResourceScreen: false,
      currentComponent: "viewScreen",
    };
  },
  async mounted() {
    let vm = this;
    const queryBody = {
      size: 10000,
      query: {
        bool: {
          must: [
          ],
        },
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
        console.log('data["results"]["hits"]["hits"]data["results"]["hits"]["hits"]', data["results"]["hits"]["hits"].length)
        for (const el of data["results"]["hits"]["hits"]) {
          global.screen[el["_source"]["shortName"]] = el["_source"];
        }
        viewScreen = eval("( " + global.screen["login"]["screenConfig"] + " )");
        vm.currentComponent = viewScreen;
        vm.reloadResourceScreen = true;
      })
      .catch((err) => {
        vm.currentComponent = "";
        vm.reloadResourceScreen = true;
      });
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
  background-image: url("http://119.17.200.66:2480/security/file/native_app/file-1596781452516.png");
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