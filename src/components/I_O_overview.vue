<template>
  <div>
    {{ mainData }}

    <h3>BREAK POINT</h3>

    {{ graduates }}

  </div>
</template>


<script>

import Firebase from 'firebase'
import {db} from '../firebase.js'


  export default {
    data: function() {
      return{
        mainData: this.processStudents()
      }
      
    },

    methods: {
      processStudents: async function() {
        let graduates = await db.ref("company").child("data")
        for(var key in graduates){
          console.log(key, graduates[key])
        }
        return 4
      }
    },

    firebase: {
      graduates: {
        source: db.ref("company").child("data"),
        asObject: true
      }
    }
      
    
  }
</script>