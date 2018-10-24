<template>

<div>
  <select v-model="currCoy">
    <option value="" disabled selected>Select Company</option>
    <option v-for="(ind, key) in mainData" :value="key">{{key}}</option>
  </select>
  <select v-model="currPos">
    <option value="" disabled selected>Select Company First</option>
    <option v-for="Pos in dynamicPositions" :value="Pos">{{Pos}}</option>
  </select>

  <!-- <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>CAP</th>
                <th>Industry</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for = "(ind, key) in mainData" >
                <td>{{key}}</td>
                <td>{{ind}}</td>
                <td>{{grad.Industry}}</td>
            </tr>
        </tbody>
    </table> -->
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
            currCoy: "",
            currPos: "",
            dynamicPositions: ""
        };
    },
    watch: {
        currCoy: function(val){
          console.log(val);
          console.log(this.getPosition(val));
          this.dynamicPositions = this.getPosition(val);
        }
    },
    methods: {
        processData: function() {
          return this.companies;
        },
        getPosition: function(val){
          var company = this.mainData[val];
          console.log(company["Positions"]);
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
