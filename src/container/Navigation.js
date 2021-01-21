import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
// Note: For Drawer Navigation...!
import {createDrawerNavigator} from '@react-navigation/drawer';
import auth from '@react-native-firebase/auth';
// import SignUp from './signUp';
import LogIn from './logIn';
import Home from './Home';
import Signup from './signUp';
import ChatBox from './chatBox';
import {useDispatch, useSelector} from 'react-redux';
import {fetchUserInfo} from '../Store/action/auth';
import Listing from './user-listing-for-chat';
import UserProfile from './user-profile';

// Note: For Drawer Navigation...!
const Drawer = createDrawerNavigator();
const {Navigator, Screen} = Drawer;

const Navigation = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    auth().onAuthStateChanged((user) => {
      if (user) {
        dispatch(fetchUserInfo(user.uid));
      }
    });
  }, []);
  const getState = useSelector(({auth}) => auth.auth);
  return (
    <NavigationContainer>
      <Navigator>
        <Screen
          name={getState ? 'Home' : 'Login'}
          component={getState ? Home : LogIn}
        />
        <Screen name="Signup" component={Signup} />
        <Screen name={getState ? 'ChatBox' : ' '} component={ChatBox} />
        <Screen name='UserProfile' component={UserProfile} />
      </Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
