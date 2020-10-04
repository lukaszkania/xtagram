import React, { Component } from 'react';
import './UnderPostBar.scss';
import axios from 'axios';
import { POSTS_API, USERS_API } from '../../../API_URLS';
import { connect } from 'react-redux';

class UnderPostBar extends Component {
    state = { 
        isPostLikedByLoggedInUser: false,
     }

    componentDidMount(){
        
    }

    handleClickOnHeartIcon = event => {
        event.preventDefault();
        let actualLikesAmount;
        let actualListOfUsersThatLikeIt;
        axios.get(this.props.postObject.likes_number).then(response => {
            actualLikesAmount = response.data.likes_number
            actualListOfUsersThatLikeIt = response.data.list_of_users_that_like_it
        }).catch(error => {
            console.log(error.message)
        }).finally(() => {
            axios.put(this.props.postObject.likes_number, {
                likes_number: actualLikesAmount + 1, 
                list_of_users_that_like_it: actualListOfUsersThatLikeIt.concat([`${USERS_API}${this.props.idOfLoggedInUser}/`])
            }).catch(error => {
                console.log(error.message)
            })
        })
    }

    render() { 
        return ( 
            <div>
            <div className="under-post-bar-container d-flex d-flex align-items-center">
                <i onClick={this.handleClickOnHeartIcon} className="far fa-heart">{this.props.postLikesNumber}</i>
                <i className="far fa-comment"></i>
            </div>
        </div>
         );
    }
}
 
const mapStateToProps = state => {
    return {
        ...state
    }
}

export default connect(mapStateToProps)(UnderPostBar);