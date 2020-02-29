import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import firebase from 'firebase' // 追記

Vue.config.productionTip = false

var firebaseConfig = {
  apiKey: "AIzaSyBUvbQwBGnQbie3kY39WjOl3dehF9uFryY",
  authDomain: "azb-stock-management.firebaseapp.com",
  databaseURL: "https://azb-stock-management.firebaseio.com",
  projectId: "azb-stock-management",
  storageBucket: "azb-stock-management.appspot.com",
  messagingSenderId: "261885111708",
  appId: "1:261885111708:web:bb90ba1f95ce74f4d16c59",
  measurementId: "G-TGKF1EL9S2"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
