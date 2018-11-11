<template>
  <div id="app">

    <img :src="image" alt="NUSCareersLogo" height="45" width="170" align='left'>
    <b-tabs>
      <b-tab title="Profile" active @click="changeRoute('PROFILE')"> </br>
      </b-tab>
      <b-tab title="Explore" @click="changeRoute('EXPLORE')"> </br>
        <router-link to='/explore' hidden=true> <button type="button" class="btn btn-primary">Explore</button> </router-link>
      </b-tab>


      <b-tab title="Jobs" @click="changeRoute('CAREERS_BY_MAJOR')"> </br>

<!--         <nav class="navbar navbar-inverse">
          <div class="container-fluid">
            <div class="navbar-header">
              <a class="navbar-brand" href="#">WebSiteName</a>
            </div>
            <ul class="nav navbar-nav">
              <li class="active"><a href="#">Home</a></li>
              <li><a href="#">Page 1</a></li>
              <li><a href="#">Page 2</a></li>
              <li><a href="#">Page 3</a></li>
            </ul>
          </div>
      </nav> -->

<!--       <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <a class="navbar-brand" href="#">Explore the Possibilities</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav">
             <router-link to='/careersByMajor'><button type="button" class="button btn-primary">Careers By Major</button></router-link>
              <router-link to='/industryoutlook'> <button type="button" class="button btn-primary">Industry Outlook</button> </router-link>
              <router-link to='/comparecompanies'> <button type="button" class="button btn-primary">Compare Companies</button></router-link>
              <router-link to='/companydetails'> <button type="button" class="button btn-primary">Company Details</button></router-link>
          </div>
        </div>
      </nav> -->

        
<!--         <nav class="navbar nav-pills navbar-right">
          <div class="container-fluid">
              <ul class="nav navbar-nav">
                <li class="active"><router-link to='/careersByMajor'>Careers by Major</router-link></li>
                <li><router-link to='/industryoutlook'>Industry Outlook</router-link></li>
                <li><router-link to='/comparecompanies'>Compare Companies</router-link></li>
                <li><router-link to='/companydetails'>Company Details</router-link></li>
            </ul>
          </div>
        </nav> -->

        <router-link to='/careersByMajor'><button type="button" class="button btn-primary">Careers By Major</button></router-link>
        <router-link to='/industryoutlook'> <button type="button" class="button btn-primary">Industry Outlook</button> </router-link>
        <router-link to='/comparecompanies'> <button type="button" class="button btn-primary">Compare Companies</button> </router-link>
        <router-link to='/companydetails'> <button type="button" class="button btn-primary">Company Details</button></router-link>


      </b-tab>

      <b-tab title="Internship" @click="changeRoute('COMPARE_INTERNSHIPS')"> </br>
        <router-link to='/compareinternships'><button type="button" class="button btn-primary">Compare Internships</button></router-link>
        <router-link to='/internshipdetails'> <button type="button" class="button btn-primary">Internship Details</button></router-link>
      </b-tab>
    </b-tabs>
    <router-view/>
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
  },
  methods :{
    changeRoute(id){
        this.$router.push({name:id});
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

.button {
  background-color: #15294C;
  border-radius: 4px;
  border: 4px solid #15294C;
}

.nav-tabs {
  color: #15294C;
  background-color: white;
}

.tab-content {
  color: #15294C;
}


</style>
