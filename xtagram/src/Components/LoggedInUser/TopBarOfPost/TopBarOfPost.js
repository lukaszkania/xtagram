import React, { Component } from 'react';
import { connect } from 'react-redux';
import './TopBarOfPost.scss';
import axios from 'axios';
import { POSTS_API, USERS_API } from '../../../API_URLS';
import { Link } from 'react-router-dom';

class TopBarOfPost extends Component {
    state = {  }

    componentDidMount(){
        console.log(this.props)
    }

    handleClickOnTrashIcon = event => {
        axios.delete(`${POSTS_API}${this.props.postPk}/`).then(response => {
        }).catch(error => {
            console.log(error.message)
        })
    }

    render() { 
        return ( 
            <div className="top-post-bar d-flex justify-content-between align-items-center">
                <Link to={`user/${this.props.postAuthorPk}`}>
                    <div className="avatar-and-author-container d-flex align-items-center">
                        <img className="top-post-bar-avatar" src={this.props.postAuthorAvatarSrc} alt="avatar" />
                        <h3>{this.props.postAuthorUsername}</h3>
                    </div>
                </Link>
                <div className="post-options-container d-flex">
                    {this.props.usernameOfLoggedInUser === this.props.postAuthorUsername ? 
                    (
                        <i onClick={this.handleClickOnTrashIcon} className="fas fa-trash"></i>
                    )
                    :
                    (<></>)
                    }
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

export default connect(mapStateToProps)(TopBarOfPost);