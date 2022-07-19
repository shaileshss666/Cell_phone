<template>
  <div>
    <banner></banner>
    <div class="page-container">
      <div class="phone-information">
        <div class="image-container">
          <v-img
            class="image"
            v-bind:src="this.image"
            max-height="640"
            max-width="440"
          ></v-img>
        </div>
        <div class="information-container">
          <div class="phone-title">{{ phone.title }}</div>
          <div class="phone-brand">{{ phone.brand }}</div>
          <div class="phone-seller">{{ sellerName }}</div>
          <div class="phone-price-container">
            <div class="phone-price">${{ phone.price }}</div>
          </div>
          <div class="quantity-container">
            <div class="submit">
              <v-btn tile color="black" class="button" v-on:click="addToCart()"
                >Add to cart</v-btn
              >
            </div>
            <div class="quantity-box">
              <v-text-field v-model="quantity" label="Quantity"></v-text-field>
            </div>
            <div class="stock">Stock: {{ this.phone.stock }}</div>
          </div>
          <div class="review-container">
            <div
              class="review"
              v-for="(reviewer, index) in commentsShown.reviewer"
              :key="index"
            >
              <div>Name: {{ reviewer.firstname }} {{ reviewer.lastname }}</div>
              <div>Rate: {{ commentsShown.rating[index] }}</div>
              <div>Comment: {{ commentsShown.comment[index] }}</div>
            </div>
          </div>
          <div class="read-more-button">
            <v-btn
              tile
              color="black"
              class="button"
              v-on:click="loadMoreComments()"
              >Read more</v-btn
            >
          </div>
        </div>
      </div>

      <div class="write-review-container">
        <div class="heading">Write Your Comment</div>
        <div class="write-review-body">
          <div class="rating-container">
            <div class="rating-text">Rating:</div>
            <div class="rating-stars">
              <v-rating
                empty-icon="mdi-star-outline"
                full-icon="mdi-star"
                hover
                size="30"
                v-model="writtenReview.rating"
              ></v-rating>
            </div>
          </div>
          <div class="review-text-container">
            <div class="comment-text">Comment:</div>
            <div class="comment-area">
              <v-textarea
                outlined
                name="comment-content"
                rows="10"
                row-height="13"
                v-model="writtenReview.comment"
              ></v-textarea>
            </div>
          </div>
          <div class="post">
            <v-btn
                tile
                color="black"
                class="button"
                v-on:click="postComment()"
            >Post</v-btn>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Banner from "@/components/common/Banner";
