<template>

<div>
  Position :
  <select v-model="currPos">
    <option value="" disabled selected>Select Position</option>
    <option v-for="Pos in companyPositions" :value="Pos">{{Pos}}</option>
  </select> </br>
  Industry:
  <select v-model="currIndustry">
    <option value="" disabled selected>Select Industry (Select Position First)</option>
    <option v-for="ind in dynamicInd" :value="ind">{{ind}}</option>
  </select>
  <table align='center'>
        <thead>
            <tr>
                <th @click="sort('Name')" onmouseover="" style="cursor: pointer;">Name</th>
                <th @click="sort('CAP')" onmouseover="" style="cursor: pointer;">CAP</th>
                <th @click="sort('Salaries')" onmouseover="" style="cursor: pointer;">Salary</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for= "company in sortedTable">
                <td>{{company.Name}}</td>
                <td>{{company.CAP}}</td>
                <td>{{company.Salaries}}</td>
            </tr>
        </tbody>
    </table>
</div>

</template>

<style>
select{
  width: 300px;
}

table {
  border-collapse: collapse;
}

th {
  border: 1px solid #999;
  padding: 0.5rem;
  text-align: center;
  color: #FFFFFF;
  background-color: #337FFF;
}

td {
  border: 1px solid #999;
  padding: 0.5rem;
  text-align: center;
}
</style>

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
            currIndustry: "",
            currPos: "",
            dynamicInd: [],
            showCharts : false,
            tableData: [],
            currentSort : "name",
            currentSortDir:'asc'
        };
    },
    watch: {
        currPos: function(val){
          this.dynamicInd = this.getIndustry(val);
          this.currIndustry = "";
          this.showCharts = true;
          this.tableData = this.calTableData(val);
        },
        currIndustry: function(val){
          if(this.currIndustry == ""){
            return;
          }
          this.tableData = this.processTableData(val);
        }
    },
    
    methods: {
        arrContains: function(arr, value){
          for(var val in arr){
            if(arr[val] == value){
              return true;
            }
          }
          return false;
        },
        sort:function(s) {
          //if s == current sort, reverse
          if(s === this.currentSort) {
            this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
          }
          this.currentSort = s;
        },
        median: function(values) {
          [].slice.call(values).sort( function(a,b) {return a - b;} );
          var half = Math.floor(values.length/2);
          if(values.length % 2){
            return Math.round(values[half] * 100) / 100;
          }
          else{
            return Math.round((values[half-1] + values[half]) / 2.0 * 100) / 100;
          }
        },
        calTableData: function(val) {
          //This one calculates solely based on positions, ALL industries
          var final = [];
          var arr = ["Salaries", "CAP"];
          for(var company in this.mainData){
            var coy = this.mainData[company];
            if(this.arrContains(coy.Positions, val)){
              var dict = {};
              // if the position is in the company, yay
              dict["Name"] = company;
              for(var a in arr){
                var variable = arr[a];
                let values = coy[val][variable];
                let median = this.median(values);
                dict[variable] = median;
                // if(median == 0){
                //   dict[variable] = "NA";
                // } else {
                //   dict[variable] = median;
                // }
              }
              final.push(dict);
            }
          }
          return final;
        },
        processTableData: function() {
          //This one calculates by position and industry
          var final = [];
          var arr = ["Salaries", "CAP"];
          for(var company in this.mainData){
            var coy = this.mainData[company];
            if(this.arrContains(coy.Positions, this.currPos)){
              if(coy.Industry != this.currIndustry){
                console.log(coy.Industry);
                console.log(this.currIndustry);
                // if doesn't contain the industry, skip
                continue;
              }
              var dict = {};
              // if the position is in the company, yay
              dict["Name"] = company;
              for(var a in arr){
                var variable = arr[a];
                let values = coy[this.currPos][variable];
                let median = this.median(values);
                dict[variable] = median;
                // if(median == 0){
                //   dict[variable] = "NA";
                // } else {
                //   dict[variable] = median;
                // }
              }
              final.push(dict);
            }
          }
          return final;
        },
        processData: function() {
          return this.companies;
        },
        getIndustry: function(val){
          var arr = new Set();
          var companies = this.mainData;
          for(var company in companies){
            if(companies[company]["Positions"].includes(val)){
              arr.add(companies[company]["Industry"]);
            }
          }
          let array = Array.from(arr);
          return array;
        }
    },
    computed: {
      mainData: function () {
        var dict = {};
        var companies = this.processData();

        for(var company in companies) {
          var industry = companies[company]["Industry"];
          if (industry === "NA") { industry = "OTHER"; }
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
          dict[company]["Industry"] = industry;
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
      },
      industry: {
        get: function () {
          var industry = new Set();
          var companies = this.processData();
          for(var company in companies) {
            if (companies[company]["Industry"] === "NA") { continue; }
            industry.add(companies[company].Industry);
          }
          let arr = Array.from(industry);
          return arr;
        },
      },
      sortedTable:function() {
        return this.tableData.sort((a,b) => {
          let modifier = 1;
          if(this.currentSortDir === 'desc') modifier = -1;
          if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
          if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
          return 0;
        });
      },
    },
    firebase: {
        companies: {
            source: db.ref("company").child("data"),
            asObject: true
        }
    }
}
</script>
