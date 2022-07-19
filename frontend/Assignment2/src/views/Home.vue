<template>
  <div>
    <banner></banner>
    <div class="page-container">
      <div class="section-container">
        <p class="section-heading">SOLD OUT SOON</p>
        <div class="phone-containers">
          <div
            class="phone-card"
            v-for="(phone, id) in sellOutSoonPhones"
            :key="id"
            v-on:click="getItemPage(phone)"
          >
            <div>
              <v-img
                v-bind:src="getImage(phone.image)"
                max-height="180"
                max-width="170"
              ></v-img>
            </div>
            <div class="phone-information">{{ phone.brand }}</div>
            <div class="phone-information">${{ phone.price }}</div>
          </div>
        </div>
      </div>

      <div class="section-container">
        <p class="section-heading">BEST SELLERS</p>
        <div class="phone-containers">
          <div
            class="phone-card"
            v-for="(phone, id) in bestSellerPhones"
            :key="id"
            v-on:click="getItemPage(phone)"
          >
            <div>
              <v-img
                v-bind:src="getImage(phone.image)"
                max-height="180"
                max-width="170"
              ></v-img>
            </div>
            <div class="phone-information">{{ phone.brand }}</div>
            <div class="phone-information">{{ phone.average }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Banner from "@/components/common/Banner";
export default {
  name: "home-state",
  components: {
    Banner,
  },
  data() {
    return {
      sellOutSoonPhones: [],
      bestSellerPhones: [],
    };
  },

  methods: {
    getImage(img) {
      try {
        return require('../assets/phone_default_images/' + img);
      } catch (e) {
        return require('../assets/phone_default_images/phone.png');
      }
    },
    getItemPage: async function (phone) {
      this.$router.push({ name: "ItemPage", params: { phone: phone } });
    },
    getFiveBestSeller: async function () {
      let formedUrl =
        process.env.VUE_APP_BACKEND + "home/five_phones_best_seller";

      await axios
        .get(formedUrl, {
          headers: {},
        })
        .then((response) => {
          let phones = response.data;
          for (let i = 0; i < phones.length; i++) {
            let phone = phones[i];
            if(phone.disabled == null) {
              phone.average = Number(phone.average.toFixed(1));
              this.bestSellerPhones.push(phone);
            }
          }
        });
    },
    getFivePhonesSoldOutSoon: async function () {
      let formedUrl =
        process.env.VUE_APP_BACKEND + "home/five_phones_sold_out_soon";
      await axios
        .get(formedUrl, {
          headers: {},
        })
        .then((response) => {
          let phones = response.data;
          for (let i = 0; i < phones.length; i++) {
            let phone = phones[i];
            if(phone.disabled == null) {
              this.sellOutSoonPhones.push(phone);
            }
          }
        });
    },
  },
  mounted() {
    this.getFivePhonesSoldOutSoon();
    this.getFiveBestSeller();
    this.$store.state.lastPage = {page: "MainPage"};
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

.section-container {
  width: 100%;
  margin: auto auto;
}

.section-heading {
  font-family: ManropeBold;
  font-size: 20px;
  margin: 30px auto;
}

.phone-containers {
  height: 280px;
  background-color: #c4c4c4;
  margin: auto auto;
  display: flex;
  flex-direction: row;
}

.phone-card {
  width: 170px;
  height: 225px;
  background-color: white;
  margin: auto auto;
  font-family: ManropeBold;
  font-size: 18px;
  cursor: pointer;
}

.phone-card:hover {
  border: 2px solid black;
}

.phone-information {
  text-align: center;
}
</style>
