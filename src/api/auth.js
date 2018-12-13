import { auth } from 'firebase/app';
import 'firebase/auth';

export const postAuthentication = (email, pass) => {
  return auth().signInAndRetrieveDataWithEmailAndPassword(email, pass);
};
export const postVerifyToken = () => {
  return new Promise((resolve, reject) => {
    auth().onAuthStateChanged(function(user) {
      if (user) {
        // User is signed in.
        resolve(user);
      }
    });
  });
};

export const signUp = async (email, pass, nome, cognome) => {
  let user = null;
  if (!email.endsWith('@aesystech.it') || !email.endsWith('@aesys.tech')) {
    throw new Error('La mail deve essere aesys!');
  }
  await auth().createUserWithEmailAndPassword(email, pass);
  user = auth().currentUser;
  user.sendEmailVerification();
  user.updateProfile({
    displayName: nome + ' ' + cognome
  });
  return user;
};

export const logout = () =>
  new Promise((resolve, reject) => {
    // User is signed in.
    auth()
      .signOut()
      .then(() => {
        resolve(true);
      });
  });
