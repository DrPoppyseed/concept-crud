

const firebaseConfig = {
  apiKey: "AIzaSyCLYTOdbWoXJcjCh5pNUOM84DF55JXbc1Q",
  authDomain: "concept-crud.firebaseapp.com",
  databaseURL: "https://concept-crud.firebaseio.com",
  projectId: "concept-crud",
  storageBucket: "concept-crud.appspot.com",
  messagingSenderId: "1025372666088",
  appId: "1:1025372666088:web:3fe7d18e28b7e81aebb15d",
  measurementId: "G-7KSFTCDRM4"
};
// Initialize Firebase
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();
}

