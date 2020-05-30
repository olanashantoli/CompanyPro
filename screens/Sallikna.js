//This is an example of Tab inside Navigation Drawer in React Native//
import React, { Component } from 'react';
//import react in our code.
import {
  StyleSheet,
  Platform,
  View,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';

//Import required react-navigation component 

import {createAppContainer} from 'react-navigation';
import {createDrawerNavigator} from 'react-navigation-drawer';
import {createStackNavigator} from 'react-navigation-stack';

//Import all the screens for Drawer/ Sidebar
import Home from './Home';
import Join_our_team from './Join_our_team';
import Profile from './Profile';
import Logout from './Logout';
import Home2 from './Home2';
import OurMap from './OurMap';
import StoreLocation from './StoreLocation';//StoreLocation
//statistics  like manage vehicles
import { theme } from "../constants";

//Navigation Drawer Structure for all screen
class NavigationDrawerStructure extends Component {



  
  //Structure for the navigatin Drawer
  toggleDrawer = () => {
    //Props to open/close the drawer
    this.props.navigationProps.toggleDrawer();
  };
  render() {
    return (
      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity onPress={this.toggleDrawer.bind(this)}>
          {/*Donute Button Image */}
          <Image
            source={require('../image/drawer.png')}
            style={{ width: 25, height: 25, marginLeft: 5 }}
          />
        </TouchableOpacity>
      </View>
    );
  }
}
//call fun

//Stack Navigator for First Option of Navigation Drawer
const FirstActivity_StackNavigator = createStackNavigator({
  //All the screen from the Screen1 will be indexed here
  First: {
    screen: Home,
    navigationOptions: ({ navigation }) => ({
      title: 'Home',
    //  headerRight:<TouchableOpacity onPress={() => this.call()}></TouchableOpacity>,
      headerLeft:() => <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        height: theme.sizes.base * 5,
        backgroundColor: '#8875ba',
        shadowOpacity: 0,
        elevation: 0,
      },
      headerTintColor: '#fff',
    }),
  },
});

//Stack Navigator for Second Option of Navigation Drawer
 const Screen2_StackNavigator = createStackNavigator({
  //All the screen from the Screen2 will be indexed here
  Second: {
    screen: Home2,
    navigationOptions: ({ navigation }) => ({
      title: 'New Requests',
      headerLeft:  () => <NavigationDrawerStructure navigationProps={navigation} />,

      headerStyle: {
        height: theme.sizes.base * 5,
        backgroundColor: '#8875ba',
      },
      
      headerTintColor: '#fff',
    }),
  },
});
 
//Stack Navigator for Third Option of Navigation Drawer
 const Screen3_StackNavigator = createStackNavigator({
  //All the screen from the Screen3 will be indexed here
  Third: {
    screen: OurMap,
    navigationOptions: ({ navigation }) => ({
      title: 'Map',
      headerLeft: () => <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        height: theme.sizes.base * 5,
        backgroundColor: '#8875ba',
      },
      headerTintColor: '#fff',
    }),
  },
});
 
const Screen4_StackNavigator = createStackNavigator({
  //All the screen from the Screen3 will be indexed here
  Fourth: {
    screen: Profile,
    navigationOptions: ({ navigation }) => ({
      title: 'Change Password ',
      headerLeft: () => <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        height: theme.sizes.base * 5,
        backgroundColor: '#8875ba',
      },
      headerTintColor: '#fff',
    }),
  },
});
const Screen5_StackNavigator = createStackNavigator({
  //All the screen from the Screen3 will be indexed here
  Fiveth: {
    screen: Join_our_team,
    navigationOptions: ({ navigation }) => ({
      title: 'Join our team',
      headerLeft: () => <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        height: theme.sizes.base * 5,
        backgroundColor: '#8875ba',
      },
      headerTintColor: '#fff',
    }),
  },
});

const Screen6_StackNavigator = createStackNavigator({
  //All the screen from the Screen3 will be indexed here
  Fiveth: {
    screen: StoreLocation,
    navigationOptions: ({ navigation }) => ({
      title: 'Store Company Location',
      headerLeft: () => <NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        height: theme.sizes.base * 5,
        backgroundColor: '#8875ba',
      },
      headerTintColor: '#fff',
    }),
  },
});

 const Screen7_StackNavigator = createStackNavigator({
  //All the screen from the Screen3 will be indexed here
  Sixth: {
    screen: Logout,
    navigationOptions: ({ navigation }) => ({
      title: 'Logout',
      headerLeft:  () =><NavigationDrawerStructure navigationProps={navigation} />,
      headerStyle: {
        height: theme.sizes.base * 5,
        backgroundColor: '#8875ba',
      },
      headerTintColor: '#fff',
    }),
  },
}); 
 
//Drawer Navigator for the Navigation Drawer / Sidebar
const DrawerNavigatorExample = createDrawerNavigator({
  //Drawer Optons and indexing
  Home: {
    //Title
    screen: FirstActivity_StackNavigator,
    navigationOptions: {
      drawerLabel: 'Home',
      
    },
  },

  Home2: {
    //Title
    screen: Screen2_StackNavigator,
    navigationOptions: {
      drawerLabel: 'New Requests',
    },
  }, 
  
  OurMap: {
    //Title
    screen: Screen3_StackNavigator,
    navigationOptions: {
      drawerLabel: 'Map',
    },
  }, 
  Profile: {
    //Title
    screen: Screen4_StackNavigator,
    navigationOptions: {
      drawerLabel: 'Change Password',
    },
  },
  Join_our_team: {
    //Title
    screen: Screen5_StackNavigator,
    navigationOptions: {
      drawerLabel: 'Join our team',
    },
  },
  StoreLocation: {
    //Title
    screen: Screen6_StackNavigator,
    navigationOptions: {
      drawerLabel: 'Store Company Location',
    },
  },
  Logout: {
    //Title
    screen: Screen7_StackNavigator,
    navigationOptions: {
      drawerLabel: 'Logout',
    },
  },

});
export default createAppContainer(DrawerNavigatorExample);
