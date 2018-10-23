import Firebase from 'firebase'

const App = Firebase.initializeApp({

	apiKey: '',
    authDomain: '',
    databaseURL: 'https://nuscareers-31907.firebaseio.com/'
  
})

export const db = App.database();

