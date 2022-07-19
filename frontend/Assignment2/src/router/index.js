import Vue from "vue";
import Router from "vue-router";
import store from '../store'

Vue.use(Router);
import Main from "@/views/Home";
import Search from "@/views/Search";
import Item from "@/views/Item";
import SignIn from "@/views/Account/SignIn";
import SignUp from "@/views/Account/CreateAccount";
import ForgetPassword from "@/views/Account/ForgetPassword";
import NewPassword from "@/views/Account/NewPassword";
import Checkout from "@/views/Checkout/Checkout";
import CheckoutFinish from "@/views/Checkout/CheckoutFinish";
import User from "@/views/User/User";
import Edit from "@/views/User/Edit/Edit";
import EditFinish from "@/views/User/Edit/EditFinish";
import Change from "@/views/User/Change/Change";
import ChangeComplete from "@/views/User/Change/ChangeComplete";
import Manage from "@/views/User/Manage/Manage";
import Add from "@/views/User/Manage/Add/Add";
import AddComplete from "@/views/User/Manage/Add/AddComplete";
import View from "@/views/User/View/View";

const router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "MainPage",
      component: Main,
    },
    {
      path: "/search",
      name: "SearchPage",
      component: Search,
    },
    {
      path: "/item",
      name: "ItemPage",
      component: Item,
    },
    {
      path: "/checkout",
      name: "CheckoutPage",
      component: Checkout,
    },
    {
      path: "/user",
      name: "UserPage",
      component: User,
    },
    {
      path: "/checkoutfinish",
      name: "CheckoutFinishPage",
      component: CheckoutFinish,
    },
    {
      path: "/edit",
      name: "EditPage",
      component: Edit,
    },
    {
      path: "/editfinish",
      name: "EditFinishPage",
      component: EditFinish,
    },
    {
      path: "/change",
      name: "ChangePage",
      component: Change,
    },
    {
      path: "/signin",
      name: "SignIn",
      component: SignIn,
    },
    {
      path: "/forgetpassword",
      name: "ForgetPassword",
      component: ForgetPassword,
    },
    {
      path: "/newpassword",
      name: "NewPassword",
      component: NewPassword,
    },
    {
      path: "/changecomplete",
      name: "ChangeCompletePage",
      component: ChangeComplete,
    },
    {
      path: "/signup",
      name: "SignUp",
      component: SignUp,
    },
    // {
    //   path: "/changefinish",
    //   name: "ChangeFinishPage",
    //   //  component: ChangeFinish
    // },
    {
      path: "/manage",
      name: "ManagePage",
      component: Manage,
    },
    {
      path: "/view",
      name: "ViewPage",
      component: View,
    },
    {
      path: "/add",
      name: "AddPage",
      component: Add,
    },
    {
      path: "/addcomplete",
      name: "AddCompletePage",
      component: AddComplete,
    },
  ],
});

router.beforeEach((to, from, next) => {
  if(to.path!="/" && to.path!="/search" && to.path!="/item" && to.path!="/forgetpassword" && to.path!="/signup"  && to.path!="/signin" && to.path!="/newpassword" ){
    if (!store.state.authenticated && to.name !== 'SignIn') {
      alert("Please sign in first")
      next('/signin')
    } else {
      next()
    }
  }
  else{
    next()
  }
})

export default router;
