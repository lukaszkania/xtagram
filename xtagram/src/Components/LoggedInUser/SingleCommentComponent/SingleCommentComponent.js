import React, { Component } from 'react';
import axios from 'axios';
import { modifyDate } from '../../../CONSTANTS';
import './SingleCommentComponent.scss';

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
            <div className="single-comment-container d-flex flex-column">
                <h3>{this.state.commentAuthor}</h3>
                <p>{this.state.commentContent}</p>
                <p>{this.state.commentAddedDate}</p>
            </div>
         );
    }
}
 
export default SingleCommentComponent;