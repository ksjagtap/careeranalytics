<template>
  <div id="app">
    <img :src="image" alt="NUSCareersLogo" height="45" width="170" align='left'>
    <b-tabs>
      <b-tab title="Profile" active> </br>
        <br> Profile Page/Home Page
      </b-tab>
      <b-tab title="Explore" active> </br>
        <br> Jobs Descriptions
      </b-tab>
      <b-tab title="Jobs" > </br>
        <router-link to='/profile'> <button type="button" class="btn btn-primary">Profile</button> </router-link>
        <router-link to='/careersByMajor'><button type="button" class="btn btn-primary">Careers By Major</button></router-link>
        <router-link to='/industryoutlook'> <button type="button" class="btn btn-primary">Industry Outlook</button> </router-link>
        <router-link to='/comparecompanies'> <button type="button" class="btn btn-primary">Compare Companies</button> </router-link>
        <router-link to='/companydetails'> <button type="button" class="btn btn-primary">Company Details</button> </router-link>
        <router-view/>
      </b-tab>
      <b-tab title="Internship"> </br>
        <router-link to='/careersByMajor'><button type="button" class="btn btn-primary">Careers By Major</button></router-link>
        <router-link to='/industryoutlook'> <button type="button" class="btn btn-primary">Industry Outlook</button> </router-link>
        <router-link to='/comparecompanies'> <button type="button" class="btn btn-primary">Compare Companies</button> </router-link>
        <router-link to='/companydetails'> <button type="button" class="btn btn-primary">Company Details</button> </router-link>
        <router-view/>
      </b-tab>
    </b-tabs>
  </div>

</template>

<script>
import Firebase from 'firebase'
import image from './NUSCareersLogo.png'

// const App = Firebase.initializeApp({
//   // config goes here
//   // WE NEED TO CHANGE OUR DATABASE REMEMBER!!!
//     apiKey: "AIzaSyAk6_id0HX7JHbAEM6QPpKsWZZ-Cghisfc",
//     authDomain: "bt3103-a02ec.firebaseapp.com",
//     databaseURL: "https://bt3103-a02ec.firebaseio.com",
//     projectId: "bt3103-a02ec",
//     storageBucket: "bt3103-a02ec.appspot.com",
//     messagingSenderId: "230581730425"
// })

// export const db = App.database();  // from every component we need to import {db} from here

export default {
  name: 'App',
  data: function () {
      return {
          image: image
      }
  }
}

</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  vertical-align: top;
}
</style>
