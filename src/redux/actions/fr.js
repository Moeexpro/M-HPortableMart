import firebase from "firebase";
 

 const firebaseConfig = {
  apiKey: "AIzaSyCn6hJ4r0z0gmKYbUFjS4ugPqRwWRTODKo",
  authDomain: "web-project-1e0ca.firebaseapp.com",
  databaseURL: "https://web-project-1e0ca-default-rtdb.firebaseio.com",
  projectId: "web-project-1e0ca",
  storageBucket: "web-project-1e0ca.appspot.com",
  messagingSenderId: "498143452153",
  appId: "1:498143452153:web:3f6356b8f2a0809608fb28"
};


  const fireapp = firebase.initializeApp(firebaseConfig);
  const auth = fireapp.auth();
  const firest = fireapp.firestore();
  const storage = fireapp.storage();
  const provider = new firebase.auth.GoogleAuthProvider();

  
  
  export {auth,firest,storage,provider}
 
  
