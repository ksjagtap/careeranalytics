<template>
  <div class="hello">
    <h1>Welcome, {{ name }}!!</h1>
    <button @click="signOut">Sign out</button>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {

  name: '',
  data () {
    const user = firebase.auth().currentUser
    return {
      msg: 'Welcome to Your Vue.js App',
      //need to change to user's name
      name: user.email
    }
  },
  methods: {
    signOut: function () {
      firebase.auth().signOut().then(() => {
        this.$router.push('/signin')
      })
    }
  }
}
</script>

