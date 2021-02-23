import {
    SPECIFICATION_LIST_FAIL,
    SPECIFICATION_LIST_REQUEST,
    SPECIFICATION_LIST_SUCCESS
} from "../constants/specification-constans";
import axiosAPI from "../components/api/axiosApi";

export const listSpecifications = () => async (dispatch) => {
    try {
        dispatch({type: SPECIFICATION_LIST_REQUEST})

        const { data } = await axiosAPI.get('specification/list/')

        dispatch({
            type: SPECIFICATION_LIST_SUCCESS,
            payload: data.results
        })
    } catch (error) {
        dispatch({
            type: SPECIFICATION_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })
    }
}