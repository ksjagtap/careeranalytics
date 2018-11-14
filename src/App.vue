<template>
  <div id="app">
    <div>
    <strong><font face = "Garamond"><h1 align="center">NUSCareers</h1></font></strong>
    </div>
    <div id="tabs">
    <md-tabs class="md-primary" md-alignment="fixed">
      <md-tab id="tab-home" md-label="Profile" @click="changeRoute('PROFILE')">
        <div style='background-color:#FFFFFF'
              img src="https://flaticons.net/gd/makefg.php?i=icons/Application/User-Profile.png&r=255&g=255&b=255"></div>
      </md-tab>
      <md-tab id="tab-pages" md-label="Explore" @click="changeRoute('EXPLORE')">
        <div style='background-color:#FFFFFF'></div>
      </md-tab>
      <md-tab id="tab-posts" md-label="Jobs" @click="changeJobRoute('CAREERS_BY_MAJOR')">
        <div style='background-color:#FFFFFF'>
        <router-link to='/careersByMajor'><button type="button" class="button btn-primary">Careers By Major</button></router-link>
        <router-link to='/industryoutlook'> <button type="button" class="button btn-primary">Industry Outlook</button> </router-link>
        <router-link to='/comparecompanies'> <button type="button" class="button btn-primary">Compare Companies</button> </router-link>
        <router-link to='/companydetails'> <button type="button" class="button btn-primary">Company Details</button></router-link>
        </div>
      </md-tab>
      <md-tab id="tab-favorites" md-label="Internship" @click="changeInternRoute('COMPARE_INTERNSHIPS')">
        <div style='background-color:#FFFFFF'>
        <router-link to='/compareinternships'><button type="button" class="button btn-primary">Compare Internships</button></router-link>
        <router-link to='/internshipdetails'> <button type="button" class="button btn-primary">Internship Details</button></router-link>
      </div>
      </md-tab>
    </md-tabs>
    </div>
    <router-view></router-view>
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
        this.inIntern = false;
        this.inJob = false;
    },
    changeJobRoute(id){
      if(this.inJob){
        // For some reason, every click within the md-tab causes the changeRoute
        // to run. We have to tell it to do nothing when we're within the tab.
        // Hence, cannot use function changeRoute because it won't load the router views.
        return
      } else {
        this.$router.push({name:id});
        this.inIntern = false;
        this.inJob = true;
      }
    },
    changeInternRoute(id){
      if(this.inIntern){
        // For some reason, every click within the md-tab causes the changeRoute
        // to run. We have to tell it to do nothing when we're within the tab.
        // Hence, cannot use function changeRoute because it won't load the router views.
        return
      } else {
        this.$router.push({name:id});
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

.md-button {
  color: #FFFFFF;
  background-color: #15294C;
  width: 100% !important;
}

#tabs {
  padding: 0;
  width:100%!important;
  background: linear-gradient(180deg, #15294C 48px, #FFFFFF 50px);
}
</style>
