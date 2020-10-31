import React, { Component } from 'react';
import './PostInGalleryOfUserPosts.scss';

class PostInGalleryOfUserPosts extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="post-in-gallery-of-posts-container">
                <img className="img-of-post-in-gallery-of-posts-container" src={this.props.postObject.image} alt="Post content" />
            </div>
         );
    }
}
 
export default PostInGalleryOfUserPosts;