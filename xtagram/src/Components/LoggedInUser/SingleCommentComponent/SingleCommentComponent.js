import Axios from 'axios';
import React, { Component } from 'react';
import axios from 'axios';
import { modifyDate } from '../../../CONSTANTS';

class SingleCommentComponent extends Component {
    state = { 
        commentAuthor: "",
        commentContent: "",
        commentAddedDate: ""
     }

    componentDidMount(){
        axios.get(this.props.commentObject.comment_author).then(response => {
            this.setState({
                commentAuthor: response.data.username,
                commentContent: this.props.commentObject.content,
                commentAddedDate: modifyDate(this.props.commentObject.created_at)
            })
        }).catch(error => {
            console.log(error.message)
        })
    }

    render() { 
        return ( 
            <div className="single-comment-container">
                {this.state.commentAuthor}
                {this.state.commentContent}
                {this.state.commentAddedDate}
            </div>
         );
    }
}
 
export default SingleCommentComponent;