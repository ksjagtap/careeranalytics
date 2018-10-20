<template>
  <div id="app">
    <router-link to='/profile'> <button>Profile</button> </router-link>
    <router-link to='/careersByMajor'><button>Careers By Major</button></router-link>
    <router-link to='/companydetails'> <button>Company Details</button> </router-link>
    <router-link to='/comparecompanies'> <button>Compare Companies</button> </router-link>
    <router-link to='/industryoutlook'> <button>Industry Outlook</button> </router-link>
    <router-view/>
  </div>
</template>

<script>
import Firebase from 'firebase'


const App = Firebase.initializeApp({
  // config goes here
  // WE NEED TO CHANGE OUR DATABASE REMEMBER!!!
    apiKey: "AIzaSyAk6_id0HX7JHbAEM6QPpKsWZZ-Cghisfc",
    authDomain: "bt3103-a02ec.firebaseapp.com",
    databaseURL: "https://bt3103-a02ec.firebaseio.com",
    projectId: "bt3103-a02ec",
    storageBucket: "bt3103-a02ec.appspot.com",
    messagingSenderId: "230581730425"
})

export const db = App.database();  // from every component we need to import {db} from here

// export default {
//   name: 'App'
// }

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
