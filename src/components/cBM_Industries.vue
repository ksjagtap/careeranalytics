
<template>
  <div>

    <ul>
      <li v-for="item in indByMajor"> {{item}} </li>
    </ul>

    <h2> Industries </h2>
    <input v-on:keyup = "clearArray" type="text" v-model="searchByMajor" placeholder="Search By Major" >
  <div v-for = "(ind, key) in industry" v-if = "gradsByInd(key, searchByMajor)!==0"> 
    {{addToArray(key, gradsByInd(key, searchByMajor), searchByMajor)}}
    {{key}}: {{gradsByInd(key, searchByMajor)}} 
    </div>
    
  
</div>

</template>

<script>
import Firebase from 'firebase'
import {db} from '../firebase.js';  
import Vue from 'vue'
  export default {
    data: function(){
      return{
        searchByMajor: '',
        indByMajor: [],
        gradz: [],
        //seen_industries: [],
      }
    },

    computed: {
      industry(){
        return this.industries;
      },

      grads(){
        return this.graduates;
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
      gradsByInd (key, searchByMajor) {
        /*loop thru each grad: if grad's industry corresponds to the curr industry, add one to
         number of grads employed by that industry.*/
        let count = 0;
        for (var grad in this.grads){
          if (key === this.grads[grad]["Industry"] && this.grads[grad]["Faculty (First Major)"].toLowerCase()===searchByMajor.toLowerCase()){
            count++;
            //this.gradz.push(grad);
          }
        }
        return count;
      },

      addToArray (key, count, searchByMajor){
        //console.log("KEY", key, "COUNT", count, "MAJOR", searchByMajor)
        var seen_industries = []

        if (!(seen_industries.includes(key))){
          //this.indByMajor.push([key, 1])
          seen_industries.push(key)
        }

      },
      clearArray(){
        this.indByMajor.splice(0);
      }
  }
}

</script>