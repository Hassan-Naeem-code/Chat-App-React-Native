import 'react-native-gesture-handler';
import React, {useEffect} from 'react';

import {View, Text, Button, Alert, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';


const UserListingForChat = (getnavs) => {
  // console.log('Redux State Data is:', getState);
  const {navigation} = getnavs;
  

  // const move = () => {
  //   navigation.navigate("ChatBox");
  // };
  return (
    <View style={{flex: 1}}>
      
    </View>
  );
};

const styles = StyleSheet.create({
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

export default UserListingForChat;
