import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar';
import { connect } from 'react-redux';
import axios from 'axios';
import { POSTS_API } from '../../../API_URLS';
import { SET_ARRAY_OF_POSTS_TO_DISPLAY } from '../../../actions';
import PostsList from '../PostsList/PostsList';


class LoggedInHomePage extends Component {
    state = {  }

    componentDidMount(){
        axios.get(POSTS_API).then(postsResponse => {
            this.props.usersFollowedByLoggedInUserApisUrls.map(userFollowedByLoggedInUserApi => {
            this.props.dispatch({type: SET_ARRAY_OF_POSTS_TO_DISPLAY, postsObjectsToDisplay:postsResponse.data.filter(postObject => {return postObject.post_author === userFollowedByLoggedInUserApi})})
        })
        }).catch(error => {
            console.log(error.message)
        })
    }

    render() { 
        return ( 
            <div className="container-fluid d-flex-column justify-content-center" style={{padding:0}}>
                <NavBar />
                <PostsList />
            </div>
         );
    }
}
 
const mapStateToProps = state => {
    return {
        ...state
    }
}

export default connect(mapStateToProps)(LoggedInHomePage);