import Firebase from 'firebase'

const firebaseApp = Firebase.initializeApp({
  apiKey: 'AIzaSyBHO1eWqa7VhDRje0nQ-BZftyQj2ygrDfw',
  authDomain: 'babyname-bf3e6.firebaseapp.com',
  databaseURL: 'https://babyname-bf3e6.firebaseio.com',
  projectId: 'babyname-bf3e6',
  storageBucket: 'babyname-bf3e6.appspot.com',
  messagingSenderId: '713443229824'
})

// Export the database for components to use.
// If you want to get fancy, use mixins or provide / inject to avoid redundant imports.
export const db = firebaseApp.database()
