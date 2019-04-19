import React, { Component } from 'react';
import { Alert, ScrollView, TouchableHighlight, Picker, StyleSheet, Text, TextInput, View } from 'react-native';
import RouterMenu from './RouterMenu';
import axios from 'axios';

class UpdateComment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            commentIDList: [],
            postIDList: [],
            emailList: [],
            comment: {
                ID: 0,
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
            var commentIDList = [];
            var postIDList = [];
            var emailList = [];
            for (var i = 0; i < dataArray.length; i++) {
                commentIDList.push(dataArray[i].id);
                postIDList.push(dataArray[i].postId);
                emailList.push(dataArray[i].email);
            }
            var uniqueCommentIDList = commentIDList.filter(this.onlyUnique);
            var uniquePostIDList = postIDList.filter(this.onlyUnique);
            var uniqueEmailList = emailList.filter(this.onlyUnique);

            this.setState({ commentIDList: [...this.state.commentIDList, ...uniqueCommentIDList] });
            this.setState({ postIDList: [...this.state.postIDList, ...uniquePostIDList] });
            this.setState({ emailList: [...this.state.emailList, ...uniqueEmailList] });
        });

    }

    onlyUnique = (value, index, self) => {
        return self.indexOf(value) === index;
    }

    updateID = (id) => {

        this.setState({
            comment: {
                ...this.state.comment,
                ID: parseInt(id.toString())
            }
        });

        if (id === 'Choose') {
            this.resetSearch();
            return false;
        }
        if (id <= 0 || id > 500) {
            return false;
        }
        if (id !== 0 || id !== 'Choose') {

            axios.get('https://jsonplaceholder.typicode.com/comments/' + id, {
                responseType: 'json'
            }).then(response => {
                this.setState({
                    comment: {
                        ...this.state.comment,
                        postID: parseInt(response.data.postId.toString()),
                        title: response.data.name,
                        email: response.data.email,
                        body: response.data.body
                    }
                });
            });

        } else {
            this.resetForm();
        }

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

    updateForm = () => {

        if (this.state.comment.ID === 0 || this.state.comment.ID === 'Choose') {
            Alert.alert('Validation Error', 'You must choose a comment ID');
            return false;
        }

        if (this.state.comment.postID === 0 || this.state.comment.postID === 'Choose') {
            Alert.alert('Validation Error', 'You must choose a post ID');
            return false;
        }

        if (this.state.comment.title.trim() === '') {
            Alert.alert('Validation Error', 'You must type a title');
            return false;
        }

        if (this.state.comment.title.trim().length <= 3) {
            Alert.alert('Validation Error', "The title must contain at least 4 characters");
            return false;
        }

        if (this.state.comment.email === '' || this.state.comment.email === 'Choose') {
            Alert.alert('Validation Error', 'You must choose an email');
            return false;
        }

        if (this.state.comment.body.trim() === '') {
            Alert.alert('Validation Error', 'You must type a body for the comment');
            return false;
        }

        if (this.state.comment.body.trim().length <= 3) {
            Alert.alert('Validation Error', "The comment's body must contain at least 4 characters");
            return false;
        }

        fetch('https://jsonplaceholder.typicode.com/comments/2', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                id: this.state.comment.ID,
                postId: this.state.comment.postID,
                name: this.state.comment.title,
                email: this.state.comment.email,
                body: this.state.comment.body
            })
        })
            .then(res => res.text()) // OR res.json()
            .then(res =>
                Alert.alert('Message', 'Comment updated successfully'),
                this.resetForm()
            );

    }

    resetForm = () => {

        this.setState({
            comment: {
                ID: 0,
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

                <ScrollView>
                    <RouterMenu />

                    <Text style={styles.headerTitle}>Update an existing comment</Text>

                    <View style={styles.formContainer} >

                        <Text style={styles.formTitle}>Comment ID</Text>
                        <Picker style={styles.formPicker} selectedValue={this.state.comment.ID} onValueChange={this.updateID} >
                            <Picker.Item label="Choose" value={0} />

                            {this.state.commentIDList.map((item, key) =>
                                <Picker.Item label={item.toString()} value={item} key={key} onValueChange={this.updateID} />
                            )}

                        </Picker>

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
                        <Picker style={styles.formPicker} selectedValue={this.state.comment.email} onValueChange={this.updateEmail} >
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

                        <TouchableHighlight>
                            <Text style={styles.formButton} onPress={this.updateForm}>Update</Text>
                        </TouchableHighlight>

                        <TouchableHighlight onPress={this.resetForm} >
                            <Text style={styles.formButton}>Reset</Text>
                        </TouchableHighlight>

                    </View>

                </ScrollView>

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
        marginTop: 2,
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
        width: 200,
        height: 90,
        color: 'black',
        textAlignVertical: 'top'
    },
    buttonContainer: {
        justifyContent: 'center',
        flexDirection: 'row',
        width: '100%',
        height: 230
    },
    formButton: {
        paddingTop: 3,
        height: 25,
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

export default UpdateComment;