import React from 'react';
import { StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import { Actions } from 'react-native-router-flux';

const RouterMenu = () => {

    const goToReadComment = () => {
        Actions.readComment();
    };

    const goToCreateComment = () => {
        Actions.createComment();
    };

    const goToUpdateComment = () => {
        Actions.updateComment();
    };

    const goToDeleteComment = () => {
        Actions.deleteComment();
    };

    return (
        <View style={routerStyle.container}>
            <TouchableOpacity style={routerStyle.button} onPress={goToCreateComment}>
                <Text style={routerStyle.text}>Create Comment</Text>
            </TouchableOpacity>

            <TouchableOpacity style={routerStyle.button} onPress={goToReadComment}>
                <Text style={routerStyle.text}>Read Comment</Text>
            </TouchableOpacity>

            <TouchableOpacity style={routerStyle.button} onPress={goToUpdateComment}>
                <Text style={routerStyle.text}>Update Comment</Text>
            </TouchableOpacity>

            <TouchableOpacity style={routerStyle.button} onPress={goToDeleteComment}>
                <Text style={routerStyle.text}>Delete Comment</Text>
            </TouchableOpacity>
        </View>
    );
};

const routerStyle = StyleSheet.create({
    container: {
        width: '100%',
        height: '10%',
        flexDirection: 'row'
    },
    button: {
        width: '25%',
        height: 50
    },
    text: {
        height: '70%',
        fontWeight: 'bold',
        fontSize: 13,
        margin: 0.5,
        textAlign: 'center',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 5,
        color: 'purple',
        backgroundColor: 'white'
    }
});

export default RouterMenu;