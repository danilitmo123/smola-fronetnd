import {
    PROFILE_REQUEST,
    PROFILE_SUCCESS,
    PROFILE_FAIL
} from "../constants/profile-constatnts";

import axiosAPI from "../components/api/axiosApi";

export const profileAction = () => async (dispatch) => {
    try {
        dispatch({type: PROFILE_REQUEST})

        const {data} = await axiosAPI.get('authenticate/account/')

        dispatch({
            type: PROFILE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PROFILE_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}