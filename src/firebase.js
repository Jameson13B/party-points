import firebase from 'firebase'

require('dotenv').config()

console.log(process.env)

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID
}

// Initialize Firebase
const Firebase = firebase.initializeApp(firebaseConfig)
// Initialize Analytics
// firebase.analytics()

// Initialize database instance
export const database = Firebase.firestore()

// Initialize auth instance
export const auth = Firebase.auth()
