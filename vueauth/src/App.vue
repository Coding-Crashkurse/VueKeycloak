<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <div>
        <h1>Keycloak Authentication App</h1>
      </div>

      <v-spacer></v-spacer>
      <v-btn x-large text to="/">Home</v-btn>
      <v-btn x-large text to="/admin">Admin<v-icon dark right>mdi-account-circle-outline</v-icon></v-btn>
      <v-btn x-large text @click="logout">Logout<v-icon dark right>mdi-logout</v-icon></v-btn>
    </v-app-bar>

    <v-main>
        <router-view></router-view>
    </v-main>  
  </v-app>
</template>

<script>


export default {
  name: 'App',

  data: () => ({
    
  }),
  methods: {
    logout() {
      this.$keycloak.logout()
    }
  }
};
</script>


<style scoped>

</style>