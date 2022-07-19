<template>
  <div class="page-container">
    <div class="head-banner">
      <div class="web-name" v-on:click="mainpage()">SellPhone</div>
      <div class="search-container" v-if="this.$store.state.mode == 'shop'">
        <v-text-field
          v-model="search_product"
          class="search-input"
          placeholder="Search product"
          clearable
        ></v-text-field>
        <v-btn class="button" v-on:click="search()">Search</v-btn>
      </div>
      <div class="button-container">
        <div id="cart">
          <img id="cart-icon" src="@/assets/cart.png"/> {{this.$store.state.cartQuantity}}
        </div>
        <div v-if="this.$store.state.authenticated">
          <v-btn tile color="black" class="button" v-on:click="checkout()"
                 v-if="this.$store.state.mode == 'shop'"
          >MyCart</v-btn
          >
          <v-btn tile color="black" class="button" v-on:click="profile()"
            >Profile</v-btn
          >
          <v-btn tile color="black" class="button" v-on:click="signOut()"
            >Sign out</v-btn
          >
        </div>
        <div v-else>
          <v-btn tile color="black" class="button" v-on:click="signIn()"
            >Sign in</v-btn
          >
        </div>
      </div>
    </div>
    <hr class="line" />
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "Top-Banner",
  data() {
    return {
      search_product: "",
      dialog: false,
    };
  },
  methods: {
    mainpage: function () {
      this.$store.state.mode = "shop";
      this.$router.push({name: "MainPage"}).catch(() => {
      });
    },

    profile: function () {
      this.$store.state.mode = "user";
      this.$router.push({name: "UserPage"}).catch(() => {
      });
    },

    signIn: function () {
      this.$router.push({name: "SignIn"}).catch(() => {
      });
    },

    signOut: async function () {
      this.$store.state.mode = "shop";
      if(confirm("Do you want to log out?")==true) {
        let formedUrl = process.env.VUE_APP_BACKEND + "signout";
        await axios
            .get(formedUrl, {
              headers: {},
              params: {},
            })
            .then((response) => {
              this.data = response.status;
              if (response.status == 200) {
                alert("Success logout");
                this.$store.commit("logout");
                this.$router.push({name: "MainPage"}).catch(() => {
                });
              }
            });
      }
    },

    checkout() {
      if (this.$store.state.authenticated == true) {
          this.$router.push("/checkout").catch(() => {
          });
      } else {
        alert("Please sign in first");
      }
    },

    search: async function () {
      let formedUrl = process.env.VUE_APP_BACKEND + "home/search_phone/";
      await axios
          .get(formedUrl, {
            headers: {},
            params: {title: this.search_product},
          })
          .then((response) => {
            var searchResult = response.data;
            if (this.$router.currentRoute.path == "/search") {
              this.$router.push("/");
            }
            this.$router.push({
              name: "SearchPage",
              params: {phones: searchResult, keyword: this.search_product},
            });
          });
    },
  }
};
</script>

<style scoped>
.page-container {
  background-color: white;
  margin: auto auto;
  display: flex;
  flex-direction: column;
}

.head-banner {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.search-container {
  display: flex;
  flex-direction: row;
  width: 25%;
  font-size: 24px;
}

.line {
  border: black;
  height: 37px;
  width: 100%;
  margin: 10px auto;
  background-color: #c4c4c4;
}

.web-name {
  font-family: ManropeBold;
  font-size: 48px;
  cursor: pointer;
}

.button-container {
  display: flex;
  float: right;
}

.button {
  text-transform: unset !important;
  font-family: ManropeBold !important;
  margin: 10px 10px;
}

#cart-icon{
  margin-top: 15px;
  width: 40px;
  height: 30px;
}

#cart{
  margin-right: 10px;
}
</style>
