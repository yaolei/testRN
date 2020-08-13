import React from 'react'
// import BaseNetwork from '../../../until/axios';
// import {URL} from '../../lib/URL'
import {  View, KeyboardAvoidingView, TextInput, Text,
    Platform, TouchableWithoutFeedback, Button, Keyboard, TouchableOpacity,
    ActivityIndicator,
    SafeAreaView
    } from 'react-native';
import CommonStyles from '../../../CommonStyles'
import FavDetail from '../favdetail'

GLOBAL.XMLHttpRequest = GLOBAL.originalXMLHttpRequest || GLOBAL.XMLHttpRequest
class Login extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
          username: "admin",
          password: "123456",
          loading:false,
          loaded:false,
          isLogin: false
        }
    }
    componentDidMount() {

    }
    componentWillUpdate(prevProps) {
      
    }
    handledCheckLogin = () => {
      this.setState({
          loading: true
      }, ()=> {
          setTimeout(()=>{
            this.props.isLogin(true)
          }, 3000)
      })
    }
    render() {
      return (
      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : "height"}
        style={CommonStyles.container}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={CommonStyles.inner}>
            <Text style={CommonStyles.header}>Opp Tool</Text>
            <TextInput placeholder="Username" style={CommonStyles.textInput} 
              onChangeText={(username)=>this.setState({username})}
              value={this.state.username}
              />

            <TextInput 
              placeholder="Password" 
              style={CommonStyles.textInput} 
              secureTextEntry={true}
              onChangeText={(password)=>this.setState({password})}
              value={this.state.password}
              />
              
                {this.state.loading? 
                    <>
                        <ActivityIndicator size="large" color={"#219bd9"}/>
                    </>:
                    <View style={CommonStyles.loginContainer}>
                        <Button title="Login" onPress={this.handledCheckLogin.bind(this)} 
                        color = "white"
                        />
                    </View>
                }
            
          </View>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView> 
      )
    }
}

export default Login