import { auth, initializeApp, database } from 'firebase/app';
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
export const postVerifyToken = token => {
  return auth().signInAndRetrieveDataWithCustomToken(token);
};

export const signUp = async (email, pass, nome, cognome) => {
  let user = null;
  let authUser = await auth().createUserWithEmailAndPassword(email, pass);
  user = auth().currentUser;
  user.sendEmailVerification();
  user.updateProfile({
    displayName: nome + ' ' + cognome,
  })

  return authUser;
};
