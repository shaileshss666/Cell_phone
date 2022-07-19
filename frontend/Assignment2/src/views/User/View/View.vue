<template>
<div>
    <banner></banner>
    <div class="page-container">
    <div class="page-name">View Comments</div>
      <v-data-table
          dense
          :headers="headers"
          :items="comments"
          item-key="name"
          class="elevation-1"
      >
      </v-data-table>
      
    </div>
</div>
</template>

<script>
import axios from "axios";
import Banner from "@/components/common/Banner";
export default {
    name: "view-form",
    components:{
      Banner
    },
    data() {
        return {
            headers: [
              {
                align: 'start',
                width: "100px"
              },
              { text: 'Title', value: 'title',align: 'center', width:"150px" },
              { text: 'Reviewer', value: 'reviewer',align: 'center', width:"150px" },
              { text: 'Rating', value: 'rating',align: 'center', width:"100px" },
              { text: 'Comment', value: 'comment',align: 'center', width:"500px" },
            ],
            comments:[],
        };
    },
    methods:{
        async getComment(){
            let formedUrl = process.env.VUE_APP_BACKEND+"getreview";
            await axios.get(formedUrl,{
                headers: {},
                params:{sellerid:this.$store.state.id}
            })
            .then(response => {
                let listreviews = response.data;
                console.log(listreviews);
                for(let i = 0; i<listreviews.length;i++){
                    var title = listreviews[i].title;
                    var reviews = listreviews[i].reviews;
                    var reviewerid;
                    var rating;
                    var comment;
                    for(let j = 0; j < reviews.length; j++){
                        reviewerid = reviews[j].reviewer;
                        rating = reviews[j].rating;
                        comment = reviews[j].comment;
                        this.comments.push({title: title, reviewer:reviewerid, rating:rating, comment:comment});
                    }

                    
                }
            });
        },   
    },
    mounted() {
        this.getComment();
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

#viewphonelist{
    background-color: #c4c4c4;
    color: black;
    font-family: ManropeBold;
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
