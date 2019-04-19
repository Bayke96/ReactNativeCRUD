import React, { Component } from 'react';
import { Alert, TouchableHighlight, Picker, StyleSheet, Text, TextInput, View } from 'react-native';
import RouterMenu from './RouterMenu';
import axios from 'axios';

class DeleteComment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            commentIDList: [],
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
            for (var i = 0; i < dataArray.length; i++) {
                commentIDList.push(dataArray[i].id);
            }
            var uniqueCommentID = commentIDList.filter(this.onlyUnique);
            this.setState({ commentIDList: [...this.state.commentIDList, ...uniqueCommentID] });
        });

    }

    onlyUnique = (value, index, self) => {
        return self.indexOf(value) === index;
    }

    loadComment = (id) => {

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
                        postID: parseInt(JSON.stringify(response.data.postId)),
                        title: JSON.stringify(response.data.name),
                        email: JSON.stringify(response.data.email),
                        body: JSON.stringify(response.data.body)
                    }
                });
            });

        } else {
            this.resetForm();
        }

    }

    deleteComment = () => {

        var number = parseInt(this.state.comment.ID.toString());

        if (number === 0) {
            Alert.alert('Validation Error', 'You must choose a comment ID');
            return false;
        }

        fetch('https://jsonplaceholder.typicode.com/comments', {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: number })
        })
            .then(res => res.text()) // OR res.json()
            .then(res =>
                Alert.alert('Message', 'Comment deleted successfully'),
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
                <RouterMenu />

                <Text style={styles.headerTitle}>Deleting an existing comment</Text>

                <View style={styles.formContainer} >

                    <Text style={styles.formTitle}>Comment ID</Text>
                    <Picker style={styles.formPicker} selectedValue={this.state.comment.ID} onValueChange={this.loadComment} >
                        <Picker.Item label="Choose" value={0} />

                        {this.state.commentIDList.map((item, key) =>
                            <Picker.Item label={item.toString()} value={item} key={key} onValueChange={this.loadComment} />
                        )}

                    </Picker>

                    <Text style={styles.formTitle}>Post ID</Text>
                    <Text style={styles.formParagraph}>
                        {this.state.comment.postID === 0 ? '' : this.state.comment.postID}
                    </Text>


                    <Text style={styles.formTitle}>Title</Text>
                    <Text style={styles.formParagraph}>
                        {this.state.comment.title}
                    </Text>

                    <Text style={styles.formTitle}>Email</Text>
                    <Text style={styles.formParagraph}>
                        {this.state.comment.email}
                    </Text>

                    <Text style={styles.formTitle}>Comment</Text>
                    <Text style={styles.formTextArea}>
                        {this.state.comment.body}
                    </Text>

                </View>

                <View style={styles.buttonContainer} >

                    <TouchableHighlight onPress={this.deleteComment}>
                        <Text style={styles.formButton} >Delete</Text>
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
    formParagraph: {
        color: '#00BFFF',
        fontWeight: 'bold',
        fontSize: 13,
        marginTop: 5,
        textAlign: 'center'
    },
    formTextArea: {
        color: '#00BFFF',
        fontWeight: 'bold',
        fontSize: 13,
        marginTop: 5,
        textAlign: 'center',
        paddingLeft: 5,
        paddingRight: 5,
        height: 50
    },
    formPicker: {
        marginTop: 10,
        height: '8%',
        width: '40%',
        color: 'white'
    },
    buttonContainer: {
        justifyContent: 'center',
        flexDirection: 'row',
        width: '100%',
        height: 50,
        marginTop: 10
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

export default DeleteComment;