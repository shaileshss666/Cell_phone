<template>
  <div>
    <banner></banner>
    <div class="page-container">
      <div class="page-name">Add New Phone</div>
        <form method="POST" @submit.prevent="submitForm()" class="form">
            <div class="form-group">
                <label class="label-name" for="title">Title: </label>
                <input type="text" class="changable" id="titleinput" name="title" v-model="form.title" required><br><br>
            </div>
            <div class="form-group">
                <label class="label-name" for="brand">Brand: </label>
                <input type="text" class="changable" id="brand" name="brand" v-model="form.brand" required><br><br>
            </div>
            <div class="form-group">
                <input type="file" @change="onFileChange" required/>
                <input type="text" id="imageurl" name="image" value="imageurl" v-model="form.image" readonly>
            <br><br>
            </div>
            <div class="form-group">
                <label class="label-name" for="stock">Stock: </label>
                <input type="text" class="changable" id="stock" name="stock" v-model="form.stock" required v-on:keypress="isNumber($event)"><br><br>
            </div>
            <div class="form-group">
                <label class="label-name" for="price">Price: </label>
                <input type="text" class="changable" id="price" name="price" v-model="form.price" required v-on:keypress="isNumber($event)" ><br><br>
            </div>
            <div class="form-group">
                <input type="checkbox" id="disable" v-model="form.disable">
                <label class="label-name" for="checkbox">Disable</label>
            </div>
            <div class="form-group">
                <input type="submit" id="submit" class="hide" value="Submit"/>
            </div>
        </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import Banner from "@/components/common/Banner";
export default {
    name: 'add-form',
    components: {
      Banner,
    },
    data(){
        return{
            form: {
                title: '',
                brand: '',
                image: '',
                stock: null,
                price: null,
                disable: ''
            },
            filename: null,
        }
    },
    methods:{
      isNumber: function(evt) {
        evt = (evt) ? evt : window.event;
        var charCode = (evt.which) ? evt.which : evt.keyCode;
        if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
          evt.preventDefault();;
        } else {
          return true;
        }
      },
        async submitForm(){
          this.form.disable = document.getElementById('disable').checked;
          console.log(this.form.disable);
          if(this.form.disable){
            let formedUrl = process.env.VUE_APP_BACKEND + "disable";
            await axios.post(formedUrl, {
                title: this.form.title,
                brand: this.form.brand,
                image: this.form.brand + ".jpeg",
                stock: parseInt(this.form.stock),
                price: parseFloat(this.form.price).toFixed(2),
                sellerid: this.$store.state.id
                })
            .then(
                (response) => {
                    console.log("response", response);
                    this.data = response.status;
                    if (response.status == 200) {
                        alert(response.data);
                        console.log(parseFloat(this.form.price).toFixed(2));
                        this.$router.push({name:'AddCompletePage', params:{}});
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
            let formedUrl = process.env.VUE_APP_BACKEND + "able";
            await axios.post(formedUrl, {
                title: this.form.title,
                brand: this.form.brand,
                image: this.form.image,
                stock: parseInt(this.form.stock),
                price: parseFloat(this.form.price).toFixed(2),
                sellerid: this.$store.state.id
                })
            .then(
                (response) => {
                    console.log("response", response);
                    this.data = response.status;
                    if (response.status == 200) {
                        alert(response.data);
                        this.$router.push({name:'AddCompletePage', params:{}});
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
        onFileChange(e) {
            const file = e.target.files[0];
            this.filename = file.name;
            document.getElementById('imageurl').value = this.filename;
            this.form.image = this.filename;
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

#submit{
    width: 88.57px;
    height: 36px;
    border: black;
    background-color:#f5f5f5;
    font-family: ManropeBold;
    border-radius: 4px;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2), 0 2px 4px 0 rgba(0,0,0,0.19);
    margin-top: 20px;
}
#preview {
  display: flex;
  justify-content: center;
  align-items: center;
}

#preview img {
  max-width: 100%;
  max-height: 500px;
}
.form{
  font-family: ManropeBold;
  margin-bottom: 20px;
}

.form-group{
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  flex-direction: row;
}

.changable{
  border: 1px solid black;;
  width: 300px;
}

.page-name{
  font-family: ManropeBold;
  font-size: 20px;
  margin-bottom: 50px;
}

.label-name{
  width: 100px;
}
</style>
