import axios from "axios";

import {
    RESOURCE_SHORTLIST_FAIL,
    RESOURCE_SHORTLIST_REQUEST,
    RESOURCE_SHORTLIST_SUCCESS
} from "../constants/resource-shortlist";

export const shortlistResources = () => async (dispatch) => {
    try {
        dispatch({type: RESOURCE_SHORTLIST_REQUEST})

        const { data } = await axios.get('https://api-smola-20.herokuapp.com/resource/shortlist/')
        dispatch({
            type: RESOURCE_SHORTLIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: RESOURCE_SHORTLIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })
    }
}