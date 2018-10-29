<template>
  <div>
    <form>
    <div class="row">
      <div class="col"></div>
      <div class="col">
        <h6>Select Company :</h6>
        <select v-model="currCoy" class="form-control form-control-sm">
          <option value="" selected disabled>Select Company</option>
          <option v-for="(ind, key) in mainData" :value="key">{{key}}</option>
        </select> </br>
      </div>
      <div class="col">
        <h6>Select Position in Company :</h6>
        <select v-model="currPos" class="form-control form-control-sm">
          <option value="" selected disabled>Select Company First</option>
          <option v-for="Pos in dynamicPositions" :value="Pos">{{Pos}}</option>
        </select> </br>
      </div>
      <div class="col"></div>
    </div>
  </form>

    <h3>Showing Statistics for {{currPos}} in {{currCoy}}</h3>

    <b-container fluid>
     <b-row>
       <b-col cols="3">
         <b-list-group v-b-scrollspy:listgroup-ex>
         </br>
         </br>
           <b-list-group-item href="#list-item-1">Intern Year Profile</b-list-group-item>
           <b-list-group-item href="#list-item-2">Hiring Trend</b-list-group-item>
           <b-list-group-item href="#list-item-3">CAP Distribution</b-list-group-item>
           <b-list-group-item href="#list-item-4">Salary Distribution</b-list-group-item>
           <b-list-group-item href="#list-item-5">Job Majors</b-list-group-item>
         </b-list-group>
       </b-col>
       <b-col cols="9">
         <div v-if="!isHidden">
           <h1> Please Select Company and Position </h1>
         </br>
         </br>
         </br>
         </br>
         </br>
         </br>
         </br>
         </br>
         </br>
         </br>
         </br>
         </br>
         </br>
         </br>
         </br>
         </div>
         <div id="listgroup-ex" style="position:relative;overflow-y:auto;height:400px">

           <h4 id="list-item-1">Internship Year Profile</h4>
           <GChart type="PieChart" :data="internYear" style="width: 100%; height: 250px;"/>
           </br></br></br>
           <h4 id="list-item-2">Hiring Trend Over The Years</h4>
           <GChart type="LineChart" :data="hiringTrend" style="width: 100%; height: 250px;"/>
           </br></br></br>
           <h4 id="list-item-3">Distribution of CAP</h4>
           <div id="internCapChart" style="width: 100%; height: 250px;"></div>
           </br></br></br>
           <h4 id="list-item-4">Distribution of Salary</h4>
           <div id="internSalaryChart" style="width: 100%; height: 250px;"></div>
           </br></br></br>
           <h4 id="list-item-5">Major Counts</h4>
           <GChart type="BarChart" :data="majors" style="width: 100%; height: 250px;"/> </br></br></br></br></br></br>

         </div>
       </b-col>
     </b-row>
   </b-container>
  </div>
</template>

<style>

div {
  position: relative;
}
</style>

<script>

import Firebase from 'firebase'
import {db} from '../firebase.js'


