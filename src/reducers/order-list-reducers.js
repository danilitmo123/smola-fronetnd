import {
    ORDER_LIST_REQUEST,
    ORDER_LIST_SUCCESS,
    ORDER_LIST_FAIL
} from '../constants/order-list-constants'

export const orderListReducers = (state = {orders: {}}, action) => {
    switch (action.type) {
        case ORDER_LIST_REQUEST:
            return {loading: true, orders: {}}
        case ORDER_LIST_SUCCESS:
            return {loading: false, orders: {...action.payload}}
        case ORDER_LIST_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}