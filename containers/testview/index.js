import React, {Component} from 'react'
import {
    AppRegistry,
    StyleSheet,
    TouchableOpacity,
    Text,
    View
} from 'react-native';

var Temp = React.createClass( {
    render() {
        return (
            <View style={styles.container}>
                <TouchableOpacity
                        onPress={() => {this.props.navigator.pop()}}
                    >
                        <Text>临时页面</Text>
                </TouchableOpacity>
            </View>
        );
    }
});

var styles = StyleSheet.create({
    container: {
        backgroundColor:'yellow',
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
});

module.exports = Temp;