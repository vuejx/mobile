import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    currentComponent: 'viewScreen'
  },
  mutations: {
    currentComponent(state, data) {
      // mutate state
      state.currentComponent = data
    }
  },
  actions: {
    /** GET ES */
    graphqlQuery({ }, payload) {
      return new Promise((resolve, reject) => {
        let varia = payload.variables;
        varia['token'] = localStorage.getItem('token');
        window.Vue.$axios.post(API.vuejx, {
          query: payload.query,
          variables: JSON.stringify(varia)
        }, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('access_token'),
            token: localStorage.getItem('token')
          }
        })
          .then(response => {
            console.log('responseresponseresponse', response, localStorage.getItem('token'));
            resolve(response.data.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    /** GET ES */
    graphqlQueryESDetail({ }, payload) {
      return new Promise((resolve, reject) => {
        let varia = payload.variables;
        varia['token'] = localStorage.getItem('token');
        window.Vue.$axios.post(API.vuejx, {
          query: payload.query,
          variables: JSON.stringify(varia)
        }, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('access_token'),
            token: localStorage.getItem('token')
          }
        })
          .then(response => {
            console.log('responseresponseresponse', response, localStorage.getItem('token'));
            resolve(response.data.data)
          })
          .catch(error => {
            reject(error)
          })
      })
    },
    /** CRUD */
    transaction({ }, payload) {
      var query = `mutation add($token: String, $body: JSON) {
      transaction: transaction(token: $token, body: $body)
    }`
      return new Promise((resolve, reject) => {
        window.Vue.$axios.post(API.vuejx, {
          query: query,
          variables: JSON.stringify({
            token: localStorage.getItem('token'),
            body: payload.body
          })
        }, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('access_token'),
            token: localStorage.getItem('token')
          }
        })
          .then(response => {
            resolve(response.data.data.transaction)
          })
          .catch(error => {
            console.log(error)
            reject(null)
          })
      })
    },
    userCreate({ }, payload) {
      var query = `mutation add($token: String, $db: String, $collection: String, $body: JSON, $actionCode: String) {
      userCreate: userCreate(token: $token, db: $db, collection: $collection, body: $body, actionCode: $actionCode)
    }`
      return new Promise((resolve, reject) => {
        window.Vue.$axios.post(API.vuejx, {
          query: query,
          variables: JSON.stringify({
            token: localStorage.getItem('token'),
            db: payload.db,
            collection: payload.collection,
            body: payload.body,
            actionCode: payload.actionCode
          })
        }, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('access_token'),
            token: localStorage.getItem('token')
          }
        })
          .then(response => {
            if (response.data.data.userCreate !== null) {
              resolve(response.data.data.userCreate)
            } else {
              resolve(response.data.errors[0])
            }
          })
          .catch(error => {
            console.log(error)
            reject(null)
          })
      })
    },
    userCreateMany({ }, payload) {
      var query = `mutation add($token: String, $db: String, $collection: String, $body: JSON, $actionCode: String) {
      userCreateMany: userCreateMany(token: $token, db: $db, collection: $collection, body: $body, actionCode: $actionCode)
    }`
      return new Promise((resolve, reject) => {
        window.Vue.$axios.post(API.vuejx, {
          query: query,
          variables: JSON.stringify({
            token: localStorage.getItem('token'),
            db: payload.db,
            collection: payload.collection,
            body: payload.body,
            actionCode: payload.actionCode
          })
        }, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('access_token'),
            token: localStorage.getItem('token')
          }
        })
          .then(response => {
            resolve(response.data.data.userCreateMany)
          })
          .catch(error => {
            console.log(error)
            reject(null)
          })
      })
    },
    userUpdateById({ }, payload) {
      var query = `mutation add($token: String, $db: String, $collection: String, $body: JSON, $actionCode: String) {
      userUpdateById: userUpdateById(token: $token, db: $db, collection: $collection, body: $body, actionCode: $actionCode)
    }`
      return new Promise((resolve, reject) => {
        window.Vue.$axios.post(API.vuejx, {
          query: query,
          variables: JSON.stringify({
            token: localStorage.getItem('token'),
            db: payload.db,
            collection: payload.collection,
            body: payload.body,
            actionCode: payload.actionCode
          })
        }, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('access_token'),
            token: localStorage.getItem('token')
          }
        })
          .then(response => {
            if (response.data.data.userUpdateById !== null) {
              resolve(response.data.data.userUpdateById)
            } else {
              resolve(response.data.errors[0])
            }
          })
          .catch(error => {
            console.log(error)
            reject(null)
          })
      })
    },
    userUpdateOne({ }, payload) {
      var query = `mutation add($token: String, $db: String, $collection: String, $body: JSON, $filter: JSON, $sort: JSON, $skip: Int, $actionCode: String) {
      userUpdateOne: userUpdateOne(token: $token, db: $db, collection: $collection, body: $body, filter: $filter, sort: $sort, skip: $skip, actionCode: $actionCode)
    }`
      return new Promise((resolve, reject) => {
        window.Vue.$axios.post(API.vuejx, {
          query: query,
          variables: JSON.stringify({
            token: localStorage.getItem('token'),
            db: payload.db,
            collection: payload.collection,
            body: payload.body,
            filter: payload.filter,
            sort: payload.sort,
            skip: payload.skip,
            actionCode: payload.actionCode
          })
        }, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('access_token'),
            token: localStorage.getItem('token')
          }
        })
          .then(response => {
            resolve(response.data.data.userUpdateOne)
          })
          .catch(error => {
            console.log(error)
            reject(null)
          })
      })
    },
    userUpdateManyAdmin({ }, payload) {
      var query = `mutation add($token: String, $db: String, $collection: String, $body: JSON, $filter: JSON, $sort: JSON, $skip: Int, $limit: Int, $actionCode: String) {
      userUpdateMany: updateManyAdmin(token: $token, db: $db, collection: $collection, body: $body, filter: $filter, sort: $sort, skip: $skip, limit: $limit, actionCode: $actionCode)
    }`
      return new Promise((resolve, reject) => {
        window.Vue.$axios.post(API.vuejx, {
          query: query,
          variables: JSON.stringify({
            token: localStorage.getItem('token'),
            db: payload.db,
            collection: payload.collection,
            body: payload.body,
            filter: payload.filter,
            sort: payload.sort,
            skip: payload.skip,
            limit: payload.limit,
            actionCode: payload.actionCode
          })
        }, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('access_token'),
            token: localStorage.getItem('token')
          }
        })
          .then(response => {
            resolve(response.data.data.userUpdateMany)
          })
          .catch(error => {
            console.log(error)
            reject(null)
          })
      })
    },
    userUpdateMany({ }, payload) {
      var query = `mutation add($token: String, $db: String, $collection: String, $body: JSON, $filter: JSON, $sort: JSON, $skip: Int, $limit: Int, $actionCode: String) {
      userUpdateMany: userUpdateMany(token: $token, db: $db, collection: $collection, body: $body, filter: $filter, sort: $sort, skip: $skip, limit: $limit, actionCode: $actionCode)
    }`
      return new Promise((resolve, reject) => {
        window.Vue.$axios.post(API.vuejx, {
          query: query,
          variables: JSON.stringify({
            token: localStorage.getItem('token'),
            db: payload.db,
            collection: payload.collection,
            body: payload.body,
            filter: payload.filter,
            sort: payload.sort,
            skip: payload.skip,
            limit: payload.limit,
            actionCode: payload.actionCode
          })
        }, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('access_token'),
            token: localStorage.getItem('token')
          }
        })
          .then(response => {
            resolve(response.data.data.userUpdateMany)
          })
          .catch(error => {
            console.log(error)
            reject(null)
          })
      })
    },
    moveToDB({ }, payload) {
      var query = `mutation add($token: String, $db: String, $collection: String, $filter: JSON) {
      moveToDB: moveToDB(token: $token, db: $db, collection: $collection, filter: $filter)
    }`
      return new Promise((resolve, reject) => {
        window.Vue.$axios.post(API.vuejx, {
          query: query,
          variables: JSON.stringify({
            token: localStorage.getItem('token'),
            db: payload.db,
            collection: payload.collection,
            filter: payload.filter
          })
        }, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('access_token'),
            token: localStorage.getItem('token')
          }
        })
          .then(response => {
            resolve(response.data.data.moveToDB)
          })
          .catch(error => {
            console.log(error)
            reject(null)
          })
      })
    },
    userRemoveById({ }, payload) {
      var query = `mutation add($token: String, $db: String, $collection: String, $id: String) {
      userRemoveById: userRemoveById(token: $token, db: $db, collection: $collection, id: $id)
    }`
      return new Promise((resolve, reject) => {
        window.Vue.$axios.post(API.vuejx, {
          query: query,
          variables: JSON.stringify({
            token: localStorage.getItem('token'),
            db: payload.db,
            collection: payload.collection,
            id: payload.id
          })
        }, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('access_token'),
            token: localStorage.getItem('token')
          }
        })
          .then(response => {
            resolve(response.data.data.userRemoveById)
          })
          .catch(error => {
            console.log(error)
            reject(null)
          })
      })
    },
    userRemoveOne({ }, payload) {
      var query = `mutation add($token: String, $db: String, $collection: String, $filter: JSON, $sort: JSON) {
      userRemoveOne: userRemoveOne(token: $token, db: $db, collection: $collection, filter: $filter, sort: $sort)
    }`
      return new Promise((resolve, reject) => {
        window.Vue.$axios.post(API.vuejx, {
          query: query,
          variables: JSON.stringify({
            token: localStorage.getItem('token'),
            db: payload.db,
            collection: payload.collection,
            filter: payload.filter,
            sort: payload.sort
          })
        }, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('access_token'),
            token: localStorage.getItem('token')
          }
        })
          .then(response => {
            resolve(response.data.data.userRemoveOne)
          })
          .catch(error => {
            console.log(error)
            reject(null)
          })
      })
    },
    userRemoveMany({ }, payload) {
      var query = `mutation add($token: String, $db: String, $collection: String, $filter: JSON) {
      userRemoveMany: userRemoveMany(token: $token, db: $db, collection: $collection, filter: $filter)
    }`
      return new Promise((resolve, reject) => {
        window.Vue.$axios.post(API.vuejx, {
          query: query,
          variables: JSON.stringify({
            token: localStorage.getItem('token'),
            db: payload.db,
            collection: payload.collection,
            filter: payload.filter
          })
        }, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('access_token'),
            token: localStorage.getItem('token')
          }
        })
          .then(response => {
            resolve(response.data.data.userRemoveMany)
          })
          .catch(error => {
            console.log(error)
            reject(null)
          })
      })
    },
    reindex({ }, payload) {
      var query = `mutation add($token: String, $db: String, $collection: String, $from: String, $until: String, $type: String, $all: String) {
      reindex: reindex(token: $token, db: $db, collection: $collection, from: $from, until: $until, type: $type, all: $all)
    }`
      return new Promise((resolve, reject) => {
        window.Vue.$axios.post(API.vuejx, {
          query: query,
          variables: JSON.stringify({
            token: localStorage.getItem('token'),
            db: payload.db,
            collection: payload.collection,
            from: payload.from,
            until: payload.until,
            type: String(payload.type),
            all: payload.all,
          })
        }, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('access_token'),
            token: localStorage.getItem('token')
          }
        })
          .then(response => {
            resolve(response)
          })
          .catch(error => {
            console.log(error)
            reject(null)
          })
      })
    },
    account(body) {
      var query = `mutation add($token: String, $body: JSON) {
      account: account(token: $token, body: $body)
    }`
      return new Promise((resolve, reject) => {
        window.Vue.$axios.post(API.vuejx, {
          query: query,
          variables: JSON.stringify({
            token: localStorage.getItem('token'),
            body: body
          })
        }, {
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('access_token'),
            token: localStorage.getItem('token')
          }
        })
          .then(response => {
            resolve(response.data.data.account)
          })
          .catch(error => {
            console.log(error)
            reject(null)
          })
      })
    },
    auth0() {
      return new Promise((resolve, reject) => {
        window.Vue.$axios.post(API.vuejx + 'fwd/auth0', {
          "token": localStorage.getItem('token'),
          "app": localStorage.getItem('client'),
          "site": localStorage.getItem('site')
        }).then(response => {
          resolve(response.data);
        })
          .catch(error => {
            reject(null)
          })
      })
    }
  }
});
