<template>
  <div>
    <banner></banner>
    <div class="page-container">
      <div class="page-name">Checkout Finish</div>
      <h3 class="info">Checkout Finish</h3>
      <br><br>
       <router-link  :to="{ name: 'MainPage'}"><button id="submit">Beck to Main Page</button></router-link>
    </div>
  </div>
</template>

<script>
import banner from "@/components/common/Banner";
export default{
  name:"checkoutfinish-form",
  components: {
    banner
  },
  data(){
    return{}
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
  /*border: 2px solid black;*/
}

.info{
  font-family: ManropeBold;
  font-size: 48px;
}

.page-name{
  font-family: ManropeBold;
  font-size: 20px;
  margin-bottom: 50px;
}
 #submit{
    width: 200px;
    height: 36px;
    border: black;
    background-color:#f5f5f5;
    color:black;
    font-family: ManropeBold;
    border-radius: 4px;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2), 0 2px 4px 0 rgba(0,0,0,0.19);
    margin-top: 20px;
}

</style>
