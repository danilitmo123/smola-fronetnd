import {
    REMOVE_RESOURCE_FAIL,
    REMOVE_RESOURCE_REQUEST,
    REMOVE_RESOURCE_SUCCESS
} from "../constants/remove-resource-constants";
import axios from "axios";

export const removeAction = (id) => async (dispatch) => {
    try {
        dispatch({type: REMOVE_RESOURCE_REQUEST})

        const config = {
            headers: {
                'Content-type': 'application/json'
            }
        }

        const {data} = await axios.post()
    } catch (error) {

    }
}