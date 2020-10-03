import React, { Component } from 'react';
import { LOG_IN_USER_SUCCESS } from '../../../actions';
import { connect } from 'react-redux';

class LogInOptionComponent extends Component {
    state = {  }

    handleLogInClick = event => {
        event.preventDefault();
        this.props.dispatch({type:LOG_IN_USER_SUCCESS});
        window.location.reload();
    }

    render() { 
        return ( 
            <div className="text-center">
                <button type="button" className="btn btn-primary" onClick={this.handleLogInClick}>
                    Zaloguj
                </button>
            </div>
         );
    }
}

const mapStateToProps = state => {
    return {
        ...state,
    }
}

export default connect(mapStateToProps)(LogInOptionComponent);