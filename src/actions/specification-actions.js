import axios from "axios";

import {
    SPECIFICATION_LIST_FAIL,
    SPECIFICATION_LIST_REQUEST,
    SPECIFICATION_LIST_SUCCESS
} from "../constants/specification-constans";

export const listSpecifications = () => async (dispatch) => {
    try {
        dispatch({type: SPECIFICATION_LIST_REQUEST})

        const { data } = await axios.get('https://api-smola-20.herokuapp.com/specification/list/')

        dispatch({
            type: SPECIFICATION_LIST_SUCCESS,
            payload: data.results
        })
    } catch (error) {
        dispatch({
            type: SPECIFICATION_LIST_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}