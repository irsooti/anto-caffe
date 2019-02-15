import { database, auth } from 'firebase/app';
import 'firebase/auth';
import { reduceFirebaseUuid, getTodayPath } from '../utils/data';

export const sendMessage = async message => {
  const user = auth().currentUser;

  const resp = await database()
    .ref('chat/' + getTodayPath())
    .push({
      uid: user.uid,
      displayName: user.displayName,
      photoUrl: user.photoURL,
      text: message,
      timestamp: new Date().toISOString()
    })
    .once('value');
  return resp.val();
};

export const onChatEnter = onListen => {
  return database()
    .ref('chat/' + getTodayPath())
    .on('value', snapshot => {
      try {
        onListen(reduceFirebaseUuid(snapshot.val()));
      } catch (err) {
        onListen([]);
      }
    });
};
