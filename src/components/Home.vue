<template>
  <v-app>
    <v-container>
      <v-card>
        <v-btn class="ml-3 mt-2" small color="error" @click="logout"
          >Logout</v-btn
        >
        <v-card-text> Hello </v-card-text>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data: () => ({
    loggedIn: false,
  }),
  created() {
    if (localStorage.getItem("token")) {
      this.loggedIn = true;
    }
  },
  methods: {
    logout() {
      localStorage.removeItem("token");
      this.$router.push("login");
    },
  },
};
</script>