<template>
  <div>
    <banner></banner>
    <div class="page-container">
      <div class="page-name">Change Password</div>
      <div>
        <form method="POST" @submit.prevent="submitForm()" class="form">
          <div class="form-group">
            <label class="label-name"
              >Old Password:
              <input
                type="text"
                class="changable"
                id="oldpassword"
                name="oldpassword"
                v-model="form.oldpassword"
                required
              /><br /><br />
            </label>
          </div>
          <div class="form-group">
            <label class="label-name"
              >New Password:
              <input
                type="text"
                class="changable"
                id="newpassword"
                name="newpassword"
                v-model="form.newpassword"
                required
              /><br /><br />
            </label>
          </div>
          <div class="form-group">
            <input type="submit" id="submit" value="Submit" />
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Banner from "@/components/common/Banner";
export default {
  name: "change-form",
  components: {
    Banner,
  },
  data() {
    return {
      form: {
        oldpassword: "",
        newpassword: "",
      },
    };
  },
  methods: {
    submitForm() {
      let formedUrl = process.env.VUE_APP_BACKEND + "changepassword";
      axios
        .post(formedUrl, {
          oldpassword: this.form.oldpassword,
          id: this.$store.state.id,
        })
        .then(
          (response) => {
            console.log("response", response);
            this.data = response.status;
            if (response.status == 200) {
              var check = response.data;
              console.log(check);
              if (check == "Right password") {
                this.savetoDatabase();
                this.$router.push({ name: "ChangeCompletePage", params: {} });
              } else {
                alert("Wrong Password");
              }
            } else if (!response) {
              alert("");
            }
          },
          (error) => {
            console.log("in error", error);
            alert(error);
          }
        );
    },
    gotoSignout() {},
    async savetoDatabase() {
      let formedUrl = process.env.VUE_APP_BACKEND + "changecomplete";
      await axios
        .post(formedUrl, {
          newpassword: this.form.newpassword,
          id: this.$store.state.id,
        })
        .then(
          (response) => {
            console.log("response", response);
            this.data = response.status;
            if (response.status == 200) {
              console.log("save database complete");
            } else if (!response) {
              alert("");
            }
          },
          (error) => {
            console.log("in error", error);
            alert(error);
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
}

#submit {
  width: 88.57px;
  height: 36px;
  border: black;
  background-color: #f5f5f5;
  font-family: ManropeBold;
  border-radius: 4px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 2px 4px 0 rgba(0, 0, 0, 0.19);
  margin-top: 20px;
}
.form {
  font-family: ManropeBold;
  margin-top: 20px;
  margin-bottom: 20px;
}

.form-group {
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
}

.changable {
  border: 1px solid black;
  width: 300px;
}

.page-name {
  font-family: ManropeBold;
  font-size: 20px;
  margin-bottom: 50px;
}

.label-name {
  width: 200px;
}
</style>
