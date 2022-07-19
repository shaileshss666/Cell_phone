<template>
  <div>
    <banner></banner>
    <div class="page-container">
        <div class="btn-group">
            <router-link  :to="{ name: 'EditPage'}"><button id="mainedit" class="button">Edit Profile</button></router-link>
            <router-link  :to="{ name: 'ChangePage'}"><button id="mainchange" class="button">Change Password</button></router-link>
            <router-link  :to="{ name: 'ManagePage'}"><button id="mainmanage" class="button">Manage Listing</button></router-link>
            <router-link  :to="{ name: 'ViewPage'}"><button id="mainview" class="button">View Comment</button></router-link>
        </div>
    </div>
  </div>
</template>

<script>
import Banner from "@/components/common/Banner";
export default {
  name: "user-page",
  components: {
    Banner
  },
  data(){
    return{}
  },
    method:{
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

#title{
  font-family: ManropeBold;
    font-size: 48px;
    cursor: pointer;
}

#signout{
    position: absolute;
    top: 70px;
    right: 80px;
    height: 36px;
    min-width: 64px;
    padding-right: 16px;
    padding-left: 16px;
    font-size: 0.875rem;
    border: black;
    background-color:#f5f5f5;
    font-family: ManropeBold;
    border-radius: 4px;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2), 0 2px 4px 0 rgba(0,0,0,0.19);
}

#rectangle{
border: black;
    height: 37px;
    width: 100%;
    margin: 10px auto;
    background-color: #C4C4C4;
}
.btn-group{
  margin-left: auto ;
  margin-right: auto ;
  margin-top: 50px;
}

.button{
  padding-right: 16px;
  padding-left: 16px;
  margin: 10px;
  font-family: ManropeBold;
  color: black;
    width: 200px;
  height: 80px;
  background-color:#f5f5f5;
  display: flex;
  cursor: pointer;
  border-radius: 4px;
  box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2), 0 2px 4px 0 rgba(0,0,0,0.19);
  float: left;
  justify-content: center;
  align-items: center;
}

.button:hover {
  background-color: #008CBA;
  color: white;
}

</style>

