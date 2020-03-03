<template>
  <div id="signin">
    <section class="hero has-background-light is-fullheight-with-navbar" style="background-image: url('/images/warehouse.jpg')">
        <div class="hero-body">
            <div class="container has-text-centered">
                <div class="column is-4 is-offset-4">
                    <h3 class="title has-text-black">Login</h3>
                    <hr class="login-hr has-background-dark">
                    <p class="subtitle has-text-black">Please login to proceed.</p>
                    <div class="box">
                        <figure class="avatar">
                          <img src="./images/google_logo.png">
                        </figure>
                        <button class="button is-block is-info is-large is-fullwidth" @click="signInWithGoogle">Login <i class="fa fa-sign-in" aria-hidden="true"></i></button>
                    </div>
                </div>
            </div>
        </div>
    </section>
  </div>
</template>

<style lang="scss">
@import '~bulma';
</style>

<script>
import firebase from "firebase"; // firebaseのインポート
 
export default {
  name: "Signin",
  methods: {
    // googleでサインインするときに呼ばれるfunction
    signInWithGoogle: function() {
      const provider = new firebase.auth.GoogleAuthProvider();
      firebase
        .auth()
        .signInWithPopup(provider)
        .then(
          this.$router.push("/")
         ).catch(
          error => {
            alert(error.message)
          }
        );
    }
  }
};
</script>
 
 
<style>
</style>