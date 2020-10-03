import React, { Component } from 'react';
import axios from 'axios';
import { POSTS_API, USERS_API } from '../../../API_URLS';
import { connect } from 'react-redux';

class AddPostComponent extends Component {
    state = { 
        description:"",
        image:"",
        createdPostId: ""
     }

    onDescriptionChange = event => {
        this.setState({
            description:event.target.value
        })
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
        form_data.append('description', this.state.description)
        form_data.append('image', this.state.image)
        form_data.append('post_author', `${USERS_API}${this.props.idOfLoggedInUser}/`)
        form_data.append('likes_number', 0)

        axios.post(POSTS_API, form_data, {
            headers: {
                'content-type': 'multipart/form-data'
            }
        }).then(response => {
            this.setState({
                createdPostId: response.data.pk
            })
        }).catch(error => {
            console.log(error.message)
        })
    }

    render() { 
        return (
            <div className="add-post-widget">
                <form className="md-form" >
                <div className="file-field">
                    <div className="btn btn-primary btn-sm float-left">
                        <span>Wybierz plik</span>
                        <input onChange={this.handleImageChange} type="file" />
                    </div>
                    <div className="file-field">
                        <input onChange={this.onDescriptionChange} type="text" className="form-control" id="post-description" placeholder="Opis" />
                    </div>
                </div>
                <button type="submit" className="btn btn-primary" onClick={this.onAddButtonClick}>Dodaj</button>
                </form>
            </div>
         );
    }
}

const mapStateToProps = state => {
    return {
        ...state
    }
}

export default connect(mapStateToProps)(AddPostComponent);