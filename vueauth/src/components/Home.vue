<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <h2>{{title}}</h2>
          <div id="card">
            <h1>{{this.$store.state.userData.name}}</h1>
            <h2>{{this.$store.state.userData.username}}</h2>
            <p class="admin" v-if='this.$store.state.userData.roles.includes("admin")'>You have got admin rights</p>
            <p class="no-admin" v-else>You do not have admin rights</p>
          </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'Home',

    data: () => ({
        title: "Home"
    }),
  }
</script>

<style scoped>
#card {
  margin: 100px auto;
  max-width: 300px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  text-align: center;
}

#card > * {
  padding: 20px;
}

.admin {
  color: white;
  background: darkgreen;
}

.no-admin {
  color: white;
  background: red;
}

</style>