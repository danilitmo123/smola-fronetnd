import {
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS
} from "../constants/product-constans";

import axiosAPI from "../components/api/axiosApi";

export const listProducts = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST})

        const { data } = await axiosAPI.get('resource/list/')

        dispatch({
            type: PRODUCT_LIST_SUCCESS,
            payload: data.results
        })

    } catch (error) {
        dispatch({
            type: PRODUCT_LIST_FAIL,
            payload: error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        })
    }
}