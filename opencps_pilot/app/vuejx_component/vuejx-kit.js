/* eslint-disable */
import axios from 'axios';

export default {
  install(Vue) {
    const queryBody = {
      size: 10000,
      query: {
        bool: {
          must: [
            {
              match: {
                appName: 'mtso'
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
    varia['token'] = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJhY2NvdW50IjoiYWRtaW4iLCJhdXRob3IiOiJiaW5odGgudnVlanhAZ21haWwuY29tIiwicm9sZSI6WyJhZG1pbiJdLCJpYXQiOjE1OTEzNTU0MzJ9.z1POdOxEogsDlgYJD3vsFFaYUdv9ccCZ4CbhphwVFA4";
    global.axios.post('https://issues.fds.vn/vuejx/', {
      query: query,
      variables: JSON.stringify(varia)
    })
      .then(response => {
        let pullScreen = {};
          for (const el of response.data.data["results"]["hits"]["hits"]) {
            pullScreen[el["_source"]["shortName"]] = el["_source"];
          }
        for (let key in pullScreen) {
          Vue.component(key, eval("( " + pullScreen[key]['screenConfig'] + " )"));
        }
      })
      .catch(error => {
      })
  }
};
