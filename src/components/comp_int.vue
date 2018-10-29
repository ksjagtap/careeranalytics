<template>

<div>
  <form>
    <div class="row">
      <div class="col"></div>
      <div class="col">
        Position :
        <select v-model="currPos" class="form-control form-control-sm">
          <option value="" disabled selected>Select Position</option>
          <option v-for="Pos in companyPositions" :value="Pos">{{Pos}}</option>
        </select> </br>
      </div>
      <div class="col">
        Industry:
        <select v-model="currIndustry" class="form-control form-control-sm">
          <option value="" disabled selected>Select Industry (Select Position First)</option>
          <option v-for="ind in dynamicInd" :value="ind">{{ind}}</option>
        </select></br>
      </div>
      <div class="col"></div>
    </div>
  </form>

  <form>
    Percent Composition Of Interns In Selected Year :
    <label class="checkbox-inline">
      <input type="checkbox" value=true v-model="showYearOne">Year 1
    </label>
    <label class="checkbox-inline">
      <input type="checkbox" value=true v-model="showYearTwo">Year 2
    </label>
    <label class="checkbox-inline">
      <input type="checkbox" value=true v-model="showYearThree">Year 3
    </label>
    <label class="checkbox-inline">
      <input type="checkbox" value=true v-model="showYearFour">Year 4
    </label>
  </form>

  <table align='center' class="table table-hover">
        <thead>
            <tr>
                <th @click="sort('Name')" onmouseover="" style="cursor: pointer;" v-b-popover.hover="'Sort by Name'">Name</th>
                <th @click="sort('CAP')" onmouseover="" style="cursor: pointer;" v-b-popover.hover="'Sort by CAP'">CAP</th>
                <th @click="sort('Allowance')" onmouseover="" style="cursor: pointer;" v-b-popover.hover="'Sort by Allowance'">Allowance</th>
                <th @click="sort('YearOne')" onmouseover="" style="cursor: pointer;" v-if="showYearOne" v-b-popover.hover="'Sort by Percentage of Year Ones (0.90 means 90% of interns were Year 1)'">Year One</th>
                <th @click="sort('YearTwo')" onmouseover="" style="cursor: pointer;" v-if="showYearTwo" v-b-popover.hover="'Sort by Percentage of Year Ones (0.56 means 56% of interns were Year 2)'">Year Two</th>
                <th @click="sort('YearThree')" onmouseover="" style="cursor: pointer;" v-if="showYearThree" v-b-popover.hover="'Sort by Percentage of Year Ones (0.44 means 44% of interns were Year 3)'">Year Three</th>
                <th @click="sort('YearFour')" onmouseover="" style="cursor: pointer;" v-if="showYearFour" v-b-popover.hover="'Sort by Percentage of Year Ones (0.14 means 14% of interns were Year 4)'">Year Four</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for= "company in sortedTable">
                <td>{{company.Name}}</td>
                <td>{{company.CAP}}</td>
                <td>{{company.Allowance}}</td>
                <td v-if="showYearOne">{{company.YearOne}}</td>
                <td v-if="showYearTwo">{{company.YearTwo}}</td>
                <td v-if="showYearThree">{{company.YearThree}}</td>
                <td v-if="showYearFour">{{company.YearFour}}</td>
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
  width: 600px;
}

th {
  border: 1px solid #999;
  padding: 0.5rem;
  text-align: center;
  color: #FFFFFF;
  background-color: #15294C;
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
            currentSortDir:'asc',
            showYearOne: false,
            showYearTwo: false,
            showYearThree: false,
            showYearFour: false,
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
        },
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
        internPercent: function(arr, year){
          var count = 0;
          var total = 0;
          for(var i in arr){
            if(arr[i] == year){
              count++;
            }
            total++;
          }
          return (count/total).toFixed(2)
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
          var arr = ["Allowance", "CAP"];
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
              dict["YearOne"] = this.internPercent(coy[val]["Year"], 1);
              dict["YearTwo"] = this.internPercent(coy[val]["Year"], 2);
              dict["YearThree"] = this.internPercent(coy[val]["Year"], 3);
              dict["YearFour"] = this.internPercent(coy[val]["Year"], 4);
              final.push(dict);
            }
          }
          return final;
        },
        processTableData: function() {
          //This one calculates by position and industry
          var final = [];
          var arr = ["Allowance", "CAP"];
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
              dict["YearOne"] = this.internPercent(coy[this.currPos]["Year"], 1);
              dict["YearTwo"] = this.internPercent(coy[this.currPos]["Year"], 2);
              dict["YearThree"] = this.internPercent(coy[this.currPos]["Year"], 3);
              dict["YearFour"] = this.internPercent(coy[this.currPos]["Year"], 4);
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
          for(var position in companies[company]["Allowance"]){
            positions.add(position);
            if(!(position in dict[company])){
                dict[company][position] = {};
            }
            dict[company][position]["Allowance"] = companies[company]["Allowance"][position];
          }

          for(var position in companies[company]["Year"]){
            if(!(position in dict[company])){
                dict[company][position] = {};
            }
            dict[company][position]["Year"] =  companies[company]["Year"][position];
            positions.add(position);
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
            source: db.ref("internship").child("data"),
            asObject: true
        }
    }
}
</script>
