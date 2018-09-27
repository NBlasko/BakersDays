
import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

  var config = {
       apiKey: ***************************,
    authDomain: ************************,
    databaseURL: ******************,
    projectId: ***************,
    storageBucket: ****************,
    messagingSenderId: ***********
  };

 export const firebaseApp = firebase.initializeApp(config);

  export const voteRef = firebase.database().ref('votes');


 