import React, { Component } from 'react';
import axios from 'axios';
import { USERS_API } from '../../../API_URLS';
import './SearchUsersComponent.scss';
import { connect } from 'react-redux';
import SearchUserElement from '../SearchUserElement/SearchUserElement';

class SearchUsersComponent extends Component {
    state = { 
        isListOfResultsDisplaying: false,
        userListToDisplay: []
     }

    handleInputChange = event => {
        let stringInSearchBox = event.target.value;
        if(stringInSearchBox === ""){
            this.setState({
                isListOfResultsDisplaying: false
            })
        }else{
            let updatedListOfUsersToDisplay;
            axios.get(USERS_API).then(response => {
                updatedListOfUsersToDisplay = response.data.filter(userObject => {return userObject.username.includes(stringInSearchBox) }).slice(0.10);
                this.setState({
                    userListToDisplay: updatedListOfUsersToDisplay.filter(userObject => {return userObject.username !== this.props.usernameOfLoggedInUser}),
                    isListOfResultsDisplaying: true
                })
            }).catch(error => {
                console.log(error.message)
            })
        }
    }

    render() { 
        return ( 
            <div className="search-box-and-list-container">
            <input onChange={this.handleInputChange} className="text-center search-users-input" type="text" placeholder="Szukaj"/>
            {this.state.isListOfResultsDisplaying ? 
            (
                <div className="list-of-searched-users-container">
                    <ul className="list-of-searched-users d-flex flex-column justify-content-around">
                        {this.state.userListToDisplay.map(userObject => {
                            return(
                                <SearchUserElement userObjectPk={userObject.pk} userObjectAvatar={userObject.avatar} userObjectUsername={userObject.username} />
                            )
                        })}
                    </ul>
                </div>
            )
            :
            (
                <>
                </>
            )
            }
            </div>
         );
    }
}
 
const mapStateToProps = state => {
    return {
        ...state
    }
}

export default connect(mapStateToProps)(SearchUsersComponent);