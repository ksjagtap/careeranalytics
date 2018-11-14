<template>
  <div>

      <div align='center'>

<!--       {{columnsReal}}
      <br>
      <br>
      {{rowsReal}}
     -->
      <vue-chart
        chart-type="LineChart"
        :columns="columnsReal"
        :rows="rowsReal"
        :options="options"
      ></vue-chart>

      </div>
          <h2> Job Hiring Trend Per Industry </h2>
    <form>
      <div class="row">
        <div class="col"></div>
        <div class="col">
          <select type="text" v-model="searchIndustry" placeholder="Search By Major" class="form-control form-control-sm">
          <option value="" disabled selected>Select Industry</option>
          <option v-for="(ind, key) in industry" :value="key">{{key}}</option>
          </select> </br>
          </div>
        <div class="col"></div>
      </div>
    </form>

        <hr>
        <br>
        <div v-show="!isHidden">
        <line-chart
            :data="jobPerYear"
            :legend="true">
        </line-chart>
      </div>
        <br>
        <br>
        <br>

      </div>

  </div>

</template>

<style>
  hr {
      display: block;
      height: 20px;
      border: 0;
      border-top: 1px solid #ccc;
      margin: 1em 0;
      padding: 0;
      color: #333;
  }
</style>

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
        isHidden: true,
        rowsReal: [],
        options:
              {
                title: 'Graduate Hiring Trend By Industries',
                hAxis: {
                    title: 'Year',
                    minValue: '2014',
                    maxValue: '2017'
                },
                vAxis: {
                    title: '',
                    minValue: 0,
                    maxValue: 150
                },
                width: 1100,
                height: 500,
                curveType: 'function'
              },
      }
    },
    watch: {
      searchIndustry: function(val){
        this.dynamicGrads = this.getGradsInIndustry(val);
        this.dynamicJobs = this.getJobs(val);
        this.isHidden = false;
      },
    },

    computed: {
      industry(){
        var result = this.industries;
        delete result[".key"];
        return result;
      },

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
      },

      columnsReal() {
        console.log("Forced");
        var inds = this.industry;
        var res = [{'type': 'string',
                   'label': 'year'
                 }];
        for (var industry in inds){
          if (industry!==".key"){
            res.push({'type':'number', 'label': industry});
          }

        }
        return res
      },

      rowssReal() {
        // store the indexes of each industry ==> which index in rows should this industry be?
        var industryIndexes = {}

        var rows = [["2014", 0,0,0,0,0,0,0,0], ["2015",0,0,0,0,0,0,0,0],
        ["2016",0,0,0,0,0,0,0,0], ["2017",0,0,0,0,0,0,0,0]];
        for (var index in this.columnsReal){
          var industryName = this.columnsReal[index]['label'];
          industryIndexes[industryName] = index-1;
        }

        var grads = this.grads()
        for (var grad in grads){

          var ind = grads[grad]["Industry"];
          var year = grads[grad]["Grad Year"];
          var index = industryIndexes[ind];

          if(year === "14"){rows[0][index+1]++}
          else if(year === "15") {rows[1][index+1]++}
          else if(year === "16") {rows[2][index+1]++}
          else if(year === "17") {rows[3][index+1]++}

        }
        this.rowsReal = rows;
        vm.$forceUpdate();
        console.log("Forced");
        return;
      }
    },

    methods: {
      grads: function(){
        return this.graduates;
      },

      // industry: function(){
      //   return this.industries;
      // },

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



<!--<script>

import Firebase from 'firebase'
import {db} from '../firebase.js'




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

        var rows = [["2014", ], ["2015"], ["2016"], ["2017"]];
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
