import React,  {  Component } from "react";
import {
  Alert,
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet ,
  TouchableWithoutFeedback,
  ScrollView,
  AsyncStorage
  , Vibration,
   Platform
} from "react-native";

import { Button, Block, Input, Text } from "../components";
import { theme } from "../constants";
import { Notifications } from 'expo'; //1
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

export default class Login extends Component {
 
  
  constructor(props){
    super(props);
    this.state={email:'', password:'', errors: [],
    isLoading: true,
    token:'',
    expoPushToken: '',//2
    notification: {},
  };

  }

  registerForPushNotificationsAsync = async () => {//3
    if (Constants.isDevice) {
      const { status: existingStatus } = await Permissions.getAsync(Permissions.NOTIFICATIONS);
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = await Notifications.getExpoPushTokenAsync();
      
      this.setState({ expoPushToken: token });
      console.log(token);
      console.log(this.state.expoPushToken);
    } else {
      alert('Must use physical device for Push Notifications');
    }

    if (Platform.OS === 'android') {
      Notifications.createChannelAndroidAsync('default', {
        name: 'default',
        sound: true,
        priority: 'max',
        vibrate: [0, 250, 250, 250],
      });
    }
  };

  componentDidMount() {
    
   
  }

  _handleNotification = notification => { //rec noti
    Vibration.vibrate();
    console.log(notification);
    this.setState({ notification: notification });
  };
  
  

  st(){
    const { email }  = this.state ;
    const { expoPushToken }  = this.state ;
    fetch('http://192.168.43.137/Server/st.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
    
     
    
        email: email,
    
      
        TOK : expoPushToken
    
      })
    
    }).then((response) => response.json())
          .then((responseJson) => {
    
    // Showing response message coming from server after inserting records.
           // Alert.alert(responseJson); // اللي رجع من  php 
        
          }).catch((error) => {
            console.error(error);
          });
      

  }

  


  handleLogin () {
   // this.getPushNotificationPermissions();
 
    const { email }  = this.state ;
    const {password }  = this.state ;
   
  
    
    global.Email=email;
   fetch('http://192.168.43.137/Server/Company_Login.php', {
     method: 'POST',
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
     },
     body: JSON.stringify({
    
       email: email,
    
       password: password,
     
    
     })
    
   }).then((response) => response.json())
         .then((responseJson) => {
   
           // If server response message same as Data Matched
          if(responseJson === 'Data Matched')
           {
   
               //Then open Profile activity and send user email to profile activity.
              // this.props.navigation.navigate('Second', { email: email });
              this.props.navigation.navigate("Sallikna");
   
           }
           else{
   
             Alert.alert(responseJson);
           }
   
         }).catch((error) => {
           console.error(error);
         });

        
    this.registerForPushNotificationsAsync();//save token //4
    this._notificationSubscription = Notifications.addListener(this._handleNotification);// rec noti
    this.st();
    
     }

  render() {
    const { navigation } = this.props;
  //  const errors = [];

    const { loading } = this.state;
  // const hasErrors = key => (errors.includes(key) ? styles.hasErrors : null);

    return (
      <TouchableWithoutFeedback onpress={()=>{Keyboard.dismiss}}>
      <KeyboardAvoidingView style={styles.login} behavior="padding">
        <Block padding={[0, theme.sizes.base * 2]}>
        <Text bold white center>
             {"\n"} {"\n"}
                </Text>

          <Text h1 bold>
             Provider Login
          </Text>
          <Text bold white center>
             {"\n"} {"\n"}
                </Text>

          <Block middle>
          <ScrollView>
            <Input
            email
              label=" Provider Email"
             // error={hasErrors("email")}
              //style={[styles.input, hasErrors("email")]}
          //    defaultValue={this.state.email}
              onChangeText={email => this.setState({ email})}
              value={this.state.email}
            />
            <Input
             // secure
              label="Password"
           //   error={hasErrors("password")}
             // style={[styles.input, hasErrors("password")]}
              //defaultValue={this.state.password}
              onChangeText={password => this.setState({ password})}
              value={this.state.password}
            />
            
            <Text bold white center>
            {"\n"} 
                </Text>

            <Button gradient onPress={() => this.handleLogin()}>
              {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text bold white center>
                  Login
                </Text>
              )}
            </Button>

          {/*   <Button onPress={() => navigation.navigate("Forgot")}>
              <Text
                gray
                caption
                center
                style={{ textDecorationLine: "underline" }}
              >
              
               get your initial password ?
              </Text>
            </Button> */}
            
         
            </ScrollView>
          </Block>
        </Block>
      </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );
  }
 //GET PASS INSTED OF FORGOT 
  


}

const styles = StyleSheet.create({
  login: {
    flex: 1,
    justifyContent: "center"
  },
  input: {
    borderRadius: 0,
    borderWidth: 0,
    borderBottomColor: theme.colors.gray2,
    borderBottomWidth: StyleSheet.hairlineWidth
  },
  hasErrors: {
    borderBottomColor: theme.colors.accent
  }
});






