import {
    ORDER_DETAIL_REQUEST,
    ORDER_DETAIL_SUCCESS,
    ORDER_DETAIL_FAIL
} from "../constants/order-deatil-consts";


export const orderDetailReducer = (state = {order: {}}, action) => {
    switch (action.type) {
        case ORDER_DETAIL_REQUEST:
            return { loading: true, order: {}}
        case ORDER_DETAIL_SUCCESS:
            return { loading: false, order: {...action.payload}}
        case ORDER_DETAIL_FAIL:
            return { loading: false, error: action.payload}
        default:
            return state
    }
}