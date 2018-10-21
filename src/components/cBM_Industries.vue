<template>
  <div>
    trial
    <h1> {{ industries }} </h1>
  </div>
</template>

<script>
import Firebase from 'firebase'
import {db} from '../firebase.js';

  export default {
    data: {
        industries: []
    },

    firebase: {
      industries: {
        source: db.ref('industries').child('data'),
        asObject: true,
        cancelCallback(err) {
          console.error(err);
        }
      }
    }
}
</script>