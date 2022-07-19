<template>
  <div>
    <banner></banner>
    <div class="page-container">
      <div class="keyword">Result for "{{keyword}}"</div>
      <div class="filter-container">
        <div class="brand-container">
          <v-select
              v-model="brand"
              :items="allBrands"
              solo
              label="Filter Brand"
              @change="filter"
          ></v-select>
        </div>

        <div class="price-container">
          <div id="price"> <div> > </div> {{parseInt(value*(maxPrice+1)/100)}} </div>
          <v-slider
              v-model="value"
              ticks
              @change="filter"
          ></v-slider>
        </div>
      </div>
      <div class="search-results">
        <div class="phone-card" v-for="(phone, id) in this.phonesShown" :key="id" v-on:click="getItemPage(phone)">
          <div class="phone-image">
            <v-img
                v-bind:src="getImage(phone.image)"
                max-height="140"
                max-width="130"
            ></v-img>
          </div>
          <div class="phone-information-container">
            <div>{{phone.title}}</div>
            <div>{{phone.brand}}</div>
            <div>${{phone.price}}</div>
          </div>
        </div>
      </div>
    </div>

  </div>

</template>

<script>
import Banner from "@/components/common/Banner";
export default {
  name: "search-state",
  components: {
    Banner,
  },
  data(){
    return {
      phones: [],
      phonesShown:[],
      keyword: "",
      maxPrice: 0,
      value: 0,
      brand : '',
      allBrands: ["All","Samsung", "Apple", "HTC", "Huawei", "Nokia", "LG", "Motorola", "Sony", "BlackBerry"],
    }
  },
  methods:{
    getImage(img) {
      try {
        return require('../assets/phone_default_images/' + img);
      } catch (e) {
        return require('../assets/phone_default_images/phone.png');
      }
    },
    getItemPage: function(phone){
      this.$router.push({ name: 'ItemPage', params: { phone: phone } })
    },
    filter: function(){
      let priceFilter = parseInt(this.value*(this.maxPrice+1)/100);
      this.phonesShown = [];
      for(let i=0;i<this.phones.length;i++){
        if(this.phones[i].brand == this.brand || this.brand=="All"){
          if(parseInt(this.phones[i].price)>priceFilter) {
            this.phonesShown.push(this.phones[i]);
          }
        }
      }
    },
    setup: function(){
      this.phones = [];
      var routerPhones = this.$route.params.phones;
      for(var i=0;i<routerPhones.length;i++){
        let phone = routerPhones[i];
        if(phone.disabled == null) {
          this.phones.push(phone);
        }
      }
      this.phonesShown = this.phones;
      this.keyword = this.$route.params.keyword;
      this.maxPrice = 0;
      this.brand = "All";
      for(let i=0;i<this.phones.length;i++){
        if(parseInt(this.phones[i].price)>this.maxPrice){
          this.maxPrice=parseInt(this.phones[i].price);
        }
      }
      this.value = 0;
      this.$store.state.lastPage = {page: "SearchPage", params: {phones: this.phones, keyword:this.keyword}};
    },
  },

  mounted() {
    this.setup();
  },
  watch: {
    '$route.params.keyword': function (id) {
      this.setup();
    }
  },

}
</script>

<style scoped>

.page-container {
  background-color: white;
  margin: auto auto 20px;
  width: 90%;
  display: flex;
  flex-direction: column;
}

.keyword{
  font-family: ManropeBold;
  font-size: 20px;
  margin-bottom: 30px;
}

.filter-container{
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  height: 55px;
}

.brand-container{
  display: flex;
  float: left;
  font-family: ManropeBold !important;
  font-size: 20px !important;
  width: 320px;
}

.price-container{
  display: flex;
  float: right;
  width: 400px;
  margin-top: 5px;
}

#price{
  font-family: ManropeBold;
  font-size: 20px;
  width: 40px;
  margin: 5px 15px;
  display: flex;
  flex-direction: row;
}

.search-results{
  margin-top: 10px;
  background-color: #C4C4C4;
  display: flex;
  flex-direction: column;
}

.phone-card{
  font-family: ManropeBold;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  flex-direction: row;
  margin: 20px 20px;
}

.phone-card:hover{
  border: 2px solid black;
}

.phone-image{
  margin: 10px 20px 20px 20px;
}

.phone-information-container{
  margin: auto 20px auto 20px;
}

</style>