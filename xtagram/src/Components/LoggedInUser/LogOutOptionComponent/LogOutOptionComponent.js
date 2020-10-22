import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { LOG_OUT_USER_SUCCESS } from '../../../actions';
import './LogOutOptionComponent.scss';

class LogOutOptionComponent extends Component {
    state = {  }

    handleLogOutClick = event => {
        this.props.dispatch({type:LOG_OUT_USER_SUCCESS});
    }

    render() { 
        return ( 
            <div className="log-out-option-container">
                <Link to="/">
                    <i className="fas fa-sign-out-alt nav-bar-element" onClick={this.handleLogOutClick}></i>
                </Link>
            </div>
         );
    }
}
 
const mapStateToProps = state => {
    return {
        ...state
    }
  }

export default connect(mapStateToProps)(LogOutOptionComponent);