import axios from "axios";
export default {
  name: "item-state",
  components: {
    Banner,
  },
  data() {
    return {
      sellerName: "",
      phone: {},
      image: "",
      commentsShown: {
        reviewer: [],
        rating: [],
        comment: [],
      },
      commentProgress: 0,
      quantity: 0,
      writtenReview: {
        reviewer: "",
        rating: 0,
        comment: "",
      },
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
    addToCart: function () {
      if (
        !(
          !isNaN(this.quantity) &&
          parseInt(Number(this.quantity)) == this.quantity &&

          !isNaN(parseInt(this.quantity, 10))) || this.quantity<=0 || this.quantity>this.phone.stock){
        alert("Please input a valid quantity!")
      }
      else{
        if(this.$store.state.authenticated == false){
          alert("Please sign in first")
          this.$router.push({ name: "SignIn" });
        }
        else{
          for(var i=0; i<this.$store.state.cart.length;i++){
            if(this.$store.state.cart[i].id == this.phone._id){
              this.$store.state.cart[i].quantity = parseInt(this.$store.state.cart[i].quantity) + parseInt(this.quantity);
              this.$store.state.cartQuantity += parseInt(this.quantity);
              alert("The item is added to the cart")
              return;
            }
          }
          var cartItem = {id:this.phone._id ,title: this.phone.title, quantity: this.quantity, stock:this.phone.stock, price:this.phone.price}
          this.$store.commit("addToCart",cartItem);
          alert("The item is added to the cart")
        }
      }
    },
    postComment: async function () {
      if (this.$store.state.authenticated == false) {
        alert("Please sign in first")
        this.$router.push({ name: "SignIn" });
      } else {
        if (this.writtenReview.comment == "") {
          alert("Please write some comments")
        } else {
          let formedUrl = process.env.VUE_APP_BACKEND + "home/post_comment";
          await axios
              .post(formedUrl, {
                phoneId: this.phone._id,
                reviewer: this.$store.state.id,
                rating: this.writtenReview.rating,
                comment: this.writtenReview.comment,
              })
              .then((response) => {
                let message = response.data.message;
                alert(message);
                this.commentsShown.reviewer.push({_id:this.$store.state.id,firstname:this.$store.state.firstname, lastname:this.$store.state.lastname});
                this.commentsShown.rating.push(this.writtenReview.rating);
                this.commentsShown.comment.push(this.writtenReview.comment);
              });
        }
      }

    },
    loadMoreComments: function () {
      let increment = 0;
      for (let i = 0; i < 3; i++) {
        let progress = this.commentsShown.reviewer.length;
        if (
          progress >= this.phone.reviews.length &&
          this.commentProgress == 0
        ) {
          break;
        }

        if (this.commentProgress == 0) {
          this.commentsShown.reviewer.push(
            this.phone.reviews[progress].reviewer
          );
          this.commentsShown.rating.push(this.phone.reviews[progress].rating);
          if (this.phone.reviews[progress].comment.length > 200) {
            this.commentsShown.comment.push(
              this.phone.reviews[progress].comment.substr(
                this.commentProgress,
                this.commentProgress + 200
              )
            );
            if (
              this.commentProgress + 200 <
              this.phone.reviews[progress].comment.length
            ) {
              this.commentProgress += 200;
              increment = -1;
              break;
            }
            this.commentProgress = 0;
          } else {
            this.commentsShown.comment.push(
              this.phone.reviews[progress].comment
            );
          }
        } else {
          this.commentsShown.comment[this.commentsShown.comment.length - 1] =
            this.commentsShown.comment[
              this.commentsShown.comment.length - 1
            ].concat(
              this.phone.reviews[progress - 1].comment.substr(
                this.commentProgress,
                this.commentProgress + 200
              )
            );
          if (
            this.commentProgress + 200 <
            this.phone.reviews[progress - 1].comment.length
          ) {
            this.commentProgress += 200;
            this.commentsShown.reviewer.splice(
              this.commentsShown.reviewer.length - 1,
              1
            );
            this.commentsShown.rating.splice(
              this.commentsShown.rating.length - 1,
              1
            );
            this.commentsShown.reviewer.push(
              this.phone.reviews[progress - 1].reviewer
            );
            this.commentsShown.rating.push(
              this.phone.reviews[progress - 1].rating
            );
            increment = -1;
            break;
          }
          this.commentProgress = 0;
          this.commentsShown.reviewer.splice(
            this.commentsShown.reviewer.length - 1,
            1
          );
          this.commentsShown.rating.splice(
            this.commentsShown.rating.length - 1,
            1
          );
          this.commentsShown.reviewer.push(
            this.phone.reviews[progress - 1].reviewer
          );
          this.commentsShown.rating.push(
            this.phone.reviews[progress - 1].rating
          );
          increment = -1;
          break;
        }
        increment++;
      }
      if (increment == 0) {
        // alert("No More Comments")
      }
    },
  },
  mounted() {
    this.phone = this.$route.params.phone;
    this.sellerName =
      this.phone.seller.firstname + " " + this.phone.seller.lastname;
    this.image = this.getImage(this.phone.image);
    this.loadMoreComments();
    this.$store.state.lastPage = {page: "ItemPage", params: {phone:this.phone}};
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
}

.phone-information {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
}

.image-container {
  background-color: #c4c4c4;
  width: 450px;
  height: 650px;
  display: flex;
}

.image {
  margin: auto auto;
}

.information-container {
  display: flex;
  flex-direction: column;
  float: right;
  width: 800px;
  font-family: ManropeBold;
}

.phone-title {
  font-size: 36px;
  margin-bottom: 20px;
}

.phone-brand {
  font-size: 32px;
  margin-bottom: 20px;
}

.phone-seller {
  font-size: 24px;
  margin-bottom: 20px;
}

.phone-price-container {
  margin-bottom: 10px;
  background-color: #faff00;
  width: 300px;
  height: 55px;
}

.phone-price {
  font-size: 40px;
  margin: auto auto;
  color: red;
  text-align: center;
}

.quantity-container {
  display: flex;
  flex-direction: row;
}

.submit {
  margin: auto 20px auto 0px;
}

.button {
  text-transform: unset !important;
  font-family: ManropeBold !important;
  height: 30px !important;
}

.quantity-box {
  margin: auto 20px;
}

.stock {
  margin: auto 20px;
}

.review-container {
  width: 800px;
  height: 270px;
  background-color: #c4c4c4;
  margin-bottom: 20px;
  overflow: scroll;
  font-family: ManropeBold, serif;
  font-size: 16px;
}

.read-more-button {
  display: flex;
  margin: auto 0px auto auto;
}

.review {
  margin: 10px 10px 30px 10px;
}

.write-review-container {
  font-family: ManropeBold;
  margin-top: 50px;
}

.heading {
  font-size: 32px;
  margin-bottom: 10px;
}

.write-review-body {
  width: 100%;
  height: 500px;
  background-color: #c4c4c4;
  margin: auto auto;
}

.rating-container {
  display: flex;
  flex-direction: row;
  font-family: ManropeBold;
  margin: 20px 20px 20px 40px;
}

.rating-text {
  margin: 40px 0px auto 0px;
  font-size: 24px;
}

.rating-stars {
  margin: 35px 0px auto 0px;
}

.review-text-container {
  display: flex;
  flex-direction: column;
  font-family: ManropeBold;
  margin: 20px auto 20px 40px;
}

.comment-text {
  font-size: 24px;
  margin-bottom: 10px;
}

.comment-area {
  width: 95%;
  height: 280px;
}

.post {
  margin: auto 50px auto auto;
  width: 50px;
}
</style>
