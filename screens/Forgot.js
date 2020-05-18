import React, { Component } from "react";
import {
  Alert,
  ActivityIndicator,
  Keyboard,
  KeyboardAvoidingView,
  StyleSheet ,
  TouchableWithoutFeedback
} from "react-native";

import { Button, Block, Input, Text } from "../components";
import { theme } from "../constants";

//const VALID_EMAIL = "olahantoli@gmail.com";

export default class Forgot extends Component {
  state = {
    email: global.Email,
    errors: [],
    loading: false
  };

  handleForgot() {
    const { navigation } = this.props;
    const { email } = this.state;
    const errors = [];

    Keyboard.dismiss();
    this.setState({ loading: true });

    // check with backend API or with some static data
    /* if (email !== VALID_EMAIL) {
      errors.push("email");
    } */

    this.setState({ errors, loading: false });

    if (!errors.length) {
      Alert.alert(
        "Password sent!",
        "Please check you email.",
        [
          {
            text: "OK",
            onPress: () => {
              navigation.navigate("Forgot");
            }
          }
        ],
        { cancelable: false }
      );
    } else {
      Alert.alert(
        "Error",
        "Please check you Email address.",
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
      <TouchableWithoutFeedback onpress={()=>{Keyboard.dismiss}}>
      <KeyboardAvoidingView style={styles.forgot} behavior="padding">
        <Block padding={[0, theme.sizes.base * 2]}>
        <Text bold white center>
             {"\n"} {"\n"}
                </Text>

          <Text h1 bold>
            Forgot
          </Text>
          <Block middle>
            <Input
              label="Email"
              error={hasErrors("email")}
              style={[styles.input, hasErrors("email")]}
              defaultValue={this.state.email}
              onChangeText={text => this.setState({ email: text })}
            />
             <Text bold white center>
             {"\n"} {"\n"}
                </Text>

            <Button gradient onPress={() => this.handleForgot()}>
              {loading ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                <Text bold white center>
                  Forgot
                </Text>
              )}
            </Button>

            <Button onPress={() => navigation.navigate("Welcome")}>
              <Text
                gray
                caption
                center
                style={{ textDecorationLine: "underline" }}
              >
                Back to welcome page
              </Text>
            </Button>
          </Block>
        </Block>
      </KeyboardAvoidingView>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  forgot: {
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
