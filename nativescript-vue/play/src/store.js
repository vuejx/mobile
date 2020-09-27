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
    _id: ''
  },
  mutations: {
    currentComponent(state, data) {
      // mutate state
      state.currentComponent = data
    },
    props (state, data) {
      state.props = data
    },
    _id (state, data) {
      state._id = data
    },
  },
  actions: {
    /** GET ES */
    graphqlQuery({ state }, payload) {
      return new Promise((resolve, reject) => {
        let varia = payload.variables;
        let token = global.appSettings.getString("token") ? global.appSettings.getString("token") : 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICItWG5fV0NFWmFHdU43UkpSRm5WN010YWg1M1A5dmRUVi03Y1V1b3VhTXBNIn0.eyJqdGkiOiI1MDU5MGMxMS1lMzM5LTQxYTktYjc1Yi00MmFjYTg3YjE4ZTgiLCJleHAiOjE2MDI0MjIzNDEsIm5iZiI6MCwiaWF0IjoxNTk5ODMwMzQxLCJpc3MiOiJodHRwOi8vc3NvLWJndHZ0LmZkcy52bi9hdXRoL3JlYWxtcy9zc28tZGVtbyIsImF1ZCI6WyJQTS0wMDMiLCJhY2NvdW50Il0sInN1YiI6IjYwY2VhMGYxLWNlNzUtNGRlMS05NzVkLTNiMzBkODU3ZWZlMCIsInR5cCI6IkJlYXJlciIsImF6cCI6IlBNLTAwNCIsImF1dGhfdGltZSI6MCwic2Vzc2lvbl9zdGF0ZSI6ImMzNzY3NDJiLTgxMjAtNGMzMi05ZDZmLWRjYzg4MTkwYmE1MCIsImFjciI6IjEiLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiMDExIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiUE0tMDAzIjp7InJvbGVzIjpbImxhbmhkYW9kb252aSJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoiZW1haWwgcHJvZmlsZSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwibmFtZSI6IkfEkC4gTMOqIFRoYW5oIFTDuW5nIGFkbWluIiwicHJlZmVycmVkX3VzZXJuYW1lIjoidHVuZ2x0IiwiZ2l2ZW5fbmFtZSI6IkfEkC4gTMOqIFRoYW5oIFTDuW5nIiwiZmFtaWx5X25hbWUiOiJhZG1pbiJ9.aA5Zk2M2c90QfEc3RyCJQs9pzdYHhOqMdz21B-W05zI6RsEVhKYjYSoBbzIycEF3Wc092RhReVUVE56c0Os1QdRXdCWFwPmDg874vBEk1LmuugN3WTWUJjgkDeOXA3uYxC-ehwfkcpf-k5K1024G4DCmrPj1AmrAuTTCIBa423lii8_TgU36tDemIp0D_lRb0J2XAKNgWXNqXTQImAT29EUyldILUe1UBDZZ9h_rhhAT6EDyFDbmyYiXTHXo3QO9pn9wJQmZow9OIuweumKxYuV0T2h0z7yOYMLN37le-b-YOs10HKs5XKxa9-8Y_ECTGATboIuWmECzs5z0mjwtQQ';
        token = 'eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICItWG5fV0NFWmFHdU43UkpSRm5WN010YWg1M1A5dmRUVi03Y1V1b3VhTXBNIn0.eyJqdGkiOiI1MDU5MGMxMS1lMzM5LTQxYTktYjc1Yi00MmFjYTg3YjE4ZTgiLCJleHAiOjE2MDI0MjIzNDEsIm5iZiI6MCwiaWF0IjoxNTk5ODMwMzQxLCJpc3MiOiJodHRwOi8vc3NvLWJndHZ0LmZkcy52bi9hdXRoL3JlYWxtcy9zc28tZGVtbyIsImF1ZCI6WyJQTS0wMDMiLCJhY2NvdW50Il0sInN1YiI6IjYwY2VhMGYxLWNlNzUtNGRlMS05NzVkLTNiMzBkODU3ZWZlMCIsInR5cCI6IkJlYXJlciIsImF6cCI6IlBNLTAwNCIsImF1dGhfdGltZSI6MCwic2Vzc2lvbl9zdGF0ZSI6ImMzNzY3NDJiLTgxMjAtNGMzMi05ZDZmLWRjYzg4MTkwYmE1MCIsImFjciI6IjEiLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsiMDExIl19LCJyZXNvdXJjZV9hY2Nlc3MiOnsiUE0tMDAzIjp7InJvbGVzIjpbImxhbmhkYW9kb252aSJdfSwiYWNjb3VudCI6eyJyb2xlcyI6WyJtYW5hZ2UtYWNjb3VudCIsInZpZXctcHJvZmlsZSJdfX0sInNjb3BlIjoiZW1haWwgcHJvZmlsZSIsImVtYWlsX3ZlcmlmaWVkIjpmYWxzZSwibmFtZSI6IkfEkC4gTMOqIFRoYW5oIFTDuW5nIGFkbWluIiwicHJlZmVycmVkX3VzZXJuYW1lIjoidHVuZ2x0IiwiZ2l2ZW5fbmFtZSI6IkfEkC4gTMOqIFRoYW5oIFTDuW5nIiwiZmFtaWx5X25hbWUiOiJhZG1pbiJ9.aA5Zk2M2c90QfEc3RyCJQs9pzdYHhOqMdz21B-W05zI6RsEVhKYjYSoBbzIycEF3Wc092RhReVUVE56c0Os1QdRXdCWFwPmDg874vBEk1LmuugN3WTWUJjgkDeOXA3uYxC-ehwfkcpf-k5K1024G4DCmrPj1AmrAuTTCIBa423lii8_TgU36tDemIp0D_lRb0J2XAKNgWXNqXTQImAT29EUyldILUe1UBDZZ9h_rhhAT6EDyFDbmyYiXTHXo3QO9pn9wJQmZow9OIuweumKxYuV0T2h0z7yOYMLN37le-b-YOs10HKs5XKxa9-8Y_ECTGATboIuWmECzs5z0mjwtQQ';
        varia['token'] = token;
        global.axios.post(global.API.vuejx, {
          query: payload.query,
          variables: JSON.stringify(varia)
        }, {
          headers: {
            Authorization: 'Bearer ' + token,
            token: token
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
          results: search(token: $token, body: $body, db: $db, collection: $collection )
        }`;
        let varia = {
          body: queryBody,
          db: "native_application",
          collection: "native_screen",
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
              await sleep(10)
            } while (!('vuejx_playground' in components));
            resolve('done')
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  }
});
