import React, { Component } from 'react';
import { connect } from 'react-redux';
import { USERS_API } from '../../../API_URLS';
import axios from 'axios';
import './EditAvatarPhotoWidget.scss';

class EditAvatarPhotoWidget extends Component {
    state = { 
        image: ""
     }

    handleImageChange = (e) => {
        console.log(e.target.files[0])
        this.setState({
          image: e.target.files[0]
        })
      };

    onAddButtonClick = event => {
        event.preventDefault();
        let form_data = new FormData();
        form_data.append('avatar', this.state.image)

        axios.patch(`${USERS_API}${this.props.idOfLoggedInUser}/`, form_data, {headers: {
            'content-type': 'multipart/form-data'
        }
        }).then(response => {
            console.log(response)
            }).catch(error => {
                console.log(error.message)
            })
    }

    render() { 
        return ( 
            <form className="edit-avatar-photo-container md-form d-flex flex-column justify-content-center" >
                <div className="file-field">
                    <div className="btn btn-primary btn-sm float-left">
                        <input onChange={this.handleImageChange} type="file" />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary" onClick={this.onAddButtonClick}>Edytuj</button>
            </form>
         );
    }
}
 
const mapStateToProps = state => {
    return {
        ...state
    }
}

export default connect(mapStateToProps)(EditAvatarPhotoWidget);