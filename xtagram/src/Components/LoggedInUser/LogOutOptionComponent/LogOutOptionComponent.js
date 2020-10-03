import React, { Component } from 'react';
import { connect } from 'react-redux';
import { LOG_OUT_USER_SUCCESS } from '../../../actions';

class LogOutOptionComponent extends Component {
    state = {  }

    handleLogOutClick = event => {
        event.preventDefault();
        this.props.dispatch({type:LOG_OUT_USER_SUCCESS});
        window.location.reload();
    }

    render() { 
        return ( 
            <div className="log-out-option-container">
                <i className="fas fa-sign-out-alt nav-bar-element" onClick={this.handleLogOutClick}></i>
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