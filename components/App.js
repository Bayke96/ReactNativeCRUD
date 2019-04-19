import React from 'react';
import { Router, Scene } from 'react-native-router-flux';
import ReadComment from './ReadComment';
import CreateComment from './CreateComment';
import UpdateComment from './UpdateComment';
import DeleteComment from './DeleteComment';

const App = () => {
    return (
        <Router>
            <Scene key="root">
                <Scene key="readComment" component={ReadComment} title="Read Comment" initial={true} />
                <Scene key="createComment" component={CreateComment} title="Create Comment" />
                <Scene key="updateComment" component={UpdateComment} title="Update Comment" />
                <Scene key="deleteComment" component={DeleteComment} title="Delete Comment" />
                </Scene>
            </Router>
    );
};

export default App;