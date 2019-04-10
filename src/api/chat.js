import { database, auth } from 'firebase/app';
import 'firebase/auth';
import Push from 'push.js';
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
  let ref = database().ref('chat/' + getTodayPath());
  ref.on('value', snapshot => {
    try {
      onListen(reduceFirebaseUuid(snapshot.val()));
    } catch (err) {
      onListen([]);
    }
  });

  ref.on('child_added', snapshot => {
    console.log(snapshot.val())
    if (snapshot.val().length > 1) return;
    const {displayName, photoUrl, text} = snapshot.val()
    Push.create(displayName, {
      body: text,
      icon: photoUrl,
      timeout: 4000,
      onClick: function() {
        window.focus();
        this.close();
      }
    });
  });
};

export const onChatLeft = () => {
  return database()
    .ref('chat/' + getTodayPath())
    .off('value');
};
