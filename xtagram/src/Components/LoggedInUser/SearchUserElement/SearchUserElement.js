import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import axios from 'axios';
import { USERS_API, USERS_FOLLOWED_API } from '../../../API_URLS';
import './SearchUserElement.scss';

class SearchUserElement extends Component {
    state = { 
        usersFollowedApisUrls: []
     }

    componentDidMount(){
        axios.get(`${USERS_API}${this.props.idOfLoggedInUser}/`).then(response => {
            axios.get(response.data.users_followed).then(response => {
                this.setState({
                    usersFollowedApisUrls: response.data.list_of_users_that_are_followed_by
                })
            })
        }).catch(error => {
            console.log(error.message)
        })
    }

    handleClickOnHeartIcon = event => {
        axios.get(`${USERS_API}${this.props.idOfLoggedInUser}/`).then(response => {
            axios.get(response.data.users_followed).then(response => {
                if(this.state.usersFollowedApisUrls.includes(`${USERS_API}${this.props.userObjectPk}/`)){
                    this.setState({
                        usersFollowedApisUrls: this.state.usersFollowedApisUrls.filter(userApi => {return userApi !== `${USERS_API}${this.props.userObjectPk}/`})
                    })
                    axios.put(`${USERS_FOLLOWED_API}${response.data.pk}/`, {
                        list_of_users_that_are_followed_by: response.data.list_of_users_that_are_followed_by.filter(userApi => {
                            return userApi !==`${USERS_API}${this.props.userObjectPk}/`
                        })
                    }).catch(error => {
                        console.log(error.message)
                    })
                }else{
                    this.setState({
                        usersFollowedApisUrls: this.state.usersFollowedApisUrls.concat([`${USERS_API}${this.props.userObjectPk}/`]) 
                    })
                    axios.put(`${USERS_FOLLOWED_API}${response.data.pk}/`, {
                        list_of_users_that_are_followed_by: response.data.list_of_users_that_are_followed_by.concat([`${USERS_API}${this.props.userObjectPk}/`])
                    }).catch(error => {
                        console.log(error.message)
                    })
                }
            }).catch(error => {
                console.log(error.message)
            })
        }).catch(error => {
            console.log(error.message)
        })

        // if(this.state.usersFollowedApisUrls.includes(`${USERS_API}${this.props.userObjectPk}/`)){
        //     console.log("polubione")
        //     this.setState({
        //         usersFollowedApisUrls: this.state.usersFollowedApisUrls.filter(userApi => {return userApi !== `${USERS_API}${this.props.userObjectPk}/`})
        //     })
        //     axios.get(`${USERS_API}${this.props.idOfLoggedInUser}/`).then(response => {
        //         axios.get(response.data.users_followed).then(response => {
        //             axios.put(`${USERS_FOLLOWED_API}${response.data.pk}/`, {
        //                 list_of_users_that_are_followed_by: response.data.list_of_users_that_are_followed_by.filter(userApi => {
        //                     return userApi !==`${USERS_API}${this.props.userObjectPk}/`
        //                 })
        //             })
        //         }).catch(error => {
        //             console.log(error.message)
        //         })
        //     }).catch(error => {
        //         console.log(error.message)
        //     })
        // }else{
        //     console.log("niepolubione")
        //     this.setState({
        //         usersFollowedApisUrls: this.state.usersFollowedApisUrls.concat([`${USERS_API}${this.props.userObjectPk}/`]) 
        //     })
        //     axios.get(`${USERS_API}${this.props.idOfLoggedInUser}/`).then(response => {
        //         axios.get(response.data.users_followed).then(response => {
        //             axios.put(`${USERS_FOLLOWED_API}${response.data.pk}/`, {
        //                 list_of_users_that_are_followed_by: response.data.list_of_users_that_are_followed_by.concat([`${USERS_API}${this.props.userObjectPk}/`])
        //             })
        //         }).catch(error => {
        //             console.log(error.message)
        //         })
        //     }).catch(error => {
        //         console.log(error.message)
        //     })
        // }
    }

    render() { 
        return ( 
            <li key={this.props.userObjectPk} className="d-flex justify-content-around align-items-center" >
                <Link to={`/user/${this.props.userObjectPk}`} key={this.props.userObjectPk}>
                    <img className="user-search-avatar" src={this.props.userObjectAvatar} alt="Avatar" />
                    <h3>{this.props.userObjectUsername}</h3>
                </Link>
                {this.state.usersFollowedApisUrls.includes(`${USERS_API}${this.props.userObjectPk}/`) ? 
                    (
                        <>
                            <i onClick={this.handleClickOnHeartIcon} className="far fa-heart followed-user"></i>
                        </>
                    )
                    :
                    (
                        <>
                            <i onClick={this.handleClickOnHeartIcon} className="far fa-heart"></i>
                        </>
                    )
                }
            </li>
         );
    }
}
 
const mapStateToProps = state => {
    return {
        ...state
    }
}

export default connect(mapStateToProps)(SearchUserElement);