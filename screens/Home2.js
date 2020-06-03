import React, { Component } from "react";
import {
  Platform,
  View,
  FlatList,
  Alert,
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet ,
  ScrollView,
  AsyncStorage,
  RefreshControl,
  TouchableOpacity
} from "react-native";

import { Button, Block, Input,Text } from "../components";
import { theme } from "../constants";
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import OneSignal from 'react-native-onesignal'; // Import package from node modules

const t='ExponentPushToken[KGN1fCEqtnNI7XN_mGyYw_]';

export default class Home2 extends Component {////////appreg
 
   constructor(props) {
    super(props);
  
   // OneSignal.enableSound(true);
   // OneSignal.enableVibrate(true);
    this.state = {
    // email: global.Email;///////////
    email: '',
    
   // done:'0',
   
      isLoading: true,
      isRefreshing: false, //for pull to refresh
      token:'',
      tokn:'',//////////////////////
     // expoPushToken: '',
      notification: {},
    }
   
  }

/* 
  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onReceived(notification) {
    console.log("Notification received: ", notification);
  }

  onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }

  onIds(device) {
    console.log('Device info: ', device);
  }


  sendNotification(data, id){
let headers = {
  'Content-Type': 'application/json; charset=utf-8',
  Authorization: "Basic 'NGJjZWY5YzMtOTRlOS00NjZKLWFlMjMtNDc2M2U3ODgzMTg0'"
};
 let endpoint = 'https://onesignal.com/api/v1/notifications';
 let params={
method:'POST',
headers:headers,
body:JSON.stringify({
app_id: "ed71d85c-28b8-4ad8-ac52-50cc9d065725",
filters:[
{
field:'tag',
key:'key',
relation: '=',
valu : global.Email,

},
],
headings:{en: 'Sleep Update'},
contents:{en:data},
url : 'https://something.any',
}),


 };

 fetch(endpoint,params).then(res => console.log(res));

 */

 // }

