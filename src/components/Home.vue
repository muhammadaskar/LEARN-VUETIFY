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
      this.$swal
        .fire({
          title: "Are you sure?",
          text: "You won't be able to revert this!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes",
        })
        .then((result) => {
          if (result.isConfirmed) {
            this.$swal.fire("Success!", "Success Logout.", "success");
            localStorage.removeItem("token");
            this.$router.push("login");
          }
        });
    },
  },
};
</script>