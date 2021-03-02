import {
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAIL
} from "../constants/order-list-constants";
import axiosAPI from "../components/api/axiosApi";
import store from "../store";

async function get(){

    if (store.getState().searching && store.getState().searching.searchOrder) {
        return await axiosAPI.get('order/list/?search=' + store.getState().searching.searchOrder)
    } else {
        return await axiosAPI.get('order/list/')
    }
}

export const listOrders = () => async (dispatch) => {
    try {
        dispatch({type: ORDER_LIST_REQUEST})

        const {data} = await get()
        console.log({data})
        dispatch({
            type: ORDER_LIST_SUCCESS,
            payload: data.results
        })
    } catch (error) {
        dispatch({
            type: ORDER_LIST_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })
    }
}