import React, { Component } from 'react';
import { Alert, TextInput, ScrollView, StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import RouterMenu from './RouterMenu';
import axios from 'axios';

class ReadComment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            search: '',
            searchID: 0,
            comment: {
                id: 0,
                postID: 0,
                name: '',
                email: '',
                body: ''
            }
        };

    }

    searchComment = (id) => {

        if (id === '') {
            this.resetSearch();
        }
        if (id <= 0 || id > 500) {
            return false;
        }
        if (isNaN(id) === false && id !== '' || isNaN(id) === false && id !== null) {

            axios.get('https://jsonplaceholder.typicode.com/comments/' + id, {
                responseType: 'json'
            }).then(response => {
                this.setState({
                    search: id,
                    searchID: parseInt(id),
                    comment: {
                        id: parseInt(id),
                        postID: parseInt(JSON.stringify(response.data.postId)),
                        name: JSON.stringify(response.data.name),
                        email: JSON.stringify(response.data.email),
                        body: JSON.stringify(response.data.body)
                    }
                });
            });

        } else {
            this.resetSearch();
        }
    }

    resetSearch = () => {
        this.setState({
            search: '',
            searchID: 0,
            comment: {
                id: 0,
                postID: 0,
                name: '',
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

                    <Text style={styles.headerTitle}>Find Comment</Text>

                    <View style={styles.inputContainer}>
                        <Text style={styles.searchTitle} >Comment ID</Text>
                        <TextInput style={styles.textInput} onChangeText={this.searchComment} value={this.state.search} />
                        <TouchableHighlight onPress={this.resetSearch} >
                            <Text style={styles.button} >RESET</Text>
                        </TouchableHighlight>
                    </View>

                    <View style={styles.commentContainer}>
                        <Text style={styles.commentHeader} >ID</Text>
                        <Text style={styles.commentText}>
                            {this.state.comment.id === 0 || isNaN(this.state.comment.id) === true ? '' : this.state.comment.id}
                        </Text>

                        <Text style={styles.commentHeader} >Post ID</Text>
                        <Text style={styles.commentText}>
                            {this.state.comment.postID === 0 || isNaN(this.state.comment.postID) === true ? '' : this.state.comment.postID}
                        </Text>

                        <Text style={styles.commentHeader} >Name</Text>
                        <Text style={styles.commentText} >
                            {this.state.comment.name}
                        </Text>

                        <Text style={styles.commentHeader} >Email</Text>
                        <Text style={styles.commentText}>
                            {this.state.comment.email}
                        </Text>

                        <Text style={styles.commentHeader} >Body</Text>
                        <Text style={styles.commentBody}>
                            {this.state.comment.body}
                        </Text>

                    </View>
                   
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#333399'
    },
    headerTitle: {
        fontWeight: 'bold',
        color: 'white',
        width: '100%',
        fontSize: 20,
        marginTop: '2%',
        textAlign: 'center'
    },
    inputContainer: {
        width: '100%',
        textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center'
    },
    searchTitle: {
        textAlign: 'center',
        color: 'white',
        width: '100%',
        marginTop: '5%'
    },
    textInput: {
        marginTop: 12,
        borderStyle: 'solid',
        borderBottomWidth: 2,
        borderBottomColor: 'white',
        width: '20%',
        textAlign: 'center',
        color: 'white',
        padding: 0,
        fontSize: 14
    },
    button: {
        backgroundColor: 'purple',
        color: 'white',
        width: 110,
        height: 10,
        borderRadius: 2,
        marginTop: '6%',
        textAlign: 'center',
        fontWeight: 'bold',
        paddingTop: 2
    },
    commentContainer: {
        padding: 10,
        marginTop: 3,
        alignItems: 'center'
    },
    commentHeader: {
        color: 'white',
        width: '100%',
        textAlign: 'center',
        fontWeight: 'bold',
        backgroundColor: 'purple',
        marginTop: 5
    },
    commentText: {
        backgroundColor: 'white',
        width: '100%',
        textAlign: 'center',
        marginBottom: 15
    },
    commentBody: {
        backgroundColor: 'white',
        width: '100%',
        textAlign: 'justify',
        marginBottom: 10
    }
});
  

export default ReadComment;