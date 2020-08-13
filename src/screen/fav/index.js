import React from 'react'
import {  View, KeyboardAvoidingView, TextInput,
    Platform, TouchableWithoutFeedback, Button, Keyboard,
    ActivityIndicator,
    } from 'react-native';
import CommonStyles from '../../../CommonStyles'
import FavDetail from '../favdetail'
import {createStackNavigator} from '@react-navigation/stack'
import {useIsFocused} from '@react-navigation/native'

class Fav extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          requestId: "E013807-16",
          nodeId:  "SWGFR-FR-05-SEC-424",
          lineItemId: "a8419000000D6pZAAS",
          loaded:false,
          loading: false
        }
    }
 
    render() {
      return (
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={CommonStyles.container}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={CommonStyles.inner}>
            <TextInput placeholder="Request Id" style={CommonStyles.textInput} 
              onChangeText={(username)=>this.setState({username})}
              value={this.state.requestId}
              />
            <TextInput 
              style={CommonStyles.textInput} 
              placeholder="Node Id"
              onChangeText={()=>{}}
              value={this.state.nodeId}
              />
            <TextInput 
              style={CommonStyles.textInput} 
              placeholder="Line Item Id"
              onChagngeText={()=>{}}
              value={this.state.lineItemId}
              />
              {this.state.loading? 
                    <>
                        <ActivityIndicator size="large" color={"#219bd9"}/>
                    </>:
                <View style={CommonStyles.btnContainer}>
                <Button title="Submit" onPress={() => this.props.navigation.navigate('FavDetail', {
                  requestId: this.state.requestId,
                  nodeId: this.state.nodeId,
                  lineItemId: this.state.lineItemId
                })} 
                  color="white"
                />
              </View>
                }
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView> 
      )
    }
}
const Stack = createStackNavigator();

export default function(props) {
  const  isFocused = useIsFocused();
  return (
    <Stack.Navigator
      initialRouteName="Fav"
      headerModel="none"
    >
      <Stack.Screen name="Fav" options={{title: "Match Datas"}} >
        {props=><Fav {...props} isFocused = {isFocused}/>}
      </Stack.Screen>
      <Stack.Screen name="FavDetail" options={{titl:"Fav Detail"}}>
          {props=><FavDetail {...props} />}
      </Stack.Screen>
    </Stack.Navigator>

  );
}