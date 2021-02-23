import {
    RESOURCES_IN_SPECIFICATION_SUCCESS,
    RESOURCES_IN_SPECIFICATION_REQUEST,
    RESOURCES_IN_SPECIFICATION_FAIL
} from "../constants/resources-in-spec-constants";
import axiosAPI from "../components/api/axiosApi";

export const getResourcesInSpecification = (id) => async (dispatch) => {
    try {
        dispatch({type: RESOURCES_IN_SPECIFICATION_REQUEST})

        const { data } = await axiosAPI.get(`specification/${id}/`)
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