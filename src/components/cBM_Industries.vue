<template>
  <div>
    <div>
      <select type="text" v-model="searchByMajor" placeholder="Search By Major" >
        <option value="" disabled selected>Select Major</option>
        <option v-for="maj in majors" :value="maj">{{maj}}</option>
      </select> </br>
    </div>

    <h2> Industries </h2>
    <column-chart :data="indStats"></column-chart>
    <h2> Job Titles </h2>
    <column-chart :data="jobStats"></column-chart> 
    <h2> Salary </h2>
    <h2> CANT PLOT HISTOGRAM T___T </h2>
    <column-chart :data="salStats"
                  :discrete="true"
                  :library="{scales: {xAxes: [{display: false,
                barPercentage: 1.1,
                ticks: {
                  max: salaryLabels.length - 2,
                }
              }, {scaleLabel:{
                display: true,
                labelString: 'Salary(By Thousands)',
              },
                ticks: {
                    autoSkip: false,
                  max: salaryLabels.length - 1,
                  
                }, 
              }], yAxes: [{
                scaleLabel:{
                  display: true,
                  labelString: 'Number Of Graduates'
                },
                ticks: {
                  beginAtZero:true,  
                }
              }]}}"></column-chart>
    <!--<p> {{renderChart()}} </p>!-->

</div>

</template>

<script>
import {db} from '../firebase.js';  
import Vue from 'vue'
var chart;
export default {

    data: function(){
      return{
        searchByMajor: '',
      }
    },

    computed: {
      industry(){
        return this.industries;
      },

      grads(){
        return this.graduates;
      },

      // display no of grads from selected major per industry 
      indStats(){
        const result = []; 
        for (var i = 0; i <= this.allInd.length; i++){
          var count = 0;
          if (this.allInd[i] === undefined) { continue; }
          for (var grad in this.grads){
            if (this.allInd[i] === this.grads[grad]["Industry"] && this.grads[grad]["Faculty (First Major)"].toLowerCase()===this.searchByMajor.toLowerCase()){
              count++;
            }
          }
          if (count !== 0){
            this.binaryInsert(this.allInd[i], count, result, 0, result.length);
          }
        }
        return result.reverse();
      },

      // display no of grads from selected major per job position 
      jobStats(){
        const result = []; 
        for (var i = 0; i <= this.allJobs.length; i++){
          var count = 0;
          if (this.allJobs[i] === undefined) { continue; }
          for (var grad in this.grads){
            if (this.allJobs[i] === this.grads[grad]["Job Title"] && 
      this.grads[grad]["Faculty (First Major)"].toLowerCase()===this.searchByMajor.toLowerCase()){
              count++;
            }
          }
          if (count !== 0){
            this.binaryInsert(this.allJobs[i], count, result, 0, result.length);
          }
        }
        return result.reverse();
      }, 

      salStats(){
        const result = [];
        for (var i = 0; i <= this.salaryLabels.length; i++){
          var count = 0;
          if (this.salaryLabels[i] === "NA") { continue; }
          for (var grad in this.grads){
            if (this.salaryLabels[i] === Math.ceil(this.grads[grad]['Salary']/1000)&& 
      this.grads[grad]["Faculty (First Major)"].toLowerCase()===this.searchByMajor.toLowerCase()){
              count++;
            }
          }
          result.push([this.salaryLabels[i], count]);
          //result.push(count);
        }
        return result;
      },

      // find all majors of all grads.
      majors: {
        get: function() {
          var major = new Set();
          for (var grad in this.grads){
            if (this.grads[grad]["Faculty (First Major)"] === "NA") { continue; }
            major.add(this.grads[grad]["Faculty (First Major)"]);
          }
          let array = Array.from(major);
          return array;
        }
      },

      // find all job positions of all grads.
      allJobs: {
        get: function () {
          var jobs = new Set();
          for(var grad in this.grads) {
            jobs.add(this.grads[grad]["Job Title"]);
          }
          let array = Array.from(jobs);
          return array;
        }
      },

      // find all industries grads are working at. 
      allInd: {
        get: function () {
          var ind = new Set();
          for(var grad in this.grads) {
            ind.add(this.grads[grad]["Industry"]);
          }
          let array = Array.from(ind);
          return array;
        }
      },

      //find the number of bins to create ( by 1000)
      salaryLabels: {
        get: function() {
          var sal = 0;
          for (var grad in this.grads) {
            if (this.grads[grad]["Salary"] >= sal){
              sal = this.grads[grad]["Salary"];
            }
          }
          var bins = Math.ceil(sal/1000);
          var arrBins = new Set();
          for (var i = 0; i <= bins; i++){
            arrBins.add(i);
          }
          let array = Array.from(arrBins);
          return array;
        }
      }

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

    methods: {
      binaryInsert(ind, count, array, startVal, endVal){
        var length = array.length;
        var start = startVal;
        var end = endVal-1;
        var m = start + Math.floor((end - start)/2);
        if(length == 0){
          array.push([ind, count]);
          return;
        }
        if(count >= array[end][1]){
          array.splice(end+1, 0, [ind, count]);
          return;
        }
        if(count <= array[start][1]){
          array.splice(start, 0, [ind, count]);
          return;
        } 

        if(start >= end){
          return;
        }

        if(count < array[m][1]){
          this.binaryInsert(ind, count, array, start, m);
          return;
        }

        if(count > array[m][1]){
          this.binaryInsert(ind, count,array, m + 1, end);
          return;
        }

      }, 

      /*renderChart () {
        //document.getElementById("chartContainer").innerHTML = '&nbsp;';
        //document.getElementById("chartContainer").innerHTML = '<canvas id="myChart"></canvas>';
        var ctx = document.getElementById('myChart').getContext('2d');

        if (this.chart) {
          this.chart.destroy();
        }
        chart = new Chart(ctx, {
           type: 'bar',
           data: {
            labels: this.salaryLabels,
            datasets: [{
              data: this.salStats,
              backgroundColor: 'rgba(90, 204, 242, 0.89)',
            }]
        },
            options: {
              legend: {
                display: false
              },
              scales: {
              xAxes: [{
                display: false,
                barPercentage: 1.1,
                ticks: {
                  max: this.salaryLabels.length - 2,
                }
              }, {scaleLabel:{
                display: true,
                labelString: 'Salary(By Thousands)',
              },
                ticks: {
                    autoSkip: false,
                  max: this.salaryLabels.length - 1,
                  
                }
              }],
              yAxes: [{
                scaleLabel:{
                  display: true,
                  labelString: 'Number Of Graduates'
                },
                ticks: {
                  beginAtZero:true,  
                }
              }]
              }
            }
        });
    }*/
  }
}

</script>