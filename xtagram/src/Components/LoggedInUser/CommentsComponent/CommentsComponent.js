import React, { Component } from 'react';
import './CommentsComponent.scss';
import axios from 'axios';
import { COMMENTS_API, POSTS_API, USERS_API } from '../../../API_URLS';
import SingleCommentComponent from '../SingleCommentComponent/SingleCommentComponent';
import { connect } from 'react-redux';

class CommentsComponent extends Component {
    state = { 
        commentsObjectsArray: [],
        newCommentContent: "",
        newUpdatedCommentsArray: []
     }

    componentDidUpdate(){
        if(this.state.commentsObjectsArray.length === this.state.newUpdatedCommentsArray.length){
            axios.get(COMMENTS_API).then(response => {
                this.setState({
                    commentsObjectsArray: response.data.filter(commentObject => {
                        return commentObject.post === `${POSTS_API}${this.props.postObject.pk}/`
                    })
                })
            }).catch(error => {
                console.log(error.message)
            })
        }
    }

    componentDidMount(){
        axios.get(COMMENTS_API).then(response => {
            this.setState({
                commentsObjectsArray: response.data.filter(commentObject => {
                    return commentObject.post === `${POSTS_API}${this.props.postObject.pk}/`
                })
            })
        }).catch(error => {
            console.log(error.message)
        })
    }

    handleInputCommentChange = event => {
        let target = event.target;
        let value = target.value;
        this.setState({
            newCommentContent: value
        })
    }

    handleButtonSubmit = event => {
        event.preventDefault();
        let newCommentObject = {};
        newCommentObject["content"] = this.state.newCommentContent;
        newCommentObject["comment_author"] = `${USERS_API}${this.props.idOfLoggedInUser}/`;
        newCommentObject["post"] = `${POSTS_API}${this.props.postObject.pk}/`;
        let newCommentObjectPk;

        axios.post(COMMENTS_API, newCommentObject).then(response => {
            newCommentObjectPk = response.data.pk
        }).catch(error => {
            console.log(error.message)
        }).finally(() => {
            newCommentObject["pk"] = newCommentObjectPk;
            let newUpdatedCommentsArray = this.state.commentsObjectsArray;
            newUpdatedCommentsArray.concat([newCommentObject]);
            this.setState({
                commentsObjectsArray: newUpdatedCommentsArray,
                newUpdatedCommentsArray: newUpdatedCommentsArray
            })
            console.log(this.state)
        })

    }

    render() { 
        return ( 
            <>
                <div className="comments-container">
                    {this.state.commentsObjectsArray.map(commentObject => {
                        return(
                            <SingleCommentComponent key={commentObject.pk} commentObject={commentObject} />
                        )
                    })}
                </div>
                <form>
                    <input type="text" placeholder="Dodaj komentarz..." name="newCommentContent" onChange={this.handleInputCommentChange}/>
                    <button type="submit" className="btn btn-info" onClick={this.handleButtonSubmit}>Dodaj</button>
                </form>
            </>
         );
    }
}
 
const mapStateToProps = state => {
    return {
        ...state
    }
}

export default connect(mapStateToProps)(CommentsComponent);