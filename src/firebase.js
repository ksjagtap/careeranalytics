import Firebase from 'firebase'

const firebaseApp = Firebase.initializeApp({
	apiKey: '',
    authDomain: '',
    databaseURL: 'https://nuscareers-31907.firebaseio.com/'
  
})
export const db = firebaseApp.database();