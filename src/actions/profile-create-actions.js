import {
    PROFILE_CREATE_REQUEST,
    PROFILE_CREATE_SUCCESS,
    PROFILE_CREATE_FAIL
} from '../constants/profile-create-constants'
import axiosAPI from "../components/api/axiosApi";

export const createProfileAction = (role) => async (dispatch) => {
    try {
        dispatch({type: PROFILE_CREATE_REQUEST})

        const {data} = await axiosAPI.patch('authenticate/user/create/',
            {
                'role': role
            }
        )

        dispatch({
            type: PROFILE_CREATE_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: PROFILE_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })
    }
}