<template>
  <div>
    <div class="page-container">
      <h2 class="webname">SellPhone</h2>
      <div id="rectangle"></div>
      <br />
      <div id="rect">
        <h3>Forget password</h3>
        <br />
        <form id="signinform" method="GET" @submit.prevent="submitForm()">
          <label for="password:">New Password : </label><br />
          <input
            required
            type="password"
            class="changable"
            name="password"
            id="password"
            v-model="form.password"
          /><br />

          <div class="form-group">
            <v-btn tile color="black" type="submit" class="button"
              >Submit</v-btn
            >
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "SignIn",
  data() {
    return {
      form: {
        password: "",
      },
    };
  },
  methods: {
    goToSignin() {
      this.$router.push("/signin");
    },

    submitForm() {
      axios
        .post("http://localhost:3000/resetpassword", {
          email: this.$route.query.email,
          password: this.form.password,
        })
        .then(
          (response) => {
            if (response.data.success == true) {
              alert(
                "successfully password changed of " + this.$route.query.email
              );
              this.$router.push("/signin");
            }
          },
          (error) => {}
        );
    },
  },
};
</script>

<style scoped>
.hide {
  display: none;
}
h2 {
  text-align: center;
}

.show {
  display: block;
}
.page-container {
  background-color: white;
  margin: auto auto 20px;
  width: 90%;
  display: flex;
  flex-direction: column;
  /*border: 2px solid black;*/
}
#rectangle {
  border: black;
  height: 37px;
  width: 100%;
  margin: 10px auto;
  background-color: #c4c4c4;
}
#rect {
  text-align: center;
  margin: 0px 450px 0px 450px;
  width: auto;
  height: auto;
  padding: 10px;
  border: 2px solid black;
  padding: 20px;
}
#btn {
  text-align: center;
  margin: 5px;
  width: auto;
  height: auto;
}

input {
  border: 1px solid black;
}
.webname {
  font-family: ManropeBold;
  font-size: 48px;
  cursor: pointer;
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

.button {
  text-align: center;
  margin: 10px auto 10px auto;
  width: 150px;
}
</style>
