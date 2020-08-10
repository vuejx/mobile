import Vue from 'vue';
import Vuex from 'vuex';
import axios from "axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    appData: {
      reloadResourceScreen: false,
      currentComponent: "loadingScreen",
      apps: [],
      isPhone: null,
      isTablet: null,
    }
  },
  mutations: {

  },
  actions: {
    renewApp({ state }, payload) {

    },

    graphqlQuery({ state }, payload) {
      return new Promise((resolve, reject) => {
        let varia = payload.variables;
        varia['token'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50IjoiYWRtaW4iLCJhdXRob3IiOiJiaW5odGgudnVlanhAZ21haWwuY29tIiwicm9sZSI6WyJhZG1pbiJdLCJpYXQiOjE1OTEzNTU0MzJ9.z1POdOxEogsDlgYJD3vsFFaYUdv9ccCZ4CbhphwVFA4';
        axios.post('https://issues.fds.vn/vuejx/', {
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
