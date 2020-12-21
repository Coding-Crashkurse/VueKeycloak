import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
      tokens: {
          access_token: "",
          refresh_token: ""
      },
      userData: {
          name: "",
          username: "",
          roles: [],
      },
      allusers: []
    },
    mutations: {
        store_name (state, data) {
            state.userData.name = data;
        },
        store_user (state, data) {
            state.userData.username = data;
        },
        store_roles(state, data) {
            state.userData.roles = data;
        },
        storetokens(state, data) {
            state.tokens = data;
        },
        storeusers(state, data) {
            console.log(state.allusers)
            state.allusers = data;
        }
    }
  });