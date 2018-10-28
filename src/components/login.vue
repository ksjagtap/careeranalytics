<template>
  <div class="signin">
    <h2>Sign In</h2>
    <input type="email" placeholder="Enter Email" v-model="email">
    <input type="password" placeholder="Enter Password" v-model="password">
    <button @click="signin">Login</button>
    <p>New User?
      <router-link to="/signup">Sign Up Here</router-link>
    </p>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'signin',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    signin: function () {
      firebase.auth().signInWithEmailAndPassword(this.email, this.password)
        .then(
          user => this.$router.replace({path: profile}),
          err => alert('Something went wrong', err.message)
        )
    }
  }
}
</script>
