import React, { Component } from 'react';
import './PostImage.scss';

class PostImage extends Component {
    state = {  }

    componentDidMount(){
    }

    render() { 
        return (
            <div>
                <img className="post-image" src={this.props.postImageSrc} alt="Content" />
            </div>
         );
    }
}
 
export default PostImage;