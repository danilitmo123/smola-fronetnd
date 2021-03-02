import {
    PRODUCT_LIST_FAIL,
    PRODUCT_LIST_REQUEST,
    PRODUCT_LIST_SUCCESS
} from "../constants/product-constans";

import axiosAPI from "../components/api/axiosApi";
import store from "../store";

async function get(){
    let paramString = '/?'

    if (store.getState().searching && store.getState().searching.searchResource) {
       paramString += 'search=' + store.getState().searching.searchResource + '&'
    }
    if (store.getState().filtering && store.getState().filtering.filterResource){
        for (let name in store.getState().filtering.filterResource){
            paramString += name + '=' + store.getState().filtering.filterResource[name] + '&'
        }
    }

    return await axiosAPI.get('resource/list' + paramString)

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