import React, { Component } from 'react';
import './NavBar.scss';
import { connect } from 'react-redux';
import LogOutOptionComponent from '../LogOutOptionComponent/LogOutOptionComponent';
import axios from 'axios';
import { USERS_API } from '../../../API_URLS';
import AddPostComponent from '../AddPostComponent/AddPostComponent';

class NavBar extends Component {
    state = { 
        loggedInUserId: "",
        loggedInUserUsername: "",
        loggedInUserAvatarUrl:"",
        isAddPostComponentDisplay: false
     }

    componentDidMount(){
        axios.get(`${USERS_API}${this.props.idOfLoggedInUser}/`).then(response => {
            this.setState({
                loggedInUserId: this.props.idOfLoggedInUser,
                loggedInUserUsername: this.props.usernameOfLoggedInUser,
                loggedInUserAvatarUrl: response.data.avatar

            })
        }).catch(error => {
            console.log(error.message);
        })
    }

    handlePlusFontClick = event => {
        this.setState({
            isAddPostComponentDisplay: !this.state.isAddPostComponentDisplay
        })
    }

    render() { 
        return ( 
            <div className="nav-bar-container d-flex justify-content-around align-items-center">
                <h2 className="title">Xtagram</h2>
                <input className="text-center search-users-input" type="text" placeholder="Szukaj"/>
                <div className="icons-and-avatar-container d-flex justify-content-between align-items-center">
                    <i className="fas fa-home nav-bar-element"></i>
                    <i className="fas fa-heart nav-bar-element"></i>
                    <img className="nav-bar-avatar nav-bar-element" alt="avatar" src={this.state.loggedInUserAvatarUrl} />
                    <i onClick={this.handlePlusFontClick} className="fas fa-plus"></i>
                    {this.state.isAddPostComponentDisplay ? 
                        (                    
                            <AddPostComponent />
                        )
                        :
                        (<></>)
                    }
                    <LogOutOptionComponent />
                </div>
            </div>
         );
    }
}
 
const mapStateToProps = state => {
    return {
        ...state
    }
}

export default connect(mapStateToProps)(NavBar);