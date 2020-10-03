import React, { Component } from 'react';
import './UnderPostBar.scss';
import axios from 'axios';
import { POSTS_API } from '../../../API_URLS';

class UnderPostBar extends Component {
    state = { 
     }

    handleClickOnHeartIcon = event => {
        console.log(this.props)
        axios.get(`${POSTS_API}${this.props.postPk}/`).then(response => {
            console.log(response.data)
        }).catch(error => {
            console.log(error.message)
        })

        axios.put(`${POSTS_API}${this.props.postPk}/`, {
            "pk": 1,
            "description": "1",
            "image": "http://127.0.0.1:8000/media/None/1_BpoA2Pm.png",
            "likes_number": 0,
            "created_at": "2020-09-23T08:13:34.428208Z",
            "updated_at": "2020-09-23T08:13:34.428208Z",
            "post_author": "http://127.0.0.1:8000/upload/users/1/",
            "list_of_users_that_like_it": []
        }
        ).then(response => {
        }).catch(error => {
            console.log(error.message)
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
 
export default UnderPostBar;