import React, { Component } from 'react';
import NavBar from '../NavBar/NavBar';
import { connect } from 'react-redux';
import axios from 'axios';
import { POSTS_API, USERS_API } from '../../../API_URLS';
import { SET_ARRAY_OF_POSTS_TO_DISPLAY } from '../../../actions';
import PostsList from '../PostsList/PostsList';


class LoggedInHomePage extends Component {
    state={
        users_followed: [], 
        list_of_users_that_are_followed_by: [],
        postsObjectsToDisplay: []
    }

    componentDidMount(){
        axios.get(`${USERS_API}${this.props.idOfLoggedInUser}/`).then(response => {
            this.setState({
                users_followed: response.data.users_followed
            })
        }).catch(error => {
            console.log(error.message)
        }).finally(() => {
            this.state.users_followed.map(userApiUrl => {
                axios.get(userApiUrl).then(response => {
                    this.setState({
                        list_of_users_that_are_followed_by: response.data.list_of_users_that_are_followed_by
                    })
                }).catch(error => {
                    console.log(error.message)
                }).finally(() => {
                    this.state.list_of_users_that_are_followed_by.map(followedUserApi => {
                        axios.get(followedUserApi).then(response => {
                            let userFollowedPk = response.data.pk;
                            axios.get(POSTS_API).then(response => {
                                this.setState({
                                    postsObjectsToDisplay: this.state.postsObjectsToDisplay.concat(response.data.filter(postObject => {return postObject.post_author === `${USERS_API}${userFollowedPk}/`}))
                                })
                                this.props.dispatch({type: SET_ARRAY_OF_POSTS_TO_DISPLAY, postsObjectsToDisplay: this.state.postsObjectsToDisplay})
                             }).catch(error => 
                                {
                                    console.log(error.message)})
                        }).catch(error => {
                            console.log(error.message)
                        })
                    })
                })
            })
        })
    }

    render() { 
        return ( 
            <div className="container-fluid d-flex-column justify-content-center" style={{padding:0}}>
                <NavBar />
                <PostsList postsObjectsToDisplay={this.state.postsObjectsToDisplay} />
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