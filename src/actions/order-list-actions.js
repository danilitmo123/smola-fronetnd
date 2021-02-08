import axios from "axios";

import {
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAIL
} from "../constants/order-list-constants";

export const listOrders = () => async (dispatch) => {
    try {
        dispatch({type: ORDER_LIST_REQUEST})

        const { data } = await axios.get('https://api-smola-20.herokuapp.com/order/list/')
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