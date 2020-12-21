import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import { routes } from "./routes";
import VueRouter from 'vue-router';
import Keycloak from 'keycloak-js';
import VueJwtDecode from 'vue-jwt-decode'
import { store } from "./store/store";

const router = new VueRouter({
  routes: routes
});

Vue.config.productionTip = false
Vue.use(VueRouter);

let initOptions = {
  url: 'http://127.0.0.1:8080/auth', realm: 'myrealm', clientId: 'app-vue', onLoad: 'login-required'
}

let keycloak = Keycloak(initOptions);
Vue.prototype.$keycloak = keycloak

keycloak.init({ onLoad: initOptions.onLoad }).then((auth) => {
  if (!auth) {
    window.location.reload();
  } else {
    new Vue({
      vuetify, router, store,
      render: h => h(App,  { props: { keycloak: keycloak } })
    }).$mount('#app')

  }
  store.commit("storetokens", {access_token: keycloak.idToken, refresh_token: keycloak.refreshToken})
  const decoded = VueJwtDecode.decode(keycloak.token)
  console.log(keycloak.idToken)
  const name = decoded.name
  const username = decoded.preferred_username
  const roles = decoded.realm_access.roles
  store.commit("store_name", name)
  store.commit("store_user", username)
  store.commit("store_roles", roles)

//Token Refresh
  setInterval(() => {
    if(store.state.userData.logged_out) {
      keycloak.logout()
    } else {
      keycloak.updateToken(70).then((refreshed) => {
        if (refreshed) {
          console.log('Token refreshed' + refreshed);
        } else {
          console.log('Token not refreshed, valid for '
            + Math.round(keycloak.tokenParsed.exp + keycloak.timeSkew - new Date().getTime() / 1000) + ' seconds');
        }
      }).catch(() => {
        console.log('Failed to refresh token');
      });
    }
  }, 6000)

}).catch(() => {
  console.log("Authenticated Failed");
});