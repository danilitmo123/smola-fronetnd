import axios from "axios";

import {
    RESOURCES_IN_SPECIFICATION_SUCCESS,
    RESOURCES_IN_SPECIFICATION_REQUEST,
    RESOURCES_IN_SPECIFICATION_FAIL
} from "../constants/resources-in-spec-constants";

export const getResourcesInSpecification = (id) => async (dispatch) => {
    try {
        dispatch({type: RESOURCES_IN_SPECIFICATION_REQUEST})

        const { data } = await axios.get(`https://api-smola-20.herokuapp.com/specification/${id}/`)
        dispatch({
            type: RESOURCES_IN_SPECIFICATION_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: RESOURCES_IN_SPECIFICATION_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })
    }
}