<template>
<div>
	SignUp Page

	<input v-model="email" placeholder="Enter Email">
	<input v-model="password" placeholder="Enter Password">

	<button> Register </button>

	<p>Do you have an account?
      <router-link to="/login">Sign Up</router-link>
    </p>

  </div>
</div>

</template>

<script>
import {db} from '../firebase.js';  
import Vue from 'vue'

export default {
//need to have user's details to be filled up, but rn is just basic first. 
	data: function(){
		return{
			email: '',
			password: '',
			authUser: null,
		}
	},

  methods: {
    signup: function () {
      firebase.auth().createUserWithEmailAndPassword(this.email, this.password)
        .then(user => {
          alert('Your account has been successfully created: ', user.email)
          this.$router.replace({ path: 'login'})
        })
        .catch(error => {
          alert(error.message)
        })
    }
  }

}

</script>
