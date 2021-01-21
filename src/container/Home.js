import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Button,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  ToastAndroid,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import {fecthChatUser, signOut} from '../Store/action/chat';
import AntDesign from 'react-native-vector-icons/AntDesign';

const Inbox = ({navigation}) => {
  const dispatch = useDispatch();
  const authenticatedUser = useSelector(({auth}) => auth.auth);
  const recipients = useSelector(({auth}) => auth.chatUser);
  const signOutUser = () => {
    dispatch(signOut());
    ToastAndroid.show('Sign Out Successfully.',2000);
  };
  useEffect(() => {
    dispatch(fecthChatUser(authenticatedUser.uid));
  }, []);
  useEffect(() => {
    console.log(authenticatedUser.uid, 'authenticatedUser.uid', recipients);
    console.log('Get Current User', authenticatedUser);
  });
  return (
    <View style={{flex: 1}}>
      {/* <Text>Inbox Page</Text>
      <Button onPress={signOutUser} title="Sign Out" />
      {recipients && recipients.length > 0
        ? recipients.map((recipient, index) => (
            <View key={index} style={{borderWidth: 1}}>
              <Button
                onPress={() => {
                  navigation.navigate('ChatBox', {chatRecipient: recipient});
                }}
                title={recipient.email}
                color="green"
              />
            </View>
          ))
        : null} */}

      <View style={{flex: 1}}>
        <View style={styles.container}>
          <TouchableOpacity
            style={styles.menubarMenu}
            onPress={() => {
              navigation.navigate('UserProfile');
            }}>
            <View style={styles.menuBarIcon}>
              <Image
                source={{uri: authenticatedUser.displayPic}}
                style={{width: 40, height: 40, borderRadius: 100}}
              />
            </View>
          </TouchableOpacity>
          <View style={styles.chatHeadingArea}>
            <Text style={styles.chatHeading}>CHAT MESSENGER</Text>
          </View>
          <View style={{flex: 1}}>
            <TouchableOpacity onPress={signOutUser}>
              <View style={styles.logOutBtn}>
                <AntDesign name="logout" size={18} color={'#0078FF'} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <View style={{flex: 1}}>
        <View style={styles.searchSection}>
          <AntDesign
            style={styles.searchIcon}
            name="search1"
            size={20}
            color="#000"
          />
          <TextInput style={styles.input} placeholder="Search Contacts" />
        </View>
      </View>

      <View style={{flex: 10, backgroundColor: 'lightgray', borderRadius: 10}}>
        <ScrollView>
          {recipients.map((item, index) => {
            return (
              <View style={styles.chatArea} key={index}>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                  }}>
                  <Image
                    source={{
                      uri: item.displayPic,
                    }}
                    style={styles.chatRecipentImage}
                  />
                </View>
                <View
                  style={{
                    flex: 6,
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    marginLeft: 10,
                  }}>
                  <Text style={styles.chatHeading}>{item.name}</Text>
                </View>
              </View>
            );
          })}
        </ScrollView>
      </View>
    </View>
  );
};
export default Inbox;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  menubarMenu: {
    flex: 1,
    alignItems: 'center',
  },
  menuBarIcon: {
    width: 35,
    height: 30,
    backgroundColor: 'white',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatHeadingArea: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatHeading: {
    fontSize: 17,
    fontWeight: 'bold',
    color: '#0078FF',
  },
  logOutBtn: {
    width: 35,
    height: 30,
    backgroundColor: 'white',
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchSection: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 50,
    marginLeft: 8,
    marginRight: 8,
  },
  searchIcon: {
    padding: 8,
  },
  input: {
    flex: 1,
    color: '#424242',
  },
  chatArea: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 10,
    marginTop: 3,
    marginBottom: 3,
    borderWidth: 1,
    borderColor: 'lightgray',
  },
  chatRecipentImage: {
    width: 50,
    height: 50,
    borderRadius: 100,
  },
});
