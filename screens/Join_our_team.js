import React, { Component } from "react";
import {
  ScrollView,
  Alert,
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet ,
  TouchableWithoutFeedback,
  TextInput
} from "react-native";

import { Button, Block, Input, Text } from "../components";
import { theme } from "../constants";




export default class Join_our_team extends Component {
  constructor(props) {
 
    super(props)
 
    this.state = {
 
      name: '',
      email: '',
      comment:'',
      EmailC:'',
    
      errors: [],
      loading: false
 
    }
 
  }

  handlejoin() {
    const { navigation } = this.props;

    fetch('http://192.168.43.137/Server/joincompany.php', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
    
        name: this.state.name,
    
        email: this.state.email,
        EmailC: global.Email,
       
    
        comment: this.state.comment

     
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
      <TouchableWithoutFeedback onpress={()=>{Keyboard.dismiss}}>
      <KeyboardAvoidingView style={styles.Join_our_team} behavior="padding">
        <Block padding={[0, theme.sizes.base * 2]}>
        <ScrollView>
          <Text h2 bold>
          {"    \n  \n\n"}
            Fill out the comment and our team
             will contaact you after reviewing
          </Text>
        {/* //  {"    \n  \n  \n  \n\n"} */}
        <Input
                label="Your Name"
                error={hasErrors("name")}
                style={[styles.input, hasErrors("name")]}
                defaultValue={this.state.name}
                onChangeText={name => this.setState({ name: name })}
              />
  
              <Input
                email
                label="Email"
                error={hasErrors("email")}
                style={[styles.input, hasErrors("email")]}
                defaultValue={this.state.email}
                onChangeText={email => this.setState({ email: email })}
              />

        
          <Input
              label="  your comment :"
              error={hasErrors("comment")}
              multiline={true}
              maxLength={40}
              defaultValue={this.state.comment}
              onChangeText={comment => this.setState({ comment: comment })}
            
            />
     <Text h4 bold>
         {"  \n\n"}
       
          </Text>
            
         
            <Button gradient onPress={() => this.handlejoin()}>
              {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text bold white center>
                  Submit
                </Text>
              )}
            </Button>
            <Text bold white center>
             {"\n"} {"\n"}
                </Text>

            </ScrollView>
        </Block>
      </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  Join_our_team: {
    flex: 1,
    alignContent: "center"
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
