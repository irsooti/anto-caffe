import { auth, storage } from 'firebase/app';
import 'firebase/auth';
import 'firebase/storage';

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

export const updateProfile = async (displayName, avatarUrl) => {
  const user = auth().currentUser;
  avatarUrl = avatarUrl || user.photoURL;

  return await user.updateProfile({
    displayName: displayName,
    photoURL: avatarUrl
  });
};

export const uploadAvatarAndRetrieveUrl = (idUser, file) =>
  new Promise(resolve => {
    const uploadFile = storage().ref(idUser);
    uploadFile
      .put(file)
      .then(async snapshot => {
        resolve(await uploadFile.getDownloadURL());
      })
      .catch(onreject => onreject);
  });

export const signUp = async (email, pass, name, surname) => {
  let user = null;
  if (email.endsWith('@aesystech.it') || email.endsWith('@aesys.tech')) {
    await auth().createUserWithEmailAndPassword(email, pass);
    user = auth().currentUser;
    user.sendEmailVerification();
    user.updateProfile({
      displayName: name + ' ' + surname
    });
    return user;
  }

  throw new Error('La mail deve essere aesys!');
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

export const resetPassword = email => {
  return auth().sendPasswordResetEmail(email);
};
