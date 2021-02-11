import {
    REMOVE_RESOURCE_FAIL,
    REMOVE_RESOURCE_REQUEST,
    REMOVE_RESOURCE_SUCCESS
} from "../constants/remove-resource-constants";
import axios from "axios";

export const removeAction = (id, checked) => async (dispatch) => {
    try {
        dispatch({type: REMOVE_RESOURCE_REQUEST})

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const {data} = await axios.post()

        dispatch({
            type: REMOVE_RESOURCE_SUCCESS,
            payload: data
        })

    } catch (error) {
        dispatch({
            type: REMOVE_RESOURCE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })
    }
}