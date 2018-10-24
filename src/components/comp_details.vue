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
  <div id="chartdiv"></div>
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
            someData: 1,
            currCoy: "-",
            currPos: "-",
            dynamicPositions: "",
            hiringTrend: "", // [year, number]
            capDist: "", // [5: 1]
            salary: "", //
            majors: "" //
        };
    },
    watch: {
        currCoy: function(val){
          this.dynamicPositions = this.getPosition(val);
        },
        currPos: function(val){
          console.log(val);
        }
    },
    methods: {
        processData: function() {
          return this.companies;
        },
        getPosition: function(val){
          var company = this.mainData[val];
          return company["Positions"];
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
