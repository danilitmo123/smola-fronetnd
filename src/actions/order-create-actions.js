import {
    ORDER_CREATE_REQUEST,
    ORDER_CREATE_FAIL,
    ORDER_CREATE_SUCCESS
} from '../constants/order-create-constants'
import axiosAPI from "../components/api/axiosApi";

export const createOrderAction = (external_id, source, products) => async (dispatch) => {
    try {
        dispatch({type: ORDER_CREATE_REQUEST})


        const {data} = await axiosAPI.post('order/create/',
            {
                'external_id': external_id,
                'source_name': source,
                'specifications_create': products,
            }
        )

        dispatch({
            type: ORDER_CREATE_SUCCESS,
            payload: data
        })


    } catch (error) {
        dispatch({
            type: ORDER_CREATE_FAIL,
            payload: error.response && error.response.data.detail
                ? error.response.data.detail
                : error.message
        })
    }
}