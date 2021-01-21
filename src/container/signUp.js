import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  ToastAndroid,
} from 'react-native';
import storage from '@react-native-firebase/storage';
import Stepper from 'react-native-stepper-ui';
import ImagePicker from 'react-native-image-crop-picker';
import {useDispatch} from 'react-redux';
import {signUpUser} from '../Store/action/auth';
let profileURL;

const UserName = (props) => {
  const [fname, setFName] = useState('');
  const [lNmae, setLName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [checkValidate, setCheckValidate] = useState(false);
  const passwordCheck = (text) => {
    if (password !== '') {
      setCheckValidate(true);
    } else {
      setCheckValidate(false);
    }
    setPassword(text);
  };
  const goToLogIn = () => {
    navigation.navigate('Login');
  };
  const LoginUser = () => {
    if (email == '' || (password == '' && email && password == '')) {
      ToastAndroid.show('Please Fill The Required Fields First', 2000);
    } else {
      let user = {
        email,
        password,
      };
      dispatch(loginUser(user));
    }
  };
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View style={{flexDirection: 'row', marginTop: 15}}>
        <View style={{flex: 1}}></View>
        <View style={styles.textFieldArea}>
          <TextInput
            value={fname}
            onChangeText={(text) => {
              setFName(text);
            }}
            style={styles.textBox}
            placeholder="Enter First Name"
          />
        </View>
        <View style={{flex: 1}}></View>
      </View>
      <View style={{flexDirection: 'row', marginTop: 10}}>
        <View style={{flex: 1}}></View>
        <View style={styles.textFieldArea}>
          <TextInput
            style={styles.textBox}
            value={lNmae}
            onChangeText={(text) => {
              setLName(text);
            }}
            placeholder="Enter Last Name"
          />
        </View>
        <View style={{flex: 1}}></View>
      </View>
    </View>
  );
};
const EmailPassword = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const goToLogIn = () => {
    navigation.navigate('Login');
  };
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View style={{flexDirection: 'row', marginTop: 15}}>
        <View style={{flex: 1}}></View>
        <View style={styles.textFieldArea}>
          <TextInput
            value={email}
            onChangeText={(text) => {
              setEmail(text);
            }}
            style={styles.textBox}
            placeholder="Enter Your Email Address"
          />
        </View>
        <View style={{flex: 1}}></View>
      </View>
      <View style={{flexDirection: 'row', marginTop: 10}}>
        <View style={{flex: 1}}></View>
        <View style={styles.textFieldArea}>
          <TextInput
            style={styles.textBox}
            value={password}
            onChangeText={(text) => {
              setPassword(text);
            }}
            placeholder="Enter Your Password"
            secureTextEntry={true}
          />
        </View>
        <View style={{flex: 1}}></View>
      </View>
    </View>
  );
};
const ImageNumber = (props) => {
  const [image, setImage] = useState(
    'https://rnmconsultants.org/wp-content/uploads/2020/04/avatar-png-1.png',
  );
  const [number, setNumber] = useState('');
  const [address, setAdress] = useState('');
  const goToLogIn = () => {
    navigation.navigate('Login');
  };
  // Function to pick the upload image...!
  async function imagePickerFunc() {
    try {
      let response = await ImagePicker.openPicker({
        width: 70,
        height: 70,
        cropping: true,
        mediaType: 'photo',
      });
      // console.log(response);
      let imageName = Date.now();
      let imagePath = response.path;
      setImage(imagePath);

      let updateImagePath = await fetch(imagePath);
      const blob = await updateImagePath.blob();
      let imageRef = storage().ref().child(`Profile Images/${imageName}`);
      let result = await imageRef.put(blob);
      let getURL = await imageRef.getDownloadURL();
      profileURL = getURL;
    } catch (error) {
      console.error(`${error}`);
    }
  }
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View style={{flexDirection: 'row', marginTop: 15}}>
        <View style={{flex: 1}}></View>
        <View style={styles.textFieldArea}>
          <TextInput
            value={number}
            onChangeText={(text) => {
              setNumber(text);
            }}
            style={styles.textBox}
            placeholder="Enter Mobile Number"
            keyboardType={'numeric'}
          />
        </View>
        <View style={{flex: 1}}></View>
      </View>

      <View style={{flexDirection: 'row', marginTop: 15}}>
        <View style={{flex: 1}}></View>
        <View style={styles.textFieldArea}>
          <TextInput
            value={address}
            onChangeText={(text) => {
              setAdress(text);
            }}
            style={styles.textBox}
            placeholder="Enter Present Address"
          />
        </View>
        <View style={{flex: 1}}></View>
      </View>


      

      <View style={{flexDirection: 'row', marginTop: 10}}>
        <View style={{flex: 1}}></View>
        <View style={{flex: 5, alignItems: 'center'}}>
          <TouchableOpacity onPress={imagePickerFunc}>
            <Text
              style={{
                color: '#0078FF',
                fontSize: 20,
                fontWeight: '700',
                marginTop: 5,
                marginBottom: 10,
              }}>
              Upload Image
            </Text>
            <Image
              source={{uri: image}}
              style={{width: 100, height: 100, borderRadius: 50}}
            />
          </TouchableOpacity>
        </View>
        <View style={{flex: 1}}></View>
      </View>
    </View>
  );
};

