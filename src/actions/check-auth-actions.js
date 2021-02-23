import {
    CHECK_AUTHORIZATION_REQUEST,
    CHECK_AUTHORIZATION_SUCCESS,
    CHECK_AUTHORIZATION_FAIL,
    CHECK_AUTHORIZATION_NEEDLESS
} from "../constants/check-authorization-constants";
import axiosAPI from "../components/api/axiosApi";
import {DEFAULT_PAGES} from "../constants/deafult-pages"

export const authCheckAction = (pathname) => async (dispatch) => {
    try {
        dispatch({type: CHECK_AUTHORIZATION_REQUEST})

        if (!DEFAULT_PAGES.includes(pathname)) {
            const { data } = await axiosAPI.get("authenticate/user/check/")

            dispatch({
                type: CHECK_AUTHORIZATION_SUCCESS,
                payload: data
            })
        }else{
            dispatch({type: CHECK_AUTHORIZATION_NEEDLESS})
        }

    } catch (error) {
        dispatch({
            type: CHECK_AUTHORIZATION_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })
    }
}