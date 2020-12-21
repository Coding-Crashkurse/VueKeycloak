<template>
  <v-container>
    <v-row class="text-center">
      <v-col cols="12">
        <h2>{{title}}</h2>
        <p>You don´t have access to this site. Please contact your system admin.</p>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    name: 'Forbidden',

    data: () => ({
        title: "Forbidden"
    }),
  }
</script>
