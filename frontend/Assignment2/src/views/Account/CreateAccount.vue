<template>
  <div>
    <banner></banner>
    <div class="page-container">
      <div id="rect">
        <h3 class="page-name">Sign Up</h3>
        <form method="POST" @submit.prevent="submitForm()">
          <div class="form-group">
            <label for="email">Username: </label>
            <input
              class="changable"
              id="email"
              type="email"
              name="email"
              v-model="form.email"
              required
            />
          </div>
          <div class="form-group">
            <label for="password">Password:</label>
            <input
              type="password"
              class="changable"
              name="password"
              id="password"
              v-model="form.password"
              required
            />
          </div>
          <div class="form-group">
            <label for="firstname">Firstname: </label>
            <input
              type="text"
              class="changable"
              name="firstname"
              id="firstname"
              v-model="form.firstname"
              required
            />
          </div>
          <div class="form-group">
            <label for="lastname">Lastname:</label>
            <input
              type="text"
              class="changable"
              name="lastname"
              id="lastname"
              v-model="form.lastname"
              required
            />
          </div>
          <div class="form-group">
            <v-btn tile color="black" type="submit" class="button"
              >Sign Up</v-btn
            >
          </div>
        </form>
      </div>
      <v-btn tile color="black" class="button" @click="goToSignin()"
        >Sign In
      </v-btn>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import banner from "@/components/common/Banner";
export default {
  name: "create-account",
  components: {
    banner,
  },
  data() {
    return {
      form: {
        email: "",
        password: "",
        firstname: "",
        lastname: "",
      },
      reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
    };
  },
  methods: {
    goToSignin() {
      this.$router.push("/signin");
    },

    submitForm() {
      if (!this.reg.test(this.form.email)) {
        alert("Please Enter Correct Email");
      } else {
        axios
          .post("http://localhost:3000/signup", {
            firstname: this.form.firstname,
            lastname: this.form.lastname,
            email: this.form.email,
            password: this.form.password,
          })
          .then(
            (response) => {
              if (response.data.success == true) {
                alert(
                  "account created successfully please check email to verify"
                );
                this.$router.push("/signin");
              } else {
                alert(
                  "user account already exitst OR please check your details OR verify your email "
                );
              }
            },
            (error) => {}
          );
      }
    },
  },
};
</script>
<style scoped>
.page-container {
  background-color: white;
  margin: auto auto 20px;
  width: 90%;
  display: flex;
  flex-direction: column;
  /*border: 2px solid black;*/
}

#rect {
  display: flex;
  flex-direction: column;
  text-align: center;
  margin: 20px auto 20px auto;
  width: 400px;
  height: 500px;
  border: 2px solid black;
}

.button {
  text-align: center;
  margin: 10px auto 10px auto;
  width: 150px;
}

input {
  border: 1px solid black;
}

.form-group {
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: column;
}

.changable {
  border: 1px solid black;
  width: 300px;
  margin: 10px auto 10px auto;
  height: 30px;
}

.page-name {
  font-family: ManropeBold;
  font-size: 36px;
}
</style>
