import React, { Component } from 'react';
import './UnderPostBar.scss';
import axios from 'axios';
import { LIKES_API, POSTS_API, USERS_API } from '../../../API_URLS';
import { connect } from 'react-redux';

class UnderPostBar extends Component {
    state = { 
        isPostLikedByLoggedInUser: false,
        usernamesOfUsersThatLikeThisPost: []
     }

    componentDidMount(){
        axios.get(this.props.postObject.likes_number).then(response => {
            response.data.list_of_users_that_like_it.map(userUrl => {
                axios.get(userUrl).then(response => {
                    this.setState({
                        usernamesOfUsersThatLikeThisPost: this.state.usernamesOfUsersThatLikeThisPost.concat([response.data.username])
                    })
                }).catch(error => {
                    console.log(error.message)
                })
                if(userUrl === `${USERS_API}${this.props.idOfLoggedInUser}/`){
                    this.setState({
                        isPostLikedByLoggedInUser: true
                    })
                }
            })
        }).catch(error => {
            console.log(error.message)
        })
    }

    handleClickOnHeartIcon = event => {
        event.preventDefault();
        let actualLikesAmount;
        let actualListOfUsersThatLikeIt;
        let urlOfLikesNumber;
        axios.get(`${POSTS_API}${this.props.postPk}/`).then(response => {
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
                        likes_number: actualLikesAmount + -1,
                        list_of_users_that_like_it: actualListOfUsersThatLikeIt.filter(userUrl => {return userUrl !== `${USERS_API}${this.props.idOfLoggedInUser}/`})
                    })
                }else{
                    axios.put(urlOfLikesNumber, {
                        likes_number: actualLikesAmount + 1,
                        list_of_users_that_like_it: actualListOfUsersThatLikeIt.concat([`${USERS_API}${this.props.idOfLoggedInUser}/`])
                    })}
            })
        })
    }

    render() { 
        return ( 
            <div className="d-flex flex-column justify-content-around">
            <div className="under-post-bar-container d-flex d-flex align-items-center">
                {this.state.isPostLikedByLoggedInUser ? 
                    (
                        <i onClick={this.handleClickOnHeartIcon} className="far fa-heart liked"></i>
                    )
                    :
                    (
                        <i onClick={this.handleClickOnHeartIcon} className="far fa-heart"></i>
                    )
                }
            </div>
            <div className="likes-number-container">Liczba polubień: {this.state.usernamesOfUsersThatLikeThisPost.length}</div>
            <div className="show-all-coments-container">Zobacz wszystkie komentarze</div>
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