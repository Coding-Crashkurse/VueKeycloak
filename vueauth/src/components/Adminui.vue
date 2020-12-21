<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <h2>{{title}}</h2>
        <p>This is you special admin console where you can access all users</p>
      </v-col>
    </v-row>
    <v-row>
      <v-btn x-large @click="retreiveUsers">Get all users!</v-btn>
    </v-row>
    <v-row>
      <div id="listwrapper" v-if="this.$store.state.allusers.length > 0">
        <p>You currently have got {{this.$store.state.allusers.length}} users:</p>
        <ul>
          <li v-for="item in this.$store.state.allusers" :key="item.id">
            username: {{ item.username }} | firstname: {{ item.firstName }} | lastname: {{ item.lastName }} 
          </li>
        </ul>
      </div>
    </v-row>
  </v-container>
</template>

<script>
import { store } from "../store/store";
  export default {
    name: 'Admin',

    data: () => ({
        title: "Admin console"
    }),
    methods: {
      retreiveUsers() {
      fetch('http://127.0.0.1:8080/auth/realms/master/protocol/openid-connect/token', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/x-www-form-urlencoded'
          },
          body: 'grant_type=password&username=test&password=123Sence&client_id=admin-cli'
      }).then(response => response.json())
        .then(function(data){
          fetch("http://127.0.0.1:8080/auth/admin/realms/myrealm/users", {
          headers: {
            Authorization: `Bearer ${data.access_token}`,
            "Cache-Control": "no-cache"
          }
          }).then(response => response.json())
            .then(data => store.commit("storeusers", data))
        })
        .catch(error => console.log(error));
      }
    }
  }
</script>


<style scoped>
#listwrapper {
  padding: 20px 10px;
  height: 200px;
  margin-top: 50px;
}

ul {
  list-style: none;
}

</style>