import React, { Component } from 'react';
import RegisterForm from '../RegisterForm/RegisterForm';
import './RegisterPageComponent.scss';
import UnloggedFooterComponent from '../UnloggedFooterComponent/UnloggedFooterComponent';

class RegisterPageComponent extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="container-fluid register-page-container d-flex flex-column justify-content-center">
                <RegisterForm />
                <UnloggedFooterComponent />
            </div>
         );
    }
}
 
export default RegisterPageComponent;