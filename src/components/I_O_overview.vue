<template>
  <div>
    {{graduates}}
  </div>
</template>


<script>

import Firebase from 'firebase'
import {db} from '../firebase.js'

  export default {
    data: function() {
      return{
        
      }
      
    },

    methods: {
      
    },

    firebase: {
      graduates: {
        source: db.ref("company").child("data"),
        asObject: true
      }
      
    }
  }
</script>