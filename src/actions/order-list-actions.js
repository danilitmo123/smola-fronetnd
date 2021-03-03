import {
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAIL
} from "../constants/order-list-constants";
import axiosAPI from "../components/api/axiosApi";
import store from "../store";

async function get() {
    let paramString = '/?'

    if (store.getState().searching && store.getState().searching.searchOrder) {
        paramString += 'search=' + store.getState().searching.searchOrder + '&'
    }
    if (store.getState().filtering && store.getState().filtering.filterOrder) {
        for (let name in store.getState().filtering.filterOrder) {
            paramString += name + '=' + store.getState().filtering.filterOrder[name] + '&'
        }
    }

    return await axiosAPI.get('order/list' + paramString)

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