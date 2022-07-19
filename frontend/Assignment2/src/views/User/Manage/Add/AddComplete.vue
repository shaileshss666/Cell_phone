<template>
  <div>
    <banner></banner>
    <div class="page-container">
      <div class="page-name">Add New Phone</div>
      <h3 class="info">Add New List Complete</h3>
      <v-btn class="button" v-on:click="Back()">Back to Manage Page</v-btn>
    </div>
  </div>
</template>

<script>
import Banner from "@/components/common/Banner";
export default{
  name:"addcomplete-form",
  components: {
      Banner,
    },
  data(){
    return{}
  },
  methods:{
    Back(){
      this.$router.push({name:'ManagePage', params:{}});
    }
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
.info{
  font-family: ManropeBold;
  font-size: 48px;
}

.page-name{
  font-family: ManropeBold;
  font-size: 20px;
  margin-bottom: 50px;
}

.button{
  width: 200px;
}
</style>
