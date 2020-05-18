import React, { Component } from "react";
import {
  Alert,
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet ,
  TouchableWithoutFeedback,
  ScrollView,
  AsyncStorage
} from "react-native";

import { Button, Block, Input, Text } from "../components";
import { theme } from "../constants";



export default class Login extends Component {
 
  constructor(props){
    super(props);
    this.state={email:'', password:'', errors: [],
    isLoading: true};
  }

  handleLogin () {
 
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
    
       password: password
    
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
              secure
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

            <Button onPress={() => navigation.navigate("Forgot")}>
              <Text
                gray
                caption
                center
                style={{ textDecorationLine: "underline" }}
              >
                Forgot your password?
              </Text>
            </Button>
            
           {/*  <Button onPress={() => navigation.navigate("Welcome")}>
              <Text
                gray
                caption
                center
                style={{ textDecorationLine: "underline" }}
              >
                Back to welcome page
              </Text>
            </Button> */}
            </ScrollView>
          </Block>
        </Block>
      </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );
  }
 
  
/*   handleLogin(email,password) {
    // const { navigation } = this.props;
    Alert.alert(
      "fun",
      "Please check you Email address.",
      [{ text: "Try again" }],
      { cancelable: false }
    );
     
       fetch('http://192.168.100.113:3000/cusomer/'+email+'/'+password, {
       method :'GET',
 
 
   })
  
         .then(response => response.json())
         
         .then((res)=>{
           
           if (res.success===true){
             var email= res.message;
             AsyncStorage.setItem('email',email);
             console.log("sssssss");
             navigation.navigate("Sallikna");////for test put it  profile insted of sallikna

           }
           else{
            Alert.alert(
              "errrrrr",
              "Please check you Email address.",
              [{ text: "Try again" }],
              { cancelable: false }
            );
            console.log("fffffff");
             alert(res.message);
           }
         })
 .done();
        } */
     //const { email, password } = this.state;
 
     
    // Keyboard.dismiss();
    // this.setState({ loading: true });
 
     // check with backend API or with some static data
     /* if (email !== VALID_EMAIL) {
       errors.push("email");
     }
     if (password !== VALID_PASSWORD) {
       errors.push("password");
     } */
 
 
    /*  this.setState({ errors, loading: false });
 
     if (!errors.length) {
       console.log("sssssss");
     
               navigation.navigate("Sallikna");
    
   
     }
     if (errors.length) {
       console.log("fffffff");
       Alert.alert(
         "Error",
         "Please check you Email address.",
         [{ text: "Try again" }],
         { cancelable: false }
       );
   
     } */
     
  // }

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






