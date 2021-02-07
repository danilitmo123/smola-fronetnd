import {
    COEFFICIENT_FAIL,
    COEFFICIENT_REQUEST,
    COEFFICIENT_SUCCESS
} from '../constants/coefficient-constants'

export const coefficientReducers = (state = {}, action) => {
    switch (action.type) {
        case COEFFICIENT_REQUEST:
            return {loading: true}
        case COEFFICIENT_SUCCESS:
            return {loading: false, coefficientInfo: action.payload}
        case COEFFICIENT_FAIL:
            return {loading: false, error: action.payload}
        default:
            return state
    }
}