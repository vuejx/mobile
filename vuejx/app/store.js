import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    appData: {
      reloadResourceScreen: false,
      apps: [],
      isPhone: null,
      isTablet: null,
      screen: {},
      props: {}
    },
    currentComponent: 'viewScreen'
  },
  mutations: {
    appData (state, data) {
      // mutate state
      state.appData = {...state.appData, ...data}
    },
    currentComponent (state, data) {
      // mutate state
      state.currentComponent = eval("( " + data + " )")
    }
  },
  actions: {
    async initApp(context) {
      const queryBody = {
        size: 10000,
        query: {
          bool: {
            must: [],
          },
        },
      };
      var query = `query search($token: String, $body: JSON, $db: String, $collection: String) {
        results: search(token: $token, body: $body, db: $db, collection: $collection )
      }`;
      context.commit('appData', {
        reloadResourceScreen: false,
        apps: [],
        screen: {}
      })
      await context.dispatch("graphqlQuery", {
          query: query,
          variables: {
            body: queryBody,
            db: "native_application",
            collection: "native_app,native_screen",
          },
        })
        .then((data) => {
          let pullScreen = {};
          let pullApps = [];
          for (const el of data["results"]["hits"]["hits"]) {
            if (el["_source"]["type"] === 'native_screen') {
              pullScreen[el["_source"]["shortName"]] = el["_source"];
            } else if (el["_source"]["type"] === 'native_app' && (el["_source"]["openAccess"] === '0' || el["_source"]["openAccess"] === '1')) {
              pullApps.push(el["_source"]);
            } 
          }
          context.commit('appData', {
            reloadResourceScreen: true,
            apps: pullApps,
            screen: pullScreen
          })
        })
        .catch((err) => {
          context.commit('appData', {
            reloadResourceScreen: true,
            apps: [],
            screen: {}
          })
        });
    },

    graphqlQuery({ state }, payload) {
      return new Promise((resolve, reject) => {
        let varia = payload.variables;
        varia['token'] = '';
        global.axios.post('https://issues.fds.vn/vuejx/', {
          query: payload.query,
          variables: JSON.stringify(varia)
        })
          .then(response => {
            resolve(response.data.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  }
});
