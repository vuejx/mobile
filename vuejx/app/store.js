import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {

  },
  mutations: {

  },
  actions: {
    renewApp({ state }, payload) {

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
