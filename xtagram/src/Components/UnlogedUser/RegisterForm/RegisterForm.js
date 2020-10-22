import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './RegisterForm.scss';
import axios from 'axios';
import { USERS_API, USERS_FOLLOWED_API } from '../../../API_URLS';

class RegisterForm extends Component {
    state = { 
        username: "",
        email: "",
        password: "",
        userObjectToRegister: {},
        isInfoAboutBadDataDisplaying: false,
        createdUserId:"",
        createdUsersFollowedListId: "",
        users_followed: []
     }

     handleInputChange = event => {
        const targetName = event.target.name;
        const targetValue = event.target.value;
        this.setState({
            [targetName]:targetValue
        })
    }

    handleRegisterButtonSubmit = event => {
        event.preventDefault();
        axios.post(`${USERS_FOLLOWED_API}`).then(response => {
            this.setState({
                createdUsersFollowedListId: response.data.pk
            })
        }).catch(error => {
            console.log(error.message)
        }).finally(() => {
            const userObjectToRegister = {
                "username": this.state.username,
                "email": this.state.email,
                "password": this.state.password,
                "users_followed": [`${USERS_FOLLOWED_API}${this.state.createdUsersFollowedListId}/`]
            }
            axios.post(`${USERS_API}`, userObjectToRegister).then(response => {
                console.log(response)
                this.setState({
                    createdUserId: response.data.pk
                })
            }).catch(error => {
                console.log(error.message)
            }).finally(() => {
                axios.put(`${USERS_FOLLOWED_API}${this.state.createdUsersFollowedListId}/`, {
                    "list_of_users_that_are_followed_by": [`${USERS_API}${this.state.createdUserId}/`]
                }).then(response => {
                    console.log(response)
                }).catch(error => {
                    console.log(error.message)
                })
            })
        })
    }

    render() { 
        return ( 
            <form className="text-center register-form">
            <h1>Xtagram</h1>
            <div className="col">
                <input onChange={this.handleInputChange} type="text" className="form-control" placeholder="Nazwa użytkownika" name="username" />
            </div>
            <div className="col">
                <input onChange={this.handleInputChange} type="email" className="form-control" placeholder="Email" name="email" />
            </div>
            <div className="col">
                <input onChange={this.handleInputChange} type="password" className="form-control" placeholder="Hasło" name="password" />
            </div>
            <div className="text-center">
                <button onClick={this.handleRegisterButtonSubmit} type="button" className="btn btn-primary">
                    Załóż konto 
                </button>
            </div>
            {this.state.isInfoAboutBadDataDisplaying ? 
                (
                    <div className="register-alert alert alert-danger" role="alert">
                        Konto o podanej nazwie użytkownika już istnieje!
                    </div>
                )
                :
                (
                    <></>
                )
            }
            <div>
                <p >
                    Masz już konto? <Link to="/">Zaloguj się!</Link> 
                </p>
            </div>
        </form>
         );
    }
}
 
export default RegisterForm;