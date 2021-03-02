import {
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS
} from "../constants/product-constans";

import axiosAPI from "../components/api/axiosApi";
import store from "../store";

async function get(){

    if (store.getState().searching && store.getState().searching.searchResource) {
        return await axiosAPI.get('resource/list/?search=' + store.getState().searching.searchResource)
    } else {
        return await axiosAPI.get('resource/list/')
    }
}


export const listProducts = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_LIST_REQUEST})

        const { data } = await get()

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