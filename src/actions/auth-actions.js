import {LOGIN_USER_SUCCESS, LOGOUT_USER} from "../constants/auth-constatants";
import {obtainToken, logout} from "../components/api/authenticationApi";

export const loginUserSuccess = (token) => {
    return {type: LOGIN_USER_SUCCESS, token};
}

export const loginUser = (username, password) => async (dispatch) => {
    try {
        const response = await obtainToken(username, password);
        dispatch(loginUserSuccess(response.data.access));
    } catch (error) {
        console.log("Error obtaining token. " + error);
    }
}


export const logoutUserSuccess = () => {
    return {type: LOGOUT_USER};
}

export const logoutUser = () => async (dispatch) => {
    await logout();
    dispatch(logoutUserSuccess());
}