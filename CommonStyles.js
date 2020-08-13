import {StyleSheet} from 'react-native'

const CommonStyles = StyleSheet.create({
    container: {
      flex: 1
    },
    inner: {
      padding: 24,
      flex: 3,
      // justifyContent: "space-around"
      justifyContent: "center"
    },
    header: {
      fontSize: 36,
      marginBottom: 48
    },
    textInput: {
      height: 30,
      borderColor: "#000000",
      borderBottomWidth: 1,
      marginBottom: 16,
      marginTop: 10,
      textAlignVertical: "top",
    },
    btnContainer: {
      backgroundColor: "#219bd9",
      marginTop: 12
    },
    column :{
        flex:1,
        flexDirection: 'column'
    },
    drawerHeader: {
        height: 170,
        backgroundColor: '#219bd9',
        justifyContent: 'center',
        margin:0
    },
    drawerProfilePhoto: {
        width:100,
        height:100,
        alignSelf:'center',
        borderRadius: 50,
        backgroundColor: 'white'
    },
    loginContainer: {
      backgroundColor: "#219bd9",
      marginTop: 12
    },
  });

  export default CommonStyles;