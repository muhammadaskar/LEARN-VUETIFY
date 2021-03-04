<template>
  <v-app>
    <v-container>
      <v-card elevation="6" class="mt-5">
        <!-- <div v-if="!error"> -->
        <v-alert v-if="error" color="red" elevation="4" type="info"
          >gagal login</v-alert
        >
        <!-- </div> -->
        <v-card-title>
          <h1 class="text-center">Login</h1>
        </v-card-title>
        <v-form v-model="isValid">
          <v-card-text>
            <v-text-field
              label="Email"
              prepend-icon="mdi-account-circle"
              v-model="user.email"
              :rules="emailRules"
            ></v-text-field>
            <v-text-field
              :type="showPassword ? 'text' : 'password'"
              label="Password"
              prepend-icon="mdi-key"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              @click:append="handleClick"
              v-model="user.password"
              :rules="passwordRules"
            ></v-text-field>
          </v-card-text>
          <v-card-actions class="align-content-center">
            <v-btn color="success" @click="handleSubmit" :disabled="!isValid">
              Login</v-btn
            >
            <v-btn color="info">Register</v-btn>
          </v-card-actions>
        </v-form>
      </v-card>
    </v-container>
  </v-app>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      showPassword: false,
      user: {
        email: "",
        password: "",
      },
      emailRules: [
        (value) => value != "" || "Email is required !",
        (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
      ],
      passwordRules: [
        (v) => v != "" || "Password is required !",
        (v) => v.length <= 8 || "Passsword max length 8 character !",
      ],
      isValid: false,
      error: false,
      isLoggedIn: false,
    };
  },
  created() {},
  methods: {
    handleClick() {
      this.showPassword = !this.showPassword;
    },
    handleSubmit() {
      if (
        this.user.email === "askar@gmail.com" &&
        this.user.password === "askar"
      ) {
        localStorage.setItem("token", "AsJhjdsh");
        this.$swal.fire({
          position: "top-end",
          icon: "success",
          title: "You are logged in",
          showConfirmButton: false,
          timer: 1500,
        });
        this.$router.push("home");
      } else {
        // this.error = true;
        this.$swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Something went wrong!",
        });
      }
    },
  },
};
</script>