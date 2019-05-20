import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';


const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);

export const voteRef = firebase.database().ref('parentvote/votes');
export const parentVoteRef = firebase.database().ref('parentvote');
