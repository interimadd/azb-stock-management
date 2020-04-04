import firebase from "@firebase/app";
import "@firebase/auth";
import store from "./store";

var config = {
    apiKey: "AIzaSyBUvbQwBGnQbie3kY39WjOl3dehF9uFryY",
    authDomain: "azb-stock-management.firebaseapp.com",
    databaseURL: "https://azb-stock-management.firebaseio.com",
    projectId: "azb-stock-management",
    storageBucket: "azb-stock-management.appspot.com",
    messagingSenderId: "261885111708",
    appId: "1:261885111708:web:bb90ba1f95ce74f4d16c59",
    measurementId: "G-TGKF1EL9S2"
  };

export default {
  init() {
    firebase.initializeApp(config);
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL);
  },
  login() {
    const provider = new firebase.auth.GoogleAuthProvider();
    firebase.auth().signInWithPopup(provider)
  },
  logout() {
    firebase.auth().signOut()
  },
  onAuth() {
    firebase.auth().onAuthStateChanged(user => {
      user = user ? user : {};
      store.commit('onAuthStateChanged', user);
      store.commit('onUserStatusChanged', user.uid ? true : false);
    });
  },
  onAuthAdd(func) {
    firebase.auth().onAuthStateChanged(func)
  }
};