<template>
  <div>
    <div v-for = "(index, key) in industryCount"> {{key}} : {{industryCount[key]}} </div>
    <br>
    <h3>BREAK POINT</h3>
    <!-- {{ graduates }} -->
    <div v-for = "(index, key) in grads"> {{key}} : {{grads[key]}} </div>
  </div>
</template>


<script>

import Firebase from 'firebase'
import {db} from '../firebase.js'


  export default {
    data: function() {
      return{
        // key: industry, value: [[year, num]...]
        industryData: {},
        industryDataLoaded: false,

        // key: industry, value: count of number of graduate. Later get top 5.
        industryCount: {"ind1": 1, "ind2": 2}
      };
      
    },

    mounted: function (){
      this.populateIndustryData()
    },

    computed: {
      grads(){
        return this.graduates;
      }

    },

    firebase: {
      graduates: {
        source: db.ref("graduate").child("data"),
        asObject: true
      }
    },

    methods: {

      populateIndustryData: async function() {
        console.log("FUNCTION CALLED ");

        for(var student_id in this.grads){
          let this_data = await this.grads[student_id];
          let industry = await this_data["Industry"];
          let grad_year = await this_data["Grad Year"]
          console.log("grad year", grad_year);

          if(!(industry in this.industryCount)){
            this.industryCount[industry] = 1;
          }
        }

        // // ignore below code
        // Object.entries(this.grads).forEach(function(student_id, student_data) {
        //   console.log(student_data)
        //   var industry = student_data["Industry"];
        //   var grad_year = student_data["Grad Year"];

        //   if(!(industry in this.industryCount)){
        //     this.industryCount[industry] = 1;
        //     console.log(industry);
        //   }
        // });

        return this.industryCount;
      }
    },
      
    
  }
</script>