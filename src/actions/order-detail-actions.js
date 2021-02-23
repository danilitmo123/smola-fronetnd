import {
    ORDER_DETAIL_FAIL,
    ORDER_DETAIL_REQUEST,
    ORDER_DETAIL_SUCCESS
} from "../constants/order-deatil-consts";

import axiosAPI from "../components/api/axiosApi";


export const detailOrder = () => async ({dispatch}) => {
    try {
        dispatch({type: ORDER_DETAIL_REQUEST})
        const id = dispatch.order_id
        const {data} = await axiosAPI.get('order/' + id + '/')

        dispatch({
            type: ORDER_DETAIL_SUCCESS,
            payload: data
        })
    } catch (error) {
        dispatch({
            type: ORDER_DETAIL_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })
    }
}