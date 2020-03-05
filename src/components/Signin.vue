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
                        <button class="button is-block is-info is-large is-fullwidth" @click="doLogin">Login <i class="fa fa-sign-in" aria-hidden="true"></i></button>
                    </div>
                </div>
            </div>
        </div>
    </section>
    {{ user }}
  </div>
</template>

<style lang="scss">
@import '~bulma';
</style>

<script>
import Firebase from '@/firebase';
 
export default {
  name: "Signin",
  created: function() {
    Firebase.onAuth()
  },
  computed: {
    user() {
      return this.$store.getters.user
    },
    userStatus() {
      // ログインするとtrue
      return this.$store.getters.isSignedIn
    }
  },
  methods: {
    // ログイン処理
    doLogin() {
      const that = this
      Firebase.login().then((res) => {
        console.log(res)
        that.$router.push("/");
      })
      .catch(function(error) {
        console.log(error)
       })
    }
  }
}
</script>
 
 
<style>
</style>