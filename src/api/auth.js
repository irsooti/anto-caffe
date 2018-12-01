import { auth, initializeApp } from 'firebase/app';
import 'firebase/auth';

var config = {
  apiKey: 'AIzaSyD_C59csA_uJ5Z2YERhSeV9zg49RkaPz0c',
  authDomain: 'anto-caffe.firebaseapp.com',
  databaseURL: 'https://anto-caffe.firebaseio.com',
  projectId: 'anto-caffe',
  storageBucket: 'anto-caffe.appspot.com',
  messagingSenderId: '217614003103'
};

initializeApp(config);

export const postAuthentication = (email, pass) => {
  return auth().signInAndRetrieveDataWithEmailAndPassword(email, pass);
};
export const postVerifyToken = () => {
  return new Promise((resolve, reject) => {
    auth().onAuthStateChanged(function(user) {
      if (user) {
        console.log(user);
        // User is signed in.
        resolve(user);
      }
    });
  });
};

export const signUp = async (email, pass, nome, cognome) => {
  let user = null;
  await auth().createUserWithEmailAndPassword(email, pass);
  user = auth().currentUser;
  user.sendEmailVerification();
  user.updateProfile({
    displayName: nome + ' ' + cognome
  });
  console.log(user);
  return user;
};
