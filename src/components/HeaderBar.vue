<template>
<nav class="navbar is-dark" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <a href="/" class="navbar-item navbar-title">
      <p class="has-text-weight-bold">在庫管理App</p>
    </a>
  </div>
  <div class="navbar-menu js-navbar">
    <div class="navbar-start">
      <a class="navbar-item" href="/">
        <span class="icon has-text-primary"><i class="fa fa-edit"></i></span>
        入出庫情報登録
      </a>
      <a class="navbar-item" href="/">
        <span class="icon has-text-primary is-medium"><i class="fa fa-cubes"></i></span>
        在庫確認
      </a>
    </div>
    <div class="navbar-end">
      <a class="navbar-item navbar-text" href="/signin">Sign In</a>
      <a class="navbar-item navbar-text" @click="signOut">Sign out</a>
    </div>
  </div>
</nav>
</template>


<style lang="scss">
@import '~bulma';
$fa-font-path: '~font-awesome/fonts/';
@import '~font-awesome/scss/font-awesome';
</style>


<script>
import Firebase from '@/firebase';
import store from '@/store'

export default {
  name: "HeaderBar",
  created: function() {
    Firebase.onAuth()
  },
  methods: {
    // googleでサインインするときに呼ばれるfunction
    signOut: function() {
      if(store.state.status==true){
        Firebase.logout()
        console.log("sing out")
        this.$router.push("/signin")
      }
      else{
        console.log("not sign in")
      }
    }
  }
};
</script>