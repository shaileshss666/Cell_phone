<template>
  <div>
  <banner></banner>
  <div class="page-container">
          <div class="page-name">Edit Profile</div>

          <form method="POST" @submit.prevent="submitForm()" class="form">
              <div class="form-group">
                  <label class="label-name">First name:
                      <input type="text" class="changable" id="fname" name="fname" v-model="form.fname" required>
                  </label>
              </div>
              <div class="form-group">
                  <label class="label-name">Last name:
                      <input type="text" class="changable" id="lname" name="lname" v-model="form.lname" required>
                  </label>
              </div>
              <div class="form-group">
                  <label class="label-name">Email:
                      <input type="email" class="changable" id="email" name="email" v-model="form.email" required>
                  </label>
              </div>
              <div class="form-group">
                  <label id="passwordtext" class="hide label-name">Password:
                      <input class="hide changable" type="text" id="password" v-model="form.password" name="password" required>
                  </label>
              </div>
              <div class="form-group">
                  <button type="button" id="update" class="show" @click="onButtonClick()">Update</button>
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
    name: 'edit-form',
    components:{
        Banner
    },
    data(){
        return{
            form: {
                fname: '',
                lname: '',
                email: '',
                password: '',
            }
        }
    },
    methods:{
        getEditinfo: async function(){
            let formedUrl = process.env.VUE_APP_BACKEND+"displayeditinfo";
            await axios
            .get(formedUrl,{
                headers: {},
                params: { id: this.$store.state.id, },
            })
            .then(response => {
                let userinfo = response.data;
                var fname = userinfo[0].firstname;
                var lname = userinfo[0].lastname;
                var email = userinfo[0].email;

                this.form.fname = fname;
                this.form.lname = lname;
                this.form.email = email;
                document.getElementById('fname').value = fname;
                document.getElementById('lname').value = lname;
                document.getElementById('email').value = email;
            });
        },
        submitForm(){
          let formedUrl = process.env.VUE_APP_BACKEND + "checkeditpassword";
            axios.post(formedUrl, {
                password: this.form.password,
                email: this.form.email,
                id:this.$store.state.id,
            })
            .then(
                (response) => {
                    console.log("response", response);
                    this.data = response.status;
                    if (response.status == 200) {
                        var check = response.data;
                        console.log(check);
                        if(check == "Right password"){
                            this.savetoDatabase();
                            this.$router.push({name:'EditFinishPage', params:{}});
                        }else if(check == "No"){
                            alert("This email have already been regiestered by other user, please change");
                        }
                        else{
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
        onButtonClick(){
            let formedUrl = process.env.VUE_APP_BACKEND + "checkemail";
            axios.post(formedUrl, {
                email: this.form.email,
                id: this.$store.state.id,
            })
            .then(
                (response) => {
                    console.log("response", response);
                    this.data = response.status;
                    if (response.status == 200) {
                        var check = response.data;
                        console.log(check);
                        if(check == "OK"){                
                            document.getElementById('passwordtext').className="show";
                            document.getElementById('password').className="show changable";
                            document.getElementById('submit').className="show";
                            document.getElementById('update').className="hide";
                        }else{
                            alert("This email have already been regiestered by other user, please change")
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
        async savetoDatabase(){
            let formedUrl = process.env.VUE_APP_BACKEND + "saveeditinfo";
            await axios.post(formedUrl, {
                fname: this.form.fname,
                lname: this.form.lname,
                email: this.form.email,
                id:this.$store.state.id,
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
        }

    },
    mounted() {
        this.getEditinfo();
    }
}
</script>
<style scoped>
.hide{
    display:none;
}
.show{
  display:block;
}
.page-container {
  background-color: white;
  margin: auto auto 20px;
  width: 90%;
  display: flex;
  flex-direction: column;
}

#update{
    width: 88.57px;
    height: 36px;
    border: black;
    background-color:#f5f5f5;
    font-family: ManropeBold;
    border-radius: 4px;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.2), 0 2px 4px 0 rgba(0,0,0,0.19);
    margin-top: 20px;
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
