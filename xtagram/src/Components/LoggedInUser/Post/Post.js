import React, { Component } from 'react';
import axios from 'axios';
import { USERS_API } from '../../../API_URLS';
import { connect } from 'react-redux';
import './Post.scss';
import PostImage from '../PostImage/PostImage';
import UnderPostBar from '../UnderPostBar/UnderPostBar';
import TopBarOfPost from '../TopBarOfPost/TopBarOfPost';

class Post extends Component {
    state = {  
        postAuthorUsername: "",
        postAuthorAvatarSrc: "",
        postPk: "",
        postLikesNumber: 0,
        postAuthorPk:""
    }

    componentDidMount(){
        axios.get(this.props.postObject.post_author).then(response => {
            this.setState({
                postAuthorUsername: response.data.username,
                postAuthorPk: response.data.pk,
                postAuthorAvatarSrc: response.data.avatar,
                postPk: this.props.postObject.pk,
            })
        })
        axios.get(this.props.postObject.likes_number).then(response => {
            this.setState({
                postLikesNumber: response.data.likes_number
            })
        }).catch(error => {
            console.log(error.message)
        })
    }

    render() { 
        return ( 
            <div className="post-container d-flex flex-column">
                <TopBarOfPost postAuthorAvatarSrc={this.state.postAuthorAvatarSrc} postAuthorUsername={this.state.postAuthorUsername} postPk={this.state.postPk} postAuthorPk={this.state.postAuthorPk} />
                <PostImage postImageSrc={this.props.postObject.image} />
                <UnderPostBar postLikesNumber={this.state.postLikesNumber}  postPk={this.state.postPk} postObject={this.props.postObject} />
            </div>
         );
    }
}
 
const mapStateToProps = state => {
    return {
        ...state
    }
}

export default connect(mapStateToProps)(Post);