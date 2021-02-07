import {
    SPECIFICATION_PRICE_FAIL,
    SPECIFICATION_PRICE_REQUEST,
    SPECIFICATION_PRICE_SUCCESS
} from '../constants/specification-price-constants'

export const specificationPriceReducers = (state ={}, action) => {
    switch (action.type) {
        case SPECIFICATION_PRICE_REQUEST:
            return {loading: true}
        case SPECIFICATION_PRICE_SUCCESS:
            return {loading: false, specPriceInfo: action.payload}
        case SPECIFICATION_PRICE_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}