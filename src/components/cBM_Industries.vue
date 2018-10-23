<template>
  <div>
    <h2> Industries </h2>
    <input type="text" v-model="searchByMajor" placeholder="Search By Major" >
    <column-chart :data="ByMajor"></column-chart>
</div>

</template>

<script>
import {db} from '../firebase.js';  
import Vue from 'vue'
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

      ByMajor(){
        const result = []; 
        for (var ind in this.industries){
          var count = 0;
          for (var grad in this.grads){
            if (ind === this.grads[grad]["Industry"] && this.grads[grad]["Faculty (First Major)"].toLowerCase()===this.searchByMajor.toLowerCase()){
              count++;
            }
          }
          if (count !== 0){
            this.binaryInsert(ind, count, result, 0, result.length);
          }
        }
        //sorted by values alr but haven't filter out top X
        // do we need to include industries w same value as the Xth industry?
        //e.g. banking is the 5th industry w highest num of grads, but 
        // infocomm industry hires same num as banking, need to include in bar chart too?
        return result.reverse();
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

      }
    }
}

</script>