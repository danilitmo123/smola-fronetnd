import axios from "axios";

import {
    SPECIFICATION_SHORTLIST_FAIL,
    SPECIFICATION_SHORTLIST_REQUEST,
    SPECIFICATION_SHORTLIST_SUCCESS
} from "../constants/specification-shortlist-constants";
import axiosAPI from "../components/api/axiosApi";

export const shortlistSpecification = () => async (dispatch) => {
    try {
        dispatch({type: SPECIFICATION_SHORTLIST_REQUEST})

        const { data } = await axiosAPI.get('specification/shortlist/')
        dispatch({
            type: SPECIFICATION_SHORTLIST_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: SPECIFICATION_SHORTLIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })
    }
}