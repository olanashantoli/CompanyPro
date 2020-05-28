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
  TouchableOpacity,
   Vibration, 
} from "react-native";

import { Button, Block, Input,Text } from "../components";
import { theme } from "../constants";
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';




export default class Home extends Component {////////appreg
 
   constructor(props) {
    super(props);
    this.state = {
    // email: global.Email;///////////
    email: '',
    
   // done:'0',
   
      isLoading: true,
      isRefreshing: false, //for pull to refresh
      token:'',
      expoPushToken: '',
      notification: {},
    }
   
  }

  
  
  _handleNotification = notification => {
    Vibration.vibrate();
    console.log(notification);
    this.setState({ notification: notification });
  };
 
  /* sendPushNotification = async () => {
    const message = {
      to: this.state.expoPushToken,//ETOKEN
      sound: 'default',
      title: 'New Requese ',
      body: 'please check  the New Requests Page!',
      data: { data: 'goes here' },
      _displayInForeground: true,
    };
    const response = await fetch('https://exp.host/--/api/v2/push/send', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Accept-encoding': 'gzip, deflate',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(message),
    });
  }; */

   handleDone (ID) {

  // this.sendPushNotification();
   fetch('http://192.168.43.137/Server/Company_Done.php', {
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

      
   handleNotDone (ID) {

   
    fetch('http://192.168.43.137/Server/Company_NotDone.php', {
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
  'Requist State ',
  'Is Done ?',
  [
    {
      text: 'Cancel',
      //onPress: () => console.log('Ask me later pressed'),
      style: 'cancel'
    },
    {
      text: 'Not Done',
      onPress: () =>this.handleNotDone(ID) ,
      
    },
    { text: 'Done',
     onPress: () =>this.handleDone(ID) }
  ],
  { cancelable: false }
);

  }
 
  componentDidMount() {
    //const { done }  ;
  
   // this.registerForPushNotificationsAsync();
    this._notificationSubscription = Notifications.addListener(this._handleNotification);

    return fetch('http://192.168.43.137/Server/Home-Company.php', {
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
         
          isLoading: false,
          dataSource: responseJson
        },

         function() {
         
          // In this block you can do something with new state.
        });}
      })
      .catch((error) => {
        console.error(error);
      });
      
  }

  onRefresh() {
    this.setState({ isRefreshing: true }); // true isRefreshing flag for enable pull to refresh indicator
   
    return fetch('http://192.168.43.137/Server/Home-Company.php', {
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
              keyExtractor = {(item, index) => index.toString()}
              //   keyExtractor={(item, INDEX) => item.toString()}
        // keyExtractor={   (item, index) => index}
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
  