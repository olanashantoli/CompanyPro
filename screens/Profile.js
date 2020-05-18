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


export default class Profile extends Component {
 
  constructor(props) {
 
    super(props)
 
    this.state = {
 
  //    username: '',
  email: '',
      adminID: '',
      password: '',
      confirm_password: '',
    
      errors: [],
      loading: false
 
    }
 
  }
  

    ///////////////
   /*  componentDidMount(){
      this._loadInitalState().done();
    }

    _loadInitalState=async()=>{
      var value = await AsyncStorage.getItem('email');
      if(value!== null){
        this.setState({email:value})
      }
    } */
  
   // onPress = gender => this.setState({ gender });
    handleProfile() {
      const { navigation } = this.props;
      if(this.state.password == this.state.confirm_password){
        fetch('http://192.168.43.137/Server/changepassword.php', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
      
       ///   name: this.state.username,
          email: global.Email,
          adminID: this.state.adminID,
      
          password: this.state.password 
      
        })
      
      }).then((response) => response.json())
            .then((responseJson) => {
      
      // Showing response message coming from server after inserting records.
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
          else{
            Alert.alert(
              "eror : paswword dont match",
              "Please check password.",
              [{ text: "Try again" }],
              { cancelable: false }
            );
          }
          
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
             Change Password
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
  
           
              <Input
               secure
                label=" New Password"
                error={hasErrors("password")}
                style={[styles.input, hasErrors("password")]}
                defaultValue={this.state.password}
                onChangeText={password => this.setState({ password: password })}
              />

               <Input
                secure
                label="Confirm Password"
                error={hasErrors("confirm_password")}
                style={[styles.input, hasErrors("confirm_password")]}
                defaultValue={this.state.confirm_password}
                onChangeText={confirm_password => this.setState({ confirm_password: confirm_password })}
              />
                <Text bold white center>
             {"\n"} {"\n"}
                </Text>

           
              <Button gradient onPress={() => this.handleProfile()}>
                {loading ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Text bold white center>
                  Change Password
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
  