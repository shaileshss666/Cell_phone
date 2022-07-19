<template>
  <div>
    <banner></banner>
    <div class="page-container">
      <div class="page-name">Manage Listings</div>
      <v-data-table
          dense
          :headers="headers"
          :items="phones"
          item-key="name"
          class="elevation-1"
      >
        <template v-slot:item.action="{ item }">
          <v-btn v-on:click="check(showDisabled(item), item)">{{showDisabled(item)}}</v-btn>
        </template>
        <template v-slot:item.delete="{ item }">
          <v-btn v-on:click="remove(item)">Remove</v-btn>
        </template>
      </v-data-table>
      <div>
        <router-link  :to="{ name: 'AddPage'}"><button id="add">Add new phone</button></router-link>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import Banner from "@/components/common/Banner";
export default{
    name:"manage-form",
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
              { text: 'Brand', value: 'brand',align: 'center', width:"125px" },
              { text: 'Stock', value: 'stock',align: 'center', width:"125px" },
              { text: 'Price', value: 'price',align: 'center', width:"125px" },
              { text: 'Disabled', value: 'action',align: 'center', width:"125px"  },
              {text: '', value:'delete',align:'center', width:'125px'},
            ],
            phones: [],

        }
    },
    methods:{
        showDisabled(item){
          if(item.disabled==null){
            return false;
          }
          return true;
        },
        getList() {
            let formedUrl = process.env.VUE_APP_BACKEND+"showphonelist";
            axios
            .get(formedUrl,{
                headers: {},
                params: { sellerid: this.$store.state.id },
            })
            .then(response => {
              this.phones = response.data;
            });
        },
        check(disable, item){
        if(disable == false){
            console.log("true");
            console.log(item._id);
            let formedUrl = process.env.VUE_APP_BACKEND + "savedisabled";
            axios.get(formedUrl,{
                params: {
                    id: item._id,
                    disable: "1",
                    seller: this.$store.state.id
                }
            })
            .then(
                (response) => {
                    console.log("response", response);
                    this.data = response.status;
                    if (response.status == 200) {
                      alert("success");
                        console.log('update database');
                        this.$router.push({name:'UserPage', params:{}});
                    } else if (!response) {
                        alert("");
                    }   
                },
                (error) => {
                    console.log("in error", error);
                    alert(error);
                }
            );     
        }else{
            console.log("false");
            let formedUrl = process.env.VUE_APP_BACKEND + "savedisabled";
            axios.get(formedUrl,{
                params: {
                    id: item._id,
                    disable: "0",
                    seller: this.$store.state.id
                }
            })
            .then(
                (response) => {
                    console.log("response", response);
                    this.data = response.status;
                    if (response.status == 200) {
                      alert("success");
                        console.log('update database');
                        this.$router.push({name:'UserPage', params:{}});
                    } else if (!response) {
                        alert("");
                    }   
                },
                (error) => {
                    console.log("in error", error);
                    alert(error);
                    }
            );    
        }
        },
        
        remove(item){
          let formedUrl = process.env.VUE_APP_BACKEND+"removephone";
            axios
            .get(formedUrl,{
                headers: {},
                params: { id: item._id },
            })
            .then((response) => {
                    console.log("response", response);
                    this.data = response.status;
                    if (response.status == 200) {
                      alert("success");
                        console.log('update database');
                        this.$router.push({name:'UserPage', params:{}});
                    } else if (!response) {
                        alert("");
                    }   
                },
                (error) => {
                    console.log("in error", error);
                    alert(error);
                    }
            );    
        }
    },
    mounted() {
        this.getList();
    }
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
#add{
    width: 150px;
    height: 36px;
    border: black;
    background-color:#f5f5f5;
    font-family: ManropeBold;
    border-radius: 4px;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2), 0 2px 4px 0 rgba(0,0,0,0.19);
    font-size: 0.875rem;
    color: black;
    margin-top: 50px;
}
.page-name{
  font-family: ManropeBold;
  font-size: 20px;
  margin-bottom: 50px;
}
.v-data-table-header th {
  white-space: nowrap;
}
</style>
