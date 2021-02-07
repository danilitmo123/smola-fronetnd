import {
    PRICE_SUCCESS,
    PRICE_FAIL,
    PRICE_REQUEST
} from '../constants/price-constants'

export const priceReducers = (state = {}, action) => {
    switch (action.type) {
        case PRICE_REQUEST:
            return {loading: true}
        case PRICE_SUCCESS:
            return {loading: false, priceInfo: action.payload}
        case PRICE_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}