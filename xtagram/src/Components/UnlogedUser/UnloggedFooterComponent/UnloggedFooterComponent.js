import React, { Component } from 'react';
import './UnloggedFooterComponent.scss';

class UnloggedFooterComponent extends Component {
    state = {  }
    render() { 
        return ( 
            <footer>
                <ul className="unlogged-footer-container d-flex justify-content-center flex-wrap">
                    <li>
                        Informacje
                    </li>
                    <li>
                        Pomoc
                    </li>
                    <li>
                        Prasa
                    </li>
                    <li>
                        Api
                    </li>
                    <li>
                        Praca
                    </li>
                    <li>
                        Prywatność
                    </li>
                    <li>
                        Regulamin
                    </li>
                </ul>
            </footer>
         );
    }
}
 
export default UnloggedFooterComponent;