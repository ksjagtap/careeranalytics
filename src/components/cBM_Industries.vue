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
            result.push([ind, count]);
          }
        }
        return result;
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
}

</script>