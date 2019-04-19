import React, { Component } from 'react';
import { Alert, TouchableHighlight, Picker, StyleSheet, Text, TextInput, View } from 'react-native';
import RouterMenu from './RouterMenu';
import axios from 'axios';

class CreateComment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            postIDList: [],
            emailList: [],
            comment: {
                postID: 0,
                title: '',
                email: '',
                body: ''
            }
        };

    }

    componentDidMount() {

        axios.get('https://jsonplaceholder.typicode.com/comments/', {
            responseType: 'json'
        }).then(response => {
            var dataArray = response.data;
            var postIDList = [];
            var emailList = [];
            for (var i = 0; i < dataArray.length; i++) {
                postIDList.push(dataArray[i].postId);
                emailList.push(dataArray[i].email);
            }
            var uniqueIDList = postIDList.filter(this.onlyUnique); 
            var uniqueEmailList = emailList.filter(this.onlyUnique);
            this.setState({ postIDList: [...this.state.postIDList, ...uniqueIDList] }); 
            this.setState({ emailList: [...this.state.emailList, ...uniqueEmailList] });
        });

    }

    onlyUnique = (value, index, self) => {
        return self.indexOf(value) === index;
    }

    updatePostID = (id) => {

        this.setState({
            comment: {
                ...this.state.comment,
                postID: parseInt(id.toString())
            }
        });

    }

    updateTitle = (text) => {

        this.setState({
            comment: {
                ...this.state.comment,
                title: text
            }
        });

    }

    updateEmail = (email) => {

        this.setState({
            comment: {
                ...this.state.comment,
                email: email
            }
        });

    }

    updateBody = (text) => {

        this.setState({
            comment: {
                ...this.state.comment,
                body: text
            }
        });

    }

    submitComment = () => {

        if (this.state.comment.postID <= 0 || this.state.comment.postID === '') {
            Alert.alert('Validation Error', 'You must choose a Post ID');
            return false;
        }

        if (this.state.comment.title.trim() === '' || this.state.comment.title.toUpperCase() === 'Choose') {
            Alert.alert('Validation Error', 'You must type a title for the comment');
            return false;
        }

        if (this.state.comment.title.trim().length < 4) {
            Alert.alert('Validation Error', 'You must type at least 4 characters for the title');
            return false;
        }

        if (this.state.comment.email.trim() === '' || this.state.comment.email.toUpperCase() === 'Choose') {
            Alert.alert('Validation Error', 'You must choose an email for the comment');
            return false;
        }

        if (this.state.comment.body.trim() === '') {
            Alert.alert('Validation Error', "The comment's body cannot be empty");
            return false;
        }
        if (this.state.comment.body.trim().length < 4) {
            Alert.alert('Validation Error', "The comment's body must contain at least 4 characters.");
            return false;
        }

        fetch('https://jsonplaceholder.typicode.com/comments', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                postId: this.state.comment.postID,
                name: this.state.comment.title,
                email: this.state.comment.email,
                body: this.state.comment.body
            })
        })
            .then(res => res.text()) // OR res.json()
            .then(res =>
                Alert.alert('Message', 'Comment added succesfully'),
                this.resetForm()
            );

    }

    resetForm = () => {

        this.setState({
            comment: {
                postID: 0,
                title: '',
                email: '',
                body: ''
            }
        });

    }

    render() {

        return (
            <View style={styles.container}>
                <RouterMenu />

                <Text style={styles.headerTitle}>Create a new comment</Text>

                <View style={styles.formContainer} >

                    <Text style={styles.formTitle}>Post ID</Text>
                    <Picker style={styles.formPicker} selectedValue={this.state.comment.postID} onValueChange={this.updatePostID} >
                        <Picker.Item label="Choose" value={0} />

                        {this.state.postIDList.map((item, key) =>
                            <Picker.Item label={item.toString()} value={item} key={key} onValueChange={this.updatePostID} />
                        )}

                    </Picker>

                    <Text style={styles.formTitle}>Title</Text>
                    <TextInput style={styles.textfield} value={this.state.comment.title} onChangeText={this.updateTitle} />

                    <Text style={styles.formTitle}>Email</Text>
                    <Picker style={styles.emailPicker} selectedValue={this.state.comment.email} onValueChange={this.updateEmail} >
                        <Picker.Item label="Choose" value="" />

                        {this.state.emailList.map((item, key) =>
                            <Picker.Item label={item.toString()} value={item} key={key} onValueChange={this.updateEmail} />
                        )}

                    </Picker>

                    <Text style={styles.formTitle}>Comment</Text>
                    <TextInput style={styles.textarea} multiline={true} numberOfLines={4} value={this.state.comment.body}
                        onChangeText={this.updateBody} />

                </View>

                <View style={styles.buttonContainer} >

                    <TouchableHighlight onPress={this.submitComment}>
                        <Text style={styles.formButton} > Create</Text>
                    </TouchableHighlight>

                    <TouchableHighlight onPress={this.resetForm} >
                        <Text style={styles.formButton}>Reset</Text>
                    </TouchableHighlight>

                </View>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#333399',
        width: '100%',
        height: '100%'
    },
    headerTitle: {
        marginTop: 10,
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20
    },
    formContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    formTitle: {
        marginTop: 20,
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15
    },
    formPicker: {
        marginTop: 10,
        height: '8%',
        width: '40%',
        color: 'white'
    },
    emailPicker: {
        marginTop: 10,
        height: '8%',
        width: '60%',
        color: 'white'
    },
    textfield: {
        marginTop: 10,
        padding: 0,
        width: '40%',
        color: 'white',
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderColor: 'white',
        borderBottomWidth: 2,
        textAlign: 'center'
    },
    textarea: {
        marginTop: 15,
        padding: 0,
        backgroundColor: 'white',
        width: '60%',
        color: 'black',
        textAlignVertical: 'top'
    },
    buttonContainer: {
        justifyContent: 'center',
        flexDirection: 'row',
        width: '100%',
        height: '10%'
    },
    formButton: {
        paddingTop: 3,
        height: '50%',
        width: 70,
        fontWeight: 'bold',
        fontSize: 13,
        margin: 5,
        textAlign: 'center',
        borderStyle: 'solid',
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: 5,
        color: '#333399',
        backgroundColor: 'white'
    }
});

export default CreateComment;