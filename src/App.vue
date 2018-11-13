<template>
  <div id="app">
    <div>
    <strong><font face = "Garamond"><h1 align="left">NUSCareers</h1></font></strong>
    </div>
    <md-tabs class="md-primary" md-alignment="fixed">
      <md-tab id="tab-home" md-label="Profile" @click="changeRoute('PROFILE')">
      </md-tab>
      <md-tab id="tab-pages" md-label="Explore" @click="changeRoute('EXPLORE')">
      </md-tab>
      <md-tab id="tab-posts" md-label="Jobs" @click="changeJobRoute('CAREERS_BY_MAJOR')">
        <router-link to='/careersByMajor'><button type="button" class="button btn-primary">Careers By Major</button></router-link>
        <router-link to='/industryoutlook'> <button type="button" class="button btn-primary">Industry Outlook</button> </router-link>
        <router-link to='/comparecompanies'> <button type="button" class="button btn-primary">Compare Companies</button> </router-link>
        <router-link to='/companydetails'> <button type="button" class="button btn-primary">Company Details</button></router-link>
      </md-tab>
      <md-tab id="tab-favorites" md-label="Internship" @click="changeInternRoute('COMPARE_INTERNSHIPS')">
        <router-link to='/compareinternships'><button type="button" class="button btn-primary">Compare Internships</button></router-link>
        <router-link to='/internshipdetails'> <button type="button" class="button btn-primary">Internship Details</button></router-link>
      </md-tab>
    </md-tabs>
    <div>
    <router-view></router-view>
    </div>
    <!-- <img :src="image" alt="NUSCareersLogo" height="45" width="170" align='left'>

    <b-tabs>
      <b-tab title="Profile" active @click="changeRoute('PROFILE')"> </br>
      </b-tab>
      <b-tab title="Explore" @click="changeRoute('EXPLORE')"> </br>
      </b-tab>


      <b-tab title="Jobs" @click="changeRoute('CAREERS_BY_MAJOR')"> </br>
        <router-link to='/careersByMajor'><button type="button" class="button btn-primary">Careers By Major</button></router-link>
        <button type="button" class="button btn-primary" @click="changeRoute('INDUSTRY_OUTLOOK')">Industry Outlook</button>
        <router-link to='/comparecompanies'> <button type="button" class="button btn-primary">Compare Companies</button> </router-link>
        <router-link to='/companydetails'> <button type="button" class="button btn-primary">Company Details</button></router-link>


      </b-tab>

      <b-tab title="Internship" @click="changeRoute('COMPARE_INTERNSHIPS')"> </br>
        <router-link to='/compareinternships'><button type="button" class="button btn-primary">Compare Internships</button></router-link>
        <router-link to='/internshipdetails'> <button type="button" class="button btn-primary">Internship Details</button></router-link>
      </b-tab>
    </b-tabs>
    <router-view/> -->
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
          image: image,
          inJob: false,
          inIntern: false
      }
  },
  methods :{
    changeRoute(id){
        this.$router.push({name:id});
        console.log("Changed to " + id);
        this.inIntern = false;
        this.inJob = false;
    },
    changeJobRoute(id){
      if(this.inJob){
        return
      } else {
        this.$router.push({name:id});
        console.log("Changed to " + id);
        this.inIntern = false;
        this.inJob = true;
      }
    },
    changeInternRoute(id){
      if(this.inIntern){
        return
      } else {
        this.$router.push({name:id});
        console.log("Changed to " + id);
        this.inJob = false;
        this.inIntern = true;
      }
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

/* .nav-tabs {
  color: #15294C;
  background-color: white;
} */

/* .tab-content {
  color: #15294C;
} */

.md-button {
  color: #FFFFFF;
  background-color: #15294C;
  height:1000px;
}
/* .md-tab-content{
  background-color:#FFFFFF;
} */
.md-tabs{
  background-color:white;
  width:100vw;
}
</style>