export default {
  data: function() {
    return{
      currCoy: "",
      currPos: "",
      dynamicPositions: [],
      hiringTrend: [] , // [year, number]
      capDist:  [],
      salary: [], //
      majors: [], //
      years: [], //
      internYear: [],
      isHidden: false
    }

  },
  watch: {
      currCoy: function(val){
        this.dynamicPositions = this.getPosition(val);
        this.currPos = "-";
        this.isHidden=false;
      },
      currPos: function(val){
        // need to add for years
        this.isHidden=true;
        this.selectedData = this.getSelectedData();
        this.hiringTrend = this.getHiringTrend();
        this.capDist = this.getCapDist();
        this.salary = this.getSalary();
        this.majors = this.getMajors();
        this.internYear = this.getInternYears();
        AmCharts.makeChart("internCapChart", {
      "type": "serial",
      "theme": "light",
      "columnWidth": 1,
      "dataProvider": this.capDist,
      "graphs": [{
        "fillColors": "#337FFF",
        "fillAlphas": 0.9,
        "lineColor": "#fff",
        "lineAlpha": 0.7,
        "type": "column",
        "valueField": "count"
      }],
      "categoryField": "category",
      "categoryAxis": {
        "startOnAxis": true,
        "title": "Try"
      },
      "valueAxes": [{
        "title": "Count"
      }]
    });
      AmCharts.makeChart("internSalaryChart", {
      "type": "serial",
      "theme": "light",
      "columnWidth": 1,
      "dataProvider": this.salary,
      "graphs": [{
        "fillColors": "#337FFF",
        "fillAlphas": 0.9,
        "lineColor": "#fff",
        "lineAlpha": 0.7,
        "type": "column",
        "valueField": "count"
      }],
      "categoryField": "category",
      "categoryAxis": {
        "startOnAxis": true,
        "title": "Try"
      },
      "valueAxes": [{
        "title": "Count"
      }]
    });
      }
  },

  methods: {
    getPosition: function(val){
      var company = this.mainData[val];
      var result = company["Positions"]
      result.sort()
      return result;
    },

    getInternYears: function(){
      var data = this.getSelectedData()["Year"];
      var result = [];
      result.push(['Year', 'Count']);
      data.sort();
      var current = data[0];
      var count = 0;
      for(var i in data){
        if(current==data[i]){
          count++;
        } else {
          result.push([current, count])
          count = 1;
          current = data[i];
        }
      }
      result.push([current, count]);
      console.log(result);
      return result
    },

    getSelectedData: function(){
      var result = this.mainData[this.currCoy][this.currPos];
      return result;
    },

    getHiringTrend: function(){
      // To plot a Google Line Chart
      var result = [["Year", "Count"]];
      var currYear = 0;
      var count = 0;
      var data = this.getSelectedData()["Hiring Trend"];
      for(var year in data){
        if(count == 0){
          // initiate the current year as the first year instance
          currYear = year;
          count++;
        } else{
          currYear++;
        }
        if(Number(currYear) < Number(year)){
          // 14 + 1 < 16. 2 year gap between 16 and 14
          // might have a gap in the graph
          // would want to account for 15, loop through once
          for(var i = 0; i < Number(year)-Number(currYear); i++){
            result.push([String(Number(currYear)+i),0]);
          }
        }
        currYear = year;
        result.push([year,data[year]]);
      }
      return result;
    },

    getCapDist: function(){
      // Histogram
      // Has to be in the format:
      // [{
      //   "category": "0"
      // }, {
      //   "category": "1",
      //   "count": 25
      // }]
      var data = this.getSelectedData()["CAP"];
      data.sort();
      var result = [];
      var currCount = 0;
      var startCap = Math.floor(data[0]/0.25)/4 - 0.50;
      for(var cap in data){
        var currCap = data[cap];

        // Just skip if cap below 1000
        if(currCap < 1.5){
          continue;
        }

        // If this cap is still within the bin, add to count
        if(currCap < startCap + 0.25){
          currCount++;
        } else{

          // Salary is out of the bin already, time to add to count
          var capDict = {
            "category": startCap,
            "count": currCount
          };
          result.push(capDict);
          currCount = 0;

          // While current salary is two bins before, initiate to zero
          // When exits, that will be the correct bin and we will need
          // to instantiate the count to 1
          while(currCap- 0.5 >= startCap){
            startCap += 0.25;
            var capDict = {
              "category": startCap,
              "count": currCount
            };
            result.push(capDict);
          }
          startCap += 0.25;
          currCount = 1;
        }
      }
      var capDict = {
        "category": startCap,
        "count": currCount
      }
      result.push(capDict);
      while(startCap < 5){
        startCap += 0.25;
        var capDict = {
          "category": startCap,
          "count": 0
        };
        result.push(capDict);
      }
      var capDict = {
        "category": "",
        "count": 0
      };
      result.push(capDict);
      return result;
    },

    getSalary: function(){
      // Histogram
      // Has to be in the format:
      // [{
      //   "category": "0"
      // }, {
      //   "category": "1",
      //   "count": 25
      // }]

      // Category of 1000 will contain 1000-1499
      var result = [];
      var currCount = 0;
      var data = this.getSelectedData()["Allowance"];
      data.sort();
      var startSalary = Math.floor(data[0]/100)*100 - 400;
      for(var salary in data){
        var currSalary = data[salary];

        // Just skip if salary below 1000
        if(currSalary < 500){
          continue;
        }

        // If this salary is still within the bin, add to count
        if(currSalary < startSalary + 200){
          currCount++;
        } else{

          // Salary is out of the bin already, time to add to count
          var salDict = {
            "category": startSalary,
            "count": currCount
          };
          result.push(salDict);
          currCount = 0;

          // While current salary is two bins before, initiate to zero
          // When exits, that will be the correct bin and we will need
          // to instantiate the count to 1
          while(currSalary - 400 >= startSalary){
            startSalary += 200;
            var salDict = {
              "category": startSalary,
              "count": currCount
            };
            result.push(salDict);
          }
          startSalary += 200;
          currCount = 1;
        }
      }
      var salDict = {
        "category": startSalary,
        "count": currCount
      }
      result.push(salDict);
      var salDict = {
        "category": startSalary+200,
        "count": 0
      }
      result.push(salDict);
      return result;
    },

    getMajors: function(){
      // Bar Chart
      // Has to be in the format of a
      var data = this.getSelectedData()["Major"];
      data.sort();
      var majDict = {};
      for(var major in data){
        var maj = data[major];
        if(maj in majDict){
          majDict[maj] += 1;
        } else {
          majDict[maj] = 1;
        }
      }
      var items = Object.keys(majDict).map(function(key) {
        return [key, majDict[key]];
      });

      // Sort the array based on the second element
      items.sort(function(first, second) {
        return second[1] - first[1];
      });
      var result = [["Major", "Count"]];
      for(var i in items){
        result.push(items[i]);
      }
      return result;
    }
  },
  computed: {
    mainData: function () {
      var dict = {};
      var internships = this.internship;

      for(var intern in internships) {
        var positions = new Set();
        dict[intern] = {};

        for(var position in internships[intern]["CAP"]){
          positions.add(position);
          dict[intern][position] = {};
          dict[intern][position]["CAP"] = internships[intern]["CAP"][position];
        }

        for(var position in internships[intern]["Allowance"]){
          positions.add(position);
          if(!(position in dict[intern])){
              dict[intern][position] = {};
          }
          dict[intern][position]["Allowance"] = internships[intern]["Allowance"][position];
        }

        for(var position in internships[intern]["Hiring Trend"]){
          if(!(position in dict[intern])){
              dict[intern][position] = {};
          }
          dict[intern][position]["Hiring Trend"] =  internships[intern]["Hiring Trend"][position];
          positions.add(position);
        }

        for(var position in internships[intern]["Major"]){
          if(!(position in dict[intern])){
              dict[intern][position] = {};
          }
          dict[intern][position]["Major"] =  internships[intern]["Major"][position];
          positions.add(position);
        }

        for(var position in internships[intern]["Year"]){
          if(!(position in dict[intern])){
              dict[intern][position] = {};
          }
          dict[intern][position]["Year"] =  internships[intern]["Year"][position];
          positions.add(position);
        }

        let array = Array.from(positions);
        dict[intern]["Positions"] = array;
        dict[intern]["Period"] = internships[intern]["Period"];
      }
      delete dict[".key"];
      return dict;
    },

    companyPositions: {
      get: function () {
        var positions = new Set();
        var companies = this.internship;
        for(var company in companies) {
          for(var position in companies[company]["CAP"]){
            positions.add(position);
          }
        }
        let array = Array.from(positions);
        return array;
      },
    }
  },

  firebase: {
      internship: {
          source: db.ref("internship").child("data"),
          asObject: true
      }
  }
}

</script>
