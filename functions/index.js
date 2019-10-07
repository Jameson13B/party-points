const functions = require('firebase-functions')

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin')
admin.initializeApp()

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
exports.helloWorld = functions.https.onRequest((request, response) => {
  console.log(admin)
  response.send('Hello from Cloud Server!')
})

exports.registerUser = functions.https.onRequest((data, context) => {})
exports.updateUser = functions.https.onRequest((data, context) => {})
exports.changePassword = functions.https.onRequest((data, context) => {})
