<template>
<div>
    <banner></banner>
    <div class="page-container">
    <div class="page-name">Checkout</div>
      <v-btn class="button" v-on:click="goBack()">Back</v-btn>
      <v-data-table
          dense
          :headers="headers"
          :items="phones"
          item-key="name"
          class="elevation-1"
      >
        <template v-slot:item.action="{ item }">
        <input id="input" type="number" class="quantity" v-model="item.quantity" :max="item.stock" :min="0" onKeyDown="return false" @change="quantityChange(item)">
        </template>
        <template v-slot:item.delete="{ item }">
          <v-btn v-on:click="remove(item)">Remove</v-btn>
        </template>
      </v-data-table>
      <div class="total-price-container">
          <p>Total Price: {{totalprice}}</p>
          <v-btn id="submit" v-on:click="changeStock()">Submit</v-btn>
      </div>
      
    </div>
</div>
</template>


<script>
import Banner from "@/components/common/Banner";
import axios from "axios";

export default {
    name:"checkout-form",
    components:{
      Banner
    },
    data(){
        return{
            headers: [
              {
                align: 'start',
                width: "100px"
              },
              { text: 'Title', value: 'title',align: 'center', width:"150px" },
              { text: 'Quantity', value: 'action',align: 'center', width:"150px" },
              { text: 'Stock', value: 'stock',align: 'center', width:"150px"},
              { text: 'Price', value: 'price',align: 'center', width:"100px" },
              { text: '', value: 'delete',align: 'center', width:"100px" },
            ],
            phones:[],
            totalprice:0,
        }
    },
    methods:{
      getItems(){
        var cart = this.$store.getters.getCart;
        for(let i = 0; i < cart.length; i++){
          this.phones.push(cart[i]);
        }
      },
      
      goBack(){
         var previousPage = this.$store.state.lastPage.page;
         var params = this.$store.state.lastPage.params;
         this.$router.push({ name: previousPage, params: params });
       },

      quantityChange(item){
        this.totalprice = 0;
        this.$store.state.cart = [];
        this.$store.state.cartQuantity = 0;
        for(let i=0;i<this.phones.length;i++){
          this.totalprice += parseFloat(this.phones[i].price)*parseInt(this.phones[i].quantity);
          this.$store.commit("addToCart",this.phones[i]);
        }

        if(item.quantity == 0){
          this.remove(item);
        }
      },

      remove(item){
          this.totalprice = this.totalprice - item.price * item.quantity;
          this.phones.splice(this.phones.indexOf(item), 1);
          this.$store.state.cart = [];
          this.$store.state.cartQuantity = 0;
          for(let i=0;i<this.phones.length;i++){
            this.$store.commit("addToCart",this.phones[i]);
          }
      },

      changeStock(){
        for(let i = 0; i < this.phones.length;i++) {
          if (parseInt(this.phones[i].quantity) > parseInt(this.phones[i].stock)){
            alert("Please modify the quantity to a proper number");
            return;
          }
        }

        for(let i = 0; i < this.phones.length;i++){
          let formedUrl = process.env.VUE_APP_BACKEND + "changestock";
          axios .get(formedUrl, {
            params:{
              title: this.phones[i].title,
              price: this.phones[i].price,
              quantity: parseInt(this.phones[i].stock) - parseInt(this.phones[i].quantity),
          }
          })
            .then(response => {
              console.log("response", response);
                    this.data = response.status;
                    if (response.status == 200) {
                        alert("Success");
                        this.$store.state.cart = [];
                        this.$store.state.cartQuantity = 0;
                        this.$router.push({ name: "CheckoutFinishPage", params: {} });
                    } else if (!response) {
                        alert("");
                    }   
                },
                (error) => {
                    console.log("in error", error);
                    alert(error);
                });
        }

      }
    },
    beforeMount(){
      this.getItems();
      this.totalprice = 0;
      for(let i=0;i<this.phones.length;i++){
        this.totalprice += parseFloat(this.phones[i].price)*parseInt(this.phones[i].quantity);
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
table {
    border: collapse;
    border-spacing: 0;
 
 }
 
 table tbody td{
    border-top: 1pt solid #95BEF0;
    line-height: 1.5em;
    vertical-align: middle;
    padding: 0.5em 0.75em;
 }

 #submit{
    width: 88.57px;
    height: 36px;
    border: black;
    background-color:#f5f5f5;
    color:black;
    font-family: ManropeBold;
    border-radius: 4px;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2), 0 2px 4px 0 rgba(0,0,0,0.19);
    margin-top: 20px;
}

.page-name{
  font-family: ManropeBold;
  font-size: 20px;
  margin-bottom: 50px;
}

p{
    font-family: ManropeBold;
  font-size: 20px;
}

.total-price-container{
  margin-top: 20px;
}

#totalprice{
  font-family: ManropeBold;
  font-size: 20px;
}

.button{
  width: 100px;
  margin-bottom: 50px;
}
</style>
