import Firebase from 'firebase'

const App = Firebase.initializeApp({

	apiKey: '',
    authDomain: '',
    databaseURL: 'https://careeranalytics-7b367.firebaseio.com/'

})

export const db = App.database();
