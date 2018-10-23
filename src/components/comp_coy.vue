<template>

<div>
    {{graduates["ALLEN & GLEDHILL LLP"]}} </br>
    The Main Data Is {{mainData}} </br>
    <table>
        <thead>
            <tr>
                <th>Name</th>
                <th>CAP</th>
                <th>Industry</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="grad in mainData">
                <td>{{grad.Name}}</td>
                <td>{{grad.CAP}}</td>
                <td>{{grad.Industry}}</td>
            </tr>
        </tbody>
    </table>
</div>

</template>

<script>

import Firebase from 'firebase'
import {
    db
}
from '../firebase.js'

export default {
    data: function() {
        return {
            mainData: this.processData()
        };
    },
    methods: {
        processData: function() {
          return this.graduates;
        },
    },
    firebase: {
        graduates: {
            source: db.ref("company").child("data"),
            asObject: true
        }

    }
}

</script>
