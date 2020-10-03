import React, { Component } from 'react';
import './CookiesInfoBarComponent.scss';
import { connect } from 'react-redux';
import { COOKIES_ACCEPTED } from '../../../actions';

class CookiesInfoBarComponent extends Component {
    state = {
        shouldComponentDisplaying: true
    }

    handleCloseCookiesBar = event => {
        this.props.dispatch({type:COOKIES_ACCEPTED});
        this.setState({
            shouldComponentDisplaying:false
        })
    }

    render() { 
        return ( 

                this.state.shouldComponentDisplaying ? 
                    (<div className="cookies-info-bar-container d-flex justify-content-center">
                        <p>
                            Używamy plików cookie, aby pomóc w personalizacji zawartości, 
                            dostosowywać i analizować reklamy oraz zapewnić bezpieczne korzystanie 
                            z serwisu. Klikając lub nawigując w tej witrynie, wyrażasz zgodę na gromadzenie 
                            przez nas informacji na Instagramie i poza nim przy użyciu plików cookie. 
                            Więcej informacji, łącznie z informacjami o dostępnych opcjach kontroli, 
                            znajdziesz w dokumencie: Zasady dotyczące plików cookie.
                        </p>
                        <i onClick={this.handleCloseCookiesBar} class="fas fa-times-circle"></i>
                    </div>
                    )
                    :
                    (null)
         );
    }
}

const mapStateToProps = store => {
    return {
        wasCookiesAccepted: store.wasCookiesAccepted
    }
}

export default connect(mapStateToProps)(CookiesInfoBarComponent);