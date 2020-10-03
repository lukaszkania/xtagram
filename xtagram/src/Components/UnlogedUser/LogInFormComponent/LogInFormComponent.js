import React, { Component } from 'react';
import './LogInFormComponent.scss';
import { Link } from 'react-router-dom';
import { LOG_IN_USER_SUCCESS } from '../../../actions';
import { connect } from 'react-redux';
import axios from 'axios';
import { USERS_API } from '../../../API_URLS';

class LogInFormComponent extends Component {
    state = { 
        username:"",
        password:"",
        isAlertAboutWrongPasswordDisplaying:false
     }

    handleLogInClick = event => {
        event.preventDefault();
        axios.get(USERS_API).then(response => {
            const userObject = response.data.filter(user => {return user.username === this.state.username})
            if(userObject[0].password === this.state.password){
                axios.get(`${USERS_API}${userObject[0].pk}/`).then(response => {
                    this.props.dispatch({
                        type:LOG_IN_USER_SUCCESS, 
                        usernameOfLoggedInUser:userObject[0].username, 
                        idOfLoggedInUser:userObject[0].pk, 
                        emailOfLoggedInUser:userObject[0].email,
                        usersFollowedByLoggedInUserApisUrls:response.data.users_followed
                    });
                }).catch(error => {
                    console.log(error.message)
                })
            }else{
                this.setState({
                    isAlertAboutWrongPasswordDisplaying:true
                })
            }
        }).catch(error => {
            console.log(error.message);
        })
    }

    handleInputChange = event => {
        const targetName = event.target.name;
        const targetValue = event.target.value;
        this.setState({
            [targetName]:targetValue
        })
    }

    render() { 
        return ( 
                <form className="text-center">
                    <h1>Xtagram</h1>
                    <div className="col">
                        <input type="text" className="form-control" placeholder="Nazwa użytkownika" onChange={this.handleInputChange} name="username" />
                    </div>
                    <div className="col">
                        <input type="password" className="form-control" placeholder="Hasło" onChange={this.handleInputChange} name="password" />
                    </div>
                    <div className="text-center">
                        <button type="button" className="btn btn-primary" onClick={this.handleLogInClick}>
                            Zaloguj
                        </button>
                    </div>
                    {this.state.isAlertAboutWrongPasswordDisplaying ? 
                        (
                        <div className="register-alert alert alert-danger" role="alert">
                            Złe hasło lub nazwa użytkownika
                        </div>
                        )
                        :
                        (
                            <></>
                        )
                    }
                    <div>
                        <p >
                            Nie masz konta? <Link to="/register">Zarejestruj się!</Link> 
                        </p>
                    </div>
                </form>
         );
    }
}
 
const mapStateToProps = state => {
    return {
        ...state,
    }
}

export default connect(mapStateToProps)(LogInFormComponent);