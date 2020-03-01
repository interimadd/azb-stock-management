<template>
  <div id="signin">
    <h2>サインイン</h2>
    <!-- googleのアカウントでサインイン。アカウントがなければ新規に作成されます。 -->
    <button @click="signInWithGoogle">Googleアカウントでサインイン</button>
  </div>
</template>

<script>
import firebase from "firebase"; // firebaseのインポート
 
export default {
  name: "Signin",
  data() {
    return {
      email: "",
      password: ""
    };
  },
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