<template>
  <div>

    <div>
      <h2> Overview </h2>
    </div>

    <div>
      <select type="text" v-model="searchIndustry" placeholder="Search By Major" >
        <option value="" disabled selected>Select Industry</option>
        <option v-for="(ind, key) in industries" :value="key">{{key}}</option>
      </select> </br>
    </div>

    <h2> Job Over Years </h2>
    <line-chart :data="jobPerYear"
                :legend="true"></line-chart>
  </div>

</template>

<script>
import {db} from '../firebase.js';  
import Vue from 'vue'

//var chart;
export default {
    data: function() {
      return{
        searchIndustry: "",
        years: ['14', '15', '16', '17'],
        dynamicGrads: [],
        dynamicJobs: [],
        allInd: [],
        databaseUrl: 'https://careeranalytics-7b367.firebaseio.com/graduate/data.json'
      }
    },
    //for each industry
    // data = [{name: 'job role', data: {2017: 3, 2016: 4, 2013: 2}}]
    mounted: function(){
      this.industryOverview()
    },


    watch: {
      searchIndustry: function(val){
        this.dynamicGrads = this.getGradsInIndustry(val);
        this.dynamicJobs = this.getJobs(val);
        this.allInd = this.getIndustry();
      }
    },

    computed: {
      jobPerYear(){
        var grads = this.dynamicGrads;
        var years = this.years;
        var jobs = this.dynamicJobs;
        var result = []
        for (var i = 0; i < jobs.length; i++){
          var dic = {};
          dic['name'] = jobs[i];
          console.log("Job", jobs[i]);
          dic["data"] = {};
          for (var j = 0; j < years.length; j++){
            var count = 0;
            for (var grad in grads){
              if (grads[grad]["Job Title"] === jobs[i] && grads[grad]["Grad Year"] === years[j]){
                count++;
              }
            }
            dic['data'][years[j]] = count;
          }
          result.push(dic);
          //console.log("DIC", dic);
        }
        //console.log("RESULT", result);
        return result;
      }
    }, 

    methods: {
      grads: function(){
        return this.graduates;
      }, 

      industry: function(){
        return this.industries;
      },

      getIndustry: function(){
        var arr = new Set();
        var industries = this.industry();
        for (var ind in industries){
          arr.add(ind);
          //console.log("IND", arr);
        }
        let array = Array.from(arr);
        return array;
      },

      industryOverview: async function(){
        //let inds = await axios.get(this.databaseUrl);
        //console.log(inds);
      },

      getGradsInIndustry: function(val){
        var arr = [];
        var grads = this.grads();
        for(var grad in grads){
          if(grads[grad]["Industry"] === val){
            arr.push(grads[grad]);
            //console.log("GRADuatesS", arr);
          }
        }
        return arr;
      },

      getJobs: function(val){
        var arr = new Set();
        var grads = this.grads();
        for (var grad in grads){
          if (grads[grad]["Industry"] === val){
            arr.add(grads[grad]["Job Title"]);
            //console.log("GRADuatesS", arr);
          }
        }
        let array = Array.from(arr);
        return array;
      }, 

    },

    firebase: {
      industries: {
        source: db.ref('industries').child('data'),
        asObject: true,
      },
      graduates: {
        source: db.ref('graduate').child('data'),
        asObject: true,
      }
    },
}
</script>

<!--<template>
  <div>
    <br>
    <vue-chart
      chart-type="LineChart"
      :columns="columns"
      :rows="rows"
      :options="options"
    ></vue-chart></vue-chart>
    <br>
    <h3>Columns</h3>
    {{ graduates }}
    <div v-for = "(index, key) in columnsReal"> {{key}} : {{columnsReal[key]}} </div>
    
    <h3>Industries</h3>
    <div>{{rowsReal}}</div>
  </div>
</template>-->


<!--<script>

import Firebase from 'firebase'
import {db} from '../firebase.js'


  export default {
    data: function() {
      return{
        // key: industry, value: [[year, num]...]
        columns: [{
                    'type': 'string',
                    'label': 'Year'
                }, {
                    'type': 'number',
                    'label': 'Banking and Finance'
                }, {
                    'type': 'number',
                    'label': 'Technology and Internet'
                }],
        rows: [
                ['2014', 1000, 400],
                ['2015', 1170, 460],
                ['2016', 660, 1120],
                ['2017', 1030, 540]
              ],

        options:
              {
                title: 'Industries Overview',
                hAxis: {
                    title: 'Year',
                    minValue: '2014',
                    maxValue: '2017'
                },
                vAxis: {
                    title: '',
                    minValue: 300,
                    maxValue: 1200
                },
                width: 1100,
                height: 500,
                curveType: 'function'
              },

      };
      
    },

    mounted: function (){
      console.log("Mounted")
      //console.log(this.columnsReal)

    },

    computed: {
      grads() {
        return this.graduates
      },
      // inds() {
      //   return this.industries
      // },

      columnsReal() {
        var inds = this.inds()
        var res = [{'type': 'string',
                   'label': 'year'
                 }]

        for (var industry in inds){
          if (industry===".key"){break}
          res.push({'type':'number', 'label': industry})
        }
        return res
      },

      rowsReal() {
        // store the indexes of each industry ==> which index in rows should this industry be?
        var industryIndexes = {}
        for (var index in this.columnsReal){
          var industryName = this.columnsReal[index]['label']
          industryIndexes[industryName] = index-1;
        }

        var rows = [["2014"], ["2015"], ["2016"], ["2017"]];
      }

    },

    firebase: {
      graduates: {
        source: db.ref("graduate").child("data"),
        asObject: true
      },
      industries: {
        source: db.ref("industries").child("data"),
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
      },

      inds: function() {
          return this.industries;
      }


    },
      
    
  }
</script>!-->



