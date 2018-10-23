
<template>
  <div>
    <h2> Industries </h2>
    <input type="text" v-model="searchByMajor" placeholder="Search By Major">
  <div v-for = "(ind, key) in industry" v-if = "gradsByInd(key, searchByMajor)!==0"> 
    {{key}}: {{gradsByInd(key, searchByMajor)}} </div>
</div>

</template>

<script>
import Firebase from 'firebase'
import {db} from '../firebase.js';  
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
      gradsByInd (key, searchByMajor) {
        /*loop thru each grad: if grad's industry corresponds to the curr industry, add one to
         number of grads employed by that industry.*/
        let count = 0;
        for (var grad in this.grads){
          if (key === this.grads[grad]["Industry"] && this.grads[grad]["Faculty (First Major)"].toLowerCase()===searchByMajor.toLowerCase()){
            count++;
          }
        }
        return count;
      }
  }
}

</script>