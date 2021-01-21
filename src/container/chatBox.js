import React, {useState, useEffect} from 'react';
import {View, Text, Button, TextInput} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {fetchAllMsgs, sendMsg, detachMsgListener} from '../Store/action/chat';

const Chatbox = ({navigation, route}) => {
  const {chatRecipient} = route.params;
  const [msg, setMsg] = useState('');
  const [objRecieve, setObjRecieve] = useState(null);

  const dispatch = useDispatch();
  const authenticatedUser = useSelector(({auth}) => auth.auth);

  useEffect(() => {
    setObjRecieve(chatRecipient);
  });

  useEffect(() => {
    if (objRecieve !== null) {
      dispatch(fetchAllMsgs(authenticatedUser.uid, objRecieve.uid));
    }
  }, [objRecieve]);

  const chats = useSelector(({auth}) => auth.messages);

  const sendMsgNow = () => {
    let newMsg = {
      sender: authenticatedUser.uid,
      receiver: chatRecipient.uid,
      timeStamp: new Date().getTime(),
      message: msg,
      type: 'text',
      readStatus: false,
    };
    dispatch(sendMsg(newMsg));
    setMsg('');
  };

  return (
    <View style={{flex: 1}}>
      <Text>{chatRecipient.email}</Text>

      <TextInput
        style={{height: 30}}
        value={msg}
        onChangeText={(text) => {
          setMsg(text);
        }}
      />
      <Button
        onPress={() => {
          navigation.goBack();
          dispatch(detachMsgListener());
        }}
        title="Go Back"
      />
      <Button onPress={sendMsgNow} title="Send" color="green" />

      {chats.map((eachMsg, index) => {
        return (
          <View key={index}>
            <Text
              style={{
                color:
                  eachMsg.sender === authenticatedUser.uid ? 'green' : 'red',
              }}>
              {eachMsg.message}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

export default Chatbox;
