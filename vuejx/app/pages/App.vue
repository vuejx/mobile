<template>
  <Page actionBarHidden="true">
    <FlexboxLayout class="page">
      <component :is="currentComponent"></component>
    </FlexboxLayout>
  </Page>
</template>

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
      size: 1,
      query: {
        bool: {
          must: [
            {
              match: {
                shortName: "login",
              },
            },
            {
              match: {
                appName: "login",
              },
            },
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
};
</script>

<style scoped>
.page {
  align-items: center !important;
  flex-direction: column !important;
  background-image: url('http://119.17.200.66:2480/security/file/native_app/file-1596781452516.png');
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