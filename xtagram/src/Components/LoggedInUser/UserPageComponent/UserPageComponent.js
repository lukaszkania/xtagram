import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { USERS_API, POSTS_API } from '../../../API_URLS';
import EditAvatarPhotoWidget from '../EditAvatarPhotoWidget/EditAvatarPhotoWidget';
import NavBar from '../NavBar/NavBar';
import PostInGalleryOfUserPosts from '../PostInGalleryOfUserPosts/PostInGalleryOfUserPosts';
import './UserPageComponent.scss';

class UserPageComponent extends Component {
    state = { 
        avatarSrc: "",
        username: "",
        userId: "",
        isNewAvatarPhotoWidgetDisplaying: false,
        postsOwnedByUser: [],
        usersFollowedAmount: 0
     }

    componentDidUpdate(){
        if(parseInt(this.props.match.params.user_id) != this.state.userId){
            axios.get(`${USERS_API}${this.props.match.params.user_id}/`).then(response => {
                this.setState({
                    avatarSrc: response.data.avatar,
                    username: response.data.username,
                    userId: response.data.pk,
                })
                axios.get(response.data.users_followed).then(response => {
                    this.setState({
                        usersFollowedAmount: response.data.list_of_users_that_are_followed_by.length - 1 //Minus user itself
                    })
                }).catch(error => {
                    console.log(error.message)
                })
            }).catch(error => {
                console.log(error.message)
            }).finally(() => {
                axios.get(`${POSTS_API}`).then(response => {
                    this.setState({
                        postsOwnedByUser: response.data.filter(postObject => {
                            return postObject.post_author === `${USERS_API}${this.props.match.params.user_id}/`
                        })
                    })
                }).catch(error => {
                    console.log(error.message)
                })
            })
           
        }

    }

    componentDidMount(){
        axios.get(`${USERS_API}${this.props.match.params.user_id}/`).then(response => {
            this.setState({
                avatarSrc: response.data.avatar,
                username: response.data.username,
                userId: response.data.pk,
            })
            axios.get(response.data.users_followed).then(response => {
                this.setState({
                    usersFollowedAmount: response.data.list_of_users_that_are_followed_by.length - 1 //Minus user itself
                })
            }).catch(error => {
                console.log(error.message)
            })
        }).catch(error => {
            console.log(error.message)
        }).finally(() => {
            axios.get(`${POSTS_API}`).then(response => {
                this.setState({
                    postsOwnedByUser: response.data.filter(postObject => {
                        return postObject.post_author === `${USERS_API}${this.props.match.params.user_id}/`
                    })
                })
            }).catch(error => {
                console.log(error.message)
            })
        })
       
    }

    handleEditPhotoButtonClick = event => {
        this.setState({
            isNewAvatarPhotoWidgetDisplaying: !this.state.isNewAvatarPhotoWidgetDisplaying
        })
    }

    handleContainerClick = event => {
        this.setState({
            isNewAvatarPhotoWidgetDisplaying: false
        })
    }

    render() { 
        return (
            <>
                <NavBar /> 
                <div className="user-page-container d-flex flex-column justify-content-center" >
                    <div className="d-flex justify-content-center align-items-center">
                        <div className="avatar-container">
                            <img className="avatar-image" src={this.state.avatarSrc} alt="Avatar"/>
                        </div>
                        <div>
                            <div className="">
                                <h1>{this.state.username}</h1>
                                {this.props.idOfLoggedInUser === parseInt(this.props.match.params.user_id) ? 
                                    (  
                                        <>
                                            <button className="edit-avatar-photo-button btn btn-info" onClick={this.handleEditPhotoButtonClick}>Edytuj zdjęcie</button>
                                            {this.state.isNewAvatarPhotoWidgetDisplaying ? 
                                                (
                                                    <>
                                                        <EditAvatarPhotoWidget />
                                                    </>
                                                )
                                                :
                                                (<></>)
                                            }
                                        </>
                                    )
                                    :
                                    (<></>)
                                }
                            </div>
                            <div className="statistic-container">
                                <div>Posty: {this.state.postsOwnedByUser.length}</div>
                                <div>Obserwujących: {this.state.usersFollowedAmount}</div>
                            </div>
                        </div>
                    </div>
                    <div className="posts-owned-by-user-container d-flex justify-content-center align-items-center flex-wrap">
                        {this.state.postsOwnedByUser.map(postObject => {
                            return (
                                <PostInGalleryOfUserPosts postObject={postObject} />
                            )
                        })}
                    </div>
                </div>
            </>
         );
    }
}

const mapStateToProps = state => {
    return {
        ...state
    }
}

export default connect(mapStateToProps)(UserPageComponent);