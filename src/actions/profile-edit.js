import {
    EDIT_PROFILE_REQUEST,
    EDIT_PROFILE_SUCCESS,
    EDIT_PROFILE_FAIL
} from '../constants/profile-edit'

import axiosAPI from "../components/api/axiosApi";

export const editProfileAction = (username, email, lastName, firstName) => async (dispatch) => {
    try {
        dispatch({type: EDIT_PROFILE_REQUEST})

        const {data} = await axiosAPI.patch('authenticate/user/edit/',
            {
                'username': username,
                'email': email,
                'last_name': lastName,
                'first_name': firstName
            }
        )

        dispatch({
            type: EDIT_PROFILE_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: EDIT_PROFILE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })
    }
}