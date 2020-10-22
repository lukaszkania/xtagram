import {store} from './store';
import { LOG_IN_USER_SUCCESS, LOG_OUT_USER_SUCCESS, COOKIES_ACCEPTED, SET_ARRAY_OF_POSTS_TO_DISPLAY, SET_ARRAY_OF_USERNAMES_OF_FOLLOWED_USERS } from './actions';

const rootReducer = (state = store, action) => {

    switch (action.type) {
      case LOG_IN_USER_SUCCESS:
        localStorage["isUserLoggedIn"] = "true";
        return {
          ...state,
          isUserLoggedIn: true,
          usernameOfLoggedInUser: action.usernameOfLoggedInUser,
          idOfLoggedInUser: action.idOfLoggedInUser,
          emailOfLoggedInUser: action.emailOfLoggedInUser,
          usersFollowedByLoggedInUserApisUrls: action.usersFollowedByLoggedInUserApisUrls
        }

      case LOG_OUT_USER_SUCCESS:
        localStorage["isUserLoggedIn"] = "false";
          return {
            ...state,
            isUserLoggedIn: false,
            usernameOfLoggedInUser: "",
            idOfLoggedInUser: ""
          }

      case COOKIES_ACCEPTED:
        localStorage["wasCookiesAccepted"] = "true"
        return {
          ...state,
          wasCookiesAccepted: true
        }

      case SET_ARRAY_OF_POSTS_TO_DISPLAY:
        return {
          ...state,
          postsObjectsToDisplay:  action.postsObjectsToDisplay.sort((a, b) => (a.pk < b.pk) ? 1 : ((b.pk < a.pk) ? -1 : 0))
        }

      case SET_ARRAY_OF_USERNAMES_OF_FOLLOWED_USERS:
        return{
          ...state,
          usernamesOfFollowedUsers:  action.usernamesOfFollowedUsersToAdd
        }

      default:
        return state
    }
  }
  
  export default rootReducer;