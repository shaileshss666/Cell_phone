import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        authenticated: false,
        id: null,
        firstname : null,
        lastname: null,
        email: null,
        password: null,
        cartQuantity: 0,
        mode: "shop",
        cart: [],
        lastPage: {},
    },

    // getters
    getters: {
        checkAuthenticated: (state) => {
            return state.authenticated;
        },
        getUsername: (state) => {
            if(state.authenticated){
                return state.username;
            }
            return null;
        },
        getCurrentMode: (state) =>{
            return state.mode;
        },
        getCart: (state)  =>{
            return state.cart;
        },
    },

    // mutations
    mutations: {
        authenticate (state, responseData) {
            state.authenticated = true;
            state.id = responseData._id;
            state.firstname = responseData.firstname;
            state.lastname = responseData.lastname;
            state.email = responseData.email;
            state.password = responseData.password;
        },
        logout (state){
            state.authenticated = false;
            state.id =null;
            state.firstname =null;
            state.lastname = null;
            state.email = null;
            state.password = null;
            state.cartQuantity =  0;
            state.cart = [];
            state.lastPage= {};
        },
        addToCart(state, item){
            state.cart.push(item);
            state.cartQuantity += parseInt(item.quantity);
        }
    }
})

export default store;
