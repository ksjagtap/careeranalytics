<template>
<div>
  Charts : Hiring Trend, CAP, Salary, Graduate Majors, Recommended Moduels, Related CCAs </br>
  <select v-model="currCoy">
    <option value="" disabled selected>Select Company</option>
    <option v-for="(ind, key) in mainData" :value="key">{{key}}</option>
  </select>
  <select v-model="currPos">
    <option value="" disabled selected>Select Company First</option>
    <option v-for="Pos in dynamicPositions" :value="Pos">{{Pos}}</option>
  </select> </br>
  <h2>Showing Statistics for {{currPos}} in {{currCoy}}</h2>

  <h2>Hiring Trend Over The Years</h2>
  Hiring Trend {{hiringTrend}} </br>
  <GChart type="LineChart" :data="hiringTrend"/>
  <h2>Distribution of CAP</h2>
  Cap Dist {{capDist}} </br>
  <div id="capChart" style="width: 100%; height: 400px;"></div>
  <h2>Distribution of Salary</h2>
  Salary {{salary}} </br>
  <div id="salaryChart" style="width: 100%; height: 400px;"></div>
  <h2>Major Counts</h2>
  Majors {{majors}} </br>
  <GChart type="BarChart" :data="majors"/>
</div>

</template>
<script>
import Firebase from 'firebase'
import {
    db
}
from '../firebase.js'

export default {
    data: function() {
        return {
            currCoy: "-",
            currPos: "-",
            dynamicPositions: [],
            hiringTrend: [] , // [year, number]
            capDist:  [],
            salary: [], //
            majors: [], //
        };
    },
    watch: {
        currCoy: function(val){
          this.dynamicPositions = this.getPosition(val);
          this.currPos = "-";
        },
        currPos: function(val){
          this.selectedData = this.getSelectedData();
          this.hiringTrend = this.getHiringTrend();
          this.capDist = this.getCapDist();
          this.salary = this.getSalary();
          this.majors = this.getMajors();
          AmCharts.makeChart("capChart", {
        "type": "serial",
        "theme": "light",
        "columnWidth": 1,
        "dataProvider": this.capDist,
        "graphs": [{
          "fillColors": "#c55",
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
        AmCharts.makeChart("salaryChart", {
        "type": "serial",
        "theme": "light",
        "columnWidth": 1, 
        "dataProvider": this.salary,
        "graphs": [{
          "fillColors": "#c55",
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
        processData: function() {
          return this.companies;
        },

        getPosition: function(val){
          var company = this.mainData[val];
          return company["Positions"];
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
            }
            if(Number(currYear) + 1 < Number(year)){
              // 14 + 1 < 16. 2 year gap between 16 and 14
              // might have a gap in the graph
              // would want to account for 15, loop through once
              for(var i = 0; i < Number(year)-Number(currYear); i++){
                result.push([String(Number(year)+1),0]);
              }
            }
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
          var startCap = 1.5;
          for(var cap in data){
            var currCap = data[cap];

            // Just skip if salary below 1000
            if(currCap < 1.5){
              continue;
            }

            // If this salary is still within the bin, add to count
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
          return result;
        },

        getSalary: function(){
          var startSalary = 1000;
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
          var data = this.getSelectedData()["Salaries"];
          data.sort();
          for(var salary in data){
            var currSalary = data[salary];

            // Just skip if salary below 1000
            if(currSalary < 1000){
              continue;
            }

            // If this salary is still within the bin, add to count
            if(currSalary < startSalary + 500){
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
              while(currSalary - 1000 >= startSalary){
                startSalary += 500;
                var salDict = {
                  "category": startSalary,
                  "count": currCount
                };
                result.push(salDict);
              }
              startSalary += 500;
              currCount = 1;
            }
          }
          var salDict = {
            "category": startSalary,
            "count": currCount
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
        var companies = this.processData();

        for(var company in companies) {
          var positions = new Set();
          dict[company] = {};
          for(var position in companies[company]["CAP"]){
            positions.add(position);
            dict[company][position] = {};
            dict[company][position]["CAP"] = companies[company]["CAP"][position];
          }
          for(var position in companies[company]["Salaries"]){
            positions.add(position);
            if(!(position in dict[company])){
                dict[company][position] = {};
            }
            dict[company][position]["Salaries"] = companies[company]["Salaries"][position];
          }
          for(var position in companies[company]["Hiring Trend"]){
            if(!(position in dict[company])){
                dict[company][position] = {};
            }
            dict[company][position]["Hiring Trend"] =  companies[company]["Hiring Trend"][position];
            positions.add(position);
          }
          for(var position in companies[company]["Major"]){
            if(!(position in dict[company])){
                dict[company][position] = {};
            }
            dict[company][position]["Major"] =  companies[company]["Major"][position];
            positions.add(position);
          }
          let array = Array.from(positions);
          dict[company]["Positions"] = array;
        }
        delete dict[".key"];
        return dict;
      },
      companyPositions: {
        get: function () {
          var positions = new Set();
          var companies = this.processData();
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
        companies: {
            source: db.ref("company").child("data"),
            asObject: true
        }
    }
}
</script>
