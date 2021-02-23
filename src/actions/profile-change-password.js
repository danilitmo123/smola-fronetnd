import {
    PROFILE_CHANGE_PASSWORD_REQUEST,
    PROFILE_CHANGE_PASSWORD_SUCCESS,
    PROFILE_CHANGE_PASSWORD_FAIL
} from '../constants/profile-change-password'
import axiosAPI from "../components/api/axiosApi";

export const changePasswordAction = (password) => async (dispatch) => {
    try {
        dispatch({type: PROFILE_CHANGE_PASSWORD_REQUEST})

        const {data} = await axiosAPI.patch('authenticate/user/change-password/',
            {
                'password': password
            }
        )

        dispatch({
            type: PROFILE_CHANGE_PASSWORD_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: PROFILE_CHANGE_PASSWORD_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })
    }
}