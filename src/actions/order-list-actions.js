
import {
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAIL
} from "../constants/order-list-constants";
import axiosAPI from "../components/api/axiosApi";

export const listOrders = () => async (dispatch) => {
    try {
        dispatch({type: ORDER_LIST_REQUEST})

        const { data } = await axiosAPI.get('order/list/')
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