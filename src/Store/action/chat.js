import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import {
  FETCH_CHAT_USER,
  FETCH_ALL_CHATS,
  CLEAR_CHAT,
  LOG_OUT_USER,
} from '../constant/actiontypes';

export function fecthChatUser(uid) {
  return (dispatch) => {
    firestore()
      .collection('users')
      .where('uid', '!=', uid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          let user = doc.data();
          user.docId = doc.id;
          //   console.log(doc.id, ' => ', user);
          dispatch({
            type: FETCH_CHAT_USER,
            payload: user,
          });
        });
      })
      .catch((error) => {
        // console.log('Error getting documents: ', error);
      });
  };
}
// Note : Sir work...!
let unsubscribe;
export function fetchAllMsgs(currentUserUid, recepientUid) {
  return async (dispatch) => {
    let chatDocId = makeDocId(currentUserUid, recepientUid);

    unsubscribe = firestore()
      .collection('chat')
      .doc(chatDocId)
      .collection('messages')
      .orderBy('timeStamp', 'asc')
      .onSnapshot(function (snapshot) {
        snapshot.docChanges().forEach(function (change) {
          if (change.type === 'added') {
            console.log('new msg: ', change.doc.data());
            dispatch({type: FETCH_ALL_CHATS, payload: change.doc.data()});
          }
        });
      });
  };
}

function makeDocId(uid1, uid2) {
  let docId;
  if (uid1 > uid2) {
    docId = uid1 + uid2;
  } else {
    docId = uid2 + uid1;
  }
  return docId;
}

export function detachMsgListener() {
  return async (dispatch) => {
    unsubscribe();
    dispatch({type: CLEAR_CHAT});
  };
}

export function sendMsg(msg) {
  return async (dispatch) => {
    console.log(msg);
    let chatDocId = makeDocId(msg.sender, msg.receiver);

    firestore()
      .collection('chat')
      .doc(chatDocId)
      .collection('messages')
      .add(msg);
  };
}

// Dispatch function to log out user...!
export function signOut() {
  return (dispatch) => {
    auth()
      .signOut()
      .then(() => {
        // Sign-out successful...!
        dispatch({
          type: LOG_OUT_USER,
        });
      })
      .catch((error) => {
        console.error(`Error is: ${error}.`);
      });
  };
}
