<template>
<nav class="navbar is-dark" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a href="/" class="navbar-item navbar-title">
      <p class="has-text-weight-bold">在庫管理App</p>
    </a>
  </div>
  <div class="navbar-menu js-navbar">
    <div class="navbar-end">
      <a class="navbar-item navbar-text" href="/signin">Sign In</a>
      <a class="navbar-item navbar-text" @click="signOut">Sign out</a>
    </div>
  </div>
</nav>
</template>


<style lang="scss">
@import '~bulma';
</style>


<script>
import firebase from "firebase"; // firebaseのインポート
 
export default {
  name: "HeaderBar",
  methods: {
    // googleでサインインするときに呼ばれるfunction
    signOut: function() {
      firebase.auth().signOut()
      console.log("sing out")
    }
  }
};
</script>