const Finish = (props) => {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <View style={{flexDirection: 'row', marginTop: 15}}>
        <View style={{flex: 1}}></View>
        <View style={{flex: 5}}>
          <Image
            source={{
              uri: 'https://coschedule.com/blog/wp-content/uploads/blue.png',
            }}
            style={{width: '100%', height: 100}}
          />
        </View>
        <View style={{flex: 1}}></View>
      </View>
    </View>
  );
};
const content = [
  <UserName title="User Name" />,
  <EmailPassword title="Email And Password" />,
  <ImageNumber title="Number And Image" />,
  <Finish title="Finish" />,
];

const Signup = ({navigation}) => {
  // Handeling states here...!
  const [active, setActive] = useState(0);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [profileImage, setProfileImage] = useState(
    'https://i.pinimg.com/originals/6b/aa/98/6baa98cc1c3f4d76e989701746e322dd.png',
  );

  // Handeling redux here...!
  const dispatch = useDispatch();

  // Function to go to log in component...!
  const goToLogIn = () => {
    navigation.navigate('Login');
  };

  // Function to pick the upload image...!
  async function imagePickerFunc() {
    try {
      let response = await ImagePicker.openPicker({
        width: 70,
        height: 70,
        cropping: true,
        mediaType: 'photo',
      });
      // console.log(response);
      let imageName = Date.now();
      let imagePath = response.path;
      setProfileImage(imagePath);

      let updateImagePath = await fetch(imagePath);
      const blob = await updateImagePath.blob();
      let imageRef = storage().ref().child(`Profile Images/${imageName}`);
      let result = await imageRef.put(blob);
      let getURL = await imageRef.getDownloadURL();
      profileURL = getURL;
    } catch (error) {
      console.error(`${error}`);
    }
  }

  // Function to sign up...!
  const signUpUserHere = ({navigation}) => {
    let charRegExpression = /^[A-Za-z]+$/;
    let userObj = {
      name,
      email,
      password,
      displayPic: profileURL,
    };

    if (
      profileImage ===
      'https://i.pinimg.com/originals/6b/aa/98/6baa98cc1c3f4d76e989701746e322dd.png'
    ) {
      Alert.alert('Error! Image field is an empty!!!');
    } else {
      if (userObj.name != '') {
        dispatch(signUpUser(userObj, navigation));
        clearStates();
      } else {
        Alert.alert('Error! You need to fill all the fields accurately!!!');
        clearStates();
      }
    }
  };

  // Function to clear states...!
  const clearStates = () => {
    setName('');
    setEmail('');
    setPassword('');
    setProfileImage(
      'https://i.pinimg.com/originals/6b/aa/98/6baa98cc1c3f4d76e989701746e322dd.png',
    );
  };

  return (
    // <View>
    //   <Text
    //     style={{
    //       fontWeight: 'bold',
    //       fontSize: 28,
    //       color: 'coral',
    //       alignSelf: 'center',
    //     }}>
    //     SignUp Component
    //   </Text>
    //   <Image source={{uri: profileImage}} style={{width: 50, height: 50}} />
    //   <TextInput
    //     value={name}
    //     onChangeText={(text) => {
    //       setName(text);
    //     }}
    //     style={{borderColor: 'black', borderWidth: 5}}
    //     placeholder="Enter Your Email"
    //   />
    //   <TextInput
    //     value={email}
    //     onChangeText={(text) => {
    //       setEmail(text);
    //     }}
    //     style={{borderColor: 'black', borderWidth: 5}}
    //     placeholder="Enter Your Email"
    //   />
    //   <TextInput
    //     value={password}
    //     onChangeText={(text) => {
    //       setPassword(text);
    //     }}
    //     style={{borderColor: 'black', borderWidth: 5}}
    //     placeholder="Enter Your Password"
    //     secureTextEntry={true}
    //   />
    //   <Button title="Sign Up" onPress={signUpUserHere} />
    //   <TouchableOpacity
    //     style={{alignItems: 'center'}}
    //     onPress={() => {
    //       navigation.navigate('Login')
    //     }}>
    //     <Text
    //       style={{
    //         fontWeight: 'bold',
    //         color: '#AC2625',
    //         fontSize: 15,
    //         marginTop: 5,
    //       }}>
    //       Already Have An Account Log In Instead...
    //     </Text>
    //   </TouchableOpacity>
    //   <Button title="Upload Image" onPress={imagePickerFunc} />
    //   <Button title="Take From Camera" />
    // </View>

    // <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
    //   <View style={{flexDirection: 'row'}}>
    //     <View style={{flex: 1}}></View>
    //     <View style={styles.imageContainer}>
    //       <Image
    //         source={{
    //           uri:
    //             'https://brandpalettes.com/wp-content/uploads/2018/10/Facebook_Messenger_logo-298x300.png',
    //         }}
    //         style={styles.logoImage}
    //       />
    //     </View>
    //     <View style={{flex: 1}}></View>
    //   </View>
    //   <View style={{flexDirection: 'row'}}>
    //     <View style={{flex: 1}}></View>
    //     <View style={styles.logoSlogan}>
    //       <Text style={styles.logoSloganText}>Chat App Messenger</Text>
    //     </View>
    //     <View style={{flex: 1}}></View>
    //   </View>
    //   <View style={{flexDirection: 'row'}}>
    //     <View style={{flex: 1}}></View>
    //     <View style={styles.textFieldArea}>
    //       <TextInput
    //         value={email}
    //         onChangeText={(text) => {
    //           setEmail(text);
    //         }}
    //         style={styles.textBox}
    //         placeholder="Enter Your Email"
    //       />
    //     </View>
    //     <View style={{flex: 1}}></View>
    //   </View>
    //   <View style={{flexDirection: 'row', marginTop: 10}}>
    //     <View style={{flex: 1}}></View>
    //     <View style={styles.textFieldArea}>
    //       <TextInput
    //         style={styles.textBox}
    //         value={password}
    //         onChangeText={passwordCheck}
    //         placeholder="Enter Your Password"
    //         secureTextEntry={true}
    //       />
    //     </View>
    //     <View style={{flex: 1}}></View>
    //   </View>
    //   <View style={{flexDirection: 'row', marginTop: 10}}>
    //     <View style={{flex: 1}}></View>
    //     <View
    //       style={checkValidate ? styles.loginBtnAfter : styles.loginBtnBefore}>
    //       <TouchableOpacity style={styles.p15} onPress={LoginUser}>
    //         <Text
    //           style={
    //             checkValidate ? styles.loginTextAfter : styles.loginTextBefore
    //           }>
    //           LOGIN
    //         </Text>
    //       </TouchableOpacity>
    //     </View>
    //     <View style={{flex: 1}}></View>
    //   </View>
    //   <View style={{flexDirection: 'row', marginTop: 1}}>
    //     <View style={{flex: 1}}></View>
    //     <TouchableOpacity
    //       style={styles.signUpText}
    //       onPress={() => {
    //         navigation.navigate('Signup');
    //       }}>
    //       <View style={styles.p15}>
    //         <Text style={styles.loginTextBefore}>Forgot Password?</Text>
    //       </View>
    //     </TouchableOpacity>
    //     <View style={{flex: 1}}></View>
    //   </View>
    //   <View style={{flexDirection: 'row', marginTop: 1}}>
    //     <View style={{flex: 1}}></View>
    //     <View style={styles.signUpText}>
    //       <TouchableOpacity
    //         style={styles.p15}
    //         onPress={goToLogIn}>
    //         <Text style={styles.loginTextBefore}>
    //           Already Have An Account Log In.
    //         </Text>
    //       </TouchableOpacity>
    //     </View>
    //     <View style={{flex: 1}}></View>
    //   </View>
    // </View>
    <View style={{marginVertical: 80, marginHorizontal: 20}}>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 1}}></View>
        <View style={styles.imageContainer}>
          <Image
            source={{
              uri:
                'https://brandpalettes.com/wp-content/uploads/2018/10/Facebook_Messenger_logo-298x300.png',
            }}
            style={styles.logoImage}
          />
        </View>
        <View style={{flex: 1}}></View>
      </View>
      <View style={{flexDirection: 'row'}}>
        <View style={{flex: 1}}></View>
        <View style={styles.logoSlogan}>
          <Text style={styles.logoSloganText}>Chat App Messenger</Text>
        </View>
        <View style={{flex: 1}}></View>
      </View>
      <Stepper
        active={active}
        content={content}
        onNext={() => setActive((p) => p + 1)}
        onBack={() => setActive((p) => p - 1)}
        onFinish={() =>
          ToastAndroid.show('Finished Sign Up Successfully', 2000)
        }
        buttonStyle={{
          flex: 7,
          alignSelf: 'center',
          backgroundColor: '#0078FF',
          alignItems: 'center',
          alignContent: 'center',
          justifyContent: 'center',
          marginLeft: 50,
          marginRight: 50,
          marginTop: 10,
          padding: 10,
          borderRadius: 25,
        }}
      />

      <View style={{flexDirection: 'row', marginTop: 1}}>
        <View style={{flex: 1}}></View>
        <View style={styles.signUpText}>
          <TouchableOpacity
            style={styles.p15}
            onPress={() => {
              navigation.navigate('Login');
            }}>
            <Text style={styles.loginTextBefore}>
              Already Registered Login.
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{flex: 1}}></View>
      </View>
    </View>
  );
};

export default Signup;

const styles = StyleSheet.create({
  imageContainer: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
  },
  logoImage: {
    width: 80,
    height: 80,
  },
  textFieldArea: {
    flex: 5,
    backgroundColor: '#fff',
    borderRadius: 40,
  },
  textBox: {
    borderRadius: 50,
    textAlign: 'center',
    color: '#0078FF',
  },
  p15: {
    padding: 15,
  },
  logoSlogan: {
    alignItems: 'center',
    marginTop: 5,
    marginBottom: 10,
  },
  logoSloganText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0078FF',
  },
  signUpText: {
    flex: 5,
    borderRadius: 40,
  },
  loginBtnBefore: {
    flex: 5,
    backgroundColor: '#fff',
    borderRadius: 40,
  },
  loginBtnAfter: {
    flex: 5,
    backgroundColor: '#0078FF',
    borderRadius: 40,
  },
  loginTextBefore: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0078FF',
    textAlign: 'center',
  },
  loginTextAfter: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    textAlign: 'center',
  },
});
