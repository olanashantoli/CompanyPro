import React from "react";
import { Image } from "react-native";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import Welcome from "../screens/Welcome";
import Login from "../screens/Login";
//import SignUp from "../screens/SignUp";
import Forgot from "../screens/Forgot";
import Home from "../screens/Home";
import Sallikna from "../screens/Sallikna";

//import Profile from "../screens/Profile";
//import Settings from "../screens/Settings";

import { theme } from "../constants";

const screens = createStackNavigator(
  {
    Welcome,
    Login,
    Forgot,
    Home,
    Sallikna
    
    //Profile
    
    //Settings
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        height: theme.sizes.base * 5,
        backgroundColor: theme.colors.gray2, // or 'white
        borderBottomColor: "transparent",
        elevation: 0 // for android
      },
     
      headerBackImage:()=> <Image source={require("../assets/icons/pp.jpg")} />,
      headerBackTitle: null ,
      headerLeftContainerStyle: {
      
        alignItems: "center",
        marginLeft: theme.sizes.base * 17,
        paddingRight: theme.sizes.base *5
      },
      headerRightContainerStyle: {
        alignItems: "center",
        paddingRight: theme.sizes.base
      },
      headerTintColor: '#fff',
    }
  }
);

export default createAppContainer(screens);
