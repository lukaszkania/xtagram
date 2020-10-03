import React, { Component } from 'react';
import coupleWithPhones from '../../../media/images/couple-with-phones.jpg'
import './UnloggedHomePageComponent.scss';
import LogInFormComponent from '../LogInFormComponent/LogInFormComponent';
import UnloggedFooterComponent from '../UnloggedFooterComponent/UnloggedFooterComponent';

class UnloggedHomePageComponent extends Component {
    state = {  }

    render() { 
        return ( 
            <div className="unlogged-home-page-container container-fluid d-flex flex-column" style={{padding:0}}>
                <div className="log-in-form-and-photo-container d-flex justify-content-center align-items-center" >
                    <img src={coupleWithPhones} alt="Next to login form" />
                    <LogInFormComponent />
                </div>
                <div>
                    <UnloggedFooterComponent />
                </div>
            </div>
         );
    }
}

export default UnloggedHomePageComponent;