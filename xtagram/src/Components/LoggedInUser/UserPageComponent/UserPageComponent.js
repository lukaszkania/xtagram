import axios from 'axios';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { USERS_API } from '../../../API_URLS';
import EditAvatarPhotoWidget from '../EditAvatarPhotoWidget/EditAvatarPhotoWidget';
import NavBar from '../NavBar/NavBar';
import './UserPageComponent.scss';

class UserPageComponent extends Component {
    state = { 
        avatarSrc: "",
        username: "",
        isNewAvatarPhotoWidgetDisplaying: false
     }

    componentWillMount(){
        axios.get(`${USERS_API}${this.props.match.params.user_id}/`).then(response => {
            this.setState({
                avatarSrc: response.data.avatar,
                username: response.data.username
            })
        }).catch(error => {
            console.log(error.message)
        })
    }

    componentDidUpdate(){
        axios.get(`${USERS_API}${this.props.match.params.user_id}/`).then(response => {
            this.setState({
                avatarSrc: response.data.avatar,
                username: response.data.username
            })
        }).catch(error => {
            console.log(error.message)
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
                            <div className="d-flex justify-content-center">
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
                                <div>Posty:</div>
                                <div>obserwujących</div>
                                <div>Obserwowani</div>
                            </div>
                        </div>
                    </div>
                    <div>

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