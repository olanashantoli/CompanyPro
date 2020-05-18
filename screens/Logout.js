import React, { Component } from "react";
import {
  
  Alert,
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet ,
  ScrollView
} from "react-native";

import { Button, Block, Input, Text } from "../components";
import { theme } from "../constants";


export default class Logout extends Component {
 
    state = {
      
      username: null,   /////////////////////////////////////
      email: null,        ///////////////////////////
      mobile_phone:null,
      password: null,
      confirm_password: null,
    
      errors: [],
      loading: false
    };
   // onPress = gender => this.setState({ gender });
    handleProfile() {
      const { navigation } = this.props;
      const { username,email, mobile_phone, password, confirm_password } = this.state;
      const errors = [];
  
     
  
      Keyboard.dismiss();
      this.setState({ loading: true });
  
      // check with backend API or with some static data
      if (!email) errors.push("email");
      if (!username) errors.push("username");
      if (!password) errors.push("password");
      if (!confirm_password) errors.push("confirm_password");
      if (!mobile_phone) errors.push("mobile_phone");
     
  
      this.setState({ errors, loading: false });
  
      if (!errors.length) {
  
        Alert.alert(
          "Success!",
          "Your informations has been changed",
          [
            {
              text: "ok",
             
            }
          ],
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
              Edit Profile Information
            </Text>
            <Text bold white center>
             {"\n"} {"\n"}
                </Text>

            <Block middle>
            <ScrollView>
            <Input
                label="Username"
                error={hasErrors("username")}
                style={[styles.input, hasErrors("username")]}
                defaultValue={this.state.username}
                onChangeText={text => this.setState({ username: text })}
              />
  
              <Input
                email
                label="Email"
                error={hasErrors("email")}
                style={[styles.input, hasErrors("email")]}
                defaultValue={this.state.email}
                onChangeText={text => this.setState({ email: text })}
              />
              <Input
              
              label="mobile_phone"
              error={hasErrors("mobile_phone")}
              style={[styles.input, hasErrors("mobile_phone")]}
              defaultValue={this.state.mobile_phone}
              onChangeText={text => this.setState({ mobile_phone: text })}
            /> 
              <Input
               // secure
                label="Password"
                error={hasErrors("password")}
                style={[styles.input, hasErrors("password")]}
                defaultValue={this.state.password}
                onChangeText={text => this.setState({ password: text })}
              />
               <Input
               // secure
                label="confirm_password"
                error={hasErrors("confirm_password")}
                style={[styles.input, hasErrors("confirm_password")]}
                defaultValue={this.state.confirm_password}
                onChangeText={text => this.setState({ confirm_password: text })}
              />
              
           
              <Button gradient onPress={() => this.handleProfile()}>
                {loading ? (
                  <ActivityIndicator size="small" color="white" />
                ) : (
                  <Text bold white center>
                   Save Changes
                  </Text>
                )}
              </Button>
  
             
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
   
  });
  