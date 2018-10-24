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

VueGoogleCharts.google.charts.load("current", {packages:["corechart"]});
VueGoogleCharts.google.charts.setOnLoadCallback(drawChart);
function drawChart() {
  var data = VueGoogleCharts.google.visualization.arrayToDataTable([
    ['Dinosaur', 'Length'],
    ['Acrocanthosaurus (top-spined lizard)', 12.2],
    ['Albertosaurus (Alberta lizard)', 9.1],
    ['Allosaurus (other lizard)', 12.2],
    ['Apatosaurus (deceptive lizard)', 22.9],
    ['Archaeopteryx (ancient wing)', 0.9],
    ['Argentinosaurus (Argentina lizard)', 36.6],
    ['Baryonyx (heavy claws)', 9.1],
    ['Brachiosaurus (arm lizard)', 30.5],
    ['Ceratosaurus (horned lizard)', 6.1],
    ['Coelophysis (hollow form)', 2.7],
    ['Compsognathus (elegant jaw)', 0.9],
    ['Deinonychus (terrible claw)', 2.7],
    ['Diplodocus (double beam)', 27.1],
    ['Dromicelomimus (emu mimic)', 3.4],
    ['Gallimimus (fowl mimic)', 5.5],
    ['Mamenchisaurus (Mamenchi lizard)', 21.0],
    ['Megalosaurus (big lizard)', 7.9],
    ['Microvenator (small hunter)', 1.2],
    ['Ornithomimus (bird mimic)', 4.6],
    ['Oviraptor (egg robber)', 1.5],
    ['Plateosaurus (flat lizard)', 7.9],
    ['Sauronithoides (narrow-clawed lizard)', 2.0],
    ['Seismosaurus (tremor lizard)', 45.7],
    ['Spinosaurus (spiny lizard)', 12.2],
    ['Supersaurus (super lizard)', 30.5],
    ['Tyrannosaurus (tyrant lizard)', 15.2],
    ['Ultrasaurus (ultra lizard)', 30.5],
    ['Velociraptor (swift robber)', 1.8]]);

  var options = {
    title: 'Lengths of dinosaurs, in meters',
    legend: { position: 'none' },
  };

  var chart = new google.visualization.Histogram(document.getElementById('chart_div'));
  chart.draw(data, options);
}

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
