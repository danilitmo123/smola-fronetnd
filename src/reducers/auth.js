import {LOGIN_USER_SUCCESS, LOGOUT_USER} from "../constants/auth-constatants";
import initialState from "./initialState";

export const authReducer = (state = initialState.accessToken, action) =>{
    switch (action.type) {
        case LOGIN_USER_SUCCESS:
            return action.token;
        case LOGOUT_USER:
            return "";
        default:
            return state;
    }
}