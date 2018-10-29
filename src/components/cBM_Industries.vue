<template>
  <div>
    <form>
      <div class="row">
        <div class="col"></div>
        <div class="col">
          Major :
          <select type="text" v-model="searchByMajor" placeholder="Search By Major" class="form-control form-control-sm">
            <option value="" disabled selected>Select Major</option>
            <option v-for="maj in majors" :value="maj">{{maj}}</option>
          </select> </br>
        </div>
        <div class="col"></div>
      </div>
    </form>

    <h3>Showing Statistics for <font color="blue">{{searchByMajor}}</font></h3>

    <b-container fluid>
     <b-row>
       <b-col cols="3">
         <b-list-group v-b-scrollspy:listgroup-ex>
         </br>
         </br>
           <b-list-group-item href="#list-item-1">Industries</b-list-group-item>
           <b-list-group-item href="#list-item-2">Job Position</b-list-group-item>
           <b-list-group-item href="#list-item-3">Salaries</b-list-group-item>
         </b-list-group>
       </b-col>
       <b-col cols="9">
         <div v-if="!isHidden">
           <h6> Please Select Major </h6>
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
           
          <br> 
           <h4 id="list-item-1"><u>Industries</u></h4>
           <column-chart :data="indStats"></column-chart>

          <br>
           <h4 id="list-item-2"><u>Job Position</u></h4>
           <column-chart :data="jobStats"></column-chart>

           <br>
           <h4 id="list-item-3"><u>Salaries</u></h4>
           <div id="salChart" style="width: 100%; height: 250px;"></div>
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
import {db} from '../firebase.js';
import Vue from 'vue'

//var chart;
export default {

    data: function(){
      return{
        searchByMajor: '',
        dynamicIndForMajor: [],
        dynamicJobForMajor: [],
        dynamicSalBins: [],
        dynamicGrads: [],
        isHidden: false
      }
    },

    watch: {
        searchByMajor: function(val){
          this.dynamicIndForMajor = this.getIndustry(val);
          this.dynamicJobForMajor = this.getJobs(val);
          this.dynamicSalBins = this.getSalary(val);
          this.dynamicGrads = this.getGradsInMajor(val);
          this.isHidden=true;
        }
    },

    computed: {
      industry(){
        return this.industries;
      },
      // display no of grads from selected major per industry
      indStats(){
        var grads = this.dynamicGrads;
        var ind = this.dynamicIndForMajor;
        const result = [];
        //for (var i = 0; i <= this.allInd.length; i++){
        for (var i = 0; i <= ind.length; i++){
          var count = 0;
          if (ind[i] === undefined) { continue; }
          for (var grad in grads){
            if (ind[i] === grads[grad]["Industry"]){
              count++;
            }
          }
          if (count !== 0){
            this.binaryInsert(ind[i], count, result, 0, result.length);
          }
        }
        return result.reverse();
      },

      // display no of grads from selected major per job position
      jobStats(){
        var grads = this.dynamicGrads;
        var allJobs = this.dynamicJobForMajor;
        const result = [];
        for (var i = 0; i <= allJobs.length; i++){
          var count = 0;
          if (allJobs[i] === undefined) { continue; }
          for (var grad in grads){
            if (allJobs[i] === grads[grad]["Job Title"]){
              count++;
            }
          }
          if (count !== 0){
            this.binaryInsert(allJobs[i], count, result, 0, result.length);
          }
        }
        return result.reverse();
      },

      salStats(){
        const result = [];
        var salaryLabels = this.dynamicSalBins;
        var grads = this.dynamicGrads;
        for (var i = 0; i < salaryLabels.length; i++){
          var count = 0;
          for (var grad in grads){
            if (salaryLabels[i] === Math.floor(grads[grad]['Salary']/1000)){
              count++;
            }
          }
          result.push([salaryLabels[i], count]);
          // console.log("Result", result);
          //result.push(count);
        }
        return result;
      },

      // find all majors of all grads.
      majors: {
        get: function() {
          var major = new Set();
          var grads = this.grads();
          for (var grad in grads){
            major.add(grads[grad]["Faculty (First Major)"]);
          }
          let array = Array.from(major);
          return array;
        }
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
      grads: function(){
        return this.graduates;
      },

      getIndustry: function(val){
        var arr = new Set();
        var grads = this.grads();
        for(var grad in grads){
          if(grads[grad]["Faculty (First Major)"] === val){
            arr.add(grads[grad]["Industry"]);
          }
        }
        let array = Array.from(arr);
        return array;
      },

      getGradsInMajor: function(val){
        var arr = [];
        var grads = this.grads();
        for(var grad in grads){
          if(grads[grad]["Faculty (First Major)"] === val){
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
          if (grads[grad]["Faculty (First Major)"] === val){
            arr.add(grads[grad]["Job Title"]);
          }
        }
        let array = Array.from(arr);
        return array;
      },

      getSalary: function(val){
        var arr = new Set();
        var sal = 0;
        var grads = this.grads();
        for(var grad in grads){
          if (grads[grad]["Faculty (First Major)"] === val){
            arr.add(grads[grad]["Salary"]);
            if (grads[grad]["Salary"] >= sal){
              sal = grads[grad]["Salary"];
              // console.log("max sal", sal)
            }
          }
        }

        var minSal = 999999;
        for(var grad in grads){
          if (grads[grad]["Faculty (First Major)"] === val){
            arr.add(grads[grad]["Salary"]);
            if (grads[grad]["Salary"] <= minSal){
              minSal = grads[grad]["Salary"];
              // console.log("MIN SAL", minSal);
            }
          }
        }

        var bins = Math.ceil(sal/1000);
        var start = Math.floor(minSal/1000);
        // console.log("START", start);
        var arrBins = new Set();
          for (var i = start; i <= bins; i++){
            arrBins.add(i);
          }
          let array = Array.from(arrBins);
          // console.log(array);
          return array;
        },

      /*renderChart () {
        document.getElementById("chartContainer").innerHTML = '&nbsp;';
        document.getElementById("chartContainer").innerHTML = '<canvas id="myChart"></canvas>';
        var ctx = document.getElementById('myChart').getContext('2d');
        var chart = new Chart(ctx, {
           type: 'bar',
           data: {
            labels: this.dynamicSalBins,
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
                  max: this.dynamicSalBins.length - 2,
                }
              }, {scaleLabel:{
                display: true,
                labelString: 'Salary(By Thousands)',
              },
                ticks: {
                    autoSkip: false,
                  max: this.dynamicSalBins.length - 1,

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
        console.log(chart);
    }*/
  }
}

</script>
