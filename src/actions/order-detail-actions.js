import {
    ORDER_DETAIL_FAIL,
    ORDER_DETAIL_REQUEST,
    ORDER_DETAIL_SUCCESS
} from "../constants/order-deatil-consts";
import {
    SPECIFICATION_LIST_FAIL,
    SPECIFICATION_LIST_REQUEST,
    SPECIFICATION_LIST_SUCCESS
} from "../constants/specification-constans";
import axios from "axios";


export const detailOrder = () => async ({dispatch}) => {
    try {
        dispatch({type: SPECIFICATION_LIST_REQUEST})
        const id = dispatch.order_id
        const {data} = await axios.get('https://api-smola-20.herokuapp.com/order/' + id )

        dispatch({
            type: SPECIFICATION_LIST_SUCCESS,
            payload: data
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