  guid() {
    return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' +
        this.s4() + '-' + this.s4() + this.s4() + this.s4();
}

s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
}
 /* 
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
      //===console.log(this.state.expoPushToken);
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

  sendPushNotification = async () => {
    const message = {
      to: 'ExponentPushToken[KGN1fCEqtnNI7XN_mGyYw_]',//t,//ETOKEN//this.state.tokn
      sound: 'true',
      title: 'ACCEPTED ',
      body: 'just wait!',
      data: { data: 'goes here' },
      _displayInForeground: true,
    };//regpush get tok// send
    const response = await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
  };

  gettok(ID){
    fetch('http://192.168.43.137/Server/tok1.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
       email: global.Email,
       ID : ID,
      
      })
     
    }).then((response) => response.json())
          .then((responseJson) => {
    
            this.setState({
         
              isLoading: false,
              expoPushToken: responseJson,
              t:responseJson
            }, function() {
              // In this block you can do something with new state.
            });
            console.log("ooooooooooooooooooooo");
              expoPushToken: responseJson,
              console.log(responseJson,'this is reseiver');//try  t 
         }).catch((error) => {
           Alert.alert(
             "Error in json",
             "Please check you Email address.",
             [{ text: "Try again" }],
             { cancelable: false }
           );
           console.error(error);
         }); 
  }
*/
   handleAccept(ID) {
   // this.gettok(ID);//add ID

   fetch('http://192.168.43.137/Server/Company_Accept.php', {
     method: 'POST',
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json',
     },
     body: JSON.stringify({
      email: global.Email,
      ID : ID,
     })
    
   }).then((response) => response.json())
         .then((responseJson) => {
   
          Alert.alert(responseJson);
      
        }).catch((error) => {
          Alert.alert(
            "Error in json",
            "Please check you Email address.",
            [{ text: "Try again" }],
            { cancelable: false }
          );
          console.error(error);
        }); 
      

      //  this.sendNotification(data, id);

        
       // this.sendPushNotification();
      } 

      
   handleDeny (ID) {

    
    fetch('http://192.168.43.137/Server/Company_Deny.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
       email: global.Email,
       ID : ID,
      })
     
    }).then((response) => response.json())
          .then((responseJson) => {
    
           Alert.alert(responseJson);
       
         }).catch((error) => {
           Alert.alert(
             "Error in json",
             "Please check you Email address.",
             [{ text: "Try again" }],
             { cancelable: false }
           );
           console.error(error);
         });
        
    
       } 

   GetFlatListItem (ID) {
   
 // Alert.alert(Vehicle);
 Alert.alert(
  ' New Requist  ',
  'Do You Want To Accept This Requist ?',
  [
    {
      text: 'Cancel',
      //onPress: () => console.log('Ask me later pressed'),
      style: 'cancel'
    },
    {
      text: 'Deny',
      onPress: () =>this.handleDeny(ID) ,
      
    },
    { text: 'Accept',
     onPress: () =>this.handleAccept(ID) }
  ],
  { cancelable: false }
);

  }
  
  _handleNotification = notification => { //rec noti
    Vibration.vibrate();
    console.log(notification);
    this.setState({ notification: notification });
  };
 
  componentDidMount() {

    OneSignal.init("ed71d85c-28b8-4ad8-ac52-50cc9d065725", {kOSSettingsKeyAutoPrompt: false, 
      kOSSettingsKeyInAppLaunchURL: false}); // Start OneSignal

OneSignal.inFocusDisplaying(2); // Show native notifications even if the app is open 

    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);

    OneSignal.addEventListener('ids', this.onIds);
  
    //const { done }  ;
  
    //this.registerForPushNotificationsAsync();
    //this._notificationSubscription = Notifications.addListener(this._handleNotification);
    return fetch('http://192.168.43.137/Server/new.php', {
      method: 'POST',
       headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }, 
      body: JSON.stringify({
    
     ///   name: this.state.username,
        email: global.Email,
       // Done :  global.Done,
    
     ////   password: this.state.password 
    
      })
    
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson =='no result!!!'){
          Alert.alert("there's no any requests !!");
        }
        else {
        this.setState({
         
          isLoading: false,
          dataSource: responseJson
        }, function() {
          // In this block you can do something with new state.
        });}
      })
      .catch((error) => {
        console.error(error);
      });
      
  }

  onRefresh() {
    this.setState({ isRefreshing: true }); // true isRefreshing flag for enable pull to refresh indicator
   
    return fetch('http://192.168.43.137/Server/new.php', {
      method: 'POST',
       headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      }, 
      body: JSON.stringify({
    
     ///   name: this.state.username,
        email: global.Email,
       // Done :  global.Done,
    
     ////   password: this.state.password 
    
      })
    
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson =='no result!!!'){
          Alert.alert(responseJson);
        }
        else {
        this.setState({
          isRefreshing: false,
          isLoading: false,
          dataSource: responseJson
        }, function() {
          // In this block you can do something with new state.
        });}
      })
      .catch((error) => {  this.setState({ isRefreshing: false, error: 'Something just went wrong' })
        console.error(error);
      });
      
                    
    
  }


   
  
  FlatListItemSeparator = () => {
    return (
      <View
        style={{
          height: 5,//5
          width: "100%",
          backgroundColor: "#000",//000
        }}
      />
    );
  }



   render() {
      const { navigation } = this.props;
      const {  errors } = this.state;
      const hasErrors = key => (errors.includes(key) ? styles.hasErrors : null);
      if (this.state.isLoading) {
        return (
          <View style={{flex: 1, paddingTop: 20}}>
            <ActivityIndicator />
          </View>
        );
      }
   
      return (
   
  <View style={styles.MainContainer}>
  
         
         <FlatList
         
            data={ this.state.dataSource }
            
            ItemSeparatorComponent = {this.FlatListItemSeparator}
   
              renderItem={({item}) => <View style={{flex:1, flexDirection: 'column'}} >
  
            <TouchableOpacity onPress={this.GetFlatListItem.bind(this, item.ID)} >      
          
<Text style={styles.textViewContainer5} >{'ID = ' + item.ID}</Text> 
<Text style={styles.textViewContainer4} >{'* Customer Information '}</Text>
<Text style={styles.textViewContainer3} >{''}</Text>
<Text style={styles.textViewContainer} >{'Customer Email : ' + item.Email}</Text>
<Text style={styles.textViewContainer} >{'Customer Name : ' + item.Name}</Text>
<Text style={styles.textViewContainer} >{'Customer phone : ' + item.Phone}</Text>
<Text style={styles.textViewContainer4} >{'_____________________'}</Text>
<Text style={styles.textViewContainer4} >{'** Requist Information '}</Text>
<Text style={styles.textViewContainer3} >{''}</Text>
<Text style={styles.textViewContainer} >{'Requist Type : ' + item.OrderType}</Text>
<Text style={styles.textViewContainer2} >{'More Information : ' + item.Information}</Text>
<Text style={styles.textViewContainer4} >{'_____________________'}</Text>
<Text style={styles.textViewContainer4} >{'*** Vehicle Information '}</Text>
<Text style={styles.textViewContainer3} >{''}</Text>
<Text style={styles.textViewContainer} >{'VIN Number  : ' + item.RegistrationNumber}</Text>
<Text style={styles.textViewContainer} >{'Plate Number  : ' + item.Vehicle}</Text>
<Text style={styles.textViewContainer} >{'Vehicle Type  : ' + item.VehicleType}</Text>
<Text style={styles.textViewContainer} >{'Vehicle Model  : ' + item.VehicleModel}</Text>
<Text style={styles.textViewContainer} >{'Year Of  Manufacture  : ' + item.YearOfManufacture}</Text>


          
          
          
            </TouchableOpacity>
           </View>
              }
            keyExtractor={(item,index) => this.guid()}
            extraData={this.state}
            refreshControl={
              <RefreshControl
                refreshing={this.state.isRefreshing}
                onRefresh={this.onRefresh.bind(this)}
                />}
           />
      
     </View>
              
      );
    }
  }
 
  
  
  const styles = StyleSheet.create({
    signup: {
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
    },
    MainContainer :{
      justifyContent: 'center',
      flex:1,
      padding: 5,
      margin: 10,
      paddingTop: (Platform.OS === 'ios') ? 20 : 0,
     // backgroundColor: '#00BCD4',
      },
       
      rowViewContainer: {
        fontSize: 20,
        paddingRight: 10,
        paddingTop: 10,
        paddingBottom: 10,
      },
            
        FlatListItemStyle: {
            padding: 10,
            fontSize: 18,
            height: 44,
           // flex:1,
            flexDirection: 'column'
          },
          
            
            textViewContainer: {
             
             textAlignVertical:'center', 
             padding:10,
             fontSize: 20,
             color: '#000',
             height: 50,
             flexDirection: 'column'
            },
            textViewContainer2: {
             
              textAlignVertical:'center', 
              padding:10,
              fontSize: 20,
              color: '#000',
              height: 100,
              flexDirection: 'column'
             },
             textViewContainer3: {
             
              textAlignVertical:'center', 
              padding:10,
              fontSize: 20,
              color: '#000',
              height: 45,
              flexDirection: 'column'
             },
             textViewContainer4: {
             
              textAlignVertical:'center', 
              padding:10,
              fontSize: 20,
              color: '#8875ba',
              height: 45,
              flexDirection: 'column'
             },
             textViewContainer5: {
             
              textAlignVertical:'center', 
              padding:10,
              fontSize: 20,
              color: '#FF0000',
              height: 45,
              flexDirection: 'column'
             }

  });
  