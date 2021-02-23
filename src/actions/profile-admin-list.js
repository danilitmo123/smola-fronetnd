import {
    PROFILE_ADMIN_LIST_SUCCESS,
    PROFILE_ADMIN_LIST_FAIL,
    PROFILE_ADMIN_LIST_REQUEST
} from "../constants/profile-adimin-list-constatns";

import axiosAPI from "../components/api/axiosApi";

export const profileAdminListAction = () => async (dispatch) => {
    try {
        dispatch({type: PROFILE_ADMIN_LIST_REQUEST})

        const {data} = await axiosAPI.get('authenticate/user/list/')

        dispatch({
            type: PROFILE_ADMIN_LIST_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: PROFILE_ADMIN_LIST_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}