import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

async function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export default new Vuex.Store({
  state: {
    currentComponent: 'viewScreen',
    props: { },
    extData: { },
    loginData: { },
    _id: ''
  },
  mutations: {
    currentComponent(state, data) {
      // mutate state
      state.currentComponent = data
    },
    props (state, data) {
      state.props = {}
      state.props = data
    },
    extData (state, data) {
      state.extData = {}
      state.extData = data
      global.appSettings.setString("extData", JSON.stringify(data))
    },
    loginData (state, data) {
      state.loginData = {}
      state.loginData = data
    },
    _id (state, data) {
      state._id = ''
      state._id = data
    },
  },
  actions: {
    /** GET ES */
    graphqlQuery({ state }, payload) {
      return new Promise((resolve, reject) => {
        let varia = payload.variables;
        varia['token'] = global.appSettings.getString("token");
        global.axios.post(global.API.vuejx, {
          query: payload.query,
          variables: JSON.stringify(varia)
        }, {
          headers: {
            Authorization: 'Bearer ' + global.appSettings.getString("token"),
            token: global.appSettings.getString("token")
          }
        })
          .then(response => {
            resolve(response.data.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    pullPlayground({ state }, components) {
      return new Promise((resolve, reject) => {
        const queryBody = {
          size: 1,
          query: {
            bool: {
              must: [
                {
                  match: {
                    appName: 'vuejx_playground'
                  }
                },
                {
                  match: {
                    shortName: 'vuejx_playground'
                  }
                }
              ],
            },
          },
        };
        var query = `query search($token: String, $body: JSON, $db: String, $collection: String) {
          results: search(token: $token, body: $body, db: $db, collection: $collection)
        }`;
        let varia = {
          body: queryBody,
          db: "native_application",
          collection: "native_screen"
        };
        varia['token'] = global.appSettings.getString("token");
        global.axios.post(global.API.vuejx, {
          query: query,
          variables: JSON.stringify(varia)
        }, {
          headers: {
            Authorization: 'Bearer ' + global.appSettings.getString("token"),
            token: global.appSettings.getString("token")
          }
        })
          .then(async response => {
            do {
              global.Vue.component('vuejx_playground', eval("( " + response.data.data.results.hits.hits[0]['_source']['screenConfig'] + " )"))
              await sleep(100)
            } while (!('vuejx_playground' in components));
            resolve('done')
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    toPage({ state }, payload) {
      return new Promise(async (resolve, reject) => {
        if (global.appSettings.getString(payload.shortName)) {
          do {
            global.Vue.component(payload.shortName, eval("( " + global.appSettings.getString(payload.shortName) + " )"))
            await sleep(10)
          } while (!(payload.shortName in payload.components));
          resolve('done')
        } else {
          const queryBody = {
            size: 1,
            query: {
              bool: {
                must: [
                  {
                    match: {
                      shortName: payload.shortName
                    }
                  }
                ],
              },
            },
          };
          var query = `query search($token: String, $body: JSON, $db: String, $collection: String) {
            results: search(token: $token, body: $body, db: $db, collection: $collection)
          }`;
          let varia = {
            body: queryBody,
            db: "native_application",
            collection: "native_screen"
          };
          varia['token'] = global.appSettings.getString("token");
          global.axios.post(global.API.vuejx, {
            query: query,
            variables: JSON.stringify(varia)
          }, {
            headers: {
              Authorization: 'Bearer ' + global.appSettings.getString("token"),
              token: global.appSettings.getString("token")
            }
          })
            .then(async response => {
              do {
                global.Vue.component(payload.shortName, eval("( " + response.data.data.results.hits.hits[0]['_source']['screenConfig'] + " )"))
                await sleep(100)
              } while (!(payload.shortName in payload.components));
              resolve('done')
            })
            .catch(error => {
              reject(error)
            })
        }
        
      })
    }
  }
});
