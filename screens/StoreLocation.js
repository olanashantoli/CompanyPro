import React, { Component } from "react";
import {
  
  Alert,
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet ,
  ScrollView,
  AsyncStorage

} from "react-native";

import { Button, Block, Input, Text } from "../components";
import { theme } from "../constants";
import Geolocation from 'react-native-geolocation-service';


export default class Profile extends Component {
 
  constructor(props) {
 
    super(props)
 
    this.state = {
 
  //    username: '',
  email: '',
      adminID: '',
      currentLongitude: 'unknown', //Initial Longitude
      currentLatitude: 'unknown', //Initial Latitude
      latitude:'',
      longitude:'',
      errors: [],
      loading: false
 
    }
 
  }

  componentDidMount = () => {
    navigator.geolocation.getCurrentPosition(
      //Will give you the current location
      position => {
        const currentLongitude = JSON.stringify(position.coords.longitude);
        //getting the Longitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);
        //getting the Latitude from the location json
        this.setState({ currentLongitude: currentLongitude });
        //Setting state Longitude to re re-render the Longitude Text
        this.setState({ currentLatitude: currentLatitude });
        //Setting state Latitude to re re-render the Longitude Text
      },
      error => alert(error.message),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
    /* this.watchID = navigator.geolocation.watchPosition(position => {
      //Will give you the location on location change
      console.log(position);
      const currentLongitude = JSON.stringify(position.coords.longitude);
      //getting the Longitude from the location json
      const currentLatitude = JSON.stringify(position.coords.latitude);
      //getting the Latitude from the location json
      this.setState({ currentLongitude: currentLongitude });
      //Setting state Longitude to re re-render the Longitude Text
      this.setState({ currentLatitude: currentLatitude });
      //Setting state Latitude to re re-render the Longitude Text
    }); */
  };

  componentWillUnmount = () => {
    navigator.geolocation.clearWatch(this.watchID);
  };
   /*  this.watchId = navigator.geolocation.watchPosition(
      
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
        global.latitudem   = this.state.latitude;
        global.longitudem  = this.state.latitude ;
        //this.storecoo();
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 , distanceFilter: 10},
    ); */



  

  

   storeloc(){

    const { navigation } = this.props;
    fetch('http://192.168.43.137/Server/storeloc.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        adminID: this.state.adminID,
        email: global.Email,
        latitude: this.state.currentLatitude,
        longitude:this.state.currentLongitude
       
    
      })
    
    }).then((response) => response.json())
          .then((responseJson) => {
    
    // Showing response message coming from server after inserting records.
            Alert.alert(responseJson);
    
          }).catch((error) => {
            console.error(error);
          });


  }
   
  
    render() {
      const { navigation } = this.props;
      const { loading, errors } = this.state;
      const hasErrors = key => (errors.includes(key) ? styles.hasErrors : null);
     
    
      return (
     
        <KeyboardAvoidingView style={styles.signup} behavior="padding">
       
          <Block padding={[0, theme.sizes.base * 2]}>
          <Text bold white center>
             {"\n"} {"\n"}
                </Text>

            <Text h1 bold>
            Store Company Location 
            </Text>
            <Text bold white center>
             {"\n"} {"\n"}
                </Text>

            <Block middle>
            <ScrollView>
            <Text style = {styles.TextComponentStyle}> Welcome  { global.Email } </Text>
            <Input
                label="Admin ID"
                error={hasErrors("adminID")}
                style={[styles.input, hasErrors("adminID")]}
                defaultValue={this.state.adminID}
                onChangeText={adminID => this.setState({ adminID: adminID })}
              />
  
          
             
                <Text bold white center>
             {"\n"} {"\n"}
                </Text>

           
              <Button gradient onPress={() => this.storeloc()}>
                {loading ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Text bold white center>
                  Store Company Location
                  </Text>
                )}
              </Button>
              <Text bold white center>
             {"\n"} {"\n"}
                </Text>

             
              </ScrollView>
            </Block>
            
          </Block>
         
        </KeyboardAvoidingView>
    
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
    TextComponentStyle: {
      fontSize: 20,
     color: "#000",
    // textAlign: 'center', 
     marginBottom: 15
    }
  });
  