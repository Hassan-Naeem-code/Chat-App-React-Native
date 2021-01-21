import React from 'react';
import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import Zocial from 'react-native-vector-icons/Zocial';
import {useSelector} from 'react-redux';

const userProfile = ({navigation}) => {
  const authenticatedUser = useSelector(({auth}) => auth.auth);
  return (
    <View style={{flex: 1}}>
      <View style={{flex: 1, backgroundColor: '#fff'}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Home');
            }}
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 12,
            }}>
            <FontAwesome name={'long-arrow-left'} size={35} color={'#0078FF'} />
          </TouchableOpacity>
          <View style={{flex: 6}}>
            <Text
              style={{
                fontSize: 22,
                fontWeight: '700',
                color: '#0078FF',
                marginLeft: 10,
                marginTop: 5,
              }}>
              Profile Detail
            </Text>
          </View>
        </View>
      </View>
      <View style={{flex: 5, backgroundColor: '#f0f0f0'}}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={{flex: 1}}></View>
          <View
            style={{
              flex: 2,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 7,
            }}>
            <Image
              source={{uri: authenticatedUser.displayPic}}
              style={{width: 120, height: 120, borderRadius: 100}}
            />
          </View>
          <View style={{flex: 4}}></View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View style={{flex: 1}}></View>
          <View
            style={{
              flex: 3,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 7,
            }}>
            <Text
              style={{
                fontSize: 30,
                fontWeight: '700',
                color: '#0078FF',
                fontFamily: 'Poppins',
              }}>
              {authenticatedUser.name}
            </Text>
          </View>
          <View style={{flex: 3}}></View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-end',
              alignItems: 'flex-end',
            }}>
            <FontAwesome5 name={'user-tie'} size={17} color={'#0078FF'} />
          </View>
          <View
            style={{
              flex: 3,
              justifyContent: 'center',
              alignItems: 'center',
              marginTop: 10,
            }}>
            <Text
              style={{
                fontSize: 17,
                fontWeight: '700',
                color: '#0078FF',
                marginLeft: 5,
              }}>
              Founder At STACK LEARNERS
            </Text>
          </View>
          <View style={{flex: 3}}></View>
        </View>
      </View>
      <View style={{flex: 6, backgroundColor: '#f0f0f0', borderRadius: 10}}>
        <View style={styles.chatArea}>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
            }}>
            <Feather name={'phone-call'} size={20} color={'#0078FF'} />
          </View>
          <View
            style={{
              flex: 6,
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              marginLeft: 10,
            }}>
            <Text style={styles.chatHeading}>033-78044-346</Text>
          </View>
        </View>
        <View style={styles.chatArea}>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
            }}>
            <Zocial name={'email'} size={20} color={'#0078FF'} />
          </View>
          <View
            style={{
              flex: 6,
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              marginLeft: 10,
            }}>
            <Text style={styles.chatHeading}>{authenticatedUser.email}</Text>
          </View>
        </View>
        <View style={styles.chatArea}>
          <View
            style={{
              flex: 1,
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
            }}>
            <FontAwesome name={'map-marker'} size={20} color={'#0078FF'} />
          </View>
          <View
            style={{
              flex: 6,
              justifyContent: 'flex-start',
              alignItems: 'flex-start',
              marginLeft: 10,
            }}>
            <Text style={styles.chatHeading}>5/2B,Firdos Colony Nazimabad Karachi, Pakistan</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default userProfile;

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
    fontSize: 19,
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
    padding: 25,
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
