
import React from 'react';
import { View,
         Text,
        StatusBar, 
        Image, 
        Linking} from 'react-native';
import {NavigationContainer} from '@react-navigation/native'
import {createDrawerNavigator,
        DrawerContentScrollView,
        DrawerItem,
        DrawerItemList
} from '@react-navigation/drawer'

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons'
import Search from './src/screen/search'
import Profile from './src/screen/profile'
import Fav from './src/screen/fav'
import CommonStyles from './CommonStyles'
import Login from './src/screen/login';

GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const DrawerNav = (props) => {
    return(
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
          <Drawer.Screen name="TabNav" component={TabNav} options={{title: 'Home'}} />
          <Drawer.Screen name="Profile" component={Profile} options={{title: 'Profile'}} />
      </Drawer.Navigator>
    );
}
const TabNav = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = 'log-react';
          if (route.name === 'Fav') {
              iconName = focused ? 'ios-heart': 'ios-heart-empty';
          }else if (route.name === 'Search'){
              iconName = 'ios-search';
          }
          // // or return a component
          return <Icon name={iconName} size={size} color ={color} />
        }
      })}
      tabBarOptions={{
        activeTintColor: 'white',
        inactiveTintColor: 'gray',
        activeBackgroundColor: '#219bd9',
        inactiveBackgroundColor: '#d6f9ff',
        safeAreaInsets: {bottom:0},
        style: {height: 70},
        tabStyle: {paddingBottom: 15}
      }}
    >
      <Tab.Screen name="Fav" component={Fav} />
      <Tab.Screen name="Search" component={Search} />
    </Tab.Navigator>
  )
}

const CustomDrawerContent = (props) => {
    return(
      <>
        <View style={CommonStyles.drawerHeader} >
          <Image source={require('./assets/dog.png')} style={CommonStyles.drawerProfilePhoto}/>
        </View>
        <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        <DrawerItem
          label="LoginOut"
          onPress={() =>{}}
        />
        <DrawerItem
          label="Help"
          onPress={() => Linking.openURL('https://www.baidu.com')}
        />
      </DrawerContentScrollView>
    </>
    );
}


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isLoginSuccess: false
    }
  }

  handleChangeLoginState(state) {
    this.setState({
      isLoginSuccess: state
    })
  }

  render() {
    let {isLoginSuccess} = this.state;
    return (
      <NavigationContainer>
        <StatusBar barStyle="default" backgroundColor="#219bd9" />
        {isLoginSuccess ?
          <DrawerNav />:
        <Login 
          isLogin={this.handleChangeLoginState.bind(this)}
        />}
        
      </NavigationContainer>
    )
  }
}




export default App;