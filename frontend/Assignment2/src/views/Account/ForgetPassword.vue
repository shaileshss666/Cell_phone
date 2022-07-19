<template>
  <div>
    <banner></banner>
    <div class="page-container">
      <div id="rect">
        <h3 class="page-name">Forget</h3>
        <form id="signinform" method="GET" @submit.prevent="submitForm()">
          <div class="form-group">
            <label for="email" class="label"> Email :</label>
            <input
              type="email"
              name="email"
              id="email"
              class="changable"
              v-model="form.email"
            />
          </div>
          <div class="form-group">
            <v-btn tile color="black" type="submit" class="button"
              >Submit</v-btn
            >
          </div>
        </form>
      </div>
      <v-btn tile color="black" class="button" @click="goToSignin()"
        >Login
      </v-btn>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import banner from "@/components/common/Banner";

export default {
  components: {
    banner,
  },
  name: "SignIn",
  data() {
    return {
      form: {
        email: "",
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
        .get("http://localhost:3000/forgetpasstomail?email=" + this.form.email)
        .then(
          (response) => {
            if (response.data.success == true) {
              alert("please check the email to reset your password");
            }
          },
          (error) => {
            alert("invalid user ");
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
  margin-bottom: 60px;
}
</style>
