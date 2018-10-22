
<template>
  <div>
    <h2> Industries </h2>
  <div v-for = "(ind, key) in industry">{{key}}: {{gradsByInd(key)}} 
  </div>
  <h2> Graduate Industry </h2>
  <div v-for = "(graduate, key) in graduates">
    {{graduate.Industry}} 
  </div>
</div>
</template>

<script>
import Firebase from 'firebase'
import {db} from '../firebase.js';  
  export default {
    data: function(){
      return{
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
      gradsByInd (key) {
        //loop thru each grad: if grad's industry corresponds to the curr industry, add one to
        // number of grads employed by that industry. 
        let count = 0;
        for (var grad in this.grads){
          if (key === this.grads[grad]["Industry"]){
            count++;
            console.log(key, count);
          }
        }
        return count;
      }
  }
}

</script>