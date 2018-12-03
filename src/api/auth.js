import { auth } from 'firebase/app';
import 'firebase/auth';

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
