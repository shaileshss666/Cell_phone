<template>
  <div>
    <banner></banner>
    <div class="page-container">
      <div id="rect">
        <h3 class="page-name">Log In</h3>
        <form id="signinform" method="GET">
          <div class="form-group">
            <label class="label">Username: </label>
            <input
              type="email"
              class="changable"
              name="email"
              id="email"
              v-model="form.email"
            />
          </div>

          <div class="form-group">
            <label>Password</label>
            <input
              class="changable"
              type="password"
              name="password"
              id="password"
              v-model="form.password"
              required
            />
          </div>
          <div class="form-group">
            <button class="forgetbtn" @click="goToforget()">
              forget password ?
            </button>
            <v-btn tile color="black" class="button" @click="submitForm()"
              >Sign in</v-btn
            >
          </div>
        </form>
      </div>
      <v-btn tile color="black" class="button" @click="goToCreateaccount()"
        >Sign up</v-btn
      >
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Banner from "@/components/common/Banner";
export default {
  name: "SignIn",
  components: {
    Banner,
  },
  data() {
    return {
      form: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    goToCreateaccount() {
      this.$router.push("/signup");
    },
    goToforget() {
      this.$router.push("/forgetpassword");
    },

    async submitForm() {
      await axios
        .post("http://localhost:3000/signin", {
          email: this.form.email,
          password: this.form.password,
        })
        .then(
          (response) => {
            if (response.data.success == true) {
              this.sendInfo();
              var previousPage = this.$store.state.lastPage.page;
              var params = this.$store.state.lastPage.params;
              if (previousPage == null) {
                this.$router.push({ name: "MainPage" });
              } else {
                this.$router.push({ name: previousPage, params: params });
              }
            } else {
              alert(" please enter valid email or password");
            }
          },
          (error) => {}
        );
    },

    async sendInfo() {
      await axios
        .post("http://localhost:3000/sendinfo", {
          email: this.form.email,
          password: this.form.password,
        })
        .then(
          (response) => {
            if (response.status == 200) {
              console.log("successfully logged in");
              this.$store.commit("authenticate", response.data[0]);
              //this.$router.push("/");
            } else if (!response) {
              alert(" please enter valid email or password ");
            }
          },
          (error) => {
            alert(" please enter valid email or password");
          }
        );
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
  height: 400px;
  border: 2px solid black;
}

.button {
  text-align: center;
  margin: 10px auto 10px auto;
  width: 150px;
}

.forgetbtn {
  margin: 0px auto 10px auto;
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
  margin: 20px auto 20px auto;
  height: 30px;
}

.page-name {
  font-family: ManropeBold;
  font-size: 36px;
}
</style>
