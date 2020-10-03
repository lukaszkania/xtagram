import React, { Component } from 'react';
import Post from '../Post/Post';
import { connect } from 'react-redux';
import './PostsList.scss';

class PostsList extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="posts-list-container container-fluid d-flex flex-column justify-content-center align-items-center">
                {this.props.postsObjectsToDisplay.map(postObject => {
                    return <Post key={postObject.pk} postObject={postObject} />
                })}
            </div>
         );
    }
}
 
const mapStateToProps = state => {
    return {
        ...state
    }
}

export default connect(mapStateToProps)(PostsList);