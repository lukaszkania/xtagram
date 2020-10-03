import React, { Component } from 'react';
import './App.scss';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import {connect} from 'react-redux';
import UnloggedHomePageComponent from './Components/UnlogedUser/UnloggedHomePageComponent/UnloggedHomePageComponent';
import RegisterPageComponent from './Components/UnlogedUser/RegisterPageComponent/RegisterPageComponent';
import CookiesInfoBarComponent from './Components/UnlogedUser/CookiesInfoBarComponent/CookiesInfoBarComponent';
import LoggedInHomePage from './Components/LoggedInUser/LoggedInHomePage/LoggedInHomePage';

class App extends Component {

  render() { 
    return ( 
      <BrowserRouter>
                {localStorage["wasCookiesAccepted"] === "true" ? 
                    (<></>)
                    :
                    (<CookiesInfoBarComponent />)
                } 
        <Switch>

          {localStorage["isUserLoggedIn"] === "true" ?
          /* LOGGED IN USER */
          (
              <Route exact path="/" component={LoggedInHomePage}/>
          )
          :
          /* UNLOGGED USER */
          (
            <>
            <Route exact path="/" component={UnloggedHomePageComponent}/>
            <Route exact path="/register" component={RegisterPageComponent}/>
            </>
          )
          }
        </Switch>
      </BrowserRouter>
     );
  }
}

const mapStateToProps = state => {
  return {
    isUserLoggedIn: state.isUserLoggedIn
  }
}

export default connect(mapStateToProps)(App);