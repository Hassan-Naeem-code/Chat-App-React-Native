import {
  SIGN_UP_USER,
  USER_FETCHED,
  USER_REMOVED,
} from '../constant/actiontypes';
import {ToastAndroid} from 'react-native';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export function signUpUser(user, navigation) {
  return (dispatch) => {
    console.log('hello World', user);
    auth()
      .createUserWithEmailAndPassword(user.email, user.password)
      .then((success) => {
        console.log('Success:', success);
        user.uid = success.user.uid;
        firestore()
          .collection('users')
          .add(user)
          .then((doc) => {
            ToastAndroid.show('Successfully Sign Up', 2000);
            dispatch({
              type: SIGN_UP_USER,
              payload: user,
            });
            navigation.navigate('Home');
          })
          .catch((error) => {
            console.log('Error:', error);
          });
      })

      .catch((error) => {
        ToastAndroid.show('Unsuccessfull Sign Up', 2000);
      });
  };
}

export function loginUser(user) {
  return (dispatch) => {
    auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then((success) => {
        ToastAndroid.show('Successfully Sign In', 2000);
      })
      .catch((error) => {
        ToastAndroid.show('Unsuccessfull Sign In', 2000);
      });
  };
}

export function fetchUserInfo(uid) {
  return (dispatch) => {
    firestore()
      .collection('users')
      .where('uid', '==', uid)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          console.log(doc.id, ' => ', doc.data());
          dispatch({
            type: USER_FETCHED,
            payload: doc.data(),
          });
        });
      })
      .catch((error) => {
        console.log('Error getting documents: ', error);
      });
  };
}

export function sendDetails(fname,lname){
  console.log('Redux data is',fname,lname);
}

export function userLogOut() {
  return (dispatch) => {
    auth()
      .signOut()
      .then((success) => {
        dispatch({
          type: USER_REMOVED,
        });
      });
  };
}
