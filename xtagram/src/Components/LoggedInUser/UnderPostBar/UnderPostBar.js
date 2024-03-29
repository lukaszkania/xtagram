import React, { Component } from 'react';
import './UnderPostBar.scss';
import axios from 'axios';
import { POSTS_API, USERS_API } from '../../../API_URLS';
import { connect } from 'react-redux';
import { modifyDate } from '../../../CONSTANTS';
import CommentsComponent from '../CommentsComponent/CommentsComponent';

class UnderPostBar extends Component {
    state = { 
        isPostLikedByLoggedInUser: false,
        usernamesOfUsersThatLikeThisPost: [],
        classNameOfHeartIcon: "far fa-heart",
        likesAmount: 0,
        postCreatedDate: "",
        isCommentsContainerDisplaying: false
     }

    componentDidMount(){
        axios.get(this.props.postObject.likes_number).then(response => {
            this.setState({
                likesAmount: response.data.likes_number,
                postCreatedDate: modifyDate(this.props.postObject.created_at)
            })
            response.data.list_of_users_that_like_it.map(userUrl => {
                axios.get(userUrl).then(response => {
                    console.log(userUrl)
                    this.setState({
                        usernamesOfUsersThatLikeThisPost: this.state.usernamesOfUsersThatLikeThisPost.concat([response.data.username]),
                    })
                }).catch(error => {
                    console.log(error.message)
                })
                if(userUrl === `${USERS_API}${this.props.idOfLoggedInUser}/`){
                    this.setState({
                        isPostLikedByLoggedInUser: true,
                        classNameOfHeartIcon: "far fa-heart liked"
                    })
                }
            })
        }).catch(error => {
            console.log(error.message)
        })
    }

    handleClickOnHeartIcon = event => {
        let actualLikesAmount;
        let actualListOfUsersThatLikeIt;
        let urlOfLikesNumber;
        axios.get(`${POSTS_API}${this.props.postPk}/`).then(response => {
            this.setState({

            })
            urlOfLikesNumber = response.data.likes_number
        }).catch(error => {
            console.log(error.message)
        }).finally(()=>{
            axios.get(urlOfLikesNumber).then(response => {
                actualLikesAmount = response.data.likes_number
                actualListOfUsersThatLikeIt = response.data.list_of_users_that_like_it
            }).catch(error => {
                console.log(error.message)
            }).finally(()=> {
                if(this.state.isPostLikedByLoggedInUser){
                    axios.put(urlOfLikesNumber, {
                        likes_number: actualLikesAmount -1,
                        list_of_users_that_like_it: actualListOfUsersThatLikeIt.filter(userUrl => {return userUrl !== `${USERS_API}${this.props.idOfLoggedInUser}/`})
                    })
                    this.setState({
                        classNameOfHeartIcon:"far fa-heart",
                        isPostLikedByLoggedInUser: false,
                        likesAmount: this.state.likesAmount - 1
                    })
                }else{
                    axios.put(urlOfLikesNumber, {
                        likes_number: actualLikesAmount + 1,
                        list_of_users_that_like_it: actualListOfUsersThatLikeIt.concat([`${USERS_API}${this.props.idOfLoggedInUser}/`])
                        
                    })
                    this.setState({
                        classNameOfHeartIcon:"far fa-heart liked",
                        isPostLikedByLoggedInUser: true,
                        likesAmount: this.state.likesAmount + 1
                    })}
            })
        })
    }

    handlClickOnShowOrHideAllComments = event => {
        this.setState({
            isCommentsContainerDisplaying: !this.state.isCommentsContainerDisplaying
        })
    }

    render() { 
        return ( 
            <div className="d-flex flex-column justify-content-around">
            <div className="under-post-bar-container d-flex d-flex align-items-center">
                {this.state.test}
                {this.state.isPostLikedByLoggedInUser ? 
                    (
                    <i onClick={this.handleClickOnHeartIcon} className={this.state.classNameOfHeartIcon}></i>
                    )
                    :
                    (
                        <i onClick={this.handleClickOnHeartIcon} className={this.state.classNameOfHeartIcon}></i>
                    )
                }
            </div>
            {this.props.postObject.description ? 
            (
                <div className="post-description">{this.props.postObject.description}</div>
            )
            :
            (
                <>
                </>
            )
            }
            <div className="likes-number-container">Liczba polubień: {this.state.likesAmount}</div>
            {this.state.isCommentsContainerDisplaying ? 
                (
                    <>
                        <div className="show-all-coments-container" onClick={this.handlClickOnShowOrHideAllComments}>Ukryj wszystkie komentarze</div>
                        <CommentsComponent postObject={this.props.postObject}/>
                    </>
                )
                :
                (            
                    <div className="show-all-coments-container" onClick={this.handlClickOnShowOrHideAllComments}>Zobacz wszystkie komentarze</div>
                )
            }
            <div className="post-date-container">Dodano {this.state.postCreatedDate}</div>
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